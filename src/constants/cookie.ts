import { NODE_ENV } from './env';

export const cookieOptions = {
	// domain: NODE_ENV === 'development' ? 'localhost' : 'geyser.fund',
	path: '/',
	domain: NODE_ENV === 'development' ? 'dev.geyser.fund' : 'geyser.fund',
	secure: true,
};
