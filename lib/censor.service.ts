const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function requestCensor(selectedValue: string) {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.log("No token found");
      throw new Error("No token found");
    }

    const response = await fetch(`${BASE_URL}censor/${selectedValue}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${storedToken}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to moderate data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to moderate data:", error);
    throw error;
  }
}
