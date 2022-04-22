import { Avatar, Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useBtcContext } from '../../context/btc';
import { IProject } from '../../interfaces';
import { ButtonComponent, SatoshiAmount } from '../ui';
import Loader from '../ui/Loader';

interface ILiveProject {
    loading: boolean
    project: IProject | null

}

export const LiveProject = ({loading, project}: ILiveProject) => {
	console.log('blah blah');
	const {btcRate} = useBtcContext();

	if (loading || !project) {
		return (<VStack width="100%" height="100px" justifyContent="center" alignItems="center">
			<Loader />
		</VStack>);
	}

	console.log('checking media', project);
	const image = project?.media[0];
	const owner = project?.owners[0];
	const goalInSatoshi = project.fundingGoal / btcRate;
	const percentage = ((project.balance / goalInSatoshi) * 100).toFixed(2);

	console.log('checking percentage', goalInSatoshi, btcRate, project, percentage);

	return (
		<HStack spacing="25px" width="100%" maxHeight="290px" alignItems="flex-start">
			<Box flex="1" height="100%" borderRadius="4px" overflow="hidden">
				<Image src={image} width="100%" height="100%"/>
			</Box>
			<VStack height="100%" flex="1" alignItems="flex-start" justifyContent="flex-start">
				<Text fontSize="33px" fontWeight={700}>{project.title}</Text>
				<HStack>
					<Avatar height="33px" width="33px" name={owner.user.username} src={owner.user.imageUrl}/>
					<Text fontSize="18px">By</Text>
					<Text fontSize="18px" fontWeight={700}>{owner.user.username}</Text>
				</HStack>
				<Text fontSize="14px">{project.description}</Text>
				<HStack >
					<Text fontSize="18px">Raised: </Text>
					<SatoshiAmount fontSize="18px">{project.balance}</SatoshiAmount>
					<Text fontSize="18px">{`, ${percentage} % `}</Text>
					<Text fontSize="18px">of goal</Text>
				</HStack>
				<ButtonComponent
					standard
					primary
					isFullWidth
					fontSize="15px"
				>
						View Project
				</ButtonComponent>
			</VStack>
		</HStack>
	);
};
