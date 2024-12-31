import { MessageDetailProps } from "@/types/message";
import React from "react";
import EditableParagraph from "../shared/EditableParagraph";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { ResponseMessageDTO } from "@/lib/DTO/message";
import { FileSegment } from "./FileSegment";
import ReactPlayer from "react-player";
import InputEdit from "../shared/input/InputEdit";

interface props {
  message: ResponseMessageDTO;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContentDetail = ({ message, onChange }: props) => {
  const type = message.contentId.length
    ? message.contentId[message.contentId.length - 1].type
    : "Text";

  return (
    <div className="flex flex-col items-start justify-center w-full gap-4">
      <div className="flex flex-row w-full h-fit gap-[10px] items-end justify-start">
        <Icon
          icon="material-symbols:content-copy-outline"
          width={18}
          height={20}
          className="text-primary-500"
        />
        <p className="text-primary-500 paragraph-bold">Content</p>
      </div>
      <div className="flex w-full h-[1px] bg-light-500"></div>
      <p className="paragraph-15-semibold text-dark100_light900">{type}</p>

      <div className="flex border-[0.5px] border-light-500 rounded-xl w-full min-h-[300px] p-4 overflow-scroll scrollable">
        {(() => {
          const lastContent = message.contentId[message.contentId.length - 1];
          switch (type) {
            case "Image":
              return (
                <div className="flex flex-col gap-6 items-start justify-start w-full">
                  <p className="text-dark100_light900 paragraph-regular">
                    Title: {lastContent.fileName}
                  </p>
                  <div className="flex w-[120px] h-[120px]">
                    <Image
                      src={lastContent.url}
                      alt={lastContent.publicId}
                      width={120}
                      height={120}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                </div>
              );
            case "Audio":
              return (
                <div className="flex flex-col gap-6 items-start justify-start w-full">
                  <p className="text-dark100_light900 paragraph-regular ">
                    Title: {lastContent.fileName}
                  </p>
                  <audio
                    controls
                    className="md:w-[250px] h-[54px] w-[200px] md:text-[14px] text-[12px]"
                  >
                    <source src={lastContent.url} type="audio/ogg" />
                  </audio>
                </div>
              );
            case "Video":
              return (
                <div className="flex flex-col gap-6 items-start justify-start w-full">
                  <p className="text-dark100_light900 paragraph-regular ">
                    Title: {lastContent.fileName}
                  </p>
                  <div className="rounded-[18px] overflow-hidden">
                    <ReactPlayer
                      url={lastContent.url}
                      controls
                      width="200px"
                      height="200px"
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
              );
            case "Other":
              return (
                <div className="flex items-start justify-start w-full">
                  <FileSegment
                    fileName={lastContent.fileName}
                    url={lastContent.url}
                  />
                </div>
              );
            default:
              return (
                <div className="flex flex-col items-start justify-start gap-1 w-full">
                  {message.text.map((item, index) =>
                    index === message.text.length - 1 ? (
                      <InputEdit
                        key={index}
                        titleInput="The last message"
                        placeholder={item}
                        name={`text`} // Sử dụng name động
                        onChange={onChange} // Đảm bảo sử dụng onChange từ prop
                        width="w-full"
                      />
                    ) : (
                      <p
                        className="text-dark100_light900 paragraph-regular"
                        key={index}
                      >
                        {item}
                      </p>
                    )
                  )}
                </div>
              );
          }
        })()}
      </div>
    </div>
  );
};

export default ContentDetail;
