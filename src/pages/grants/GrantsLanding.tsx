import React, { useEffect } from 'react';
import { Box, Text, Link, Skeleton } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { Footer } from '../../components/molecules';
import { GrantCard } from './components/GrantCard';
import { QUERY_GRANTS } from '../../graphql';
import { ComingSoon } from './components/ComingSoon';
import BtcDevIcon from '../../assets/btc-dev.png';
import BtcCultureIcon from '../../assets/btc-culture.png';
import { isMobileMode, isMediumScreen, useNotification } from '../../utils';
import { IProject } from '../../interfaces';
import { Subscribe } from '../../components/nav/Subscribe';

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

	return (
		<>
			<Box pb={20} pt={isMobile ? 5 : 10}>
				<Box width={isMobile ? '90%' : isMedium ? '75%' : '60%'} margin="0 auto" my={5}>
					<Text fontSize="4xl" fontWeight="bold">Geyser Grants</Text>
					<Text fontSize="lg">It’s not always easy for individuals and institutions to donate to single Geyser campaigns. So, with Grants anyone can now contribute to a particular cause without having to look in detail into every specific project and verify the creator’s credentials. The Geyser Fund Board will look at and beyond Geyser campaigns to select the most impactful projects that support these causes. Read more <Link isExternal href="https://geyser.notion.site/Geyser-Grants-Applicants-fad8a130545d4597a3750a17a7ce301f" textDecoration="underline">here</Link>.</Text>
				</Box>

				<Box display="flex" justifyContent="center" alignItems="center" px={isMobile ? 0 : 20}>
					<Box overflow="auto" w={isMobile ? '95%' : '1376px'} display="flex" px={2}>
						{(!loading && grants.length > 0) && grants.map((grant: IProject) => {
							if (!grant.active) {
								return;
							}

							return (<GrantCard key={grant.id} project={grant} number="1" date="JULY 1 - 31" distributed={grant.name === 'bitcoin-education' ? (0 / 1000000).toFixed(1) : (0 / 1000000).toFixed(1)} />);
						})}
						{loading
							? <>
								<Box>
									<Skeleton w={isMobile ? '275px' : '400px'} h={isMobile ? '438px' : '563px'} my={10} mr={isMobile ? 10 : 20}/>
								</Box>
								<Box>
									<Skeleton w={isMobile ? '275px' : '400px'} h={isMobile ? '438px' : '563px'} my={10} mr={isMobile ? 10 : 20}/>
								</Box>
								<Box>
									<Skeleton w={isMobile ? '275px' : '400px'} h={isMobile ? '438px' : '563px'} my={10} />
								</Box>
							</>
							: <>
								<ComingSoon title="Bitcoin Culture" image={BtcCultureIcon} number="1" marginRight={true}/>
								<ComingSoon title="Bitcoin Developers" image={BtcDevIcon} number="1" />
							</>
						}
					</Box>
				</Box>

				<Box display="flex" justifyContent="center" mt={10} px={2}>
					<Subscribe style="inline" />
				</Box>

			</Box>

			<Footer/>

		</>
	);
};
