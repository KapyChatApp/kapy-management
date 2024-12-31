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
import { TableProps, TableUI } from "@/types";
import {
  SortableMessageKeys,
  titleTableHeadMessage
} from "@/constants/messages";
import { formatTime } from "@/lib/utils";
import { ResponseMessageDTO } from "@/lib/DTO/message";
import Confirm, { ConfirmModalProps } from "../shared/sidebar/Confirm";
import { removeMessageById } from "@/lib/message.service";

interface TableUIMessage {
  table: TableProps;
  onPaginationData: (
    itemsPerPage: number,
    totalPages: number,
    dataLength: number
  ) => void;
  list: ResponseMessageDTO[];
  setData: React.Dispatch<React.SetStateAction<ResponseMessageDTO[]>>;
}

const TableMessage: React.FC<TableUIMessage> = ({
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
    key: SortableMessageKeys;
    direction: "ascending" | "descending";
  }>({
    key: "id",
    direction: "ascending"
  });

  const getValueByKey = (item: (typeof list)[0], key: SortableMessageKeys) => {
    switch (key) {
      case "id":
        return item._id;
      case "userName":
        return item.createBy.firstName + " " + item.createBy.lastName;
      case "createdAt":
        return new Date(item.createAt).toLocaleString();
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
  const requestSort = (key: SortableMessageKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  //Filter
  const filteredData = sortedData.filter((item) => {
    const hasText = item.text && item.text.length > 0;
    const hasContentId = item.contentId && item.contentId.length > 0;

    if (filterItem === "image") {
      if (hasContentId) {
        const lastContent = item.contentId[item.contentId.length - 1];
        return lastContent.type === "Image";
      }
      return false;
    } else if (filterItem === "video") {
      if (hasContentId) {
        const lastContent = item.contentId[item.contentId.length - 1];
        return lastContent.type === "Video";
      }
      return false;
    } else if (filterItem === "file") {
      if (hasContentId) {
        const lastContent = item.contentId[item.contentId.length - 1];
        return lastContent.type === "Other";
      }
      return false;
    } else if (filterItem === "audio") {
      if (hasContentId) {
        const lastContent = item.contentId[item.contentId.length - 1];
        return lastContent.type === "Audio";
      }
      return false;
    } else if (filterItem === "text") {
      return hasText;
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
  const handleRemove = async (id: string) => {
    try {
      const result = await removeMessageById(id);
      if (result) setData((item) => item.filter((msg) => msg._id != id));
      alert("Report deleted successfully!");
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
      name: " this message from database",
      action: "remove"
    });
  };
  return (
    <>
      <Table key="" className="h-[fit]">
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
                  {!(
                    item.title === "Category" ||
                    item.title === "Action" ||
                    item.title === "Content"
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
                    {item.createBy.firstName + " " + item.createBy.lastName}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-left">
                {(() => {
                  let content = "";
                  if (item.contentId.length) {
                    const lastContent =
                      item.contentId[item.contentId.length - 1].fileName;
                    content = lastContent;
                  } else {
                    content = item.text[item.text.length - 1];
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
                  let type = "";
                  if (item.contentId.length) {
                    const lastContentType =
                      item.contentId[item.contentId.length - 1].type;
                    type = lastContentType;
                  } else {
                    type = "Text";
                  }
                  switch (type) {
                    case "Image":
                      return (
                        <div className="bg-status-image bg-opacity-20 rounded-lg  w-[66px] items-center justify-center flex h-fit p-1">
                          <p className="text-status-image paragraph-15-regular">
                            Image
                          </p>
                        </div>
                      );
                    case "Audio":
                      return (
                        <div className="bg-status-audio bg-opacity-20 rounded-lg  w-[66px] items-center justify-center flex h-fit p-1">
                          <p className="text-status-audio paragraph-15-regular">
                            Audio
                          </p>
                        </div>
                      );
                    case "Video":
                      return (
                        <div className="bg-status-video bg-opacity-20 rounded-lg  w-[66px] items-center justify-center flex h-fit p-1">
                          <p className="text-status-video paragraph-15-regular">
                            Video
                          </p>
                        </div>
                      );
                    case "Other":
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
                  <Link href={`/message/${item._id}`}>
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

export default TableMessage;
