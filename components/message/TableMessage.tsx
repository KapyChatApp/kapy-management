"use client";
import React, { useEffect, useState } from "react";
import ConfirmModal from "../shared/ConfirmModal";
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
import { TableUI } from "@/types";
import {
  messageDataList,
  SortableMessageKeys,
  titleTableHeadMessage
} from "@/constants/messages";
import { formatTime } from "@/lib/utils";

const TableMessage: React.FC<TableUI> = ({ table, onPaginationData }) => {
  const {
    indexOfLastItem,
    indexOfFirstItem,
    filterItem,
    itemsPerPage,
    inputValue
  } = table;

  //Sorted
  const [sortConfig, setSortConfig] = useState<{
    key: SortableMessageKeys;
    direction: "ascending" | "descending";
  }>({
    key: "message.id",
    direction: "ascending"
  });

  const getValueByKey = (
    item: (typeof messageDataList)[0],
    key: SortableMessageKeys
  ) => {
    switch (key) {
      case "message.id":
        return item.message.id;
      case "message.userName":
        return item.message.userName;
      case "message.createdAt":
        return item.message.createdAt;
      default:
        return "";
    }
  };
  const sortedData = [...messageDataList].sort((a, b) => {
    const aValue = getValueByKey(a, sortConfig.key);
    const bValue = getValueByKey(b, sortConfig.key);

    let aParsedValue: number | string | Date = aValue;
    let bParsedValue: number | string | Date = bValue;

    // Kiểm tra nếu key là account.userId và giá trị là string, chuyển nó thành số
    if (
      sortConfig.key === "message.id" &&
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
  const requestSort = (key: SortableMessageKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  //Filter
  const filteredData = sortedData.filter((item) => {
    if (filterItem === "image") {
      return item.message.content.type === "image";
    } else if (filterItem === "link") {
      return item.message.content.type === "link";
    } else if (filterItem === "file") {
      return item.message.content.type === "file";
    } else if (filterItem === "text") {
      return item.message.content.type === "text";
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
    name: "this message",
    action: "remove"
  };
  return (
    <>
      <Table key="" className="h-[250px]">
        <TableHeader>
          <TableRow key="header-table-teacher" className="hover:bg-transparent">
            {titleTableHeadMessage.map((item) => (
              <TableHead
                className={`w-fit text-left ${
                  item.title === "Category" ||
                  item.title === "Action" ||
                  item.title === "Content"
                    ? "cursor-default"
                    : "cursor-pointer"
                }`}
              >
                <div
                  className="flex flex-row items-center justify-start gap-1 w-fit h-fit"
                  onClick={
                    item.key
                      ? () => requestSort(item.key as SortableMessageKeys)
                      : undefined
                  }
                >
                  <p className="text-primary-500 paragraph-regular">
                    {item.title}
                  </p>
                  <Icon
                    icon="basil:sort-outline"
                    width={24}
                    height={24}
                    className="text-primary-500"
                  />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedData.map((item) => (
            <TableRow
              key={item.message.id}
              className="cursor-default hover:bg-transparent"
            >
              <TableCell className="text-left">
                <div className="flex flex-row items-center justify-start gap-1 w-fit h-fit">
                  <p className="text-dark100_light900 paragraph-regular">
                    {item.message.id}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-left">
                <p className="text-dark100_light900 paragraph-regular">
                  {formatTime(item.message.createdAt)}
                </p>
              </TableCell>
              <TableCell className="text-left">
                <div className="flex max-w-[170px]">
                  <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis">
                    {item.message.userName}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-left">
                {(() => {
                  switch (item.message.content.type) {
                    case "image":
                      return (
                        <div className="flex max-w-[250px]">
                          <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis">
                            {item.message.content.altText}
                          </p>
                        </div>
                      );
                    case "link":
                      return (
                        <div className="flex max-w-[250px]">
                          <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis">
                            {item.message.content.title}
                          </p>
                        </div>
                      );
                    case "file":
                      return (
                        <div className="flex max-w-[250px] ">
                          <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis">
                            {item.message.content.fileName}
                          </p>
                        </div>
                      );
                    default:
                      return (
                        <div className="flex max-w-[250px]">
                          <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis">
                            {item.message.content.content}
                          </p>
                        </div>
                      );
                  }
                })()}
              </TableCell>

              <TableCell className="text-left">
                {(() => {
                  switch (item.message.content.type) {
                    case "image":
                      return (
                        <div className="bg-status-image bg-opacity-20 rounded-lg  w-[66px] items-center justify-center flex h-fit p-1">
                          <p className="text-status-image paragraph-15-regular">
                            Image
                          </p>
                        </div>
                      );
                    case "link":
                      return (
                        <div className="bg-status-link bg-opacity-20 rounded-lg  w-[66px] items-center justify-center flex h-fit p-1">
                          <p className="text-status-link paragraph-15-regular">
                            Link
                          </p>
                        </div>
                      );
                    case "file":
                      return (
                        <div className="bg-status-file bg-opacity-20 rounded-lg  w-[66px] items-center justify-center flex h-fit p-1">
                          <p className="text-status-file paragraph-15-regular">
                            File
                          </p>
                        </div>
                      );
                    default:
                      return (
                        <div className="bg-status-text bg-opacity-20 rounded-lg  w-[66px] items-center justify-center flex h-fit p-1">
                          <p className="text-status-text paragraph-15-regular">
                            Text
                          </p>
                        </div>
                      );
                  }
                })()}
              </TableCell>
              <TableCell className="text-left">
                <div className="flex items-center justify-start gap-4">
                  <Link href={`/message/${item.message.id}`}>
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

export default TableMessage;
