"use client";
import ContentDetail from "@/components/message/ContentDetail";
import GeneralDetail from "@/components/message/GeneralDetail";
import ConfirmModal from "@/components/shared/ConfirmModal";
import Confirm, {
  ConfirmModalProps
} from "@/components/shared/sidebar/Confirm";
import { Button } from "@/components/ui/button";
import { useMessageContext } from "@/context/DataContext";
import { toast } from "@/hooks/use-toast";
import { ResponseMessageDTO } from "@/lib/DTO/message";
import {
  displayMessageById,
  getDetailMessage,
  hiddenMessageById,
  removeMessageById,
  updateMessageContent
} from "@/lib/message.service";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [detail, setDetail] = useState<ResponseMessageDTO>();
  const [isFlag, setIsFlag] = useState(false);
  const [action, setAction] = useState("hidden");
  const [newMess, setNewMess] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const message = await getDetailMessage(id);
        if (message) {
          setDetail(message);
          setIsFlag(message.flag);
          if (message.flag) setAction("hidden");
          else setAction("display");
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        const errorMessage = err?.message || "An unexpected error occurred.";
        alert(`Error fetching data: ${errorMessage}`);
      }
    };
    fetchData();
  }, []);
  const handleHidden = async () => {
    try {
      await hiddenMessageById(id);
      setIsFlag(false);
      setAction("display");
      toast({
        title: "Success",
        description: "Account has been hidden successfully!",
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
      await displayMessageById(id);
      setIsFlag(true);
      setAction("hidden");
      toast({
        title: "Success",
        description: "Account has been displayed successfully!",
        className:
          "border-none rounded-lg bg-primary-200 text-primary-500 paragraph-regular items-center justify-center "
      });
    } catch (err: any) {
      console.error("Error deactive:", err);
      const errorMessage = err?.message || "An unexpected error occurred.";
      alert(`Error fetching data: ${errorMessage}`);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMess(e.target.value);
  };

  const handleSaveButton = async () => {
    try {
      const result = await updateMessageContent(id, newMess);
      if (result && detail) {
        const updatedText = [...detail.text, newMess];

        setDetail({
          ...detail,
          text: updatedText
        });
        toast({
          title: "Success",
          description: "Account has been hidden successfully!",
          className:
            "border-none rounded-lg bg-primary-200 text-primary-500 paragraph-regular items-center justify-center "
        });
      } else {
        toast({
          title: "Error updated",
          className:
            "border-none rounded-lg bg-accent-red text-light-900 paragraph-regular items-center justify-center"
        });
      }
    } catch (err: any) {
      console.error("Error deactive:", err);
      const errorMessage = err?.message || "An unexpected error occurred.";
      alert(`Error fetching data: ${errorMessage}`);
    }
  };
  //Modal Confirm
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
      handleAction: () => handleHidden(),
      name: " this message",
      action: "hidden"
    });
  };
  const handleConfirmDisplay = () => {
    setIsConfirm(true);
    setConfirm({
      setConfirm: setIsConfirm,
      handleAction: () => handleDisplay(),
      name: " this message",
      action: "display"
    });
  };
  const handleConfirmSave = () => {
    setIsConfirm(true);
    setConfirm({
      setConfirm: setIsConfirm,
      handleAction: () => handleSaveButton(),
      name: "content of this message",
      action: "save"
    });
  };
  if (!detail) {
    return <p>Message not found</p>;
  }
  return (
    <>
      <div className="flex flex-col items-start justify-center w-full h-fit gap-6 ">
        <Link
          href="/message"
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
            <GeneralDetail message={detail} isFlag={isFlag} />

            <ContentDetail message={detail} onChange={handleChange} />
          </div>
          <div className="flex flex-row items-center justify-center gap-8 pt-10">
            {detail.text.length > 0 && !detail.contentId.length && (
              <Button
                className="shadow-md flex flex-row border-light-500 items-center justify-center  hover:border-light-500 bg-transparent hover:bg-transparent  border rounded-lg"
                onClick={handleConfirmSave}
                disabled={!newMess}
              >
                <p className="text-dark100_light900 paragraph-regular">Save</p>
              </Button>
            )}

            <Button className="shadow-md flex flex-row items-center justify-center  bg-accent-red hover:bg-accent-red border-none rounded-lg">
              <p
                className="text-light-900 paragraph-regular"
                onClick={
                  action === "hidden"
                    ? handleConfirmHidden
                    : handleConfirmDisplay
                }
              >
                {action === "hidden" ? "Hidden" : "Display"}
              </p>
            </Button>
          </div>
        </div>
      </div>

      {isConfirm && <Confirm confirm={confirm} />}
    </>
  );
};

export default page;
