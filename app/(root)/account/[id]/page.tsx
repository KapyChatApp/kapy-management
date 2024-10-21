"use client";
import FriendList from "@/components/account/FriendList";
import General from "@/components/account/General";
import PostDetail from "@/components/account/PostDetail";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { Button } from "@/components/ui/button";
import { accountDataList } from "@/constants/accounts";
import { AccountData } from "@/types/accounts";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const { id } = useParams();
  const account = accountDataList.filter((item) => item.account.userId === id);
  // EditableParagraph
  const [detail, setDetail] = useState<AccountData | null>(
    account.length > 0 ? account[0] : null
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
    return <p>Account not found</p>;
  }

  //MODAL CONFIRM
  const [confirm, setConfirm] = useState(false);
  const [action, setAction] = useState("");
  const handleSaveButton = () => {
    setConfirm(!confirm);
    setAction("save");
  };
  const handleDeactivate = () => {
    setConfirm(!confirm);
    setAction("deactivate");
  };
  const handleReactivate = () => {
    setConfirm(!confirm);
    setAction("reactivate");
  };
  const actionConfirm =
    action === "save"
      ? "save"
      : action === "deactivate"
      ? "deactivate"
      : "reactivate";
  const nameConfirm = action === "save" ? "your changes" : "this account";
  const confirmModal = {
    setConfirm,
    name: nameConfirm,
    action: actionConfirm
  };
  return (
    <>
      <div className="flex flex-col items-start justify-center w-full h-fit gap-6 ">
        <Link
          href="/account"
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
            <General account={account} handleSave={handleSave} />

            <PostDetail account={account} handleSave={handleSave} />

            <FriendList account={account} handleSave={handleSave} />
          </div>
          <div className="flex flex-row items-center justify-center gap-8 pt-10">
            <Button
              className="shadow-md flex flex-row border-light-500 items-center justify-center  hover:border-light-500 bg-transparent hover:bg-transparent  border rounded-lg"
              onClick={handleSaveButton}
            >
              <p className="text-dark100_light900 paragraph-regular">Save</p>
            </Button>

            <Button className="shadow-md flex flex-row items-center justify-center  bg-accent-red hover:bg-accent-red border-none rounded-lg">
              <p
                className="text-light-900 paragraph-regular"
                onClick={
                  account[0].account.status
                    ? handleDeactivate
                    : handleReactivate
                }
              >
                {account[0].account.status ? "Deactivate" : "Reactivate"}
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
