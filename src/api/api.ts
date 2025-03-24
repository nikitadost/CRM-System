import axios from "axios";
import { refreshToken } from "../api/AuthApi";
import { getAccessToken, getRefreshToken, removeTokens } from "./AuthTokens";
import { store } from "../redux/store";
import { logout } from "../redux/AuthSlice";

const url = "https://easydev.club/api/v1";
const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing: boolean = false;
let refreshSubscribers: ((token: string) => void)[] = [];
const subscribeTokenRefresh = (callback: (token: string) => void) => {
  console.log(callback);
  refreshSubscribers.push(callback);
};
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => {
    return callback(token);
  });
  refreshSubscribers = [];
};

api.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    if (!error.response) {
      return Promise.reject(new Error("Нет ответа от сервера"));
    }
    if (!originalRequest._retry) {
      if (error.response.status === 401) {
        const errorMessage = error.response.data || "";
        if (errorMessage.includes("expired")) {
          console.warn(" Токен истёк, выполняем logout...");
          removeTokens();
          store.dispatch(logout());
          return Promise.reject(new Error("Сессия истекла, выполнен logout"));
        }
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            });
          });
        }
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await refreshToken(getRefreshToken());
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${getAccessToken()}`;
          onRefreshed(getAccessToken());
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Ошибка обновления токена: ", refreshError);
          removeTokens();
          store.dispatch(logout());
          return Promise.reject(
            new Error("Не удалось обновить токен, выполнен logout")
          );
        } finally {
          isRefreshing = false;
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
