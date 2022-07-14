import React, { useEffect, useState } from 'react';
import { Box, HStack, Image, Text, VStack, Skeleton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import {
	SatoshiAmount,
} from '../../components/ui';
import {
	Footer, SwipeLiveProject,
} from '../../components/molecules';
import { isDarkMode, isMobileMode, useNotification } from '../../utils';
import {
	colors,
} from '../../constants';
import { createUseStyles } from 'react-jss';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS, ALL_PROJECTS_SUMMARY } from '../../graphql';
import { ProjectBars } from '../../components/molecules';
import { IProject } from '../../interfaces';
import { SatoshiIconTilted } from '../../components/icons';
import Dorian from '../../assets/dorian.png';
import GrantsBanner from '../../assets/grants-banner.png';
import { useHistory } from 'react-router';

type RuleNames = string

interface IStyleProps {
	isMobile?: boolean
}

const useStyles = createUseStyles<RuleNames, IStyleProps>({

	headers: ({ isMobile }: IStyleProps) => ({
		fontSize: isMobile ? '30px' : '40px',
	}),
	titles: ({ isMobile }: IStyleProps) => ({
		fontSize: isMobile ? '20px' : '25px',
		fontWeight: 600,
	}),
	texts: ({ isMobile }: IStyleProps) => ({
		fontSize: isMobile ? '15px' : '20px',
	}),
	pageStats: {
		width: '100%',
		height: '80px',
		background: 'white',
		boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
		borderRadius: '4px',
		justifyContent: 'space-between',
		maxWidth: '910px',
	},
	boldText: {
		fontSize: '22px',
		fontWeight: 'bold',
		color: colors.normalLightGreen,
	},
	sectionTitle: {
		fontSize: '16px',
		color: colors.textGrey,
	},
	subtitleText: {
		fontSize: '12px',
		fontWeight: 500,
		color: '#2B2A2A',
	},
});

export const Home = () => {
	const isMobile = isMobileMode();
	const isDark = isDarkMode();
	const { toast } = useNotification();
	const history = useHistory();
	const classes = useStyles({ isMobile: isMobileMode() });

	const { loading, error, data } = useQuery(QUERY_PROJECTS);
	const { loading: summaryLoading, error: summaryError, data: summaryData } = useQuery(ALL_PROJECTS_SUMMARY);

	/*
	Banner logic
	*/
	const hideBanner = localStorage.getItem('hideBanner');
	const showBanner = !(hideBanner && hideBanner === 'true');
	const [banner, setBanner] = useState(showBanner);

	const hideBannerCached = () => {
		localStorage.setItem('hideBanner', 'true');
		setBanner(false);
	};

	/*
	Error handling logic
	*/
	useEffect(() => {
		if (error) {
			toast({
				title: 'Could not load projects',
				description: 'Please refresh the page',
				status: 'error',
			});
		}
	}, [error]);

	useEffect(() => {
		if (summaryError) {
			toast({
				title: 'Could not load summary data',
				description: 'Please refresh the page',
				status: 'error',
			});
		}
	}, [error]);

	const projects = (data && data.projects.projects) || [];

	const summary = (summaryData && summaryData.projectsSummary) || {};

	const closedProjects = projects.filter((project: IProject) => !project.active);
	const activeProjects = projects.filter((project: IProject) => project.active);

	return (
		<VStack
			background={isDark ? 'brand.bgHeavyDarkMode' : 'brand.bgGrey4'}
			position="relative"
			paddingTop={isMobile ? '61px' : '71px'}
			height="100%"
			justifyContent="space-between"
		>
			<VStack
				spacing="40px"
				width="100%"
				maxWidth="1370px"
				padding={isMobile ? '0px 10px' : '0px 40px'}
				marginBottom="40px"
				display="flex"
				flexDirection="column"
				alignItems="flex-start"
			>
				{banner
					&& <Box position="relative" marginTop={isMobile ? '15px' : '30px'}>
						<CloseIcon position="absolute" top="15px" right="15px" cursor="pointer" color="black" onClick={() => hideBannerCached()} />
						<Image src={GrantsBanner} alt="geyser grants" borderRadius="sm" cursor="pointer" onClick={() => history.push('/grants')} />
					</Box>
				}
				<Box
					display="flex"
					flexDirection={isMobile ? 'column-reverse' : 'row'}
					justifyContent="space-between"
					width="100%"
					marginTop={isMobile ? '15px' : '30px'}
					alignSelf="center"
					paddingBottom="20px"
				>
					<VStack alignItems="flex-start" spacing="25px">
						<VStack spacing={0} alignItems="flex-start">
							<Text lineHeight="40px" fontSize={isMobile ? '33px' : '35px'} fontWeight={700}>
								Bitcoin ideas can change the world.
							</Text>
							<Text lineHeight="40px" fontSize={isMobile ? '33px' : '35px'} fontWeight={700}>
								Play a part by funding them on Geyser.
							</Text>
						</VStack>
						<Text fontSize={isMobile ? '18px' : '19px'} maxWidth="910px" fontWeight={500} marginTop="15px !important">
							Geyser is a global crowdfunding platform that helps Bitcoin builders and creators to fund their ideas.
						</Text>
						<HStack className={classes.pageStats} padding={isMobile ? '50px 20px' : '50px 70px'}>
							{
								summaryLoading
									? <>
										<VStack>
											<Skeleton w="50px" h="25px"/>
											<Text className={classes.subtitleText}>PROJECTS</Text>
										</VStack>
										<VStack>
											<Skeleton w="100px" h="25px"/>
											<Text className={classes.subtitleText}>SATS RAISED</Text>
										</VStack><VStack>
											<Skeleton w="50px" h="25px"/>
											<Text className={classes.subtitleText}>PLEBS</Text>
										</VStack></>
									: <>
										<VStack>
											<Text className={classes.boldText}>{summary.projectsCount}</Text>
											<Text className={classes.subtitleText}>PROJECTS</Text>
										</VStack>
										<VStack>
											<Box display="flex" alignItems="center">
												<SatoshiIconTilted color="brand.primary" />
												<SatoshiAmount color="brand.primary" fontSize="22px" className={classes.boldText} loading>{summary.fundedTotal}</SatoshiAmount>
											</Box>
											<Text className={classes.subtitleText}>SATS RAISED</Text>
										</VStack><VStack>
											<Text className={classes.boldText}>{summary.fundersCount}</Text>
											<Text className={classes.subtitleText}>PLEBS</Text>
										</VStack>
									</>
							}
						</HStack>
					</VStack>
					<Box display="flex" justifyContent={isMobile ? 'flex-start' : 'flex-end'} minWidth="305px" >
						<Image src={Dorian} maxHeight="250px" />
					</Box>
				</Box>
				<VStack alignItems="flex-start" width="100%" spacing="0px">
					<Text className={classes.sectionTitle}>FEATURED</Text>
					<HStack width="100%" justifyContent="center" >
						<SwipeLiveProject loading={loading} projects={[...activeProjects]} />
					</HStack>
				</VStack>
				<VStack alignItems="flex-start" width="100%" spacing="15px">
					<Text className={classes.sectionTitle}>LIVE PROJECTS</Text>
					<ProjectBars loading={loading} projects={[...activeProjects]} />
				</VStack>
				{/* Removing the closed projects for now */}
				{/* <VStack alignItems="flex-start" width="100%" position="relative" spacing="15px">
					<Text className={classes.sectionTitle}>CLOSED PROJECTS</Text>
					<ProjectBars loading={loading} projects={[...closedProjects]} />
				</VStack> */}
			</VStack>
			<Footer />
		</VStack >
	);
};
