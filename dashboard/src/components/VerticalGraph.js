import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const options = {

  responsive: true,

  maintainAspectRatio: false,

  plugins: {

    legend: {
      position: "top",
    },

    title: {

      display: true,

      text: "Holdings",

    },

  },

  scales: {

    y: {

      beginAtZero: true,

    },

  },

};


export function VerticalGraph({ data }) {

  if (
    !data ||
    !data.labels ||
    data.labels.length === 0
  ) {

    return (

      <div
        style={{
          height: "350px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        No holdings data available

      </div>

    );

  }


  return (

    <div
      style={{
        width: "100%",
        height: "350px",
      }}
    >

      <Bar
        data={data}
        options={options}
      />

    </div>

  );

}