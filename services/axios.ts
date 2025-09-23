import axios from "axios";
import API_BASE_URL from "@/config/apiConfig";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const axiosNoAuth = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const accessToken = session?.user?.accessToken;
    console.log("Axios Request - Access Token:", accessToken ? "Found" : "Not found");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // toast.error("Token Expired Please Relogin!");
      // if (window.location.pathname !== "/registracija" && window.location.pathname !== "/" && !window.location.pathname.startsWith("/m/")) {
      if (window.location.pathname.startsWith("/u/") || window.location.pathname.startsWith("/c/") || window.location.pathname.startsWith("/p/")) {
        window.location.href = "/registracija";
      }
    } else if (error.response.status === 403) {
      // Don't redirect for 403 errors - let the component handle the error message
      // This prevents automatic redirection for blocked users
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
