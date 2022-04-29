import { Avatar, Box, CircularProgress, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react';
import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import {RiRocketLine} from 'react-icons/ri';

import { IProject } from '../../interfaces';
import { formatDaysLeft, isDarkMode, useBitcoinRates } from '../../utils';
import { getShortAmountLabel } from '../../utils/helperFunctions';
import { SatoshiIcon } from '../icons';
import { ButtonComponent, Card, ICard, Linkin } from '../ui';
import { StartCrowdFundUrl, SubscribeUrl } from '../../constants';

interface IProjectCardProp extends ICard {
	title: string
	open?: boolean
	name: string
	className?: string
	imgSrc?: string
	project: IProject
}

const useStyles = createUseStyles({
	container: {
		borderRadius: '10px',
		height: '260px',
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

export const ProjectCard = ({ title, imgSrc, open, name, className, project, ...rest }: IProjectCardProp) => {
	const classes = useStyles();
	const history = useHistory();
	const isDark = isDarkMode();

	const { btcRate} = useBitcoinRates();
	const [percentage, setPercentage] = useState(0);

	const handleCardCLick = () => {
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

	const {amount, label} = formatDaysLeft(project.expiresAt);

	return (
		<Card
			className={classNames(classes.container, className)}
			backgroundColor={isDark ? 'brand.bgHeavyDarkMode' : 'white'}
			onClick={handleCardCLick}
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
					<Avatar src={project.owners && project.owners[0].user.imageUrl} height="22px" width="22px" />
					<Text fontSize="16px" fontWeight={600}>{title}</Text>
				</HStack>
				<HStack alignItems="center" justifyContent={'space-between'} width="100%">
					<CircularProgress
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
					<VStack alignItems="center" justifyContent="center" spacing="0">
						<Text fontSize="14px" fontWeight={600}>{`${amount}`}</Text>
						<Text fontSize="12px">{`${label} left`}</Text>
					</VStack>
				</HStack>
			</VStack>
		</Card>
	);
};

export const ProjectComingSoon = ({...rest}: ICard) => {
	const isDark = isDarkMode();
	const classes = useStyles();

	const {isOpen, onOpen, onClose} = useDisclosure();

	return (
		<>
			<Card
				className={classes.container}
				backgroundColor={isDark ? 'brand.bgHeavyDarkMode' : 'white'}
				{...rest}
				onClick={onOpen}
			>
				<VStack height="100%" width="100%" alignItems="center" justifyContent="center">
					<RiRocketLine className="rocketicon" fontSize="30px"/>
					<Text fontSize="14px">More projects coming soon!</Text>
				</VStack>
			</Card>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent paddingX="10px" marginX="10px">
					<ModalHeader textAlign="center" fontSize="16px" >More projects coming soon</ModalHeader>
					<ModalCloseButton />
					<ModalBody fontSize="12px" textAlign="justify">
					We are releasing projects slowly which will allow us to keep building the best possible crowdfunding experience.  Signup to our mailing list to hear when a new crowdfund project is live on Geyser, and if you have a crowdfund idea drop it in the form.
					</ModalBody>

					<ModalFooter width="100%">
						<VStack width="100%">
							<Linkin href={SubscribeUrl} isExternal width="100%" >
								<ButtonComponent isFullWidth>Subscribe</ButtonComponent>
							</Linkin>
							<Linkin href={StartCrowdFundUrl} isExternal width="100%" >
								<ButtonComponent primary isFullWidth>Start a crowd fund</ButtonComponent>
							</Linkin>
						</VStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
