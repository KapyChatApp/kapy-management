"use client";
import FriendList from "@/components/account/FriendList";
import GeneralEdit from "@/components/account/GeneralEdit";
import PostDetail from "@/components/account/PostDetail";
import ConfirmModal from "@/components/shared/ConfirmModal";
import Confirm, {
  ConfirmModalProps
} from "@/components/shared/sidebar/Confirm";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  deactiveUser,
  getUserProfile,
  reactiveUser,
  updateInfo
} from "@/lib/account.service";
import { UpdateUserDTO, UserResponseDTO } from "@/lib/DTO/user";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useParams } from "next/navigation";
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

  const handleSave = async () => {
    try {
      const params: UpdateUserDTO = {
        firstName: detail.firstName,
        lastName: detail.lastName,
        nickName: detail.nickName,
        gender: detail.gender,
        address: detail.address,
        job: detail.job,
        hobbies: detail.hobbies,
        bio: detail.bio,
        relationShip: detail.relationShip,
        birthDay: detail.birthDay
      };
      const result = await updateInfo(params, id);
      if (result) {
        setDetail((prev) => {
          if (prev) {
            return {
              ...prev,
              ...detail
            };
          }
          return prev;
        });
        toast({
          title: "Success",
          description: "Account has been updated successfully!",
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
      console.error("Error fetching data:", err);
      const errorMessage = err?.message || "An unexpected error occurred.";
      alert(`Error fetching data: ${errorMessage}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (detail) {
      setDetail({
        ...detail,
        [e.target.name]: e.target.value
      });
    }
  };
  const handleChangeStatus = async (status: string) => {
    if (detail) {
      setDetail({
        ...detail,
        flag: status === "Active" ? true : false
      });
    }
  };

  const handleDeactive = async () => {
    try {
      const result = await deactiveUser(id);
      if (result) {
        setDetail((prev) => {
          if (prev) {
            return {
              ...prev,
              flag: false
            };
          }
          return prev;
        });
        toast({
          title: "Success",
          description: "Account has been deactive successfully!",
          className:
            "border-none rounded-lg bg-primary-200 text-primary-500 paragraph-regular items-center justify-center "
        });
      } else {
        toast({
          title: "Error deactive",
          className:
            "border-none rounded-lg bg-accent-red text-light-900 paragraph-regular items-center justify-center"
        });
      }
    } catch (err: any) {
      console.error("Error fetching data:", err);
      const errorMessage = err?.message || "An unexpected error occurred.";
      alert(`Error fetching data: ${errorMessage}`);
    }
  };

  const handleReactive = async () => {
    try {
      const result = await reactiveUser(id);
      if (result) {
        setDetail((prev) => {
          if (prev) {
            return {
              ...prev,
              flag: true
            };
          }
          return prev;
        });
        toast({
          title: "Success",
          description: "Account has been reactive successfully!",
          className:
            "border-none rounded-lg bg-primary-200 text-primary-500 paragraph-regular items-center justify-center "
        });
      } else {
        toast({
          title: "Error reactive",
          className:
            "border-none rounded-lg bg-accent-red text-light-900 paragraph-regular items-center justify-center"
        });
      }
    } catch (err: any) {
      console.error("Error reactive:", err);
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
  const handleConfirmSave = () => {
    setIsConfirm(true);
    setConfirm({
      setConfirm: setIsConfirm,
      handleAction: () => handleSave(),
      name: " this account",
      action: "save"
    });
  };
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
          href={`/account/${detail._id}`}
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
            <GeneralEdit
              account={detail}
              handleChange={handleChange}
              handleChangeStatus={handleChangeStatus}
            />

            <PostDetail account={detail} />

            <FriendList account={detail} />
          </div>
          <div className="flex flex-row items-center justify-center gap-8 pt-10">
            <Button
              className="shadow-md flex flex-row border-light-500 items-center justify-center  hover:border-light-500 bg-transparent hover:bg-transparent  border rounded-lg"
              onClick={handleConfirmSave}
            >
              <p className="text-dark100_light900 paragraph-regular">Save</p>
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
