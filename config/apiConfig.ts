type AppEnv = "development" | "production" | "test" | "staging";

const APP_ENVIRONMENT = (process.env.NEXT_PUBLIC_APP_ENV as AppEnv) || "development";

export const isDev = APP_ENVIRONMENT === 'staging' || APP_ENVIRONMENT === 'production' ? false : true; 

// Allow explicit override for local/mobile testing
const ENV_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const DEFAULT_API_BASE = APP_ENVIRONMENT === 'staging'
  ? 'https://staging.osmrtnica.com/be/api'
  : APP_ENVIRONMENT === 'production'
    ? 'https://osmrtnica.com/be/api'
    : 'http://localhost:4000/api';

const API_BASE_URL = ENV_API_BASE || DEFAULT_API_BASE;

export default API_BASE_URL;
