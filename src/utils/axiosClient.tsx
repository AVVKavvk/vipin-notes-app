import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://noteswebsiteserver.onrender.com",
  withCredentials: true,
});

export default axiosClient;
