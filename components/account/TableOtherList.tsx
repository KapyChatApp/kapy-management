import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  SortableFriendsKeys,
  SortablePostKeys,
  titleFriendList,
  titlePostDetail
} from "@/constants/accounts";
import { PostResponseDTO } from "@/lib/DTO/post";
import { FriendResponseDTO, UserResponseDTO } from "@/lib/DTO/user";

interface TablePostDetailProps {
  otherList: PostResponseDTO[] | FriendResponseDTO[];
}

const TableOtherList = ({ otherList }: TablePostDetailProps) => {
  //Sorted
  const [sortConfig, setSortConfig] = useState<{
    key: SortablePostKeys | SortableFriendsKeys;
    direction: "ascending" | "descending";
  }>({
    key: "otherList.id",
    direction: "ascending"
  });

  const getValueByKey = (
    item: PostResponseDTO | FriendResponseDTO,
    key: SortablePostKeys | SortableFriendsKeys
  ) => {
    if ("caption" in item) {
      // Đây là PostList
      switch (key) {
        case "otherList.id":
          return item._id;
        case "otherList.title":
          return item.caption;
        case "otherList.createdAt":
          return new Date(item.createAt).toLocaleDateString();
        default:
          return "";
      }
    } else {
      // Đây là FriendList
      switch (key) {
        case "otherList.id":
          return item._id;
        case "otherList.userName":
          return item.firstName + " " + item.lastName;
        default:
          return "";
      }
    }
  };

  const sortedData = [...otherList].sort((a, b) => {
    const aValue = getValueByKey(a, sortConfig.key) ?? "";
    const bValue = getValueByKey(b, sortConfig.key) ?? "";

    let aParsedValue: number | string | Date = aValue;
    let bParsedValue: number | string | Date = bValue;

    // Kiểm tra nếu key là "otherList.id" và giá trị là string, chuyển nó thành số
    if (
      sortConfig.key === "otherList.id" &&
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

  const requestSort = (key: SortablePostKeys | SortableFriendsKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const isPostList = otherList.length > 0 && "title" in otherList[0];
  const titleDetails = isPostList ? titlePostDetail : titleFriendList;

  return (
    <Table key="" className="h-fit">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {titleDetails.map((item, index) => (
            <TableHead
              className={`w-fit ${
                item.title === "Status" ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <div
                className={`${
                  index === 0 || index === titleDetails.length - 1
                    ? "justify-start"
                    : "justify-center"
                } flex flex-row items-center gap-1 w-full h-fit`}
                onClick={
                  item.key
                    ? () => requestSort(item.key as SortablePostKeys)
                    : undefined
                }
              >
                <p className="text-dark100_light900 paragraph-semibold">
                  {item.title}
                </p>
                <Icon
                  icon="basil:sort-outline"
                  width={24}
                  height={24}
                  className="text-dark100_light900"
                />
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((item, index) => (
          <TableRow
            key={item._id}
            className="cursor-default hover:bg-transparent"
          >
            <TableCell className="text-left">
              <div
                className={`justify-start w-full flex flex-row items-center  gap-1 h-fit`}
              >
                <p className="text-dark100_light900 paragraph-regular">
                  {item._id}
                </p>
              </div>
            </TableCell>
            <TableCell className="text-left">
              <div
                className={`justify-center w-full flex flex-row items-center  gap-1 h-fit`}
              >
                <p className="text-dark100_light900 paragraph-regular">
                  {"caption" in item
                    ? item.caption
                    : item.firstName + " " + item.lastName}
                </p>
              </div>
            </TableCell>
            <TableCell className="text-left">
              <div
                className={`justify-center w-full flex flex-row items-center  gap-1 h-fit`}
              >
                <p className="text-dark100_light900 paragraph-regular">
                  {new Date(item.createAt).toLocaleString()}
                </p>
              </div>
            </TableCell>
            <TableCell className="text-left">
              {(() => {
                switch ("caption" in item ? item.flag : item.relation) {
                  case true:
                    return (
                      <div className="flex w-full justify-start">
                        <div className="flex bg-accent-red bg-opacity-20 rounded-lg w-[90px] items-center justify-center h-fit p-1">
                          <p className="text-accent-red paragraph-15-regular">
                            Reported
                          </p>
                        </div>
                      </div>
                    );
                  case "bff":
                    return (
                      <div className="flex w-full justify-start">
                        <div className="flex bg-primary-500 bg-opacity-20 rounded-lg w-[96px] items-center justify-center h-fit p-1">
                          <p className="text-primary-500 paragraph-15-regular">
                            {!("caption" in item) && item.relation}
                          </p>
                        </div>
                      </div>
                    );
                  case "friend":
                    return (
                      <div className="flex w-full justify-start">
                        <div className="flex bg-accent-blue bg-opacity-20 rounded-lg w-[90px] items-center justify-center h-fit p-1">
                          <p className="text-accent-blue paragraph-15-regular">
                            {!("caption" in item) && item.relation}
                          </p>
                        </div>
                      </div>
                    );
                  default:
                    return null;
                }
              })()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableOtherList;
