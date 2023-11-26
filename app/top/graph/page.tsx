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
import annotationPlugin from 'chartjs-plugin-annotation';
import { getUser } from '@/app/lib/user';
import { redirect } from 'next/navigation';
import { User } from '@/app/types/User';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

type GraphWeight = {
  date: string;
  weight: number | null;
};

const dateFormatOption: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

export default function Page() {
  const [dayRange, setDayRange] = useState<number>(7);
  const [goal, setGoal] = useState<number>(0.0);
  const [graphWeights, setGraphWeights] = useState<GraphWeight[]>([]);

  useEffect(() => {
    const data = async (labelDateArray: string[]) => {
      const session: UserSession = await getSession();
      const user: User = await getUser(session.email);
      if (user === undefined) {
        redirect('/');
      }
      setGoal(user.goal);
      const weightList = await fetchWeightsForGraph(session.email, dayRange);
      const graphList: GraphWeight[] = [];
      labelDateArray.forEach((labelDate, index) => {
        weightList.forEach((weight) => {
          const compareDate = new Date(weight.date)
            .toLocaleDateString('ja-JP', dateFormatOption)
            .split('/')
            .join('-');
          if (labelDate === compareDate) {
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
      labelDateArray.push(
        startDate.toLocaleDateString('ja-JP', dateFormatOption).split('/').join('-')
      );
      startDate.setDate(startDate.getDate() + 1);
    }

    // data fetch
    data(labelDateArray);
  }, [dayRange]);

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

  const graphOptions = {
    responsive: true,
    spanGaps: true,
    scales: {
      y: {
        min: goal !== 0 ? goal - 1 : 0,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '体重グラフ',
      },
      annotation: {
        annotations: {
          goalLine: {
            yMin: goal !== 0 ? goal : 0,
            yMax: goal !== 0 ? goal : 0,
            borderColor: 'red',
            borderWidth: 2,
            borderDash: [2, 2],
            label: {
              display: true,
              content: '目標',
              backgroundColor: 'lightpink',
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <GraphTabs setDayRange={setDayRange} />
      <Line options={graphOptions} data={data} />
    </div>
  );
}
