import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import EditableParagraph from "../shared/EditableParagraph";
import {
  titleDetail_1,
  titleDetail_2,
  titleDetail_3
} from "@/constants/messages";
import { ResponseMessageDTO } from "@/lib/DTO/message";

interface props {
  message: ResponseMessageDTO;
  isFlag: boolean;
}

const GeneralDetail = ({ message, isFlag }: props) => {
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
                ? message._id
                : new Date(message.createAt).toLocaleString();
            return (
              <div className="flex flex-row gap-2 items-start justify-start">
                <p className="text-dark100_light900 paragraph-15-light">
                  {item.title}
                </p>
                <div className="flex flex-row items-center justify-center">
                  <p className="text-dark100_light900 paragraph-15-semibold">
                    {text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4 w-fit h-fit">
          {titleDetail_2.map((item) => {
            const text =
              item.title === "User ID:"
                ? message.createBy._id
                : message.createBy.firstName + " " + message.createBy.lastName;
            return (
              <div className="flex flex-row gap-2 items-start justify-start">
                <p className="text-dark100_light900 paragraph-15-light">
                  {item.title}
                </p>
                <div className="flex flex-row items-center justify-center">
                  <p className="text-dark100_light900 paragraph-15-semibold">
                    {text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4 w-fit h-fit">
          {titleDetail_3.map((item) => {
            const text =
              item.title === "Status:"
                ? message.isReported
                  ? "Reported"
                  : "Usual"
                : !isFlag
                ? "Hidden"
                : "Display";
            return (
              <div className="flex flex-row gap-2 items-start justify-start">
                <p className="text-dark100_light900 paragraph-15-light">
                  {item.title}
                </p>
                <div className="flex flex-row items-center justify-center">
                  <p
                    className={`${
                      (message.isReported && item.title === "Status:") ||
                      (!isFlag && item.title === "Flag:")
                        ? "text-accent-red"
                        : "text-dark100_light900"
                    } paragraph-15-semibold`}
                  >
                    {text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GeneralDetail;
