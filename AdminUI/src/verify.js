import axios from "axios";

export const verifyUser = async (token) => {
  try {
    const response = await axios.get(
      `http://main-alb-773490635.ap-south-1.elb.amazonaws.com:5050/api/verify-jwt-client/${token}`
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying user:", error.message);
    throw error;
  }
};
