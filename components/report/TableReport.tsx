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
import { TableProps, TableUI } from "@/types";
import {
  reportDataList,
  SortableReportKeys,
  titleTableHeadReport
} from "@/constants/reports";
import { ReportResponseDTO } from "@/lib/DTO/report";
import Confirm, { ConfirmModalProps } from "../shared/sidebar/Confirm";
import { removeReport } from "@/lib/report.service";
interface TableUIReport {
  table: TableProps;
  onPaginationData: (
    itemsPerPage: number,
    totalPages: number,
    dataLength: number
  ) => void;
  list: ReportResponseDTO[];
  setData: React.Dispatch<React.SetStateAction<ReportResponseDTO[]>>;
}

const TableReport: React.FC<TableUIReport> = ({
  table,
  onPaginationData,
  list,
  setData
}) => {
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
    key: "_id",
    direction: "ascending"
  });

  const getValueByKey = (item: (typeof list)[0], key: SortableReportKeys) => {
    switch (key) {
      case "_id":
        return item._id;
      case "userId.name":
        return item.userId.firstName + item.userId.lastName;
      case "createAt":
        return new Date(item.createAt);
      default:
        return "";
    }
  };
  const sortedData = [...list].sort((a, b) => {
    const aValue = getValueByKey(a, sortConfig.key);
    const bValue = getValueByKey(b, sortConfig.key);

    let aParsedValue: number | string | Date = aValue;
    let bParsedValue: number | string | Date = bValue;

    // So sánh đối tượng Date
    if (aParsedValue instanceof Date && bParsedValue instanceof Date) {
      // Nếu giá trị là Date, so sánh theo thời gian
      aParsedValue = aParsedValue.getTime();
      bParsedValue = bParsedValue.getTime();
    } else if (
      sortConfig.key === "_id" &&
      typeof aValue === "string" &&
      typeof bValue === "string"
    ) {
      // Nếu là _id và là chuỗi, chuyển sang số
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

  const requestSort = (key: SortableReportKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  //Filter
  const filteredData = sortedData.filter((item) => {
    if (filterItem === "pending") {
      return item.status === "pending";
    } else if (filterItem === "resolved") {
      return item.status === "solved";
    } else if (filterItem === "user") {
      return item.targetType === "User";
    } else if (filterItem === "message") {
      return item.targetType === "Message";
    } else if (filterItem === "Comment") {
      return item.targetType === "comment";
    } else if (filterItem === "Post") {
      return item.targetType === "post";
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
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmModalProps>({
    setConfirm: () => {},
    handleAction: () => {},
    name: "",
    action: ""
  });
  const handleRemove = async (reportId: string) => {
    try {
      const result = await removeReport(reportId);
      if (result)
        setData((item) => item.filter((report) => report._id != reportId));
      alert("Report deleted successfully!");
      console.log(result);
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("Failed to delete report.");
    }
  };
  const handleConfirmRemove = (reportId: string) => {
    setIsConfirm(true);
    setConfirm({
      setConfirm: setIsConfirm,
      handleAction: () => handleRemove(reportId),
      name: " this report",
      action: "remove"
    });
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
              key={item._id}
              className="cursor-default hover:bg-transparent"
            >
              <TableCell className="text-left">
                <p className="text-dark100_light900 paragraph-regular">
                  {item._id}
                </p>
              </TableCell>
              <TableCell className="text-left">
                <p className="text-dark100_light900 paragraph-regular">
                  {new Date(item.createAt).toLocaleDateString()}
                </p>
              </TableCell>
              <TableCell className="text-left">
                <p className="text-dark100_light900 paragraph-regular">
                  {item.userId.firstName + " " + item.userId.lastName}
                </p>
              </TableCell>
              <TableCell className="text-left">
                <div className="flex items-center justify-start w-[200px] min-w-0">
                  <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis w-full">
                    {item.content}
                  </p>
                </div>
              </TableCell>

              <TableCell className="text-left ">
                {(() => {
                  switch (item.targetType) {
                    case "User":
                      return (
                        <div className="bg-status-user bg-opacity-20 rounded-lg  w-[66px] items-center justify-center flex h-fit p-1">
                          <p className="text-status-user paragraph-15-regular">
                            User
                          </p>
                        </div>
                      );
                    case "Message":
                      return (
                        <div className="bg-status-image bg-opacity-20 rounded-lg  w-[66px] items-center justify-center flex h-fit p-1">
                          <p className="text-status-image paragraph-15-regular">
                            Message
                          </p>
                        </div>
                      );
                    case "Post":
                      return (
                        <div className="bg-status-text bg-opacity-20 rounded-lg  w-[66px] items-center justify-center flex h-fit p-1">
                          <p className="text-status-text paragraph-15-regular">
                            Post
                          </p>
                        </div>
                      );
                    case "Comment":
                      return (
                        <div className="bg-status-file bg-opacity-20 rounded-lg  w-[66px] items-center justify-center flex h-fit p-1">
                          <p className="text-status-file paragraph-15-regular">
                            Comment
                          </p>
                        </div>
                      );
                    default:
                      return (
                        <div className="bg-status-text bg-opacity-20 rounded-lg  w-[66px] items-center justify-center flex h-fit p-1">
                          <p className="text-status-text paragraph-15-regular">
                            Others
                          </p>
                        </div>
                      );
                  }
                })()}
              </TableCell>
              <TableCell className="text-left">
                {(() => {
                  switch (item.status) {
                    case "solved":
                      return (
                        <div className="flex bg-accent-green bg-opacity-20 rounded-lg w-[84px] items-center justify-center h-fit p-1">
                          <p className="text-accent-green paragraph-15-regular">
                            Resolved
                          </p>
                        </div>
                      );
                    case "rejected":
                      return (
                        <div className="flex bg-accent-red bg-opacity-20 rounded-lg w-[84px] items-center justify-center h-fit p-1">
                          <p className="text-accent-red paragraph-15-regular">
                            Rejected
                          </p>
                        </div>
                      );
                    default:
                      return (
                        <div className="flex bg-primary-500 bg-opacity-20 rounded-lg w-[84px] items-center justify-center h-fit p-1">
                          <p className="text-primary-500 paragraph-15-regular">
                            Pending
                          </p>
                        </div>
                      );
                  }
                })()}
              </TableCell>
              <TableCell className="text-left">
                <div className="flex items-center justify-start gap-4">
                  <Link href={`/report/${item._id}`}>
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
                    onClick={() => handleConfirmRemove(item._id)}
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

      {isConfirm && <Confirm confirm={confirm} />}
    </>
  );
};

export default TableReport;
