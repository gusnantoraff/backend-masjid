"use client";
import * as React from "react";
import Chart from "react-apexcharts";

export default function PendapatanChart() {
  const [data, setData] = React.useState({
    series: [100000, 300000],
    labels: ["Infaq", "Donasi"],
  });

  return (
    <Chart
      options={{
        labels: data.labels,
        legend: {
          position: "bottom",
          fontSize: "14px",
          fontFamily: "Arial",
          fontWeight: 600,
          labels: {
            colors: ["#000000"],
            useSeriesColors: false,
          },
          formatter: function (seriesName, opts) {
            const value = opts.w.globals.series[opts.seriesIndex]; // Get the value for the corresponding series
            return `${seriesName}: Rp${value.toLocaleString("id-ID")}`; // Add value next to the label
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return `${val.toFixed(1)}%`; // Display percentage with one decimal
          },
          dropShadow: {
            enabled: false,
          },
          style: {
            fontSize: "16px",
            fontFamily: "Arial",
            fontWeight: "bold",
            colors: ["#ffffff"], // Set label color to white
          },
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: 0, // Keep data labels close to the chart
            },
          },
        },
        theme: {
          mode: "light",
          palette: "palette1",
          monochrome: {
            enabled: true,
            color: "#4caf50", // Use green color (#4caf50)
            shadeTo: "light",
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
