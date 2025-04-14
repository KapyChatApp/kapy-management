import { useState } from "react";

export interface UsePaginationTableProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  indexOfLastItem: number;
  indexOfFirstItem: number;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  dataLength: number;
  setDataLength: React.Dispatch<React.SetStateAction<number>>;
  handlePaginationData: (
    itemsPerPage: number,
    totalPages: number,
    dataLength: number
  ) => void;
}

export const usePaginationTable = (
  defaultItemsPerPage = 8
): UsePaginationTableProps => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLength, setDataLength] = useState(0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePaginationData = (
    itemsPerPage: number,
    totalPages: number,
    dataLength: number
  ) => {
    setItemsPerPage(itemsPerPage);
    setTotalPages(totalPages);
    setDataLength(dataLength);
  };

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages,
    setTotalPages,
    dataLength,
    setDataLength,
    handlePaginationData
  };
};
