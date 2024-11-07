import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PengeluaranChart() {
  return (
    <PieChart
      margin={{ top: 10, bottom: 40, left: 10, right: 10 }}
      series={[
        {
          data: [
            { id: 0, value: 100000, label: 'Biaya Listrik', color: '#FFB74D' },  // Warm orange
            { id: 1, value: 150000, label: 'Transport Khatib', color: '#F57C00' }, // Darker warm orange
          ],
        },
      ]}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'middle' },
          padding: 0,
        },
      }}
      width={500}
      height={200}
    />
  );
}
