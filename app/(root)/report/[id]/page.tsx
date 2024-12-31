"use client";
import GeneralReport from "@/components/report/GeneralReport";
import ReportDetail from "@/components/report/ReportDetail";
import ConfirmModal from "@/components/shared/ConfirmModal";
import Confirm, {
  ConfirmModalProps
} from "@/components/shared/sidebar/Confirm";
import { Button } from "@/components/ui/button";
import { reportDataList } from "@/constants/reports";
import { toast } from "@/hooks/use-toast";
import { ReportResponseDTO, VerifyReportDTO } from "@/lib/DTO/report";
import { getDetailReport, verifyReport } from "@/lib/report.service";
import { ReportData } from "@/types/reports";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [detail, setDetail] = useState<ReportResponseDTO>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDetailReport(id);
        if (result) {
          setDetail(result);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        const errorMessage = err?.message || "An unexpected error occurred.";
        alert(`Error fetching data: ${errorMessage}`);
      }
    };
    fetchData();
  }, []);

  const [isStatus, setIsStatus] = useState(detail?.status || "");
  const handleResolve = async () => {
    try {
      if (detail) {
        const param: VerifyReportDTO = {
          status: "solved"
        };
        await verifyReport(param, detail._id);
        setIsStatus("solved");
        toast({
          title: "Success",
          description: "Target of report has been displayed successfully!",
          className:
            "border-none rounded-lg bg-primary-200 text-primary-500 paragraph-regular items-center justify-center "
        });
      }
    } catch (err: any) {
      console.error("Error displayed:", err);
      const errorMessage = err?.message || "An unexpected error occurred.";
      alert(`Error fetching data: ${errorMessage}`);
    }
  };

  //MODAL CONFIRM
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmModalProps>({
    setConfirm: () => {},
    handleAction: () => {},
    name: "",
    action: ""
  });
  const handleConfirmResolved = () => {
    setIsConfirm(true);
    setConfirm({
      setConfirm: setIsConfirm,
      handleAction: handleResolve,
      name: "this report",
      action: "solve"
    });
  };
  if (!detail) {
    return <p>Report not found</p>;
  }
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
            <GeneralReport report={detail} />

            <ReportDetail report={detail} />
          </div>
          <div className="flex flex-row items-center justify-center gap-8 pt-10">
            <Button
              className="shadow-md flex flex-row border-light-500 items-center justify-center  hover:border-light-500 bg-transparent hover:bg-transparent  border rounded-lg"
              onClick={handleConfirmResolved}
              disabled={isStatus === "solved" || detail.status === "solved"}
            >
              <p className="text-dark100_light900 paragraph-regular">Resolve</p>
            </Button>

            {/* <Button className="shadow-md flex flex-row items-center justify-center  bg-accent-red hover:bg-accent-red border-none rounded-lg">
              <p
                className="text-light-900 paragraph-regular"
                onClick={handleReject}
              >
                Reject
              </p>
            </Button> */}
          </div>
        </div>
      </div>

      {isConfirm && <Confirm confirm={confirm} />}
    </>
  );
};

export default page;
