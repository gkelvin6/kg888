import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://kg888-back.onrender.com/api",
  withCredentials: true,httpOnly: false,
      sameSite: 'none'
});

export default apiRequest;
