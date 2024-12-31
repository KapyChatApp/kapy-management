import { CountAnalyseResponseDTO } from "@/lib/DTO/analyst";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export interface DataTotal {
  label: string;
  total: string;
}
export const dataTotal = [
  { label: "Total Joiners", total: 1234, status: true, percent: 18 },
  { label: "Total Actives", total: 564, status: true, percent: 18 },
  { label: "Total Reports", total: 34, status: false, percent: 18 }
];
interface props {
  data: CountAnalyseResponseDTO;
}
const TotalData = ({ data }: props) => {
  const displayedData: DataTotal[] = [
    { label: "Total Joiners", total: data.user ? data.user.totalUser : "0" },
    { label: "Total Active", total: data.user ? data.user.totalUser : "0" },
    {
      label: "Total Messages",
      total: data.message ? data.message.totalMessage : "0"
    }
  ];
  return (
    <div className="flex flex-row justify-between items-center w-full">
      {displayedData.map((item) => (
        <div className="flex flex-col gap-4 w-fit h-full">
          <p className="text-dark100_light900 paragraph-regular">
            {item.label}
          </p>
          <div className="flex flex-row gap-2 items-center justify-center">
            <p className="text-dark100_light900 text-[37px] font-semibold leading-[1]">
              {item.total}
            </p>
            {/* <div
              className={`${
                item.status ? "bg-accent-green" : "bg-accent-red"
              } flex gap-[2px] rounded-[20px] px-1 py-[2px] h-fit items-center justify-center`}
            >
              <Icon
                icon={
                  item.status ? "ic:round-add" : "fluent:subtract-20-filled"
                }
                width={12}
                height={12}
                className="text-light-900"
              />
              <p className="text-light-900 small-11-regular">{item.percent}%</p>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalData;
