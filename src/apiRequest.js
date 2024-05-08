import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://kg888-back.onrender.com/api",
  withCredentials: true,
      sameSite: 'none'
});

export default apiRequest;
