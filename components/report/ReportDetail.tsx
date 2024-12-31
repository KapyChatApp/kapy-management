"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { formatTime } from "@/lib/utils";
import { ReportResponseDTO, VerifyReportDTO } from "@/lib/DTO/report";
import ReactPlayer from "react-player";
import { FileSegment } from "../message/FileSegment";
import { FileContent } from "@/lib/DTO/message";
import { Button } from "../ui/button";
import { displayMessageById, hiddenMessageById } from "@/lib/message.service";
import { toast } from "@/hooks/use-toast";
import { deactiveUser, reactiveUser } from "@/lib/account.service";
import {
  displayComment,
  displayPost,
  hiddenComment,
  hiddenPost,
  verifyReport
} from "@/lib/report.service";
import Confirm, { ConfirmModalProps } from "../shared/sidebar/Confirm";
export interface ReportDetailProps {
  report: ReportResponseDTO;
}
const ReportDetail = ({ report }: ReportDetailProps) => {
  const [isDisplay, setIsDisplay] = useState(report.target.flag);

  //Render Content
  const reportMessage = "text" in report.target ? report.target : null;
  const contentTypeReportMessage = reportMessage
    ? reportMessage.contentId.length
      ? reportMessage.contentId[reportMessage.contentId.length - 1].type
      : ""
    : "";
  const contentMessage = reportMessage
    ? reportMessage.contentId.length
      ? reportMessage.contentId[reportMessage.contentId.length - 1]
      : reportMessage.text[reportMessage.text.length - 1]
    : null;
  console.log(typeof contentMessage);
  const renderMessageReport = (
    contentMessage: string | FileContent | null,
    contentTypeReportMessage: string
  ) => {
    if (contentMessage === null) return null;
    if (typeof contentMessage === "object") {
      switch (contentTypeReportMessage) {
        case "Image":
          return (
            <div className="flex flex-col gap-6 items-start justify-start w-full">
              <Link
                href={`/message/${contentMessage?._id || ""}`}
                className="text-accent-blue underline paragraph-regular"
              >
                <p className="text-dark100_light900 paragraph-regular">
                  Title: {contentMessage?.fileName || ""}
                </p>
              </Link>

              <Image
                src={contentMessage?.url || ""}
                alt={contentMessage?.fileName || ""}
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
          );
        case "Audio":
          return (
            <div className="flex flex-col gap-6 items-start justify-start w-full">
              <Link
                href={`/message/${contentMessage?._id || ""}`}
                className="text-accent-blue underline paragraph-regular"
              >
                <p className="text-dark100_light900 paragraph-regular">
                  Title: {contentMessage?.fileName || ""}
                </p>
              </Link>
              <audio
                controls
                className="md:w-[250px] h-[54px] w-[200px] md:text-[14px] text-[12px]"
              >
                <source src={contentMessage?.url || ""} type="audio/ogg" />
              </audio>
            </div>
          );

        case "Video":
          return (
            <div className="flex flex-col gap-6 items-start justify-start w-full">
              <Link
                href={`/message/${contentMessage?._id || ""}`}
                className="text-accent-blue underline paragraph-regular"
              >
                <p className="text-dark100_light900 paragraph-regular">
                  Title: {contentMessage?.fileName || ""}
                </p>
              </Link>
              <ReactPlayer
                url={contentMessage?.url || ""}
                controls
                width="200px"
                height="200px"
                className="max-w-full h-auto"
              />
            </div>
          );
        case "Other":
          return (
            <div className="flex flex-col gap-6 items-start justify-start w-full">
              <Link
                href={`/message/${contentMessage?._id || ""}`}
                className="text-accent-blue underline paragraph-regular"
              >
                <p className="text-dark100_light900 paragraph-regular">
                  Title: {contentMessage?.fileName || ""}
                </p>
              </Link>
              <FileSegment
                fileName={contentMessage?.fileName || ""}
                url={contentMessage?.url || ""}
              />
            </div>
          );
        default:
          return null;
      }
    } else if (typeof contentMessage === "string") {
      return (
        <div className="flex flex-col gap-6 items-start justify-start w-full">
          <p className="text-dark100_light900 paragraph-regular">
            {contentMessage}
          </p>
        </div>
      );
    }
  };

  const handleHidden = async () => {
    try {
      switch (report.targetType) {
        case "Message":
          await hiddenMessageById(report.target._id);
          break;
        case "User":
          await deactiveUser(report.target._id);
          break;
        case "Post":
          await hiddenPost(report.target._id);
          break;
        case "Comment":
          await hiddenComment(report.target._id);
          break;
      }
      setIsDisplay(false);
      toast({
        title: "Success",
        description: "Target of report has been hidden successfully!",
        className:
          "border-none rounded-lg bg-primary-200 text-primary-500 paragraph-regular items-center justify-center "
      });
    } catch (err: any) {
      console.error("Error deactive:", err);
      const errorMessage = err?.message || "An unexpected error occurred.";
      alert(`Error fetching data: ${errorMessage}`);
    }
  };

  const handleDisplay = async () => {
    try {
      switch (report.targetType) {
        case "Message":
          await displayMessageById(report.target._id);
          break;
        case "User":
          await reactiveUser(report.target._id);
          break;
        case "Post":
          await displayPost(report.target._id);
          break;
        case "Comment":
          await displayComment(report.target._id);
          break;
      }
      setIsDisplay(true);
      toast({
        title: "Success",
        description: "Target of report has been displayed successfully!",
        className:
          "border-none rounded-lg bg-primary-200 text-primary-500 paragraph-regular items-center justify-center "
      });
    } catch (err: any) {
      console.error("Error displayed:", err);
      const errorMessage = err?.message || "An unexpected error occurred.";
      alert(`Error fetching data: ${errorMessage}`);
    }
  };

  //MODEL CONFIRM
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmModalProps>({
    setConfirm: () => {},
    handleAction: () => {},
    name: "",
    action: ""
  });
  const handleConfirmHidden = () => {
    setIsConfirm(true);
    setConfirm({
      setConfirm: setIsConfirm,
      handleAction: handleHidden,
      name: report.targetType.toLowerCase(),
      action: "hidden"
    });
  };
  const handleConfirmDisplay = () => {
    setIsConfirm(true);
    setConfirm({
      setConfirm: setIsConfirm,
      handleAction: handleDisplay,
      name: report.targetType.toLowerCase(),
      action: "display"
    });
  };

  return (
    <>
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
              {formatTime(new Date(report.createAt))}
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
            {report.content}
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
                  {report.targetType === "Message"
                    ? "Message"
                    : report.targetType === "Comment"
                    ? "Comment"
                    : report.targetType === "Post"
                    ? "Post"
                    : report.targetType === "User"
                    ? "User"
                    : "Other"}
                </p>
              </div>
            </div>
            {isDisplay ? (
              <Button
                className="shadow-md flex flex-row items-center justify-center  bg-accent-red hover:bg-accent-red border-none rounded-lg"
                onClick={handleConfirmHidden}
              >
                <p className="text-light-900 paragraph-regular">Hidden</p>
              </Button>
            ) : (
              <Button
                className="shadow-md flex flex-row border-light-500 items-center justify-center  hover:border-light-500 bg-transparent hover:bg-transparent  border rounded-lg"
                onClick={handleConfirmDisplay}
              >
                <p className="text-dark100_light900 paragraph-regular">
                  Display
                </p>
              </Button>
            )}
          </div>

          <div className="flex border-[0.5px] border-light-500 rounded-xl w-full h-[300px] p-4 overflow-scroll scrollable">
            {(() => {
              switch (report.targetType) {
                case "Message":
                  return renderMessageReport(
                    contentMessage,
                    contentTypeReportMessage
                  );
                case "Comment":
                  const comment =
                    "repliedIds" in report.target ? report.target : null;
                  return (
                    <div className="flex flex-col gap-6 items-start justify-start w-full">
                      <p className="text-dark100_light900 paragraph-regular ">
                        Title: {comment?.caption}
                      </p>
                    </div>
                  );
                case "User":
                  const user =
                    "firstName" in report.target ? report.target : null;
                  return (
                    <div className="flex items-start justify-start w-full">
                      <Link
                        href={`/account/${user?._id || ""}`}
                        className="text-dark100_light900 paragraph-regular"
                      >
                        {user?.firstName + " " + user?.lastName || ""}
                      </Link>
                    </div>
                  );
                case "Post":
                  const post = "shares" in report.target ? report.target : null;
                  return (
                    <div className="flex flex-col gap-6 items-start justify-start w-full">
                      <p className="text-dark100_light900 paragraph-regular ">
                        Title: {post?.caption || ""}
                      </p>
                    </div>
                  );
                default:
                  return (
                    <div className="flex max-w-[250px]">
                      <p className="text-dark100_light900 paragraph-regular overflow-hidden whitespace-nowrap text-ellipsis">
                        {report.content}
                      </p>
                    </div>
                  );
              }
            })()}
          </div>
        </div>
      </div>
      {isConfirm && <Confirm confirm={confirm} />}
    </>
  );
};

export default ReportDetail;
