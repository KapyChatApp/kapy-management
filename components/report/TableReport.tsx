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
  reportDataList,
  SortableReportKeys,
  titleTableHeadReport
} from "@/constants/reports";

const TableReport: React.FC<TableUI> = ({ table, onPaginationData }) => {
  const {
    indexOfLastItem,
    indexOfFirstItem,
    filterItem,
    itemsPerPage,
    inputValue
  } = table;

  //Sorted
  const [sortConfig, setSortConfig] = useState<{
    key: SortableReportKeys;
    direction: "ascending" | "descending";
  }>({
    key: "report.id",
    direction: "ascending"
  });

  const getValueByKey = (
    item: (typeof reportDataList)[0],
    key: SortableReportKeys
  ) => {
    switch (key) {
      case "report.id":
        return item.report.id;
      case "report.reporterInfo.name":
        return item.report.reporterInfo.name;
      case "report.createdAt":
        return item.report.createdAt;
      default:
        return "";
    }
  };
  const sortedData = [...reportDataList].sort((a, b) => {
    const aValue = getValueByKey(a, sortConfig.key);
    const bValue = getValueByKey(b, sortConfig.key);

    let aParsedValue: number | string | Date = aValue;
    let bParsedValue: number | string | Date = bValue;

    // Kiểm tra nếu key là account.userId và giá trị là string, chuyển nó thành số
    if (
      sortConfig.key === "report.id" &&
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
  const requestSort = (key: SortableReportKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  //Filter
  const filteredData = sortedData.filter((item) => {
    if (filterItem === "rejected") {
      return item.report.status === "rejected";
    } else if (filterItem === "resolved") {
      return item.report.status === "resolved";
    } else if (filterItem === "pending") {
      return item.report.status === "pending";
    } else if (filterItem === "link") {
      return item.report.targetedItem.type === "link";
    } else if (filterItem === "file") {
      return item.report.targetedItem.type === "file";
    } else if (filterItem === "text") {
      return item.report.targetedItem.type === "text";
    } else if (filterItem === "user") {
      return item.report.targetedItem.type === "user";
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
            {titleTableHeadReport.map((item) => (
              <TableHead
                className={`w-fit text-left ${
                  item.title === "Status" ||
                  item.title === "Action" ||
                  item.title === "Title" ||
                  item.title === "Targeted Item"
                    ? "cursor-default"
                    : "cursor-pointer"
                }`}
              >
                <div
                  className="flex flex-row items-center justify-start gap-1 w-fit h-fit"
                  onClick={
                    item.key
                      ? () => requestSort(item.key as SortableReportKeys)
                      : undefined
                  }
                >
                  <p className="text-primary-500 paragraph-regular">
                    {item.title}
                  </p>
                  {!(
                    item.title === "Status" ||
                    item.title === "Action" ||
                    item.title === "Title" ||
                    item.title === "Targeted Item"
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
              key={item.report.id}
              className="cursor-default hover:bg-transparent"
            >
              <TableCell className="text-left">
                <div className="flex flex-row items-center justify-start gap-1 w-fit h-fit">
                  <p className="text-dark100_light900 paragraph-regular">
                    {item.report.id}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-left">
                <p className="text-dark100_light900 paragraph-regular">
                  {item.report.createdAt.toLocaleDateString()}
                </p>
              </TableCell>
              <TableCell className="text-left">
                <div className="flex max-w-[170px]">
                  <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis">
                    {item.report.reporterInfo.name}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-left">
                <div className="flex max-w-[198px]">
                  <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis">
                    {item.report.title}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-left ">
                {(() => {
                  switch (item.report.targetedItem.type) {
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
                    case "user":
                      return (
                        <div className="bg-status-user bg-opacity-20 rounded-lg  w-[66px] items-center justify-center flex h-fit p-1">
                          <p className="text-status-user paragraph-15-regular">
                            User
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
                {(() => {
                  switch (item.report.status) {
                    case "resolved":
                      return (
                        <div className="flex bg-accent-green bg-opacity-20 rounded-lg w-[86px] items-center justify-center h-fit p-1">
                          <p className="text-accent-green paragraph-15-regular">
                            Resolved
                          </p>
                        </div>
                      );
                    case "pending":
                      return (
                        <div className="flex bg-primary-500 bg-opacity-20 rounded-lg w-[86px] items-center justify-center h-fit p-1">
                          <p className="text-primary-500 paragraph-15-regular">
                            Pending
                          </p>
                        </div>
                      );
                    default:
                      return (
                        <div className="flex bg-accent-red bg-opacity-20 rounded-lg w-[86px] items-center justify-center h-fit p-1">
                          <p className="text-accent-red paragraph-15-regular">
                            Rejected
                          </p>
                        </div>
                      );
                  }
                })()}
              </TableCell>
              <TableCell className="text-left">
                <div className="flex items-center justify-start gap-4">
                  <Link href={`/report/${item.report.id}`}>
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

export default TableReport;
