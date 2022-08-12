type ExtendProcessEnv = 'production' | 'staging' | 'development' | 'test'

const NODE_ENV = process.env.NODE_ENV as ExtendProcessEnv;

console.log(process.env.NODE_ENV);

export const __production__ = NODE_ENV === 'production';
export const __development__ = NODE_ENV === 'development';
export const __staging__ = NODE_ENV === 'staging';

if (!(__staging__ || __production__ || __staging__)) {
	throw new Error('NODE_ENV variable has invalid value');
}

export const { REACT_APP_API_ENDPOINT, REACT_APP_AIR_TABLE_KEY } = process.env;

