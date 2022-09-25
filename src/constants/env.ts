type ExtendProcessEnv = 'production' | 'staging' | 'development' | 'test';

/*
 App Environment
*/
const REACT_APP_ENV = process.env.REACT_APP_ENV as ExtendProcessEnv;

export const __production__ = REACT_APP_ENV === 'production';
export const __development__ = REACT_APP_ENV === 'development';
export const __staging__ = REACT_APP_ENV === 'staging';

if (!(__staging__ || __production__ || __development__)) {
  throw new Error('REACT_APP_ENV variable has invalid value');
}

/*
 Service Endpoints
*/
export const API_SERVICE_ENDPOINT = process.env
  .REACT_APP_API_ENDPOINT as ExtendProcessEnv;
export const AUTH_SERVICE_ENDPOINT = __production__
  ? process.env.REACT_APP_AUTH_SERVICE_ENDPOINT
  : `${API_SERVICE_ENDPOINT}/auth`;

/*
 Other environment vars
*/
export const { REACT_APP_AIR_TABLE_KEY } = process.env;
