"use client";
import { ReportDetailProps } from "@/types/reports";
import Image from "next/image";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { formatTime } from "@/lib/utils";
import { AccountDetail } from "@/types/accounts";
import { accountDataList } from "@/constants/accounts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { selectionReportAction } from "@/constants/reports";

const ReportDetail = ({ report, handleSave }: ReportDetailProps) => {
  const foundAccount = accountDataList.find(
    (item) => item.account.userId === report[0].report.reportedInfo.id
  );
  const reportedPersonDetail: AccountDetail | undefined = foundAccount?.account;

  const [filterItem, setFilter] = useState("hidden");

  return (
    <div className="flex flex-col items-start justify-center w-full gap-4">
      <div className="flex flex-row w-full h-fit gap-[10px] items-end justify-start">
        <Icon
          icon="tabler:message-report
"
          width={18}
          height={20}
          className="text-primary-500"
        />
        <p className="text-primary-500 paragraph-bold">Report Detail</p>
      </div>
      <div className="flex w-full h-[1px] bg-light-500"></div>

      {/*Created At */}
      <div className="flex flex-row gap-1 items-center justify-start">
        <Icon
          icon="material-symbols-light:star-outline"
          width={20}
          height={20}
          className="text-dark100_light900"
        />
        <div className="flex flex-row gap-2 items-center justify-start">
          <p className="text-dark100_light900 paragraph-15-light">
            Created At:
          </p>
          <p className="text-dark100_light900 paragraph-15-semibold">
            {formatTime(report[0].report.createdAt)}
          </p>
        </div>
      </div>

      {/*Content */}
      <div className="flex flex-row gap-1 items-center justify-start">
        <Icon
          icon="material-symbols-light:star-outline"
          width={20}
          height={20}
          className="text-dark100_light900"
        />
        <p className="text-dark100_light900 paragraph-15-light">Content:</p>
      </div>
      <div className="flex border-[0.5px] border-light-500 rounded-xl w-full h-[150px] p-4 overflow-scroll scrollable">
        <p className="text-dark100_light900 paragraph-15-regular">
          {report[0].report.content}
        </p>
      </div>

      {/*Targeted item */}
      <div className="flex flex-col gap-4 w-full h-fit">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-1 items-center justify-start">
            <Icon
              icon="material-symbols-light:star-outline"
              width={20}
              height={20}
              className="text-dark100_light900"
            />
            <div className="flex flex-row gap-2 items-center justify-start">
              <p className="text-dark100_light900 paragraph-15-light">
                Targeted item:
              </p>
              <p className="text-dark100_light900 paragraph-15-semibold">
                {report[0].report.targetedItem.type === "link"
                  ? "Link"
                  : report[0].report.targetedItem.type === "file"
                  ? "File"
                  : report[0].report.targetedItem.type === "image"
                  ? "Image"
                  : report[0].report.targetedItem.type === "user"
                  ? "User"
                  : "Text"}
              </p>
            </div>
          </div>

          <Select
            value={filterItem}
            onValueChange={(value) => setFilter(value)}
          >
            <SelectTrigger
              className={`w-fit rounded-lg border-none bg-primary-500 bg-opacity-20 text-primary-500 font-semibold`}
            >
              <SelectValue placeholder={filterItem} />
            </SelectTrigger>
            <SelectContent>
              {selectionReportAction.map((item) => (
                <SelectItem value={item.key}>{item.value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex border-[0.5px] border-light-500 rounded-xl w-full h-[300px] p-4 overflow-scroll scrollable">
          {(() => {
            switch (report[0].report.targetedItem.type) {
              case "image":
                return (
                  <div className="flex flex-col gap-6 items-start justify-start w-full">
                    <p className="text-dark100_light900 paragraph-regular">
                      Title: {report[0].report.targetedItem.altText}
                    </p>
                    <Image
                      src={report[0].report.targetedItem.url}
                      alt={report[0].report.targetedItem.altText}
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                  </div>
                );
              case "link":
                return (
                  <div className="flex flex-col gap-6 items-start justify-start w-full">
                    <p className="text-dark100_light900 paragraph-regular ">
                      Title: {report[0].report.targetedItem.title}
                    </p>
                    <Link
                      href={report[0].report.targetedItem.url}
                      className="text-accent-blue underline paragraph-regular"
                    >
                      {report[0].report.targetedItem.url}
                    </Link>
                  </div>
                );
              case "file":
                return (
                  <div className="flex items-start justify-start w-full">
                    <Link
                      href={report[0].report.targetedItem.fileUrl}
                      className="text-dark100_light900 paragraph-regular"
                    >
                      {report[0].report.targetedItem.fileName}
                    </Link>
                  </div>
                );
              case "user":
                return (
                  <Link
                    href={`/account/${reportedPersonDetail?.userId}`}
                    className="flex flex-row gap-3 justify-start items-center h-fit"
                  >
                    <Image
                      src={
                        reportedPersonDetail
                          ? reportedPersonDetail.ava
                          : "/assets/ava/default.png"
                      }
                      alt=""
                      width={100}
                      height={100}
                      className="rounded"
                    />
                    <p className="text-dark100_light900 paragraph-15-semibold">
                      {reportedPersonDetail?.userName}
                    </p>
                  </Link>
                );
              default:
                return (
                  <div className="flex max-w-[250px]">
                    <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis">
                      {report[0].report.targetedItem.content}
                    </p>
                  </div>
                );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
