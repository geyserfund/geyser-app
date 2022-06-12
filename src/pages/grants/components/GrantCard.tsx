/* eslint-disable radix */

import React from 'react';
import { Box, Text, HStack, Image } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { SatoshiIcon } from '../../../components/icons';
import { isMobileMode } from '../../../utils';
import { IProject } from '../../../interfaces';

export const GrantCard = ({ project, number}: {project: IProject, number: string}) => {
	const history = useHistory();
	const isMobile = isMobileMode();

	const gotoGrant = () => {
		history.push(`/project/${project.name}`);
	};

	const createdDate = new Date(parseInt(project.createdAt)).toLocaleDateString();

	return (
		<Box backgroundColor="white" boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)" rounded="md" my={10} mr={isMobile ? 10 : 20} onClick={() => gotoGrant()} cursor="pointer">

			<Box w={isMobile ? '275px' : '400px'}>
				<>

					<Image w={isMobile ? '275px' : '400px'} h={isMobile ? '275px' : '400px'} objectFit="cover" src={project.media && project.media[0]} alt="grant" />

					<Box p={2}>

						<Text fontWeight="bold" fontSize="3xl">{project.title}</Text>
						<Text fontSize="xs" fontWeight="medium" color="#6E6E6E">ROUND {number}: {createdDate}</Text>

						<HStack justifyContent="space-around" alignItems="center" my={3}>

							<Box>
								<HStack justifyContent="center">
									<SatoshiIcon scale={0.8} /><Text fontWeight="bold" fontSize="lg">{project.balance ? project.balance : 0}</Text>
								</HStack>
								<Text fontSize="sm" color="#5B5B5B" fontWeight="medium">CONTRIBUTED</Text>
							</Box>

							<Box>
								<HStack justifyContent="center">
									<SatoshiIcon scale={0.8} /><Text fontWeight="bold" fontSize="lg">{project.balance ? project.balance : 0}</Text>
								</HStack>
								<Text fontSize="sm" color="#5B5B5B" fontWeight="medium">DISTRIBUTED</Text>
							</Box>

						</HStack>
					</Box>

				</>
			</Box>
		</Box>

	);
};
