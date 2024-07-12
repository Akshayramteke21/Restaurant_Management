import axios from "axios";


const API_URL = "http://localhost:8080";

const MainService = {

  authenticateUser: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/UserLogin`, { email, password });
      return response.data;
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  },

  //view role
  getRoles: () => {
    const response= axios.get(`${API_URL}/viewRole`);
    console.log(response);
    return response;
  },

  //register user
  AddUser:(user)=>{
    return axios.post(`${API_URL}/registerUser`, user);
  },

  // Verify account OTP
  verifyAccount: async (email, otp) => {
    try {
      const response = await axios.post(`${API_URL}/verifyAccount`, { email, otp });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error verifying account:", error);
      throw error;
    }
  }, 

  getCaptcha: async (captcha)=>{

    try {
      const response= await axios.get(`${API_URL}/getCaptcha`,{captcha});

    console.log(response);
    return response.data.captcha;
      
    } catch (error) {
      console.error("Error getting captcha:", error);
      throw error;
    }
  },
  

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/forgetPassword`, { email });
      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  },

  // Reset password
  resetPassword: async (email, otp, password) => {
    try {
      const response = await axios.post(`${API_URL}/forgetPasswordSet`, { email, otp, password });
      return response.data;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  }

}

export default MainService;