import axios from "axios";

//backendproject name : ResturantApp
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
  }
}

export default MainService;