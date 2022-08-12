import { __production__, __staging__ } from './env';

const domain = (__production__ && 'geyser.fund')
	|| (__staging__ && 'staging.geyser.fund')
	// || 'localhost';
	|| 'dev.geyser.fund';

export const cookieOptions = {
	domain,
	path: '/',
	secure: true,
};
