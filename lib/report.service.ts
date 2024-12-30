import axios from "axios";
import { ReportResponseDTO, VerifyReportDTO } from "./DTO/report";

export const fetchAllReports = async (): Promise<ReportResponseDTO[]> => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.get<ReportResponseDTO[]>(
      `${process.env.BASE_URL}report/all`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

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
