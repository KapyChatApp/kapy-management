import { PostResponseDTO } from "./DTO/post";
import { UpdateUserDTO, UserResponseDTO } from "./DTO/user";
import axios from "axios";

export const fetchAllUsers = async (): Promise<UserResponseDTO[]> => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.log("No token found");
      return [];
    }
    const response = await axios.get<UserResponseDTO[]>(
      `${process.env.BASE_URL}user/all`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export const fetchUserPosts = async (
  userId: string
): Promise<PostResponseDTO[]> => {
  try {
    // Lấy token từ localStorage
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      console.error("No token found");
      return [];
    }

    // Gọi API
    const response = await axios.get<PostResponseDTO[]>(
      `${process.env.BASE_URL}/post/manage/all?user=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    // Trả về dữ liệu từ API
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user posts:", error);
    throw error;
  }
};

export async function getUserProfile(id: string | null) {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.log("No token found");
      return [];
    }
    const response = await fetch(
      `${process.env.BASE_URL}user/findUserById?userId=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching users");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
}

export async function getUserFriends(id: string | null) {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.log("No token found");
      return [];
    }
    const response = await fetch(
      `${process.env.BASE_URL}friend/manage/friend?userId=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching friends");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch friends:", error);
    throw error;
  }
}

export async function getUserBffs(id: string | null) {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.log("No token found");
      return [];
    }
    const response = await fetch(
      `${process.env.BASE_URL}friend/manage/bff?userId=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching bffs");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch bffs:", error);
    throw error;
  }
}

export async function updateInfo(params: UpdateUserDTO, userId: string) {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.log("No token found");
      return [];
    }
    const response = await fetch(
      `${process.env.BASE_URL}user/update?userId=${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        },
        body: JSON.stringify(params)
      }
    );

    if (!response.ok) {
      throw new Error("Error update bio");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to update bio", err);
  }
}

export async function deactiveUser(userId: string | null) {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.log("No token found");
      return [];
    }
    const response = await fetch(
      `${process.env.BASE_URL}/user/deactive?userId=${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${storedToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Error update status");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to update status", err);
  }
}

export const deleteRateById = async (pointId: string, userId: string) => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.delete(
      `${process.env.BASE_URL}point/manage/delete?userId=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        },
        params: { pointId }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting rate:", error);
    throw error;
  }
};

export const subtractUserPoints = async (userId: string, point: number) => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const response = await axios.patch(
      `${process.env.BASE_URL}point/manage/minus?userId=${userId}&point=${point}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        },
        params: { userId, point }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error subtracting user points:", error);
    throw error;
  }
};

export const addPointsToUser = async (userId: string, point: number) => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    // Gửi query parameters qua URL
    const response = await axios.patch(
      `${process.env.BASE_URL}point/manage/plus?userId=${userId}&point=${point}`,
      null,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding points to user:", error);
    throw error;
  }
};
