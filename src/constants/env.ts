type ExtendProcessEnv = 'production' | 'staging' | 'development' | 'test'

const REACT_APP_ENV = process.env.REACT_APP_ENV as ExtendProcessEnv;

export const __production__ = REACT_APP_ENV === 'production';
export const __development__ = REACT_APP_ENV === 'development';
export const __staging__ = REACT_APP_ENV === 'staging';

if (!(__staging__ || __production__ || __staging__)) {
	throw new Error('REACT_APP_ENV variable has invalid value');
}

export const { REACT_APP_API_ENDPOINT, REACT_APP_AIR_TABLE_KEY } = process.env;

