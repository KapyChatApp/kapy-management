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
import { Icon } from "@iconify/react/dist/iconify.js";
import { TableProps, TableUI } from "@/types";
import { SortableMessageKeys } from "@/constants/messages";
import { formatTime } from "@/lib/utils";
import { CheckedPostReponse } from "@/lib/DTO/censor";
import {
  SortableCheckedPostKeys,
  titleTableHeadConsoredPost
} from "@/constants/consor";

interface TableUIConsoredPost {
  table: TableProps;
  onPaginationData: (
    itemsPerPage: number,
    totalPages: number,
    dataLength: number
  ) => void;
  list: CheckedPostReponse[];
}

const TableConsoredPost: React.FC<TableUIConsoredPost> = ({
  table,
  onPaginationData,
  list
}) => {
  const { indexOfLastItem, indexOfFirstItem, itemsPerPage, inputValue } = table;

  //Sorted
  const [sortConfig, setSortConfig] = useState<{
    key: SortableCheckedPostKeys;
    direction: "ascending" | "descending";
  }>({
    key: "id",
    direction: "ascending"
  });

  const getValueByKey = (
    item: (typeof list)[0],
    key: SortableCheckedPostKeys
  ) => {
    switch (key) {
      case "id":
        return item._id;
      case "userName":
        return item.firstName + " " + item.lastName;
      case "createdAt":
        return new Date(item.createAt).toLocaleString();
      case "commentCount":
        return item.comments;
      case "likeCount":
        return item.likedIds;
      case "attachmentCount":
        return item.contents.length;
      default:
        return "";
    }
  };
  const sortedData = [...list].sort((a, b) => {
    const aValue = getValueByKey(a, sortConfig.key);
    const bValue = getValueByKey(b, sortConfig.key);

    let aParsedValue: number | string | Date = aValue;
    let bParsedValue: number | string | Date = bValue;

    // Kiểm tra nếu key là account.userId và giá trị là string, chuyển nó thành số
    if (
      sortConfig.key === "id" &&
      typeof aValue === "string" &&
      typeof bValue === "string"
    ) {
      aParsedValue = parseInt(aValue, 10);
      bParsedValue = parseInt(bValue, 10);
    }

    if (aParsedValue < bParsedValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aParsedValue > bParsedValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
  const requestSort = (key: SortableCheckedPostKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  //Display
  const displayedData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  //Pagination
  const dataLength = sortedData.length;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  useEffect(() => {
    onPaginationData(itemsPerPage, totalPages, dataLength);
  }, [itemsPerPage, totalPages, dataLength, onPaginationData]);

  return (
    <Table key="" className="h-[fit]">
      <TableHeader>
        <TableRow key="header-table-teacher" className="hover:bg-transparent">
          {titleTableHeadConsoredPost.map((item) => (
            <TableHead
              className={`w-fit text-left ${
                item.title === "Caption" || item.title === "Status"
                  ? "cursor-default"
                  : "cursor-pointer"
              }`}
            >
              <div
                className="flex flex-row items-center justify-start gap-1 w-fit h-fit"
                onClick={
                  item.key
                    ? () => requestSort(item.key as SortableCheckedPostKeys)
                    : undefined
                }
              >
                <p className="text-primary-500 paragraph-regular">
                  {item.title}
                </p>
                {!(item.title === "Caption" || item.title === "Status") && (
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
            key={item._id}
            className="cursor-default hover:bg-transparent"
          >
            <TableCell className="text-left">
              <div className="flex flex-row items-center justify-start gap-1 w-fit h-fit">
                <p className="text-dark100_light900 paragraph-regular">
                  {item._id}
                </p>
              </div>
            </TableCell>
            <TableCell className="text-left">
              <p className="text-dark100_light900 paragraph-regular">
                {formatTime(new Date(item.createAt))}
              </p>
            </TableCell>
            <TableCell className="text-left">
              <div className="flex max-w-[170px]">
                <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis">
                  {item.firstName + " " + item.lastName}
                </p>
              </div>
            </TableCell>
            <TableCell className="text-left">
              <div className="flex max-w-[250px]">
                <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis">
                  {item.caption ? item.caption : "No caption"}
                </p>
              </div>
            </TableCell>
            <TableCell className="text-left">
              {(() => {
                let content: any;
                if (item.contents.length) {
                  content = item.contents.length;
                } else {
                  content = "No attachment";
                }
                return (
                  <div className="flex max-w-[250px]">
                    <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis">
                      {content}
                    </p>
                  </div>
                );
              })()}
            </TableCell>

            <TableCell className="text-left">
              {(() => {
                let content: any;
                if (item.likedIds > 0) {
                  content = item.likedIds;
                } else {
                  content = "No likes";
                }
                return (
                  <div className="flex max-w-[250px]">
                    <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis">
                      {content}
                    </p>
                  </div>
                );
              })()}
            </TableCell>

            <TableCell className="text-left">
              {(() => {
                let content: any;
                if (item.comments > 0) {
                  content = item.comments;
                } else {
                  content = "No comments";
                }
                return (
                  <div className="flex max-w-[250px]">
                    <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis">
                      {content}
                    </p>
                  </div>
                );
              })()}
            </TableCell>

            <TableCell className="text-left">
              <div className="bg-accent-red bg-opacity-20 rounded-lg w-[66px] items-center justify-center flex h-fit p-1">
                <p className="text-accent-red paragraph-15-regular">Hidden</p>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableConsoredPost;
