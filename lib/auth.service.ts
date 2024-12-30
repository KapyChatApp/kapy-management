import { UserLoginDTO, UserRegisterDTO } from "./DTO/user";
import axios from "axios";

export const registerAdmin = async (user: UserRegisterDTO) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}user/create-admin`,
      user
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error response:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export async function checkTokenFrontend(
  token: string
): Promise<{ isAuthenticated: boolean }> {
  try {
    const response = await fetch(`${process.env.BASE_URL}auth/check-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const result = await response.json();
    return result; // Giả sử `result` là { isAuthenticated: boolean }
  } catch (error) {
    console.error("Error checking token:", error);
    return { isAuthenticated: false }; // Trả về kiểu phù hợp với kiểu đã khai báo
  }
}

export const loginUser = async (
  params: UserLoginDTO
): Promise<{
  message: string;
  token: string;
  roles: string[];
  flag: boolean;
}> => {
  try {
    const response = await fetch(`${process.env.BASE_URL}auth/manage/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: "Login failed", token: "", roles: [], flag: false };
    }

    const data = await response.json();
    const token = data.token;
    localStorage.setItem("token", token);

    return { message: data.message, token: token, roles: [], flag: false };
  } catch (error) {
    console.error("Error registering user:", error);
    return { message: "Login failed", token: "", roles: [], flag: false };
  }
};
