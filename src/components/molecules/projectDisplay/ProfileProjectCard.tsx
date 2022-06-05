import { Avatar, Box, CircularProgress, HStack, Image, Text, VStack, LinkBox, LinkOverlay } from '@chakra-ui/react';
import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';

import { IProfileProject } from '../../../interfaces';
import { checkExpired, isDarkMode, useBitcoinRates } from '../../../utils';
import { getShortAmountLabel } from '../../../utils/helperFunctions';
import { SatoshiIcon } from '../../icons';
import { Card, ICard } from '../../ui';
import { ProjectCardTime } from './ProjectCard';

interface IProjectCardProp extends ICard {
	title: string
	open?: boolean
	name: string
	className?: string
	imgSrc?: string
	project: IProfileProject
}

const useStyles = createUseStyles({
	container: {
		borderRadius: '4px',
		height: '325px',
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

export const ProfileProjectCard = ({ title, imgSrc, open, name, className, project, ...rest }: IProjectCardProp) => {
	const classes = useStyles();
	const history = useHistory();
	const isDark = isDarkMode();

	const { btcRate} = useBitcoinRates();
	const [percentage, setPercentage] = useState(0);

	const handleCardClick = () => {
		history.push(`/project/${name}`);
	};

	useEffect(() => {
		if (btcRate && project.balance) {
			const amountUSD = (project.balance * btcRate).toFixed(2);
			const percent = Math.ceil((parseFloat(amountUSD) / project.fundingGoal) * 100);
			setPercentage(percent);
		}
	}, [btcRate, project]);

	const getProjectBackers = () => (project && project.funders) ? project.funders.length : '';

	const getProjectStatus = () => {
		// TODO after project creation flow
		// if (!project.creationConfirmed) {
		// 	return (
		// 		<Badge variant="solid" colorScheme="gray">
		// 			Draft Project
		// 		</Badge>
		// 	);
		// }
		if (checkExpired(project.expiresAt)) {
			return (
				<Text variant="subtle" background="brand.bgGrey3" color="textGrey" padding="2px 8px" fontSize="12px" borderRadius="4px">
					Live Project
				</Text>
			);
		}

		if (project.active) {
			return (
				<Text variant="subtle" background="brand.primary" color="black" padding="2px 8px" fontSize="12px" borderRadius="4px">
					Live Project
				</Text>
			);
		}
	};

	const getProjectUpdate = () => {
		// TODO after project creation flow
		// if (!project.creationConfirmed) {
		// 	return (
		// 		<Text>{`Last edited on: ${project.updatedAt}`}</Text>
		// 	);
		// }

		if (checkExpired(project.expiresAt)) {
			return (
				<Text fontSize="12px" color="brand.textGrey">{`Expired on: ${project.expiresAt}`}</Text>
			);
		}

		if (project.active) {
			return (
				<Text fontSize="12px" color="brand.textGrey">{`Went live on ${project.createdAt}`}</Text>
			);
		}
	};

	return (
		<LinkBox>
			<LinkOverlay href={`https://geyser.fund/project/${project.name}`} onClick={e => {
				e.preventDefault();
				handleCardClick();
			}}>
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
						<Text fontSize="16px" fontWeight={600} width="100%">{title}</Text>
						<Text fontSize="12px" width="100%" height="30px">{project.description}</Text>
						<HStack alignItems="center" justifyContent={project.fundingGoal ? 'space-between' : 'space-around'} width="100%">
							{project.fundingGoal
								&& <CircularProgress
									className={classes.circularProgress}
									value={percentage}
									size="55px"
									thickness="10px"
									color="brand.primary"
								>
									<Box position="absolute" fontSize="12px" top="19px">
										<Text fontSize="12px">{`${percentage}%`}</Text>
									</Box>
								</CircularProgress>
							}
							<VStack alignItems="center" justifyContent="center" spacing="0">
								<Text fontSize="14px" fontWeight={600}>{getProjectBackers()}</Text>
								<Text fontSize="12px">backers</Text>
							</VStack>
							<VStack alignItems="center" justifyContent={'center'} spacing="0">
								<HStack>
									<SatoshiIcon scale={0.6}/>
									<Text fontSize="14px" fontWeight={600}>{getShortAmountLabel(project.balance)}</Text>
								</HStack>
								<Text fontSize="12px">received</Text>
							</VStack>
							<ProjectCardTime expiresAt={project.expiresAt} active={project.active}/>
						</HStack>
						<HStack sapcing="5px" width="100%">
							{getProjectStatus()}
							{getProjectUpdate()}
						</HStack>
					</VStack>
				</Card>
			</LinkOverlay>
		</LinkBox>
	);
};
