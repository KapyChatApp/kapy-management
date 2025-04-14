"use client";
import TableAccount from "@/components/account/TableAccount";
import PaginationDisplay from "@/components/shared/PaginationDisplay";
import TopPage from "@/components/shared/TopPage";
import { selectionItem } from "@/constants/accounts";
import useSearchAccount from "@/hooks/use-search-account";
import { usePaginationTable } from "@/hooks/use-table";
import { fetchAllUsers } from "@/lib/account.service";
import { UserResponseDTO } from "@/lib/DTO/user";
import { PaginationProps, TableProps } from "@/types";
import React, { useEffect, useState } from "react";

const page = () => {
  const [filterItem, setFilter] = useState("all");
  const [data, setData] = useState<UserResponseDTO[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: UserResponseDTO[] = await fetchAllUsers();
        if (result) {
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
  const { searchTerm, setSearchTerm, list } = useSearchAccount(data);
  const top = {
    titlePage: "Accounts",
    selectionItem,
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
        <TableAccount
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
