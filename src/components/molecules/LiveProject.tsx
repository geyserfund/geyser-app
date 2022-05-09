import { Avatar, Box, HStack, Image, Skeleton, Stack, Text, VStack, Wrap } from '@chakra-ui/react';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import { useBtcContext } from '../../context/btc';
import { IProject } from '../../interfaces';
import { isMobileMode } from '../../utils';
import { Card, SatoshiAmount } from '../ui';

interface ILiveProject {
    project: IProject

}

const useStyles = createUseStyles({
	container: {
		// BorderRadius: '8px',
		width: '100%',
		position: 'relative',
		backgroundColor: 'white',
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
	satoshiText: {
		marginTop: '1px !important',
	},
});

export const LiveProject = ({ project}: ILiveProject) => {
	const isMobile = isMobileMode();
	const classes = useStyles();
	const history = useHistory();
	const {btcRate} = useBtcContext();

	const image = project?.media[0];
	const owner = project?.owners[0];
	const goalInSatoshi = project.fundingGoal / btcRate;
	const percentage = ((project.balance / goalInSatoshi) * 100).toFixed(2);

	console.log('checking percentage', goalInSatoshi, btcRate, project, percentage);

	const getDescription = project.description?.length > 250 ? `${project.description.slice(0, 250)}...` : project.description;

	const handleViewProject = () => {
		history.push(`/project/${project.name}`);
	};

	return (
		<Box width="100%" padding="15px">
			<Card className={classes.container} onClick={handleViewProject}>
				<Stack
					display="flex"
					direction={isMobile ? 'column' : 'row'}
					spacing="25px"
					width="100%"
					height={isMobile ? undefined : '300px'}
					alignItems="flex-start"
				>
					<Box flex="1" height="100%" width={isMobile ? '100%' : undefined} borderRadius="4px" overflow="hidden" position="relative" >
						<Image src={image} width="100%" height="100%" maxHeight="300px" objectFit="cover" minHeight={isMobile ? '300px' : undefined} />
						<Box className={classes.viewProject}>
							<Text fontSize="14px" color="brand.primary" zIndex={20}>View Project</Text>
							<Box className={classes.darkLayout} />
						</Box>
					</Box>
					<VStack
						height="100%"
						width={isMobile ? '100%' : undefined }
						flex="1"
						alignItems="flex-start"
						justifyContent="flex-start"
						padding={isMobile ? '20px 10px' : '10px 20px'}
						spacing="15px"
					>
						<Text fontSize="33px" fontWeight={700}>{project.title}</Text>
						<HStack>
							<Avatar height="33px" width="33px" name={owner.user.username} src={owner.user.imageUrl}/>
							<Text fontSize="18px">By</Text>
							<Text fontSize="18px" fontWeight={700}>{owner.user.username}</Text>
						</HStack>
						<Text fontSize="14px">{getDescription}</Text>
						<Wrap >
							<Text fontSize="18px">Raised: </Text>
							<SatoshiAmount wrapperClassName={classes.satoshiText} fontSize="18px" marginTop="2px !important">{project.balance}</SatoshiAmount>
							<Text fontSize="18px">{`, ${percentage} % `}</Text>
							<Text fontSize="18px">of goal</Text>
						</Wrap>
					</VStack>
				</Stack>
			</Card>
		</Box>

	);
};

export const LiveProjectSkeleton = () => (

	<Skeleton height="290px" width="100%" maxWidth="925px" flex={1}/>);
