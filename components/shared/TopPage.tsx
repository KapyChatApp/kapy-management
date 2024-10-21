"use client";
import React from "react";
import LocalSearch from "@/components/shared/search/localSearchbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { TopPageProps } from "@/types";

interface Top {
  top: TopPageProps;
}
const TopPage: React.FC<Top> = ({ top }) => {
  const { filterItem, setFilter, selectionItem, titlePage, otherClasses } = top;
  return (
    <div className="flex flex-row items-center justify-between w-full h-fit">
      <p className="text-dark100_light900 h2-semibold">{titlePage}</p>
      <div className="flex flex-row w-fit h-fit gap-3 items-center justify-center">
        <LocalSearch otherClasses="border border-light-500 bg-transparent" />
        <Select value={filterItem} onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className={`${otherClasses} h-[36px] rounded-[20px]`}>
            <SelectValue placeholder={filterItem} />
          </SelectTrigger>
          <SelectContent>
            {selectionItem.map((item) => (
              <SelectItem value={item.value}>{item.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TopPage;
