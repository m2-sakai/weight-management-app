'use client';

import { getSession } from '@/app/lib/actions';
import { fetchWeightsForGraph } from '@/app/lib/weight';
import { UserSession } from '@/app/types/UserSession';
import { GraphTabs } from '@/app/ui/graph/GraphTabs';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type GraphWeight = {
  date: string;
  weight: number | null;
};
export default function Page() {
  const [dayRange, setDayRange] = useState<number>(7);
  const [graphWeights, setGraphWeights] = useState<GraphWeight[]>([]);

  useEffect(() => {
    const data = async (labelDateArray: string[]) => {
      const session: UserSession = await getSession();
      const weightList = await fetchWeightsForGraph(session.email, dayRange);
      const graphList: GraphWeight[] = [];
      console.log('labelDateArray:' + labelDateArray);
      labelDateArray.forEach((labelDate, index) => {
        weightList.forEach((weight) => {
          // console.log(weight.date);
          const compareDate = new Date(weight.date);
          console.log(compareDate);
          compareDate.setDate(compareDate.getDate() + 1);
          if (labelDate === compareDate.toISOString().split('T')[0]) {
            graphList.push({
              date: labelDate,
              weight: weight.weight,
            });
          }
        });
        if (graphList[index] === undefined) {
          graphList.push({
            date: labelDate,
            weight: null,
          });
        }
      });

      graphList.sort((a, b) => {
        const x = new Date(a.date);
        const y = new Date(b.date);
        return x.getTime() - y.getTime();
      });
      setGraphWeights(graphList);
    };

    // label生成
    const currentDate = new Date(
      Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
    );
    const startDate = new Date(Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000);
    startDate.setDate(currentDate.getDate() - dayRange + 1);
    let labelDateArray: string[] = [];
    while (startDate <= currentDate) {
      labelDateArray.push(startDate.toISOString().split('T')[0]);
      startDate.setDate(startDate.getDate() + 1);
    }

    // data fetch
    data(labelDateArray);
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
    labels: graphWeights.map((weight) => weight['date']),
    datasets: [
      {
        label: '体重 kg',
        data: graphWeights.map((weight) => weight['weight']),
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
