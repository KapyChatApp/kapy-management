"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PaginationProps, TableProps } from "@/types";
import { CheckedMessagesReponse, CheckedPostReponse } from "@/lib/DTO/censor";
import { usePaginationTable } from "@/hooks/use-table";
import TableConsoredMessage from "./TableCensoredMessage";
import PaginationDisplay from "../shared/PaginationDisplay";
import { requestCensor } from "@/lib/censor.service";
import TableConsoredPost from "./TableCensoredPost";

const ModalLayout = ({
  setSelectedValue,
  selectedValue
}: {
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: string;
}) => {
  const [messages, setMessages] = useState<CheckedMessagesReponse[] | null>(
    null
  );
  const [posts, setPosts] = useState<CheckedPostReponse[] | null>(null);
  useEffect(() => {
    const checkedData = async () => {
      try {
        const result = await requestCensor(selectedValue);
        if (result) {
          result.sort(
            (a: any, b: any) =>
              new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
          );
          selectedValue === "message" ? setMessages(result) : setPosts(result);
        }
      } catch (err: any) {
        console.error("Error consoring:", err);
        const errorMessage = err?.message || "An unexpected error occurred.";
        alert(`Error corsoring: ${errorMessage}`);
      }
    };
    checkedData();
  }, []);
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages,
    dataLength,
    handlePaginationData
  } = usePaginationTable(8);

  const [inputValue, setInputValue] = useState("");
  const paginationUI: PaginationProps = {
    currentPage,
    setCurrentPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages,
    dataLength
  };

  const table: TableProps = {
    indexOfLastItem,
    indexOfFirstItem,
    itemsPerPage,
    inputValue
  };

  const handleBack = () => {
    setSelectedValue("");
  };

  console.log("messages: ", messages);
  console.log("post: ", posts);

  return (
    <div className="modal-overlay-post">
      {/* Close Button */}
      <div className="absolute top-4 right-4">
        <Button
          className="flex bg-transparent shadow-none p-2 border-none hover:bg-transparent h-10 w-10"
          onClick={handleBack}
        >
          <Icon
            icon="mingcute:close-fill"
            width={40}
            height={40}
            className="text-light-700"
          />
        </Button>
      </div>

      <div className="w-full max-w-[1054px] h-[683px] rounded-lg background-light900_dark200 flex items-center justify-center p-4">
        {(selectedValue === "message" && messages) ||
        (selectedValue === "post" && posts) ? (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row items-start gap-2">
              <span className="text-dark100_light900 text-[20px] font-semibold">
                Censored:
              </span>
              <span className="text-dark100_light900 text-[20px] font-regular">
                {selectedValue === "message" ? messages!.length : posts!.length}{" "}
                {selectedValue}s
              </span>
            </div>
            <div className="flex flex-col background-light900_dark200 rounded-[12px] p-4 h-[520px] items-center justify-between">
              {selectedValue === "message" ? (
                <TableConsoredMessage
                  table={table}
                  onPaginationData={handlePaginationData}
                  list={messages!}
                />
              ) : (
                <TableConsoredPost
                  table={table}
                  onPaginationData={handlePaginationData}
                  list={posts!}
                />
              )}
              <PaginationDisplay page={paginationUI} />
            </div>
          </div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
    </div>
  );
};

export default ModalLayout;
