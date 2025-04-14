"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PaginationProps, TableProps } from "@/types";
import { CheckedMessages } from "@/lib/DTO/censor";
import { usePaginationTable } from "@/hooks/use-table";
import TableConsoredMessage from "./TableCensoredMessage";
import PaginationDisplay from "../shared/PaginationDisplay";
import { requestCensorMessage } from "@/lib/censor.service";

const ConsoredMessageModal = ({
  setSelectedValue,
  selectedValue
}: {
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: string;
}) => {
  const [messages, setMessages] = useState<CheckedMessages[] | null>(null);
  const [posts, setPosts] = useState<CheckedMessages[] | null>(null);
  useEffect(() => {
    const checkedData = async () => {
      try {
        const result: CheckedMessages[] = await requestCensorMessage();
        if (result) {
          result.sort(
            (a, b) =>
              new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
          );
          setMessages(result);
        }
      } catch (err: any) {
        console.error("Error consoring message:", err);
        const errorMessage = err?.message || "An unexpected error occurred.";
        alert(`Error fetching data: ${errorMessage}`);
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
        {!messages ? (
          <div className="loader"></div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row items-start gap-2">
              <span className="text-dark100_light900 text-[20px] font-semibold">
                Censored:
              </span>
              <span className="text-dark100_light900 text-[20px] font-regular">
                {messages.length} messages
              </span>
            </div>
            <div className="flex flex-col background-light900_dark200 rounded-[12px] p-4 h-[520px] items-center justify-between">
              <TableConsoredMessage
                table={table}
                onPaginationData={handlePaginationData}
                list={messages}
              />

              <PaginationDisplay page={paginationUI} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsoredMessageModal;
