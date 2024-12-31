import axios from "axios";
import { ReportResponseDTO, VerifyReportDTO } from "./DTO/report";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchAllReports = async (): Promise<ReportResponseDTO[]> => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.get<ReportResponseDTO[]>(
      `${BASE_URL}report/all`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export const verifyReportAPI = async (
  param: VerifyReportDTO,
  reportId: string
): Promise<any> => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/report/verify?reportId=${reportId}`,
      param,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error verifying report:", error);
    throw error;
  }
};

export const removeReport = async (reportId: string) => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.delete(
      `${BASE_URL}report/manage/remove?reportId=${reportId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting report:", error);
    throw error;
  }
};
