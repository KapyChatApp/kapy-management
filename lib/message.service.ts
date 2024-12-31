import axios from "axios";
import { ResponseMessageDTO } from "./DTO/message";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchAllMessages = async (): Promise<ResponseMessageDTO[]> => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.log("No token found");
      return [];
    }

    const response = await axios.get<ResponseMessageDTO[]>(
      `${BASE_URL}message/manage/list`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    throw error;
  }
};

export const removeMessageById = async (messageId: string) => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.delete(`${BASE_URL}message/manage/remove`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${storedToken}`
      },
      params: {
        messageId
      }
    });

    if (response.status === 200) {
      console.log("Message removed successfully");
    } else {
      console.error("Failed to remove message:", response.data.message);
    }
  } catch (error) {
    console.error("Error removing message:", error);
    throw error;
  }
};

export const updateMessageContent = async (
  messageId: string,
  newContent: string
): Promise<ResponseMessageDTO> => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.put<ResponseMessageDTO>(
      `${BASE_URL}message/manage/update`,
      { messageId, newContent },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating message:", error);
    throw error;
  }
};
