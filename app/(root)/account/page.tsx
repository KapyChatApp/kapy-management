"use client";
import TableAccount from "@/components/account/TableAccount";
import PaginationDisplay from "@/components/shared/PaginationDisplay";
import TopPage from "@/components/shared/TopPage";
import { selectionItem } from "@/constants/accounts";
import { PaginationProps, TableProps } from "@/types";
import React, { useState } from "react";

const page = () => {
  const [filterItem, setFilter] = useState("all");
  const top = {
    titlePage: "Accounts",
    selectionItem,
    filterItem,
    setFilter,
    otherClasses: "w-[220px]"
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [totalPages, setTotalPages] = useState(0);
  const [dataLength, setDataLength] = useState(0);

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
  const handlePaginationData = (
    itemsPerPage: number,
    totalPages: number,
    dataLength: number
  ) => {
    setItemsPerPage(itemsPerPage);
    setTotalPages(totalPages);
    setDataLength(dataLength);
  };
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
        <TableAccount table={table} onPaginationData={handlePaginationData} />

        <PaginationDisplay page={paginationUI} />
      </div>
    </div>
  );
};

export default page;
