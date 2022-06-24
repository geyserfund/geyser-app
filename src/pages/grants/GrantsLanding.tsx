/* eslint-disable complexity */

import React, { useEffect } from 'react';
import { Box, Text, Skeleton, HStack, Avatar, Link } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { Footer } from '../../components/molecules';
import { GrantCard } from './components/GrantCard';
import { QUERY_GRANTS } from '../../graphql';
import GrantsHeader from '../../assets/grants-header.webp';
import { isMobileMode, isMediumScreen, useNotification } from '../../utils';
import { IProject } from '../../interfaces';
import { Subscribe } from '../../components/nav/Subscribe';
import Brad from '../../assets/brad.png';
import { fonts } from '../../constants/fonts';

export const GrantsLanding = () => {
	const isMobile = isMobileMode();
	const isMedium = isMediumScreen();
	const { toast } = useNotification();

	const { loading, error, data } = useQuery(QUERY_GRANTS, {
		variables: { where: { type: 'grant' }},
	});

	const grants = (data && data.projects.projects) || [];

	useEffect(() => {
		if (error) {
			toast({
				title: 'Could not load projects',
				description: 'Please refresh the page',
				status: 'error',
			});
		}
	}, [error]);

	const grantsSort = (grantA: IProject) => {
		if (grantA.name === 'bitcoin-education') {
			return -1;
		}

		return 0;
	};

	const grantsSorted = [...grants].sort(grantsSort);

	return (
		<>
			<Box pb={20} pt={isMobile ? 5 : 10} backgroundImage={GrantsHeader} backgroundSize="contain" backgroundRepeat="no-repeat">
				<Box width={isMobile ? '90%' : isMedium ? '75%' : '35%'} margin="0 auto" my={5}>
					<Text fontSize={isMobile ? '4xl' : '55px'} fontWeight="medium" textAlign="center">Geyser Grants</Text>
					<Text fontFamily={fonts.interBlack} fontSize={isMobile ? '3xl' : '5xl'} fontWeight="900" textAlign="center">ROUND 1</Text>
					<Text fontSize={isMobile ? '3xl' : '5xl'} fontWeight="light" textAlign="center">JULY 1-31</Text>
					<Text fontSize="4xl" fontWeight="bold" textAlign="center" mt={8}>A new era for Bitcoin grants</Text>
					<Text textAlign="justify" fontSize="lg">Bitcoin is signal, everything else is noise. We created Geyser Grants to help broadcast loud and clear Bitcoin signal to the world. That is, to accelerate the growth of the Bitcoin ecosystem by increasing Bitcoin awarenes, enabling Bitcoin culture, and supporting needed development in this space.  Through these grants, we will be supporting Bitcoin educators, developers, entrepreneurs, and creatives with the resources they need to bootstrap their initiatives worldwide.
						<br/><br/>
					To bring this vision to life, we accept accept Bitcoin contributions for each individual grant and take no fees at this stage. When the Round goes live, applications will be opened and they will be evaluated once the Rounds close. For more information, see <Link textDecoration="underline" href="https://geyser.notion.site/Geyser-Grants-Applicants-fad8a130545d4597a3750a17a7ce301f">here</Link>.
					</Text>
				</Box>

				<Box display="flex" justifyContent="center" alignItems="center" px={isMobile ? 0 : 20}>
					<Box overflow="auto" w={isMobile ? '95%' : '1226px'} display="flex" px={2}>
						{(!loading && grants.length > 0) && grantsSorted.map((grant: IProject) => {
							if (!grant.active) {
								return;
							}

							return (<GrantCard key={grant.id} project={grant} number="1" date="JULY 1 - 31" distributed={grant.name === 'bitcoin-education' ? (0 / 1000000).toFixed(0) : grant.name === 'bitcoin-culture' ? (0 / 1000000).toFixed(0) : grant.name === 'bitcoin-builders' ? (0 / 1000000).toFixed(0) : ''} status={'pending'} marginRight={grant.name !== 'bitcoin-culture' && true} />);
						})}
						{loading
							&& <>
								<Box>
									<Skeleton w={isMobile ? '325px' : '350px'} h={isMobile ? '527px' : '552px'} my={10} mr={isMobile ? 10 : 20}/>
								</Box>
								<Box>
									<Skeleton w={isMobile ? '325px' : '350px'} h={isMobile ? '527px' : '552px'} my={10} mr={isMobile ? 10 : 20}/>
								</Box>
								<Box>
									<Skeleton w={isMobile ? '325px' : '350px'} h={isMobile ? '527px' : '552px'} my={10} />
								</Box>
							</>
						}
					</Box>
				</Box>

				<Box width={isMobile ? '90%' : isMedium ? '75%' : '50%'} margin="0 auto" mt={10} mb={20}>
					<Text fontSize="3xl" fontWeight="bold" mb={2} textAlign="center">A board of hardcore Bitcoiners</Text>
					<Text fontSize="lg" mb={4} textAlign="justify">We are bringing together a board of Bitcoin maxis that have a history of supporting the Bitcoin ecosystem. At the end of the Round, they will review the applications through a set of criteria, which will be revealed at a later date, and establish how the funds should be distributed.</Text>

					<HStack>
						<Box key="brad" display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" p={2} mr={2} width="200px" height="200px" rounded="md" boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)" _hover={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)'}}>
							<Box>
								<Box display="flex" justifyContent="center" alignItems="center">
									<Avatar size="xl" src={Brad}/>
								</Box>
								<Text mt={4} mb={1} fontSize="lg" fontWeight="bold" textAlign="center">Brad Mills</Text>
								<Link _hover={{textDecoration: 'none'}} isExternal href="https://twitter.com/bradmillsca" color="#4C9AF4">@bradmillscan</Link>
							</Box>
						</Box>
						<Box key="placeholder" display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" p={2} width="200px" height="200px" rounded="md" boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)" _hover={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)'}}>
							<Box>
								<Box display="flex" justifyContent="center" alignItems="center">
									<Avatar size="xl" src="" bg="brand.bgGrey3" />
								</Box>
								<Box mt={4} mb={1} h="43px" w="111px" bg="brand.bgGrey3" borderRadius="md" />
							</Box>
						</Box>
					</HStack>

				</Box>

				<Box display="flex" justifyContent="center" mt={10} px={4}>
					<Subscribe style="inline" interest="grants" titleSize="3xl"/>
				</Box>

			</Box>

			<Footer/>

		</>
	);
};
