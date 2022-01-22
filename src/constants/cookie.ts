import { NODE_ENV } from '.';

export const cookieOptions = NODE_ENV === 'development' ? {} : {
	domain: 'geyser.fund',
	secure: true,
};
