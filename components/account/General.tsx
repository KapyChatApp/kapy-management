import React, { useState } from "react";
import EditableParagraph from "../shared/EditableParagraph";
import {
  titleDetailFirst,
  titleDetailSec,
  titleDetailThir
} from "@/constants/accounts";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AccountData, AccountDetailProps } from "@/types/accounts";

const General = ({ account, handleSave }: AccountDetailProps) => {
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
      <div className="flex flex-row items-center justify-between w-full h-fit">
        <div className="flex flex-col gap-4 w-fit h-fit">
          {titleDetailFirst.map((item) => {
            const text =
              item.title === "ID:"
                ? account[0].account.userId
                : item.title === "Full name:"
                ? account[0].account.fullName
                : account[0].account.status
                ? "Active"
                : "Inactive";
            return (
              <EditableParagraph
                title={item.title}
                initialText={text}
                onSave={handleSave}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-4 w-fit h-fit">
          {titleDetailSec.map((item) => {
            const text =
              item.title === "Email:"
                ? account[0].account.email
                : item.title === "Phone:"
                ? account[0].account.phone
                : account[0].account.birth.toLocaleDateString();
            return (
              <EditableParagraph
                title={item.title}
                initialText={text}
                onSave={handleSave}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-4 w-fit h-fit">
          {titleDetailThir.map((item) => {
            const text =
              item.title === "Address:"
                ? account[0].account.address
                : item.title === "Country:"
                ? account[0].account.country
                : account[0].account.createdAt.toLocaleDateString();
            return (
              <EditableParagraph
                title={item.title}
                initialText={text}
                onSave={handleSave}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default General;
