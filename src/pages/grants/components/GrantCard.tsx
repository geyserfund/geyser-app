/* eslint-disable radix */

import React from 'react';
import { Box, Text, HStack, Image } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { SatoshiIcon } from '../../../components/icons';
import { RecipientButton } from './RecipientButton';
import { isMobileMode } from '../../../utils';
import { IProject } from '../../../interfaces';

export const GrantCard = ({ project, number}: {project: IProject, number: string}) => {
	const history = useHistory();
	const isMobile = isMobileMode();

	const gotoGrant = () => {
		history.push(`/project/${project.name}`);
	};

	const showCountdown = () => project.active && project.expiresAt;
	const daysLeft = Math.floor((parseInt(project.expiresAt) - Date.now()) / 86400000);
	const createdDate = new Date(parseInt(project.createdAt)).toLocaleDateString();

	return (
		<Box backgroundColor="white" boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)" rounded="md" my={10} mr={20}>

			<Box w={isMobile ? '275px' : '400px'}>
				<>
					<Box onClick={() => gotoGrant()} cursor="pointer">

						<Image w={isMobile ? '275px' : '400px'} h={isMobile ? '275px' : '400px'} objectFit="cover" src={project.media && project.media[0]} alt="grant" />

						<Box p={2}>
							<Text fontSize="xs" fontWeight="medium" color="#6E6E6E" my={2}>GRANT {number}: {createdDate}</Text>

							<Text fontWeight="bold" fontSize="3xl">{project.title}</Text>

							{project && <Text>{project.description && project.description.length > 119 ? `${project.description.slice(0, 119)}...` : project.description}</Text>}

							<HStack justifyContent="space-around" alignItems="center" my={3}>

								<Box>
									<HStack justifyContent="center">
										<SatoshiIcon scale={0.8} /><Text fontWeight="bold" fontSize="lg">{project.balance ? project.balance : 0}</Text>
									</HStack>
									<Text fontSize="sm" color="#5B5B5B" fontWeight="medium">COMMITTED</Text>
								</Box>

								<Box>
									<Text fontWeight="bold" textAlign="center" fontSize="lg">{project.grantees ? project.grantees.length : 0}</Text>
									<Text fontSize="sm" color="#5B5B5B" mt={1} fontWeight="medium">APPLICANTS</Text>
								</Box>

								{showCountdown()
									&& <Box><Box fontWeight="bold" textAlign="center" fontSize="lg">{daysLeft}</Box>
										<Text fontSize="sm" color="#5B5B5B" mt={1} fontWeight="medium">DAYS LEFT</Text>
									</Box>
								}

							</HStack>
						</Box>
					</Box>

					<Box display="flex" justifyContent="center" w="100%" mt={2}>
						<RecipientButton title={`APPLICATIONS ${project.active ? 'OPEN' : 'CLOSED'}`} page="landing" active={project.active} />
					</Box>

				</>
			</Box>
		</Box>

	);
};
