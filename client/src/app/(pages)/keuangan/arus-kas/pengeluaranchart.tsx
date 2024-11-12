"use client"
import * as React from 'react';
import Chart from 'react-apexcharts';

export default function PengeluaranChart() {
  const [data, setData] = React.useState({
    series: [200000, 1000000],
    labels: ['Khotib', 'Listrik'],
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
            return val.toFixed(2) + "%"; // Format nilai menjadi 2 angka di belakang koma
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
            color: '#f44336', // Menggunakan warna merah (#f44336)
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
