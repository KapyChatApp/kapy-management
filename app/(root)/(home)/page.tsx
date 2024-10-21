import ActivesChart from "@/components/dashboard/chart/ActivesChart";
import JoinersChart from "@/components/dashboard/chart/JoinersChart";
import TableReport from "@/components/dashboard/TableReport";
import TotalData from "@/components/dashboard/TotalData";
import { reportDataList } from "@/constants/reports";
import React from "react";

const page = () => {
  const resolvedCount = reportDataList.filter(
    (item) => item.report.status === "resolved"
  ).length;
  const pendingCount = reportDataList.filter(
    (item) => item.report.status === "pending"
  ).length;
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-row gap-10 w-full h-[571px]">
        <div className="flex w-[562px] h-full gap-10 flex-col">
          <TotalData />

          <ActivesChart />
        </div>
        <div className="flex w-[486px] h-full gap-4 flex-col px-6 py-8 rounded-[12px] background-light900_dark200">
          <p className="text-dark100_light900 h2-semibold">Joiners</p>
          <JoinersChart />
        </div>
      </div>

      <div className="flex w-full h-full flex-col px-4 pt-[6px] pb-4 background-light900_dark200 rounded-[12px] gap-4">
        <div className="flex flex-row justify-between items-center w-full h-fit">
          <p className="text-dark100_light900 h2-semibold">Reports</p>
          <div className="flex flex-row gap-7 items-center justify-center w-fit h-fit">
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-dark100_light900 h1-regular">
                {resolvedCount}
              </p>
              <p className="text-dark600_light600 body-regular">Resolved</p>
            </div>
            <span className="w-[0.5px] h-[56px] bg-light-500"></span>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-dark100_light900 h1-regular">{pendingCount}</p>
              <p className="text-dark600_light600 body-regular">Pending</p>
            </div>
          </div>
        </div>
        <div className="flex w-full h-fit">
          <TableReport />
        </div>
      </div>
    </div>
  );
};

export default page;
