type AppEnv = "development" | "production" | "test" | "staging";

const APP_ENVIRONMENT = process.env.NEXT_PUBLIC_APP_ENV as AppEnv;

export const isDev =
  APP_ENVIRONMENT === "staging" || APP_ENVIRONMENT === "production"
    ? false
    : true;

const APP_BASE_URL =
  APP_ENVIRONMENT === "staging"
    ? "https://staging.osmrtnica.com"
    : APP_ENVIRONMENT === "production"
    ? "https://osmrtnica.com"
    : "http://localhost:3000";

export default APP_BASE_URL;
