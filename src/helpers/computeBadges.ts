import { DateTime, Interval } from 'luxon';
import { IProject, IFunder, IBadge } from '../interfaces';

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

const specialBadges: IBadges = {
	earlyFunder: {
		badge: 'early funder',
		description: 'This user funded within the first 24 hours of the project start!',
	},
};

export const computeFunderBadges = ({ project, funder }: { project: IProject, funder: IFunder}): IBadge[] => {
	const funderBadges: IBadge[] = [];
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
		funderBadges.push(specialBadges.earlyFunder);
	}

	// Badge for funding more than once
	if (times > 1) {
		funderBadges.push({
			badge: `${times}x`,
			description: `This user funded this project ${times} times!`,
		});
	}

	return funderBadges;
};
