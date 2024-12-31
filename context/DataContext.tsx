"use client";
import {
  FileContent,
  MessageBoxInfo,
  ResponseMessageDTO,
  UserInfoBox
} from "@/lib/DTO/message";
import { UserInfo } from "os";
import { createContext, useContext, useState } from "react";

// Tạo kiểu cho context
interface MessageContextType {
  dataMessage: ResponseMessageDTO[];
  setDataMessage: React.Dispatch<React.SetStateAction<ResponseMessageDTO[]>>;
}

// Tạo context
const MessageContext = createContext<MessageContextType | undefined>(undefined);

// Provider component
export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [dataMessage, setDataMessage] = useState<ResponseMessageDTO[]>([]);

  return (
    <MessageContext.Provider
      value={{
        dataMessage,
        setDataMessage
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

// Hook để sử dụng context
export const useMessageContext = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};
