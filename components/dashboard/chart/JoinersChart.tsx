"use client";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";
import { useTheme } from "@/context/ThemeProvider";

// Đăng ký các thành phần cần thiết
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    "18 - 24 years old",
    "25 - 40 years old",
    "40 - 55 years old",
    "55+ years old"
  ],
  datasets: [
    {
      data: [400, 300, 300, 200],
      backgroundColor: ["#FFBA00", "#00AC47", "#2684FC", "#CCCCCC"]
    }
  ]
};

const JoinersChart = () => {
  const { mode } = useTheme();

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: mode === "dark" ? "#ffffff" : "#000000",
          font: {
            size: 14,
            weight: "bold"
          }
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor:
          mode === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)", // Màu nền tooltip
        titleColor: mode === "dark" ? "#ffffff" : "#000000",
        bodyColor: mode === "dark" ? "#ffffff" : "#000000"
      }
    }
  };

  return (
    <div className="w-full h-full bg-transparent">
      <Pie data={data} options={options} />
    </div>
  );
};

export default JoinersChart;
