import { IFunder } from '../interfaces';
import { getRandomOrb } from '../utils';

import FountainLogo from '../assets/fountain-logo-black-small.png';
import BreezLogo from '../assets/breez-logo.png';

export const getAvatarMetadata = ({ funder, source }: { funder: IFunder, source?: string}) => {
	if (!funder.user) {
		if (source === 'Breez') {
			return {
				appName: source,
				image: BreezLogo,
				link: 'https://breez.technology/',
			};
		}

		return {
			image: getRandomOrb(funder.id),
		};
	}

	if (source) {
		if (source === 'Fountain') {
			const username = funder.user.username.replace('@', '');
			return {
				username,
				appName: 'Fountain.fm',
				image: FountainLogo,
				link: `https://fountain.fm/${username}`,
			};
		}
	}

	return {
		username: funder.user.username,
		image: funder.user.imageUrl || getRandomOrb(funder.id),
		link: `/profile/${funder.user.id}`,
	};
};
