"use client";
import GeneralReport from "@/components/report/GeneralReport";
import ReportDetail from "@/components/report/ReportDetail";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { Button } from "@/components/ui/button";
import { reportDataList } from "@/constants/reports";
import { ReportData } from "@/types/reports";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const { id } = useParams();
  const report = reportDataList.filter((item) => item.report.id === id);
  // EditableParagraph
  const [detail, setDetail] = useState<ReportData | null>(
    report.length > 0 ? report[0] : null
  );
  const handleSave = (newName: any) => {
    setDetail((prev) => {
      if (prev) {
        return { ...prev, name: newName };
      }
      return prev;
    });
  };
  if (!detail) {
    return <p>Report not found</p>;
  }

  //MODAL CONFIRM
  const [confirm, setConfirm] = useState(false);
  const [action, setAction] = useState("");
  const handleResolve = () => {
    setConfirm(!confirm);
    setAction("resolve");
  };
  const handleReject = () => {
    setConfirm(!confirm);
    setAction("reject");
  };
  const actionConfirm = action === "resolve" ? "resolve" : "reject";
  const confirmModal = {
    setConfirm,
    name: "this report",
    action: actionConfirm
  };
  return (
    <>
      <div className="flex flex-col items-start justify-center w-full h-fit gap-6 ">
        <Link
          href="/report"
          className="flex flex-row gap-3 w-fit h-[28px] cursor-pointer items-center"
        >
          <Icon
            icon="weui:back-filled"
            width={12}
            height={24}
            className="text-dark100_light900"
          />
          <p className="text-dark100_light900 h3-semibold">Back</p>
        </Link>

        <div className="flex flex-col justify-between items-start w-full h-fit gap-7 rounded-[12px] background-light900_dark200 p-4">
          <div className=" h-full overflow-scroll scrollable flex flex-col items-start justify-center w-full gap-7">
            <GeneralReport report={report} handleSave={handleSave} />

            <ReportDetail report={report} handleSave={handleSave} />
          </div>
          <div className="flex flex-row items-center justify-center gap-8 pt-10">
            <Button
              className="shadow-md flex flex-row border-light-500 items-center justify-center  hover:border-light-500 bg-transparent hover:bg-transparent  border rounded-lg"
              onClick={handleResolve}
            >
              <p className="text-dark100_light900 paragraph-regular">Resolve</p>
            </Button>

            <Button className="shadow-md flex flex-row items-center justify-center  bg-accent-red hover:bg-accent-red border-none rounded-lg">
              <p
                className="text-light-900 paragraph-regular"
                onClick={handleReject}
              >
                Reject
              </p>
            </Button>
          </div>
        </div>
      </div>

      {confirm && <ConfirmModal confirm={confirmModal} />}
    </>
  );
};

export default page;
