const APP_ENVIRONMENT = process.env.NODE_ENV;

export const isDev = APP_ENVIRONMENT === 'staging' || APP_ENVIRONMENT === 'production' ? false : true;

const API_BASE_URL = APP_ENVIRONMENT === 'staging' ? 'https://staging.osmrtnica.com/be/api' :
  APP_ENVIRONMENT === 'production' ? 'https://dev111.osmrtnica.com/be/api' : 'http://localhost:4000/api';

export default API_BASE_URL;
