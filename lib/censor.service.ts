const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function requestCensorMessage() {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.log("No token found");
      throw new Error("No token found");
    }

    const response = await fetch(`${BASE_URL}censor/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${storedToken}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to moderate messages");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to moderate messages:", error);
    throw error;
  }
}
