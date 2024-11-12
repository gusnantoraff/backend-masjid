"use client"
import * as React from 'react';
import Chart from 'react-apexcharts';

export default function PendapatanChart() {
  const [data, setData] = React.useState({
    series: [100000, 300000],
    labels: ['Infaq', 'Donasi'],
  });

  return (
    <Chart
      options={{
        labels: data.labels,
        legend: { 
          position: 'bottom', 
          fontSize: '14px',
          fontFamily: 'Arial',
          fontWeight: 600,
          labels: {
            colors: ['#000000'],
            useSeriesColors: false,
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%"; // Menambahkan persen pada label
          },
          dropShadow: {
            enabled: false,
          },
          style: {
            fontSize: '16px',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            colors: ['#ffffff'], // Mengatur warna label menjadi putih
          },
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: 0, // Menjaga jarak data label tetap tepat
            },
          },
        },
        theme: {
          mode: 'light', 
          palette: 'palette1',
          monochrome: {
            enabled: true,
            color: '#4caf50', // Menggunakan warna hijau (#4caf50)
            shadeTo: 'light', 
            shadeIntensity: 0.65,
          },
        },
      }}
      series={data.series}
      type="pie"
      width="100%"
      height={300}
    />
  );
}
