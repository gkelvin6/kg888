import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://server.kg888.xyz",
  withCredentials: true,
      sameSite: 'none'
});

export default apiRequest;
