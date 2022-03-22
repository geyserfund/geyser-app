/* Commented out after dockerisation
import { NODE_ENV } from '.';

export const cookieOptions = NODE_ENV === 'development' ? {} : {
	domain: 'geyser.fund',
	secure: true,
}; */

export const cookieOptions = {
	domain: 'geyser.fund',
	secure: true,
};
