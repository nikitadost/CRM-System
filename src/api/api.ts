import axios from "axios";

const url = "https://easydev.club/api/v1";
const accessToken = localStorage.getItem("accessToken");
// const refreshToken = localStorage.getItem("refreshToken");
const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + `${accessToken}`,
  },
  withCredentials: true,
});

export default api;
