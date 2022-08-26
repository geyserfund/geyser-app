import { __development__, __production__, __staging__ } from './env';

const domain = (__production__ && 'geyser.fund')
	|| (__staging__ && 'staging.geyser.fund')
	// || (__development__ && 'localhost')
	|| (__development__ && '.dev.geyser.fund')
	|| 'dev.geyser.fund';

export const cookieOptions = {
	...(domain && { domain }),
	path: '/',
	secure: true,
};
