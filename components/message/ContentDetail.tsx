import { MessageDetail, MessageDetailProps } from "@/types/message";
import React from "react";
import EditableParagraph from "../shared/EditableParagraph";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";

const ContentDetail = ({ message, handleSave }: MessageDetailProps) => {
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
      <EditableParagraph
        title="Category:"
        initialText={
          message[0].message.content.type === "link"
            ? "Link"
            : message[0].message.content.type === "file"
            ? "File"
            : message[0].message.content.type === "image"
            ? "Image"
            : "Text"
        }
        onSave={handleSave}
      />

      <div className="flex border-[0.5px] border-light-500 rounded-xl w-full min-h-[300px] p-4 overflow-scroll scrollable">
        {(() => {
          switch (message[0].message.content.type) {
            case "image":
              return (
                <div className="flex flex-col gap-6 items-start justify-start w-full">
                  <p className="text-dark100_light900 paragraph-regular">
                    Title: {message[0].message.content.altText}
                  </p>
                  <Image
                    src={message[0].message.content.url}
                    alt={message[0].message.content.altText}
                    width={120}
                    height={120}
                    className="rounded-lg"
                  />
                </div>
              );
            case "link":
              return (
                <div className="flex flex-col gap-6 items-start justify-start w-full">
                  <p className="text-dark100_light900 paragraph-regular ">
                    Title: {message[0].message.content.title}
                  </p>
                  <Link
                    href={message[0].message.content.url}
                    className="text-accent-blue underline paragraph-regular"
                  >
                    {message[0].message.content.url}
                  </Link>
                </div>
              );
            case "file":
              return (
                <div className="flex items-start justify-start w-full">
                  <Link
                    href={message[0].message.content.fileUrl}
                    className="text-dark100_light900 paragraph-regular"
                  >
                    {message[0].message.content.fileName}
                  </Link>
                </div>
              );
            default:
              return (
                <div className="flex items-start justify-start w-full">
                  <p className="text-dark100_light900 paragraph-regular ">
                    {message[0].message.content.content}
                  </p>
                </div>
              );
          }
        })()}
      </div>
    </div>
  );
};

export default ContentDetail;
