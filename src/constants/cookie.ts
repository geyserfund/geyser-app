import { __development__, __production__, __staging__ } from './env';

const domain = (__production__ && 'geyser.fund')
	|| (__staging__ && 'staging.geyser.fund')
	|| (__development__ && 'dev.geyser.fund');

console.log('domain', domain);

export const cookieOptions = {
	...(domain && { domain }),
	path: '/',
	secure: true,
};
