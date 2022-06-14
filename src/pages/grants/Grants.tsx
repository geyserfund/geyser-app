/* eslint-disable complexity */

import React from 'react';
import { Box, Text, HStack, Image, Avatar, VStack, Link, useDisclosure } from '@chakra-ui/react';
import { Footer } from '../../components/molecules';
import { ButtonComponent } from '../../components/ui';
import { SatoshiIcon } from '../../components/icons';
import { isMediumScreen, isMobileMode } from '../../utils';
import { IProject } from '../../interfaces';
import { SubscribeModal } from '../../components/nav/SubscribeModal';
import { RecipientButton } from './components/RecipientButton';

export const Grants = ({ project }: { project: IProject }) => {
	const isMedium = isMediumScreen();
	const isMobile = isMobileMode();
	const {isOpen, onOpen, onClose} = useDisclosure();
	return (
		<>
			<Box py={isMedium ? 10 : 20} px={isMedium ? '0px' : '150px'}>

				<Box display={isMedium ? 'block' : 'flex'} justifyContent="center" alignItems="center">

					<Box w={isMedium ? '100%' : '45%'}>
						<Text fontSize="xl" color="#6E6E6E" fontWeight="bold" textAlign={isMedium ? 'center' : 'left'}>ROUND 1: {project.name === 'bitcoin-education' ? 'JULY 1-31' : ''}</Text>
						<Text fontSize="4xl" fontWeight="bold" textAlign={isMedium ? 'center' : 'left'}>{project.title}</Text>
						<Image w={isMobile ? '350px' : '425px'} rounded="md" src={project.media[0] && project.media[0]} alt="grant" margin={isMedium ? '0 auto' : ''}/>
					</Box>

					<Box w={isMedium ? '90%' : '35%'} margin={isMedium ? '0 auto' : ''}>
						<Text fontSize="lg" textAlign="justify" my={isMobile ? 2 : 0}>{project.description}</Text>
						<Box boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)" rounded="lg" p={6} mt={6}>
							<HStack justifyContent="space-around" alignItems="center" my={3}>

								<Box>
									<HStack justifyContent="center" alignItems="center">
										<SatoshiIcon scale={0.8}/><Text fontWeight="bold" fontSize="lg">{(project.balance / 1000000).toFixed(1)} M</Text>
									</HStack>
									<Text fontSize="sm" color="#5B5B5B" fontWeight="bold">CONTRIBUTED</Text>
								</Box>

								<Box>
									<HStack justifyContent="center">
										<SatoshiIcon scale={0.8} /><Text fontWeight="bold" fontSize="lg">{project.name === 'bitcoin-education' ? (0 / 1000000).toFixed(1) : (0 / 1000000).toFixed(1)} M</Text>
									</HStack>
									<Text fontSize="sm" color="#5B5B5B" fontWeight="bold">DISTRIBUTED</Text>
								</Box>

								<Box>
									<Text fontWeight="bold" textAlign="center" fontSize="lg">{project.grantees ? project.grantees.length : 0}</Text>
									<Text fontSize="sm" color="#5B5B5B" fontWeight="bold">APPLICANTS</Text>
								</Box>

							</HStack>
							<Box display="flex" justifyContent="center">
								<RecipientButton active={false} title="Apply"/>
							</Box>
						</Box>
					</Box>
				</Box>

				<Box w={isMedium ? '90%' : '80%'} margin="0 auto" mt={20}>
					<Text fontSize="2xl" fontWeight="bold" mb={2}>A trusted board of hardcore Bitcoiners</Text>

					<HStack>
						<Box key="brad" display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" p={2} width="200px" height="200px" rounded="md" shadow="md">
							<Box>
								<Box display="flex" justifyContent="center" alignItems="center">
									<Link isExternal href={'https://twitter.com/bradmillsca'}>
										<Avatar size="xl" src={'https://pbs.twimg.com/profile_images/1497292658729013259/pKOWQaD2_400x400.jpg'}/>
									</Link>
								</Box>
								<Text mt={4} fontSize="lg" fontWeight="bold" textAlign="center">Brad Mills</Text>
							</Box>
						</Box>,
					</HStack>

					<Text fontSize="lg" mt={4}>We are bringing together a board of hardcore Bitcoiners that have a history of supporting Bitcoin education and media creation. At the end of the Round they will be reviewing the applications and deciding how the funds should be distributed.</Text>
				</Box>

				<Box display={isMedium ? 'block' : 'flex'} justifyContent="center" alignItems="center" mt={20}>
					<Box w={isMedium ? '90%' : '45%'} pr={isMedium ? 0 : 20} margin={isMedium ? '0 auto' : ''}>
						<Text fontSize="2xl" fontWeight="bold" mb={2}>Massive impact</Text>
						<Text fontSize="lg">Want to help spread the good work of Bitcoin out and wide? Why not support Bitcoin educators through this Geyser Grant? Join the growing number of whales and plebs donating to this Geyser Grant (currently on-chain only). Learn more <Link isExternal href="https://geyser.notion.site/Geyser-Grants-Applicants-fad8a130545d4597a3750a17a7ce301f" textDecoration="underline">here</Link>, and reach out to the Team <Link isExternal href="https://t.me/bradmillscandoit" textDecoration="underline">here</Link>.</Text>
					</Box>

					<Box w={isMedium ? '90%' : '35%'} boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)" rounded="lg" p={6} margin={isMedium ? '0 auto' : ''}>
						<HStack justifyContent="space-around" alignItems="center" my={3}>

							<Box>
								<HStack justifyContent="center" alignItems="center">
									<SatoshiIcon scale={0.8}/><Text fontWeight="bold" fontSize="lg">{(project.balance / 1000000).toFixed(1)} M</Text>
								</HStack>
								<Text fontSize="sm" color="#5B5B5B" fontWeight="bold">CONTRIBUTED</Text>
							</Box>

							<Box>
								<Text fontWeight="bold" textAlign="center" fontSize="lg">{project.funders ? project.funders.length : 0}</Text>
								<Text fontSize="sm" color="#5B5B5B" fontWeight="bold">CONTRIBUTORS</Text>
							</Box>

						</HStack>
						<Box display="flex" justifyContent="center">
							<ButtonComponent primary standard w={isMedium ? '300px' : '400px'}>Contribute</ButtonComponent>
						</Box>
					</Box>

				</Box>

				<VStack margin="0 auto" w={isMedium ? '90%' : '35%'} mt={20}>
					<Text fontWeight="bold" fontSize="2xl">Stay up to date with Geyser Grants</Text>
					<Text>Get news on new and upcoming Grants before anyone else.</Text>
					<ButtonComponent primary standard w={isMedium ? '300px' : '400px'} onClick={onOpen}>Subscribe</ButtonComponent>
				</VStack>
				<SubscribeModal {...{isOpen, onClose}} />
			</Box>
			<Footer/>
		</>
	);
};
