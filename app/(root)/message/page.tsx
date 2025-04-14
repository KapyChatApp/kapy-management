"use client";
import React, { useEffect, useState } from "react";
import { selectionItemMessage } from "@/constants/messages";
import { PaginationProps, TableProps } from "@/types";
import TopPage from "@/components/shared/TopPage";
import PaginationDisplay from "@/components/shared/PaginationDisplay";
import TableMessage from "@/components/message/TableMessage";
import useSearchMessage from "@/hooks/use-search-message";
import { ResponseMessageDTO } from "@/lib/DTO/message";
import { fetchAllMessages } from "@/lib/message.service";
import { useMessageContext } from "@/context/DataContext";

const page = () => {
  const [filterItem, setFilter] = useState("all");
  const [data, setData] = useState<ResponseMessageDTO[]>([]);
  const { setDataMessage } = useMessageContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: ResponseMessageDTO[] = await fetchAllMessages();
        if (result) {
          result.sort(
            (a, b) =>
              new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
          );
          setData(result);
          setDataMessage(result);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        const errorMessage = err?.message || "An unexpected error occurred.";
        alert(`Error fetching data: ${errorMessage}`);
      }
    };
    fetchData();
  }, []);
  const { searchTerm, setSearchTerm, list } = useSearchMessage(data);
  const top = {
    titlePage: "Messages",
    selectionItem: selectionItemMessage,
    filterItem,
    setFilter,
    otherClasses: "w-[220px]",
    setSearchTerm: setSearchTerm
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
        <TableMessage
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
