import axios from "axios";
import { CountAnalyseResponseDTO } from "./DTO/analyst";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const countAnalyseAPI = async (): Promise<CountAnalyseResponseDTO> => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.get<CountAnalyseResponseDTO>(
      `${BASE_URL}analyse/count`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching count analysis data:", error);
    throw error;
  }
};
