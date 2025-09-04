export const isDev = true; // use this to toggle for development. 

const API_BASE_URL = isDev
  ? "http://localhost:3002/api"
  : "https://dev111.osmrtnica.com/be/api";

export default API_BASE_URL;
