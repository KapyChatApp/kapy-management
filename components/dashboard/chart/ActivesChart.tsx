"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import LineChartActives from "./LineChartActives";

const ActivesChart = () => {
  const [selectedOption, setSelectedOption] = useState("weekly");
  return (
    <div className="flex flex-col background-light900_dark200 rounded-[12px] p-6 w-full min-h-[406px] gap-4">
      <div className="flex flex-row justify-between items-center h-fit w-full">
        <p className="h2-semibold text-dark100_light900">Actives</p>

        <Select
          value="weekly"
          onValueChange={(value) => setSelectedOption(value)}
        >
          <SelectTrigger className="w-[100px] h-[30px]">
            <SelectValue placeholder="Weekly" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <LineChartActives option={selectedOption} />
    </div>
  );
};

export default ActivesChart;
