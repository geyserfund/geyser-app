import { Avatar, Box, HStack, Image, Skeleton, SkeletonCircle, Stack, Text, VStack, Wrap } from '@chakra-ui/react';
import React from 'react';
import { useBtcContext } from '../../context/btc';
import { IProject } from '../../interfaces';
import { isMobileMode } from '../../utils';
import { ButtonComponent, Card, SatoshiAmount } from '../ui';

interface ILiveProject {
    project: IProject

}

export const LiveProject = ({ project}: ILiveProject) => {
	const isMobile = isMobileMode();
	const {btcRate} = useBtcContext();

	const image = project?.media[0];
	const owner = project?.owners[0];
	const goalInSatoshi = project.fundingGoal / btcRate;
	const percentage = ((project.balance / goalInSatoshi) * 100).toFixed(2);

	console.log('checking percentage', goalInSatoshi, btcRate, project, percentage);

	const getDescription = project.description.length > 180 ? `${project.description.slice(0, 180)}...` : project.description;

	return (
		<Box width="100%" padding="15px">
			<Card borderRadius="8px" width="100%" position="relative" backgroundColor="white">
				<Stack
					display="flex"
					direction={isMobile ? 'column' : 'row'}
					spacing="25px"
					width="100%"
					maxWidth="1280px"
					height={isMobile ? undefined : '300px'}
					alignItems="flex-start"
				>
					<Box flex="1" height="100%" borderRadius="4px" overflow="hidden" >
						<Image src={image} width="100%" height="100%" objectFit="cover"/>
					</Box>
					<VStack
						height="100%"
						width={isMobile ? '100%' : undefined }
						flex="1"
						alignItems="flex-start"
						justifyContent="flex-start"
						padding={isMobile ? '20px 10px' : '10px 20px'}
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
							<SatoshiAmount fontSize="18px">{project.balance}</SatoshiAmount>
							<Text fontSize="18px">{`, ${percentage} % `}</Text>
							<Text fontSize="18px">of goal</Text>
						</Wrap>
						<ButtonComponent
							standard
							primary
							isFullWidth
							fontSize="15px"
						>
						View Project
						</ButtonComponent>
					</VStack>
				</Stack>
			</Card>
		</Box>

	);
};

export const LiveProjectSkeleton = () => {
	const isMobile = isMobileMode();

	return (
		<Box
			display="flex"
			flexDirection={isMobile ? 'column' : 'row'}
			spacing="25px"
			width="100%"
			maxWidth="925px"
			alignItems="flex-start"
		>
			<Skeleton height="290px" flex={1}/>
			<Stack flex="1" spacing="20px" padding={isMobile ? '20px 0px' : '0px 20px'} width={isMobile ? '100%' : undefined}>
				<Skeleton height="50px" />
				<HStack>
					<SkeletonCircle />
					<Skeleton height="20px" width="100px"/>
				</HStack>
				<Stack>
					<Skeleton height="20px" />
					<Skeleton height="20px" />
					<Skeleton height="20px" />
				</Stack>
			</Stack>
		</Box>);
};
