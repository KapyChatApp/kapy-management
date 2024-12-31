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
import ConfirmModal from "../shared/ConfirmModal";
import { UserResponseDTO } from "@/lib/DTO/user";
import { fetchAllUsers, removeUser } from "@/lib/account.service";
import useSearchAccount from "@/hooks/use-search-account";
import { TableProps } from "@/types";
import Confirm, { ConfirmModalProps } from "../shared/sidebar/Confirm";

interface TableUIAccount {
  table: TableProps;
  onPaginationData: (
    itemsPerPage: number,
    totalPages: number,
    dataLength: number
  ) => void;
  list: UserResponseDTO[];
  setData: React.Dispatch<React.SetStateAction<UserResponseDTO[]>>;
}

const TableAccount: React.FC<TableUIAccount> = ({
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
    key: SortableKeys;
    direction: "ascending" | "descending";
  }>({
    key: "account.userId",
    direction: "ascending"
  });

  const getValueByKey = (item: (typeof list)[0], key: SortableKeys) => {
    switch (key) {
      case "account.userId":
        return item._id;
      case "account.userName":
        return item.firstName + " " + item.lastName;
      case "account.createdAt":
        return item.createAt;
      case "account.email":
        return item.email;
      case "account.phone":
        return item.phoneNumber;
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
      sortConfig.key === "account.userId" &&
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
      return item.flag === true;
    } else if (filterItem === "inactive") {
      return item.flag === false;
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
  const handleRemove = async (userId: string) => {
    try {
      const result = await removeUser(userId);
      if (result) setData((item) => item.filter((user) => user._id != userId));
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
                  {new Date(item.createAt).toLocaleDateString()}
                </p>
              </TableCell>
              <TableCell className="text-left">
                <p className="text-dark100_light900 paragraph-regular">
                  {item.firstName + " " + item.lastName}
                </p>
              </TableCell>
              <TableCell className="text-left">
                <p className="text-dark100_light900 paragraph-regular">
                  {item.email}
                </p>
              </TableCell>
              <TableCell className="text-left ">
                <p className="text-dark100_light900 paragraph-regular">
                  {item.phoneNumber}
                </p>
              </TableCell>
              <TableCell className="text-left">
                {(() => {
                  switch (item.flag) {
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
                  <Link href={`/account/${item._id}`}>
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

export default TableAccount;
