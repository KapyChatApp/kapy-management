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
      `${BASE_URL}report/manage/all`,
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

export const verifyReport = async (
  param: VerifyReportDTO,
  reportId: string
): Promise<any> => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.patch(
      `${BASE_URL}report/manage/verify?reportId=${reportId}`,
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

export const hiddenPost = async (postId: string) => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.delete(
      `${BASE_URL}post/manage/hidden?postId=${postId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error hiding post:", error);
    throw error;
  }
};

export const hiddenComment = async (commentId: string) => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.delete(
      `${BASE_URL}post/comment/manage/hidden?commentId=${commentId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error hiding comment:", error);
    throw error;
  }
};

export const getDetailReport = async (reportId: string) => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.get(
      `${BASE_URL}report/manage/detail?reportId=${reportId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to get detail report:", response.data.report);
    }
  } catch (error) {
    console.error("Error get detail report:", error);
    throw error;
  }
};

export const displayPost = async (postId: string) => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.get(
      `${BASE_URL}post/manage/display?postId=${postId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error display post:", error);
    throw error;
  }
};

export const displayComment = async (commentId: string) => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.get(
      `${BASE_URL}post/comment/manage/display?commentId=${commentId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error display comment:", error);
    throw error;
  }
};
