type AppEnv = "development" | "production" | "test" | "staging";

const APP_ENVIRONMENT = process.env.NEXT_PUBLIC_APP_ENV as AppEnv;

export const isDev = APP_ENVIRONMENT === 'staging' || APP_ENVIRONMENT === 'production' ? false : true; 

const API_BASE_URL = APP_ENVIRONMENT === 'staging' ? 'https://staging.osmrtnica.com/be/api' :
  APP_ENVIRONMENT === 'production' ? 'https://osmrtnica.com/be/api' : 'http://localhost:4000/api';

export default API_BASE_URL;
