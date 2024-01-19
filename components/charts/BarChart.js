import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as CjartJS } from "chart.js/auto";

const BarChart = ({ chartData }) => {
  return (
    <div className="row mt-5">
      <div className="col-md-4">
        <Pie data={chartData} />
      </div>
      <div className="col-md-4">
        <Bar data={chartData} />
      </div>
      <div className="col-md-4">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default BarChart;
