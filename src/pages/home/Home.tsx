import React, { useEffect } from 'react';
import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import {
	// ButtonComponent, Linkin,
	SatoshiAmount } from '../../components/ui';
import { Footer, SwipeLiveProject,
	//  ProjectCard, ProjectComingSoon
} from '../../components/molecules';
import { isDarkMode, isMobileMode, useNotification } from '../../utils';
// Import { fonts } from '../../constants/fonts';
import {
	colors,
	// GeyserHomeCoin1, geyserHomeCoin2, geyserHomeLogo,
	LaunchImageUrl,
	// StartCrowdFundUrl, SubscribeUrl,
} from '../../constants';
import { createUseStyles } from 'react-jss';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS, ALL_PROJECTS_SUMMARY } from '../../graphql';
import { ProjectBars } from '../../components/molecules/ProjectBars';
import { IProject } from '../../interfaces';
// Import { useQuery } from '@apollo/client';
// import { QUERY_PROJECTS } from '../../graphql';
// import Loader from '../../components/ui/Loader';
// import { IProject } from '../../interfaces';

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
		boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
		borderRadius: '4px',
		justifyContent: 'space-between',
		maxWidth: '940px',
	},
	boldText: ({isMobile}) => ({
		fontSize: isMobile ? '22px' : '24px',
		fontWeight: '600',
		color: colors.normalLightGreen,
	}),
	sectionTitle: {
		fontSize: '16px',
		color: colors.textGrey,
	},
	subtitleText: ({isMobile}) => ({
		fontSize: isMobile ? '14px' : '16px',
		fontWeight: 500,
	}),
});

export const Home = () => {
	const isMobile = isMobileMode();
	const isDark = isDarkMode();
	const { toast } = useNotification();

	const classes = useStyles({ isMobile: isMobileMode() });

	const { loading, error, data } = useQuery(QUERY_PROJECTS);
	const { loading: summaryLoading, error: summaryError, data: summaryData } = useQuery(ALL_PROJECTS_SUMMARY);

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

	// Const project = projects && projects.length > 0 ? projects[randomIntFromInterval(0, (projects.length - 1))] : null;

	const closedProjects = projects.filter((project: IProject) => !project.active);
	const activeProjects = projects.filter((project: IProject) => project.active);

	console.log('checking summary', summary);
	return (
		<VStack
			background={isDark ? 'brand.bgHeavyDarkMode' : 'brand.bgGrey4'}
			position="relative"
			padding="0px 0px"
		>
			<VStack
				spacing="40px"
				width="100%"
				maxWidth="1444px"
				padding={isMobile ? '0px 10px' : '0px 40px'}
				marginBottom="40px"
				display="flex"
				flexDirection="column"
				alignItems="flex-start"
			>
				<Box
					display="flex"
					flexDirection={isMobile ? 'column-reverse' : 'row'}
					justifyContent="space-between"
					width="100%"
					marginTop={isMobile ? '15px' : '40px'}
					marginBottom="45px"
					alignSelf="center"
				>
					<VStack alignItems="flex-start" spacing="25px">
						<VStack spacing={0} alignItems="flex-start">
							<Text fontSize={isMobile ? '33px' : '37px'} fontWeight={700}>
								Bitcoin ideas can change the world.
							</Text>
							<Text fontSize={isMobile ? '33px' : '37px'} fontWeight={700}>
								Play a part by funding them on Geyser.
							</Text>
						</VStack>
						<Text fontSize={isMobile ? '18px' : '20px'} maxWidth="940px" fontWeight={500}>
						Geyser is a global crowdfunding platform that helps Bitcoin builders and creators with the funding their projects need to burst out into the world.
						</Text>
						<HStack className={classes.pageStats} padding={isMobile ? '50px 20px' : '50px 70px'}>
							{
								summaryLoading
									? <><VStack>
										<Text className={classes.boldText}>loading state</Text>
										<Text className={classes.subtitleText}>Projects</Text>
									</VStack><VStack>
										<SatoshiAmount color="brand.primary" fontSize="22px" className={classes.boldText}>loading state</SatoshiAmount>
										<Text className={classes.subtitleText}>Sats</Text>
									</VStack><VStack>
										<Text className={classes.boldText}>loading state</Text>
										<Text className={classes.subtitleText}>Plebs</Text>
									</VStack></>
									: <><VStack>
										<Text className={classes.boldText}>{summary.projectsCount}</Text>
										<Text className={classes.subtitleText}>Projects</Text>
									</VStack><VStack>
										<SatoshiAmount color="brand.primary" fontSize="22px" className={classes.boldText}>{summary.fundedTotal}</SatoshiAmount>
										<Text className={classes.subtitleText}>Sats</Text>
									</VStack><VStack>
										<Text className={classes.boldText}>{summary.fundersCount}</Text>
										<Text className={classes.subtitleText}>Plebs</Text>
									</VStack></>
							}

						</HStack>
					</VStack>
					<Box display="flex" justifyContent={isMobile ? 'flex-start' : 'flex-end'} minWidth="305px" >
						<Image src={LaunchImageUrl} maxHeight="320px"/>
					</Box>
				</Box>
				<VStack alignItems="flex-start" width="100%">
					<Text className={classes.sectionTitle}>FEATURED</Text>
					<HStack width="100%" justifyContent="center">
						<SwipeLiveProject loading={loading} projects={[...activeProjects, ...activeProjects, ...activeProjects, ...activeProjects]}/>
					</HStack>
				</VStack>
				<VStack alignItems="flex-start" width="100%">
					<Text className={classes.sectionTitle}>LIVE PROJECTS</Text>
					<ProjectBars loading={loading} projects={[...activeProjects, ...activeProjects, ...activeProjects, ...activeProjects, ...activeProjects]} />
				</VStack>
				<VStack alignItems="flex-start" width="100%" position="relative">
					<Text className={classes.sectionTitle}>CLOSED PROJECTS</Text>
					<ProjectBars loading={loading} projects={[...closedProjects]} />
				</VStack>
				{/* <Box width="100%" display="flex" justifyContent="center">
					<Image src={geyserHomeLogo} height="250px" />
				</Box>
				<Box width="100%" fontFamily={fonts.header} fontWeight={700} textAlign={'center'} paddingBottom={'20px'}>
					<Text className={classes.headers}>Let’s change the world with</Text>
					<Text className={classes.headers}>Bitcoin crowdfunding</Text>
				</Box>
				<Text className={classes.titles}>
					Good ideas can change the world, Geyser helps you fund and play a part in them.
				</Text>
				<Text className={classes.texts}>
					Geyser is a global and user-friendly crowdfunding platform, that helps creators to get the funding they need for their projects to burst out with great force into the world (just like geysers!). Explore live crowdfunding projects, fund them on Bitcoin’s lightning network, and keep track of the projects.
				</Text>
				<Linkin href={SubscribeUrl} isExternal width="100%" >
					<ButtonComponent
						standard
						isFullWidth
						fontSize="15px"
					>
						Subscribe
					</ButtonComponent>
				</Linkin>

				<Box width="100%" display="flex" justifyContent="center">
					<Image src={geyserHomeCoin1} height="150px" />
				</Box>
				<VStack width="100%" alignItems="flex-start">
					<Text className={classes.titles}>
						Fund live projects
					</Text>
					{
						loading
							? <Loader width="100%"/>
							: <HStack
								overflowX={'auto'}
								width="100%"
								paddingTop="5px"
								paddingBottom="20px"
								spacing="15px"
							>
								{ projects.map((project: IProject) => (
									<ProjectCard
										key={project.id}
										open
										title={project.title}
										name={project.name}
										project={project}
										imgSrc={project.media[0]}
									/>
								))
								}
								<ProjectComingSoon />
							</HStack>
					}

				</VStack>
				<Text className={classes.titles}>
					Get funded by Bitcoiners around the world to bring your ideas to life
				</Text>
				<Text className={classes.texts}>
					Are you a creator or entrepreneur looking for the funds needed to realize your ideas? No matter where you are in the world, Geyser now makes it easy for you to create and commit to a time-bound crowdfund, and allow supporters to fund and keep track of your project. Get started by submitting an idea to crowdfund on Geyser here.
				</Text>
				<Linkin href={StartCrowdFundUrl} isExternal width="100%" >
					<ButtonComponent
						standard
						primary
						isFullWidth
						fontSize="15px"
					>
						Start a crowdfund
					</ButtonComponent>
				</Linkin>
				<Box width="100%" display="flex" justifyContent="center">
					<Image src={geyserHomeCoin2} height="150px" />
				</Box>
				<Text className={classes.titles}>
					Why Geyser?
				</Text>
				<Box paddingBottom="50px">
					<Text className={classes.texts}>
						Geyser was inspired by a natural phenomena: the piling up of heat and pressure which ejects water turbulently up into the sky, in a beautiful display of energy. We believe that crowds have the power to do the same with ideas by throwing forth intermittend displays of solidarity and support until projects gush out from theory to practice.
					</Text>
				</Box> */}
			</VStack>
			<Footer />
		</VStack >
	);
};
