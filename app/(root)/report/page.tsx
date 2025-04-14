"use client";
import TableReport from "@/components/report/TableReport";
import PaginationDisplay from "@/components/shared/PaginationDisplay";
import TopPage from "@/components/shared/TopPage";
import { selectionItemReport } from "@/constants/reports";
import useSearchReport from "@/hooks/use-search-report";
import { usePaginationTable } from "@/hooks/use-table";
import { ReportResponseDTO } from "@/lib/DTO/report";
import { fetchAllReports } from "@/lib/report.service";
import { PaginationProps, TableProps } from "@/types";
import React, { useEffect, useState } from "react";

const page = () => {
  const [filterItem, setFilter] = useState("all");
  const [data, setData] = useState<ReportResponseDTO[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: ReportResponseDTO[] = await fetchAllReports();
        if (result) {
          result.sort(
            (a, b) =>
              new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
          );
          setData(result);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        const errorMessage = err?.message || "An unexpected error occurred.";
        alert(`Error fetching data: ${errorMessage}`);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  const { searchTerm, setSearchTerm, list } = useSearchReport(data);
  const top = {
    titlePage: "Reports",
    selectionItem: selectionItemReport,
    filterItem,
    setFilter,
    otherClasses: "w-[220px]",
    setSearchTerm: setSearchTerm
  };

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages,
    dataLength,
    handlePaginationData
  } = usePaginationTable(8);

  //Pagination
  const paginationUI: PaginationProps = {
    currentPage,
    setCurrentPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages,
    dataLength
  };

  //Table
  const [inputValue, setInputValue] = useState<string>("");
  const table: TableProps = {
    indexOfLastItem,
    indexOfFirstItem,
    filterItem,
    itemsPerPage,
    inputValue
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <TopPage top={top} />
      <div className="flex flex-col background-light900_dark200 rounded-[12px] p-4 h-[520px] items-center justify-between">
        <TableReport
          table={table}
          onPaginationData={handlePaginationData}
          list={list}
          setData={setData}
        />

        <PaginationDisplay page={paginationUI} />
      </div>
    </div>
  );
};

export default page;
