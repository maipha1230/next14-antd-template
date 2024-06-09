import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "./cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000, // Timeout if necessary
});

axiosInstance.interceptors.request.use(
  (req) => {
    if (req.url !== "/auth/refresh") {
      const access_token = getCookie('access_token') ?? "";
      const token = access_token;
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url !== "/auth/refresh"
    ) {
      try {
        const refresh_token = localStorage.getItem("refresh_token") ?? "";
        const {
          data: { data },
        } = await axiosInstance.post("/auth/refresh", null, {
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        });
        for (const {
          accessToken: new_access_token,
          refreshToken: new_refresh_token,
        } of data) {
          setCookie('access_token', new_access_token, 1)
          setCookie('refresh_token', new_refresh_token, 7)
        }

        return axiosInstance(originalRequest);
      } catch {
        deleteCookie('access_token')
        deleteCookie('refresh_token')
        location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
