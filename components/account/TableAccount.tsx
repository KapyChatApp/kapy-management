"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import {
  accountDataList,
  SortableKeys,
  titleTableHead
} from "@/constants/accounts";
import { TableUI } from "@/types";
import ConfirmModal from "../shared/ConfirmModal";

const TableAccount: React.FC<TableUI> = ({ table, onPaginationData }) => {
  const {
    indexOfLastItem,
    indexOfFirstItem,
    filterItem,
    itemsPerPage,
    inputValue
  } = table;

  //Sorted
  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  }>({
    key: "account.userId",
    direction: "ascending"
  });

  const getValueByKey = (
    item: (typeof accountDataList)[0],
    key: SortableKeys
  ) => {
    switch (key) {
      case "account.userId":
        return item.account.userId;
      case "account.userName":
        return item.account.userName;
      case "account.createdAt":
        return item.account.createdAt;
      case "account.email":
        return item.account.email;
      case "account.phone":
        return item.account.phone;
      default:
        return "";
    }
  };
  const sortedData = [...accountDataList].sort((a, b) => {
    const aValue = getValueByKey(a, sortConfig.key);
    const bValue = getValueByKey(b, sortConfig.key);

    let aParsedValue: number | string | Date = aValue;
    let bParsedValue: number | string | Date = bValue;

    // Kiểm tra nếu key là account.userId và giá trị là string, chuyển nó thành số
    if (
      sortConfig.key === "account.userId" &&
      typeof aValue === "string" &&
      typeof bValue === "string"
    ) {
      aParsedValue = parseInt(aValue, 10);
      bParsedValue = parseInt(bValue, 10);
    }

    // Kiểm tra nếu giá trị là Date, chuyển nó thành số bằng getTime()
    if (aValue instanceof Date && bValue instanceof Date) {
      aParsedValue = aValue.getTime();
      bParsedValue = bValue.getTime();
    }

    if (aParsedValue < bParsedValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aParsedValue > bParsedValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
  const requestSort = (key: SortableKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  //Filter
  const filteredData = sortedData.filter((item) => {
    if (filterItem === "active") {
      return item.account.status === true;
    } else if (filterItem === "inactive") {
      return item.account.status === false;
    }
    return true;
  });

  //Display
  const displayedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  //Pagination
  const dataLength = filteredData.length;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  useEffect(() => {
    onPaginationData(itemsPerPage, totalPages, dataLength);
  }, [itemsPerPage, totalPages, dataLength, onPaginationData]);

  //Modal Confirm
  const [confirm, setConfirm] = useState(false);
  const handleRemove = () => {
    setConfirm(!confirm);
  };
  const confirmModal = {
    setConfirm,
    name: "this account",
    action: "remove"
  };
  return (
    <>
      <Table key="" className="h-fit">
        <TableHeader>
          <TableRow key="header-table-teacher" className="hover:bg-transparent">
            {titleTableHead.map((item) => (
              <TableHead
                className={`w-fit text-left ${
                  item.title === "Status" ||
                  item.title === "Action" ||
                  item.title === "Phone"
                    ? "cursor-default"
                    : "cursor-pointer"
                }`}
              >
                <div
                  className="flex flex-row items-center justify-start gap-1 w-fit h-fit"
                  onClick={
                    item.key
                      ? () => requestSort(item.key as SortableKeys)
                      : undefined
                  }
                >
                  <p className="text-primary-500 paragraph-regular">
                    {item.title}
                  </p>
                  {!(
                    item.title === "Status" ||
                    item.title === "Action" ||
                    item.title === "Phone"
                  ) && (
                    <Icon
                      icon="basil:sort-outline"
                      width={24}
                      height={24}
                      className="text-primary-500"
                    />
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedData.map((item) => (
            <TableRow
              key={item.account.userId}
              className="cursor-default hover:bg-transparent"
            >
              <TableCell className="text-left">
                <div className="flex flex-row items-center justify-start gap-1 w-fit h-fit">
                  <p className="text-dark100_light900 paragraph-regular">
                    {item.account.userId}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-left">
                <p className="text-dark100_light900 paragraph-regular">
                  {item.account.createdAt.toLocaleDateString()}
                </p>
              </TableCell>
              <TableCell className="text-left">
                <p className="text-dark100_light900 paragraph-regular">
                  {item.account.userName}
                </p>
              </TableCell>
              <TableCell className="text-left">
                <p className="text-dark100_light900 paragraph-regular">
                  {item.account.email}
                </p>
              </TableCell>
              <TableCell className="text-left ">
                <p className="text-dark100_light900 paragraph-regular">
                  {item.account.phone}
                </p>
              </TableCell>
              <TableCell className="text-left">
                {(() => {
                  switch (item.account.status) {
                    case true:
                      return (
                        <div className="flex bg-accent-green bg-opacity-20 rounded-lg w-[84px] items-center justify-center h-fit p-1">
                          <p className="text-accent-green paragraph-15-regular">
                            Active
                          </p>
                        </div>
                      );
                    default:
                      return (
                        <div className="flex bg-accent-red bg-opacity-20 rounded-lg w-[84px] items-center justify-center h-fit p-1">
                          <p className="text-accent-red paragraph-15-regular">
                            Inactive
                          </p>
                        </div>
                      );
                  }
                })()}
              </TableCell>
              <TableCell className="text-left">
                <div className="flex items-center justify-start gap-4">
                  <Link href={`/account/${item.account.userId}`}>
                    <div className="flex w-fit h-fit rounded-lg bg-accent-blue p-[8px] bg-opacity-20 hover:bg-accent-blue hover:bg-opacity-20">
                      <Icon
                        icon="ph:eye"
                        width={14}
                        height={14}
                        className="text-accent-blue"
                      />
                    </div>
                  </Link>
                  <Button
                    className="flex w-fit h-fit rounded-lg bg-accent-red p-[8px] bg-opacity-20 shadow-none border-none hover:bg-accent-red hover:bg-opacity-20"
                    onClick={handleRemove}
                  >
                    <Icon
                      icon="gravity-ui:trash-bin"
                      width={14}
                      height={14}
                      className="text-accent-red"
                    />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {confirm && <ConfirmModal confirm={confirmModal} />}
    </>
  );
};

export default TableAccount;
