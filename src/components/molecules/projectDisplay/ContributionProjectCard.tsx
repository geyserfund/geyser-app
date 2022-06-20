import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import classNames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { computeFunderBadges } from '../../../helpers';
import { IContribution } from '../../../interfaces';

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

	const {project, funder, isAmbassador, isFunder} = contribution;

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
				<HStack width="100%" paddingX="10px" justifyContent="space-between">
					<Box>
						{isFunder && getBadges()}
					</Box>
					{
						isAmbassador ? (
							<Text fontSize="12px" padding="3px 10px" borderRadius="10px" backgroundColor="brand.primary">Ambassador</Text>
						) : (
							<Text fontSize="12px" padding="3px 10px" borderRadius="10px" backgroundColor="brand.primary">Funder</Text>
						)
					}
				</HStack>
			</Card>
		</Link>
	);
};
