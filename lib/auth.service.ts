import { AuthResponsDTO } from "./DTO/auth";
import { UserLoginDTO, UserRegisterDTO } from "./DTO/user";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const registerAdmin = async (user: UserRegisterDTO) => {
  try {
    const response = await axios.post(`${BASE_URL}user/create-admin`, user);
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
    const response = await fetch(`${BASE_URL}auth/check-token`, {
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

const defaultDevice: AuthResponsDTO = {
  _id: "",
  logTime: new Date(),
  deviceName: "",
  deviceType: "",
  brand: "",
  modelName: "",
  osName: "",
  osVersion: "",
  region: "",
  isSafe: false,
  isActive: false,
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    nickName: "",
    avatar: ""
  }
};

export const loginUser = async (
  params: UserLoginDTO
): Promise<{ message: string; token: string; device: AuthResponsDTO }> => {
  try {
    const response = await fetch(`${BASE_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: "Login failed", token: "", device: defaultDevice };
    }

    const data = await response.json();
    const token = data.token;
    console.log(data.device, "check");
    localStorage.setItem("token", token);

    return { message: data.message, token: token, device: data.device };
  } catch (error) {
    console.error("Error registering user:", error);
    return { message: "Login failed", token: "", device: defaultDevice };
  }
};
