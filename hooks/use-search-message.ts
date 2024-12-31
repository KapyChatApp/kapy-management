import { ResponseMessageDTO } from "@/lib/DTO/message";
import { UserResponseDTO } from "@/lib/DTO/user";
import { useState } from "react";

const useSearchMessage = (messageList: ResponseMessageDTO[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const list = messageList.filter((msg) => {
    const text = `${msg.text[msg.text.length - 1]}`.toLowerCase().trim();
    const content = `${
      msg.contentId.length && msg.contentId[msg.contentId.length - 1].fileName
    }`
      .toLowerCase()
      .trim();
    const id = msg._id.toLowerCase();
    const createBy = `${msg.createBy.firstName} ${msg.createBy.firstName}`
      .toLowerCase()
      .trim();
    const createAt = new Date(msg.createAt).toLocaleString().trim();
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

    return (
      text.includes(lowerCaseSearchTerm) ||
      content.includes(lowerCaseSearchTerm) ||
      id.includes(lowerCaseSearchTerm) ||
      createBy.includes(lowerCaseSearchTerm) ||
      createAt.includes(lowerCaseSearchTerm)
    );
  });

  return { searchTerm, setSearchTerm, list };
};

export default useSearchMessage;
