import { MessageDetailProps } from "@/types/message";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import EditableParagraph from "../shared/EditableParagraph";
import {
  titleDetail_1,
  titleDetail_2,
  titleDetail_3
} from "@/constants/messages";

const GeneralDetail = ({ message, handleSave }: MessageDetailProps) => {
  return (
    <div className="flex flex-col items-start justify-center w-full gap-4">
      <div className="flex flex-row w-full h-fit gap-[10px] items-end justify-start">
        <Icon
          icon="uiw:message"
          width={18}
          height={20}
          className="text-primary-500"
        />
        <p className="text-primary-500 paragraph-bold">General Information</p>
      </div>
      <div className="flex w-full h-[1px] bg-light-500"></div>
      <div className="flex flex-row items-start justify-between w-full h-fit">
        <div className="flex flex-col gap-4 w-fit h-fit">
          {titleDetail_1.map((item) => {
            const text =
              item.title === "ID:"
                ? message[0].message.id
                : message[0].message.createdAt.toLocaleString();
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
          {titleDetail_2.map((item) => {
            const text =
              item.title === "User ID:"
                ? message[0].message.userId
                : message[0].message.userName;
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
          {message[0].message.flag &&
            titleDetail_3.map((item) => {
              const text = item.title === "Status:" && "Reported";
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

export default GeneralDetail;
