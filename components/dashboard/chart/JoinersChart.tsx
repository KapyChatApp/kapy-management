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
import { CountAnalyseResponseDTO } from "@/lib/DTO/analyst";

// Đăng ký các thành phần cần thiết
ChartJS.register(ArcElement, Tooltip, Legend);

interface props {
  data: CountAnalyseResponseDTO;
}

const JoinersChart = ({ data }: props) => {
  const { mode } = useTheme();
  const lt18 = data.user ? Number(data.user.age.lt18) : 0;
  const gte18lte50 = data.user ? Number(data.user.age.gte18lte50) : 0;
  const gt50 = data.user ? Number(data.user.age.gt50) : 0;
  const dataChart = {
    labels: ["below 18 years old", "18 - 50 years old", "50+ years old"],
    datasets: [
      {
        data: [lt18, gte18lte50, gt50],
        backgroundColor: ["#FFBA00", "#00AC47", "#2684FC", "#CCCCCC"]
      }
    ]
  };
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
      <Pie data={dataChart} options={options} />
    </div>
  );
};

export default JoinersChart;
