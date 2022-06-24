import React from 'react';
import { Box, Text, HStack, Image, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { SatoshiIconTilted } from '../../../components/icons';
import { isMobileMode } from '../../../utils';
import { IProject } from '../../../interfaces';

export const GrantCard = ({ project, number, distributed, date, status, marginRight}: {project: IProject, number: string, distributed: string, date: string, status: string, marginRight?: boolean }) => {
	const history = useHistory();
	const isMobile = isMobileMode();

	const gotoGrant = () => {
		history.push(`/project/${project.name}`);
	};

	return (

		<Box backgroundColor="white" _hover={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)'}} boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)" borderRadius="4px" my={10} mr={marginRight ? isMobile ? 10 : 20 : 0} cursor="pointer">

			<Box w={isMobile ? '325px' : '350px'}>
				<LinkBox>
					<LinkOverlay href={`https://geyser.fund/project/${project.name}`} onClick={e => {
						e.preventDefault();
						gotoGrant();
					}}>

						<Image w={isMobile ? '325px' : '350px'} h={isMobile ? '325px' : '350px'} objectFit="cover" borderRadius="4px" src={project.media && project.media[0]} alt="grant" />

						<Box p={2}>

							<Text fontWeight="bold" fontSize="3xl">{project.title}</Text>
							<Text fontSize="22px" fontWeight="medium">ROUND {number}: {date}</Text>

							<HStack justifyContent="center" spacing="40px" alignItems="center" my={3}>

								<Box>
									<HStack justifyContent="center">
										<SatoshiIconTilted /><Text fontWeight="bold" fontSize="lg">{(project.balance / 1000000).toFixed(project.balance === 0 ? 0 : 1)} M</Text>
									</HStack>
									<Text fontSize="md" color="#5B5B5B" fontWeight="bold">CONTRIBUTED</Text>
								</Box>

								<Box>
									<HStack justifyContent="center">
										<SatoshiIconTilted /><Text fontWeight="bold" fontSize="lg">{distributed} M</Text>
									</HStack>
									<Text fontSize="md" color="#5B5B5B" fontWeight="bold">DISTRIBUTED</Text>
								</Box>

							</HStack>

							{status === 'pending'
								? <Text width="100%" p={1} border="2px solid #20ECC7" rounded="md" textAlign="center" fontWeight="bold">COMING SOON</Text>
								: status === 'open'
									? <Text width="100%" p={1} bg="brand.primary" rounded="md" textAlign="center" fontWeight="bold">OPEN</Text>
									:	<Text width="100%" p={1} bg="brand.bgGrey3" rounded="md" textAlign="center" fontWeight="bold">ROUND COMPLETED</Text>
							}

						</Box>
					</LinkOverlay>
				</LinkBox>
			</Box>

		</Box>

	);
};
