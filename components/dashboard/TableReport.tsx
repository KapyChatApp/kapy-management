"use client";
import React, { useState } from "react";
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
import ConfirmModal from "../shared/ConfirmModal";
import { ReportResponseDTO } from "@/lib/DTO/report";
import { removeReport } from "@/lib/report.service";
import Confirm, { ConfirmModalProps } from "../shared/sidebar/Confirm";

//Post Message Comment User
interface props {
  reports: ReportResponseDTO[];
  setReports: React.Dispatch<React.SetStateAction<ReportResponseDTO[]>>;
}

const TableReport = ({ reports, setReports }: props) => {
  const dataDisplayed = reports.slice(0, 3);

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
        setReports((item) => item.filter((report) => report._id != reportId));
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
      <Table key="" className="h-[250px]">
        <TableHeader>
          <TableRow key="header-table-teacher" className="hover:bg-transparent">
            <TableHead className="w-fit text-left cursor-pointer">
              <p className="text-dark100_light900 paragraph-regular">ID</p>
            </TableHead>
            <TableHead className="text-left">
              <p className="text-dark100_light900 paragraph-regular">
                Created At
              </p>
            </TableHead>
            <TableHead className="text-left ">
              <p className="text-dark100_light900 paragraph-regular">
                Account Name
              </p>
            </TableHead>
            <TableHead className="text-left">
              <p className="text-dark100_light900 paragraph-regular">
                Title Report
              </p>
            </TableHead>
            <TableHead className="text-left">
              <p className="text-dark100_light900 paragraph-regular">
                Targeted Item
              </p>
            </TableHead>
            <TableHead className="text-left">
              <p className="text-dark100_light900 paragraph-regular">Status</p>
            </TableHead>
            <TableHead className="text-left ">
              <p className="text-dark100_light900 paragraph-regular">Action</p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataDisplayed.map((item) => (
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
