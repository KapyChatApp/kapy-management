"use client";
import React, { useState } from "react";
import EditableParagraph from "../shared/EditableParagraph";
import {
  titleDetailFirst,
  titleDetailSec,
  titleDetailThir
} from "@/constants/accounts";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AccountData, AccountDetailProps } from "@/types/accounts";
import InputEdit from "../shared/input/InputEdit";
import { UserResponseDTO } from "@/lib/DTO/user";
import InputSelection from "../shared/input/InputSelect";
import LabelInformation from "../shared/LabelInformation";

interface props {
  account: UserResponseDTO;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeStatus: (status: string) => void;
}

const GeneralEdit = ({ account, handleChange, handleChangeStatus }: props) => {
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
      <div className="flex flex-row items-start justify-between w-full h-fit">
        <div className="flex flex-col gap-4 w-fit h-fit">
          {titleDetailFirst.map((item) => {
            const text =
              item.title === "ID"
                ? account._id
                : item.title === "First name"
                ? account.firstName
                : item.title === "Last name"
                ? account.lastName
                : account.bio;
            switch (item.title) {
              case "ID":
                return <LabelInformation content={text} title={item.title} />;
              default:
                return (
                  <InputEdit
                    titleInput={item.title}
                    placeholder={text}
                    name={item.value}
                    onChange={handleChange}
                    width="w-full"
                  />
                );
            }
          })}
        </div>
        <div className="flex flex-col gap-4 w-fit h-fit">
          {titleDetailSec.map((item) => {
            const text =
              item.title === "Hobbies"
                ? account.hobbies
                : item.title === "Address"
                ? account.address
                : item.title === "Relationships"
                ? account.relationShip
                : new Date(account.birthDay).toLocaleDateString();
            switch (item.title) {
              case "Birth":
                return <LabelInformation content={text} title={item.title} />;
              default:
                return (
                  <InputEdit
                    titleInput={item.title}
                    placeholder={text}
                    name={item.value}
                    onChange={handleChange}
                    width="w-full"
                  />
                );
            }
          })}
        </div>
        <div className="flex flex-col gap-4 w-fit h-fit">
          {titleDetailThir.map((item) => {
            const text =
              item.title === "Email"
                ? account.email
                : item.title === "Status"
                ? account.flag
                  ? "Active"
                  : "Inactive"
                : item.title === "Phone"
                ? account.phoneNumber
                : new Date(account.attendDate).toLocaleDateString();

            return <LabelInformation content={text} title={item.title} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default GeneralEdit;
