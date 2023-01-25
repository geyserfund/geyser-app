type ExtendProcessEnv = 'production' | 'staging' | 'development' | 'test';

/*
 App Environment
*/
const VITE_APP_ENV = import.meta.env.MODE as ExtendProcessEnv;

export const __production__ = VITE_APP_ENV === 'production';
export const __development__ = VITE_APP_ENV === 'development';
export const __staging__ = VITE_APP_ENV === 'staging';

if (!(__staging__ || __production__ || __development__)) {
  throw new Error('VITE_APP_ENV variable has invalid value');
}

/*
 Service Endpoints
*/
export const API_SERVICE_ENDPOINT = import.meta.env
  .VITE_APP_API_ENDPOINT as ExtendProcessEnv;
export const AUTH_SERVICE_ENDPOINT = __production__
  ? import.meta.env.VITE_APP_AUTH_SERVICE_ENDPOINT
  : `${API_SERVICE_ENDPOINT}/auth`;

/*
 Other environment vars
*/

if (!import.meta.env.VITE_APP_GIPHY_API_KEY) {
  console.warn('Missing GIPHY API key from environment variables');
}

if (!import.meta.env.VITE_APP_AIR_TABLE_KEY) {
  console.warn('Missing AIR_TABLE_KEY API key from environment variables');
}

export const { VITE_APP_AIR_TABLE_KEY, VITE_APP_GIPHY_API_KEY } = import.meta
  .env;
