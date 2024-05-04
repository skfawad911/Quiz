import axios from "axios";

export const verifyUser = async (token) => {
  try {
    const response = await axios.get(
      `https://somprazquiz1-2.digilateral.com/api/verify-jwt-client/${token}`
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying user:", error.message);
    throw error;
  }
};
