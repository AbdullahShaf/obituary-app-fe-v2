export const isDev = false; // use this to toggle for development. 

const API_BASE_URL = isDev
  ? "http://localhost:4000/api"
  : "https://staging.osmrtnica.com/be/api";

export default API_BASE_URL;
