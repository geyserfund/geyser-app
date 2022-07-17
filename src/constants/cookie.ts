import { NODE_ENV } from './env';

export const cookieOptions = {
	domain: NODE_ENV === 'development' ? 'localhost' : 'geyser.fund',
	secure: true,
};
