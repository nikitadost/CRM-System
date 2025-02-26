import axios from "axios";
const url = "https://easydev.club/api/v1";

const api = axios.create({
  baseURL: url,
  timeout: 1000,
});

export default api;
