import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },

  },
};

const labels = ['Aug', 'Sep', 'Oct', 'Nov'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Task Done',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: '#cfdfea',
    },
    {
      label: 'Tasks Delay',
      data: labels.map(() => faker.datatype.number({ min: 10, max: 1000 })),
      backgroundColor: '#A8C5DA',
    },
  ],
};

export default function App() {
  return <Bar options={options} data={data} />;
}
