import {
	Avatar,
	Box,
	Button,
	HStack,
	Image,
	Text,
	VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IProjectUpdate, IProject } from '../../interfaces';
import { isMobileMode } from '../../utils';
import { Footer } from '../../components/molecules';
import { Card, SatoshiAmount } from '../../components/ui';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { LighteningQR } from '../../components/molecules/LighteningQR';
import { BoltIcon } from '../../components/icons';
import { AvatarElement } from './components/AvatarElement';
import { colors } from '../../constants';

export const DetailsCard = ({ project }: { project: IProject }) => {
	const isMobile = isMobileMode();

	// const { projectDetails, projectUpdates } = projectData;
	console.log(project);
	return (
		<Card padding="24px">
			<VStack alignItems="flex-start" width="100%" spacing="18px">
				<Box maxH="210px" width="100%">
					<Image width="100%" height="100%" src={'https://i.picsum.photos/id/1/1000/500.jpg?hmac=uUTkzrNvV3-OMxmis9Q1AZvDoIpa0prTCglYAGkaKAw'}/>
				</Box>
				<HStack justifyContent="space-between" width="100%">
					<Text fontSize="30px" fontWeight={700}>Run With Bitcoin</Text>
					<HStack>
						<Text fontSize="12px" color="brand.primary800">RUNNING</Text>
						<BsFillCheckCircleFill color={colors.primary800}/>
					</HStack>
				</HStack>
				<LighteningQR name={'runningwithbitcoin'}/>
				<HStack>
					<Text color="brand.neutral600">Creator</Text>
					<AvatarElement username="Paco de la India" image="https://picsum.photos/id/2/200/300"/>
				</HStack>
				<VStack alignItems="flex-start">
					<Text color="brand.neutral600" textAlign="left">Objective</Text>
					<Text color="brand.neutral800">Travel 40 countries by using Bitcoin. The purpose of the journey is to show through travel vlogs that there is mass adoption and host bitcoin meetups for mass awareness and to... read more</Text>
				</VStack>
				<VStack alignItems="flex-start">
					<Text color="brand.neutral600">Next Milestone</Text>
					<HStack>
						<Text color="brand.neutral800">Milestone 2: Taking a flight to South America - </Text>
						<SatoshiAmount>876000</SatoshiAmount>
						<Text color="brand.neutral800"> to go.</Text>
					</HStack>
				</VStack>
				<Button isFullWidth backgroundColor="brand.primary" leftIcon={<BoltIcon />}>Fund this project</Button>
			</VStack>
		</Card>
	);
};
