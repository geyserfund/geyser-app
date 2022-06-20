import { Box, HStack, Image, Text, Tooltip, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import classNames from 'classnames';
import { DateTime, Interval } from 'luxon';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { computeFunderBadges } from '../../../helpers';
import { IBadge, IContribution } from '../../../interfaces';

import { isDarkMode } from '../../../utils';
import { Badge, Card, ICard } from '../../ui';

interface IContributionProjectCardProp extends ICard {
	open?: boolean;
	className?: string;
    contribution: IContribution
}

const useStyles = createUseStyles({
	container: {
		borderRadius: '4px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '300px',
		minWidth: '300px',
		marginLeft: '15px',
		paddingBottom: '10px',
		boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
		'&:hover': {
			cursor: 'pointer',
			boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
			'& $viewProject': {
				opacity: 1,
			},
			'.rocketicon': {
				color: 'brand.primary',
			},
		},

		transition: 'box-shadow 0.3s ease-in-out',
	},

	circularProgress: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15))',
	},
	viewProject: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		top: '0px',
		left: '0px',
		display: 'flex',
		opacity: 0,
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'opacity 0.3s ease-in-out',
	},
	darkLayout: {
		position: 'absolute',
		backgroundColor: 'black',
		height: '100%',
		width: '100%',
		opacity: 0.7,
	},
});

export const ContributionProjectCard = ({ contribution, open, className, ...rest }: IContributionProjectCardProp) => {
	const classes = useStyles();
	const isDark = isDarkMode();

	const {project, funder} = contribution;

	const imgSrc = project.media[0];

	const getBadges = () => computeFunderBadges({ project, funder }).map(badge => (<Badge key={`${badge.badge}`} badge={`${badge.badge}`} />));
	return (
		<Link to={`/project/${project.name}`}>
			<Card
				className={classNames(classes.container, className)}
				backgroundColor={isDark ? 'brand.bgHeavyDarkMode' : 'white'}
				{...rest}
			>
				<Box height="160px" width="100%" position="relative">
					<Image src={imgSrc} height="100%" width="100%" objectFit="cover" />
					<Box className={classes.viewProject}>
						<Text fontSize="14px" color="brand.primary" zIndex={20}>View Project</Text>
						<Box className={classes.darkLayout} />
					</Box>
				</Box>
				<VStack spacing="5px" width="100%" padding="10px">
					<HStack spacing="10px" justifyContent="flex-start" width="100%">
						<Text fontSize="16px" fontWeight={600}>{project.title}</Text>
					</HStack>
					<Text fontSize="12px" width="100%" height="35px" noOfLines={2}>{project.description}</Text>
					<HStack sapcing="5px" width="100%">
					</HStack>
				</VStack>
				<Box width="100%" paddingX="10px">
					<RenderBadges funder={funder} project={project}/>
				</Box>
			</Card>
		</Link>
	);
};

interface IBadges {
    [threshold: string]: IBadge
}

const amountBadges: IBadges = {
	21000: {
		badge: '🏅 Funder',
		description: 'This user funded more than 21,000 sats!',
	},
	120000: {
		badge: '🏆 Funder',
		description: 'This user funded more than 120,000 sats!',
	},
	1000000: {
		badge: '👑 Funder',
		description: 'This user funded more than 1,000,000 sats!',
	},
	10000000: {
		badge: '⭐️ Funder',
		description: 'This user funded more than 10,000,000 sats!',
	},
};

const specialBadges: IBadges = {
	earlyFunder: {
		badge: 'Early Funder',
		description: 'This user funded within the first 24 hours of the project start!',
	},
};

interface IRenderBadges {
	funder: IContribution['funder']
	project: IContribution['project']
}

const RenderBadges = ({ funder, project}:IRenderBadges) => {
	const funderBadges: IBadge[] = [];
	const { amountFunded: amount, timesFunded: times } = funder;

	if (amount === 0) {
		return null;
	}

	// Check if earned amount badge
	const amountBadgeIndex: string | undefined = Object.keys(amountBadges).reverse().find(threshold => (amount > Number(threshold)));

	if (amountBadgeIndex) {
		funderBadges.push(amountBadges[amountBadgeIndex]);
	} else if (times < 2) {
		funderBadges.push({
			badge: 'Funder',
			description: 'The user funded this project!',
		});
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
			badge: `${times}x Funder`,
			description: `This user funded this project ${times} times!`,
		});
	}

	return (
		<Wrap>
			{
				funderBadges.map(badge => (
					<WrapItem key={badge.badge}>
						<Tooltip label={badge.description}>
							<Box backgroundColor="brand.gold" padding="2px 10px" borderRadius="7px">
								<Text fontSize="12px" fontWeight={500}>{badge.badge}</Text>
							</Box>
						</Tooltip>
					</WrapItem>
				))
			}
		</Wrap>
	);
};
