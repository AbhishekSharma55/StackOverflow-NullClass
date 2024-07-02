import axios from "axios";

export const getCurrentUser = async () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  try {
    const response = await axios.get(`${apiUrl}/api/auth/current`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data.user; // Assuming the backend sends user data in response.data
  } catch (error) {
    console.error(error);
    return null;
  }
};
