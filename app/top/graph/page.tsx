'use client';

import { getSession } from '@/app/lib/actions';
import { fetchWeightsForGraph } from '@/app/lib/weight';
import { UserSession } from '@/app/types/UserSession';
import { Weight } from '@/app/types/Weight';
import { GraphTab, GraphTabs } from '@/app/ui/graph/GraphTabs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Page() {
  const [dayRange, setDayRange] = useState<number>(7);
  const [weights, setWeights] = useState<Weight[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const data = async () => {
      const session: UserSession = await getSession();
      const weightList = await fetchWeightsForGraph(session.email, dayRange);
      weightList.sort((a, b) => {
        const x = new Date(a.date);
        const y = new Date(b.date);
        return x.getTime() - y.getTime();
      });
      setWeights(weightList);
    };

    // label生成
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - dayRange + 1);
    let labelArray: string[] = [];
    while (startDate <= currentDate) {
      labelArray.push(startDate.toISOString().split('T')[0]);
      startDate.setDate(startDate.getDate() + 1);
    }
    setLabels(labelArray);

    // data fetch
    data();
  }, [dayRange]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '体重グラフ',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: '体重 kg',
        data: weights
          .filter((weight) => {
            const day = new Date(weight.date);
            day.setDate(day.getDate() + 1);
            return labels.includes(day.toISOString().split('T')[0]);
          })
          .map((item) => item['weight']),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div>
      <GraphTabs setDayRange={setDayRange} />
      <Line options={options} data={data} />
    </div>
  );
}
