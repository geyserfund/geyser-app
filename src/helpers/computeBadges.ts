import { DateTime, Interval } from 'luxon';
import { IBadge } from '../interfaces';

interface IBadges {
    [threshold: string]: IBadge
}

const amountBadges: IBadges = {
	21000: {
		badge: '🏅',
		description: 'This user funded more than 21,000 sats!',
	},
	120000: {
		badge: '🏆',
		description: 'This user funded more than 120,000 sats!',
	},
	1000000: {
		badge: '👑',
		description: 'This user funded more than 1,000,000 sats!',
	},
	10000000: {
		badge: '⭐️',
		description: 'This user funded more than 10,000,000 sats!',
	},
};

const roleBadges: IBadges = {
	funder: {
		badge: 'Funder',
		description: 'The user funded this project!',
	},
	earlyFunder: {
		badge: 'Early Funder',
		description: 'This user funded within the first 24 hours of the project start!',
	},
};

interface IcomputeFunderBadgesProps {
	project: {
		createdAt: string
	},
	funder: {
		amountFunded: number;
		timesFunded: number;
		confirmedAt: string;
	}
	shortForm?: Boolean;
}

export const computeFunderBadges = (props: IcomputeFunderBadgesProps): IBadge[] => {
	const funderBadges: IBadge[] = [];
	const { project, funder, shortForm = true } = props;
	const { amountFunded: amount, timesFunded: times } = funder;

	if (amount === 0) {
		return funderBadges;
	}

	// Check if earned amount badge
	const amountBadgeIndex: string | undefined = Object.keys(amountBadges).reverse().find(threshold => (amount > Number(threshold)));

	if (amountBadgeIndex) {
		funderBadges.push(amountBadges[amountBadgeIndex]);
	}

	// Check if early funder
	const funderConfirmedAt = DateTime.fromMillis(parseInt(funder.confirmedAt, 10));
	const projectCreatedAt = DateTime.fromMillis(parseInt(project.createdAt, 10));
	const interval = Interval.fromDateTimes(projectCreatedAt, funderConfirmedAt);

	if (interval.length('hours') < 24) {
		funderBadges.push(roleBadges.earlyFunder);
	}

	// Badge for funding more than once
	if (times > 1) {
		funderBadges.push({
			badge: `${times}x`,
			description: `This user funded this project ${times} times!`,
		});
	}

	if (funderBadges.length === 0) {
		return [];
	}

	if (!shortForm) {
		const longFormBadges = funderBadges.map(funderBadge => ({
			...funderBadge,
			badge: funderBadge.badge + ' Funder',
		}));

		return longFormBadges;
	}

	return funderBadges;
};
