import { titleReportedPerson, titleReporter } from "@/constants/reports";
import { ReportResponseDTO } from "@/lib/DTO/report";
import { Icon } from "@iconify/react/dist/iconify.js";
import { report } from "process";
import React from "react";
export interface ReportDetailProps {
  report: ReportResponseDTO;
}

const GeneralReport = ({ report }: ReportDetailProps) => {
  return (
    <div className="flex flex-col items-start justify-center w-full gap-4">
      <div className="flex flex-row w-full h-fit gap-[10px] items-end justify-start">
        <Icon
          icon="hugeicons:user-account"
          width={18}
          height={20}
          className="text-primary-500"
        />
        <p className="text-primary-500 paragraph-bold">General Information</p>
      </div>
      <div className="flex w-full h-[1px] bg-light-500"></div>
      <div className="flex flex-row items-center justify-start gap-96 w-full h-fit">
        <div className="flex flex-col gap-4 w-fit h-fit">
          {titleReporter.map((item) => {
            const text =
              item.title === "Reporter ID:"
                ? report.userId._id
                : item.title === "Reporter Name:"
                ? report.userId.firstName + " " + report.userId.lastName
                : report.userId.flag
                ? "Active"
                : "Inactive";
            return (
              <div className="flex flex-row gap-2 w-fit h-fit">
                <p className="text-dark100_light900 paragraph-15-regular">
                  {item.title}
                </p>
                <p className="text-dark100_light900 paragraph-15-semibold">
                  {text}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4 w-fit h-fit">
          {titleReportedPerson.map((item) => {
            const text =
              item.title === "Reported ID:"
                ? report.target._id
                : item.title === "Reported Person:"
                ? "firstName" in report.target
                  ? report.target.firstName + " " + report.target.lastName
                  : ""
                : "firstName" in report.target
                ? report.target.flag
                  ? "Active"
                  : "Inactive"
                : "";
            return (
              <div className="flex flex-row gap-2 w-fit h-fit">
                <p className="text-dark100_light900 paragraph-15-regular">
                  {item.title}
                </p>
                <p className="text-dark100_light900 paragraph-15-semibold">
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GeneralReport;
