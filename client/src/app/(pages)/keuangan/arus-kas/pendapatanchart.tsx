"use client"
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PendapatanChart() {
  return (
    <PieChart
    margin={{ top: 10, bottom: 40, left: 10, right:10 }}
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Infaq' },
            { id: 1, value: 15, label: 'Donasi' },
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
