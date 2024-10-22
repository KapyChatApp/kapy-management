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
import { reportDataList } from "@/constants/reports";
import Link from "next/link";
import ConfirmModal from "../shared/ConfirmModal";

const TableReport = () => {
  const dataDisplayed = reportDataList
    .sort(
      (a, b) =>
        new Date(b.report.createdAt).getTime() -
        new Date(a.report.createdAt).getTime()
    )
    .slice(0, 3);

  //Modal Confirm
  const [confirm, setConfirm] = useState(false);
  const handleRemove = () => {
    setConfirm(!confirm);
  };
  const confirmModal = {
    setConfirm,
    name: "this report",
    action: "remove"
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
              key={item.report.id}
              className="cursor-default hover:bg-transparent"
            >
              <TableCell className="text-left">
                <p className="text-dark100_light900 paragraph-regular">
                  {item.report.id}
                </p>
              </TableCell>
              <TableCell className="text-left">
                <p className="text-dark100_light900 paragraph-regular">
                  {item.report.createdAt.toLocaleDateString()}
                </p>
              </TableCell>
              <TableCell className="text-left">
                <p className="text-dark100_light900 paragraph-regular">
                  {item.report.reporterInfo.name}
                </p>
              </TableCell>
              <TableCell className="text-left">
                <p className="text-dark100_light900 paragraph-regular">
                  {item.report.title}
                </p>
              </TableCell>
              <TableCell className="text-left ">
                {(() => {
                  switch (item.report.targetedItem.type) {
                    case "user":
                      return (
                        <div className="bg-status-user bg-opacity-20 rounded-lg  w-[66px] items-center justify-center flex h-fit p-1">
                          <p className="text-status-user paragraph-15-regular">
                            User
                          </p>
                        </div>
                      );
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
                {(() => {
                  switch (item.report.status) {
                    case "resolved":
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
