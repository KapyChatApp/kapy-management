"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { dataMonthly, dataWeekly, dataYearly } from "@/constants/dashboard";

interface LineChartProps {
  option: any;
}

const LineChartActives = ({ option }: LineChartProps) => {
  const [key, setKey] = useState(0); // Thêm state key

  const chartData =
    option === "weekly"
      ? dataWeekly
      : option === "monthly"
      ? dataMonthly
      : dataYearly;

  const transformedData = chartData.labels.map((label, index) => ({
    key: index,
    label: label,
    Web: chartData.datasets[0].data[index],
    Mobile: chartData.datasets[1].data[index]
  }));

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [option]);
  return (
    <div className="w-full h-full bg-transparent ">
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={transformedData} key={key}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Web"
            stroke={chartData.datasets[0].borderColor}
            strokeWidth={chartData.datasets[0].borderWidth}
            dot={{
              r: chartData.datasets[0].pointRadius,
              fill: chartData.datasets[0].pointBackgroundColor
            }}
            activeDot={{ r: 4 }}
            key={`line-web`}
          />
          <Line
            type="monotone"
            dataKey="Mobile"
            stroke={chartData.datasets[1].borderColor}
            strokeWidth={chartData.datasets[1].borderWidth}
            dot={{
              r: chartData.datasets[1].pointRadius,
              fill: chartData.datasets[1].pointBackgroundColor
            }}
            activeDot={{ r: 4 }}
            key={`line-mobile`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartActives;
