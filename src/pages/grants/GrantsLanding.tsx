/* eslint-disable complexity */

import React, { useEffect } from 'react';
import { Box, Text, Skeleton, Link, Image, VStack } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { Footer } from '../../components/molecules';
import { GrantCard } from './components/GrantCard';
import { Board } from './components/Board';
import { QUERY_GRANTS } from '../../graphql';
import GrantsHeader from '../../assets/grants-header.webp';
import { isMobileMode, isMediumScreen, useNotification } from '../../utils';
import { IProject } from '../../interfaces';
import { Subscribe } from '../../components/nav/Subscribe';
import { fonts } from '../../constants/fonts';
import { ButtonComponent, TwitterComponent } from '../../components/ui';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { ContributeButton } from './components/ContributeButton';

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
		if (grantA.name === 'bitcoineducation') {
			return -1;
		}

		return 0;
	};

	const grantsSorted = [...grants].sort(grantsSort);

	return (
		<>
			<Box pb={20} paddingTop={isMobile ? '81px' : '91px'} backgroundImage={GrantsHeader} backgroundSize="contain" backgroundRepeat="no-repeat">
				<Box width={isMobile ? '90%' : isMedium ? '75%' : '35%'} margin="0 auto" my={5}>
					<Text fontSize={isMobile ? '4xl' : '55px'} fontWeight="medium" textAlign="center">Geyser Grants</Text>
					<Text fontFamily={fonts.interBlack} fontSize={isMobile ? '3xl' : '5xl'} fontWeight="900" textAlign="center">ROUND 1</Text>
					<Text fontSize={isMobile ? '3xl' : '5xl'} fontWeight="light" textAlign="center">JULY 1-31</Text>
					<Text fontSize="4xl" fontWeight="bold" textAlign="center" mt={8}>A new era for Bitcoin grants</Text>
					<Text textAlign="justify" fontSize="lg">Bitcoin is signal, everything else is noise. We created Geyser Grants to help broadcast loud and clear Bitcoin signal to the world. That is, to accelerate the growth of the Bitcoin ecosystem by increasing Bitcoin awareness, enabling Bitcoin culture, and supporting needed development in this space.  Through these grants, we will be supporting Bitcoin educators, developers, entrepreneurs, and creatives with the resources they need to bootstrap their initiatives worldwide.
						<br/><br/>
						To bring this vision to life, we accept Bitcoin contributions for each individual grant and take no fees at this stage. When the Round goes live, applications will be opened and they will be evaluated once the Rounds close. Geyser will not charge any fees in the first Rounds but may in the future start charging admin fees to cover expenses. For more information, see <Link textDecoration="underline" href="https://geyser.notion.site/Geyser-Grants-Applicants-fad8a130545d4597a3750a17a7ce301f">here</Link>.
					</Text>
				</Box>
				<Box display="flex" justifyContent="center" alignItems="center" px={isMobile ? 0 : 20}>
					<Box overflow="auto" w={isMobile ? '95%' : '1226px'} display="flex" px={2}>
						{(!loading && grants.length > 0) && grantsSorted.map((grant: IProject) => {
							if (!grant.active) {
								return;
							}

							return (<GrantCard key={grant.id} project={grant} number="1" date="JULY 1 - 31" distributed={grant.name === 'bitcoineducation' ? (0 / 1000000).toFixed(0) : grant.name === 'bitcoinculture' ? (0 / 1000000).toFixed(0) : grant.name === 'bitcoinbuilders' ? (0 / 1000000).toFixed(0) : ''} status={'complete'} marginRight={grant.name !== 'bitcoinculture' && true} />);
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
						{/* <ContributeButton active={grants[0].active} title="Contribute" project={grants[0]}/> */}
					</Box>
				</Box>
				<Box width={isMobile ? '90%' : isMedium ? '75%' : '35%'} display="flex" justifyContent="center" justifyItems="center" margin="0 auto">
					<VStack>
						<Text fontSize="4xl" fontWeight="bold" textAlign="center" mt={8}>Round 1 Announcement</Text>
						<Text textAlign="justify" fontSize="lg">The Geyser Grant Round 1 winners have been released. <Link _hover={{textDecoration: 'none'}} isExternal href="https://twitter.com/geyserfund/status/1567537222005530625?s=20&t=ubMlkMfNudkbogo-IKhkHw">Check out our Twitter announcement.</Link></Text>
						<Image htmlHeight={450} htmlWidth={800} src="https://storage.googleapis.com/geyser-projects-media/grants/geyser-grants-round-1-results.jpeg"></Image>
						<Link margin="0 auto" w="87px" _hover={{textDecoration: 'none'}} isExternal href="https://twitter.com/geyserfund/status/1567537222005530625" display="flex" justifyContent="center" alignItems="center">
							<ButtonComponent fontSize="lg">Announcement<ExternalLinkIcon w={4} h={4} ml={1} mt={0.5}/></ButtonComponent>
						</Link>
					</VStack>
				</Box>
				<Box width={isMobile ? '90%' : isMedium ? '75%' : '50%'} margin="0 auto" mt={10} mb={20}>
					<Text fontSize="3xl" fontWeight="bold" mb={2} textAlign="center">A board of principled Bitcoiners</Text>
					<Text fontSize="lg" textAlign="justify" mb={2}>We are bringing together a board of Bitcoiners that have a history of supporting the Bitcoin ecosystem. At the end of the Round, they will review the applications through a set of criteria, which will be revealed at a later date, and establish how the funds should be distributed.</Text>
					<Board/>
				</Box>
				<Box width={isMobile ? '90%' : isMedium ? '75%' : '50%'} margin="0 auto" mt={10} mb={20}>
					<Text fontSize="3xl" fontWeight="bold" mb={2} textAlign="center">Have questions?</Text>
					<Link margin="0 auto" w="87px" _hover={{textDecoration: 'none'}} isExternal href="https://geyser.notion.site/Geyser-Grants-Applicants-fad8a130545d4597a3750a17a7ce301f" display="flex" justifyContent="center" alignItems="center">
						<ButtonComponent fontSize="lg">FAQ <ExternalLinkIcon w={4} h={4} ml={1} mt={0.5}/></ButtonComponent>
					</Link>
				</Box>

				<Box display="flex" justifyContent="center" mt={10} px={4}>
					<Subscribe style="inline" interest="grants" titleSize="3xl"/>
				</Box>
			</Box>

			<Footer/>

		</>
	);
};
