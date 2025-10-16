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
async function handle401() {
  localStorage.clear();
  sessionStorage.clear();

  // Clear all cookies
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  });

  // Try to clear the cache (optional and limited)
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
  }
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // toast.error("Ponovno se prijavi");
      // if (window.location.pathname !== "/registracija" && window.location.pathname !== "/" && !window.location.pathname.startsWith("/m/")) {
      if (window.location.pathname.startsWith("/u/") || window.location.pathname.startsWith("/c/") || window.location.pathname.startsWith("/p/")) {
        handle401();
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
