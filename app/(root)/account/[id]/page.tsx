"use client";
import FriendList from "@/components/account/FriendList";
import General from "@/components/account/General";
import PostDetail from "@/components/account/PostDetail";
import ConfirmModal from "@/components/shared/ConfirmModal";
import Confirm, {
  ConfirmModalProps
} from "@/components/shared/sidebar/Confirm";
import { Button } from "@/components/ui/button";
import { accountDataList } from "@/constants/accounts";
import { fetchAllUsers, getUserProfile } from "@/lib/account.service";
import { UserResponseDTO } from "@/lib/DTO/user";
import { AccountData } from "@/types/accounts";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const defaultUserResponseDTO: UserResponseDTO = {
  _id: "",
  firstName: "",
  lastName: "",
  nickName: "",
  phoneNumber: "",
  email: "",
  role: [],
  avatar: "",
  background: "",
  gender: true,
  address: "",
  job: "",
  hobbies: "",
  bio: "",
  point: 0,
  relationShip: "",
  birthDay: "",
  flag: false,
  attendDate: "",
  friendIds: [],
  bestFriendIds: [],
  blockedIds: [],
  postIds: [],
  rateIds: [],
  createAt: "",
  createBy: ""
};

const page = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  // EditableParagraph
  const [detail, setDetail] = useState<UserResponseDTO>(defaultUserResponseDTO);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserProfile(id);
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

  if (!detail) {
    return <p>Account not found</p>;
  }

  //MODAL CONFIRM
  const router = useRouter();
  const handleEditButton = () => {
    router.push(`/account/edit/${detail._id}`);
  };
  const handleDeactive = () => {
    setDetail((prev) => {
      if (prev) {
        return {
          ...prev,
          flag: false
        };
      }
      return prev;
    });
  };
  const handleReactive = () => {
    setDetail((prev) => {
      if (prev) {
        return {
          ...prev,
          flag: true
        };
      }
      return prev;
    });
  };

  //Modal Confirm
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmModalProps>({
    setConfirm: () => {},
    handleAction: () => {},
    name: "",
    action: ""
  });
  const handleConfirmDeactivate = () => {
    setIsConfirm(true);
    setConfirm({
      setConfirm: setIsConfirm,
      handleAction: () => handleDeactive(),
      name: " this account",
      action: "deactive"
    });
  };
  const handleConfirmReactivate = () => {
    setIsConfirm(true);
    setConfirm({
      setConfirm: setIsConfirm,
      handleAction: () => handleReactive(),
      name: " this account",
      action: "reactive"
    });
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
            <General account={detail} />

            <PostDetail account={detail} />

            <FriendList account={detail} />
          </div>
          <div className="flex flex-row items-center justify-center gap-8 pt-10">
            <Button
              className="shadow-md flex flex-row border-light-500 items-center justify-center  hover:border-light-500 bg-transparent hover:bg-transparent  border rounded-lg"
              onClick={handleEditButton}
            >
              <p className="text-dark100_light900 paragraph-regular">Edit</p>
            </Button>

            <Button className="shadow-md flex flex-row items-center justify-center  bg-accent-red hover:bg-accent-red border-none rounded-lg">
              <p
                className="text-light-900 paragraph-regular"
                onClick={
                  detail.flag
                    ? handleConfirmDeactivate
                    : handleConfirmReactivate
                }
              >
                {detail.flag ? "Deactivate" : "Reactivate"}
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
