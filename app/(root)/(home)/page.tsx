"use client";
import ActivesChart from "@/components/dashboard/chart/ActivesChart";
import JoinersChart from "@/components/dashboard/chart/JoinersChart";
import TableReport from "@/components/dashboard/TableReport";
import TotalData from "@/components/dashboard/TotalData";
import { reportDataList } from "@/constants/reports";
import { countAnalyseAPI } from "@/lib/dashboard.service";
import { CountAnalyseResponseDTO } from "@/lib/DTO/analyst";
import { ReportResponseDTO } from "@/lib/DTO/report";
import { fetchAllReports } from "@/lib/report.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
export const defaultCountAnalyseResponse: CountAnalyseResponseDTO = {
  authHistory: {
    totalPhone: "0",
    totalBrowser: "0"
  },
  message: {
    totalMessage: "0"
  },
  user: {
    totalUser: "0",
    gender: {
      male: "0",
      female: "0"
    },
    age: {
      lt18: "0",
      gte18lte50: "0",
      gt50: "0"
    }
  }
};
const page = () => {
  const router = useRouter();
  const [data, setData] = useState<CountAnalyseResponseDTO>(
    defaultCountAnalyseResponse
  );
  const [reports, setReports] = useState<ReportResponseDTO[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
    }
  });

  useEffect(() => {
    const fetchDataAnalyst = async () => {
      try {
        const result: CountAnalyseResponseDTO = await countAnalyseAPI();
        if (result) {
          setData(result);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        const errorMessage = err?.message || "An unexpected error occurred.";
        alert(`Error fetching data: ${errorMessage}`);
      }
    };

    const fetchReports = async () => {
      try {
        const result: ReportResponseDTO[] = await fetchAllReports();
        if (result) {
          const sortedReports = result.sort((a, b) => {
            return (
              new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
            );
          });
          setReports(sortedReports);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        const errorMessage = err?.message || "An unexpected error occurred.";
        alert(`Error fetching data: ${errorMessage}`);
      }
    };

    fetchReports();
    fetchDataAnalyst();
  }, []);

  console.log(reports);
  const resolvedCount = reports.filter(
    (item) => item.status === "solved"
  ).length;
  const pendingCount = reports.filter(
    (item) => item.status === "pending"
  ).length;
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-row gap-10 w-full h-[571px]">
        <div className="flex w-[562px] h-full gap-10 flex-col">
          <TotalData data={data} />

          <ActivesChart data={data} />
        </div>
        <div className="flex w-[486px] h-full gap-4 flex-col px-6 py-8 rounded-[12px] background-light900_dark200">
          <p className="text-dark100_light900 h2-semibold">Joiners</p>
          <JoinersChart data={data} />
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
          <TableReport reports={reports} setReports={setReports} />
        </div>
      </div>
    </div>
  );
};

export default page;
