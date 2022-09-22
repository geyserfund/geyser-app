import { Box, Text, VStack, HStack } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { ProjectBalanceCircularProgress, ProjectBalance, ActivityBrief, ProjectActivityActionsToolbar } from '../../../components/molecules';
import { IdBar } from '../../../components/molecules/IdBar';
import { IdBarLeaderboard } from '../../../components/molecules/IdBarLeaderboard';
import { FundingStatus, ButtonComponent } from '../../../components/ui';
import { SatoshiIconTilted } from '../../../components/icons';
import { isMobileMode } from '../../../utils';
import { Button, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

import { useStyles } from './styles';
import { IProject, IFundingTx, IFunder } from '../../../interfaces';
import { Countdown } from './Countdown';

interface IInfoPage {
    project: IProject;
    handleViewClick: () => void;
    handleFundProject: () => void;
    loading: boolean;
    btcRate: number;
    fundingTxs: IFundingTx[]
    funders: IFunder[]
	test?:boolean
}

export const InfoPage = ({
	handleViewClick,
	handleFundProject,
	loading,
	project,
	btcRate,
	fundingTxs,
	funders,
	test,
}: IInfoPage) => {
	const isMobile = isMobileMode();
	const classes = useStyles({isMobile});
	const [view, setView] = useState('activity');

	const leaderboardSort = (funderA: IFunder, funderB: IFunder) => {
		if (funderA.amountFunded > funderB.amountFunded) {
			return -1;
		}

		if (funderA.amountFunded < funderB.amountFunded) {
			return 1;
		}

		return 0;
	};

	const fundersCopy = [...funders];

	const sortedFunders: IFunder[] = fundersCopy.sort(leaderboardSort);

	if (test) {
		return <InfoPageSkeleton />;
	}

	return (
		<VStack
			padding={isMobile ? '10px 5px 0px 5px' : '10px 20px'}
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"
			position="relative"
		>
			{/* <FundingStatus open={project.active} /> */}

			{/* {project.fundingGoal
				?  */}
			<ActivityBrief
				loading={loading}
				project={project}
			/>

			{project.active && !isMobile && (
				<ButtonComponent
					primary
					standard
					leftIcon={<SatoshiIconTilted />}
					width="100%"
					onClick={handleFundProject}
				>
          Fund this project
				</ButtonComponent>
			)}

			<ProjectActivityActionsToolbar
				fundButtonFunction={handleFundProject}
				transitionButtonFunction={handleViewClick}
			/>

			<Box
				width="100%"
				display="flex"
				flexDirection="column"
				alignItems="center"
				overflow="hidden"
				flex="1"
			>
				<Box display="flex" marginBottom="10px" w="95%">
					<Box w="50%">
						<Button
							_hover={{ backgroundColor: 'none' }}
							w="100%"
							rounded="none"
							bg="none"
							fontWeight={view === 'activity' ? 'bold' : 'normal'}
							fontSize="16px"
							marginTop="10px"
							onClick={() => setView('activity')}
						>
              Contributions{' '}
							<Text ml={2} bg="brand.bgGrey" rounded="lg" px={3} py={1}>
								{fundingTxs.length}
							</Text>
						</Button>
						<Box
							bg={view === 'activity' ? 'darkgrey' : 'lightgrey'}
							w="100%"
							h="3px"
							rounded="lg"
						></Box>
					</Box>
					<Box w="50%">
						<Button
							_hover={{ backgroundColor: 'none' }}
							w="100%"
							rounded="none"
							bg="none"
							fontWeight={view === 'activity' ? 'normal' : 'bold'}
							fontSize="16px"
							marginTop="10px"
							onClick={() => setView('leaderboard')}
						>
              Leaderboard{' '}
							<Text ml={2} bg="brand.bgGrey" rounded="lg" px={3} py={1}>
								{funders.length}
							</Text>
						</Button>
						<Box
							bg={view === 'activity' ? 'lightgrey' : 'darkgrey'}
							w="100%"
							h="3px"
							rounded="lg"
						></Box>
					</Box>
				</Box>
				<VStack
					spacing={'8px'}
					width="100%"
					overflow="auto"
					height={isMobile ? 'calc(100% - 44px)' : '100%'}
					paddingBottom="10px"
				>
					{view === 'activity'
						? fundingTxs.map((fundingTx, index) => (
							<IdBar key={index} fundingTx={fundingTx} project={project} />
						))
						: sortedFunders.map((funder, index) => (
							<IdBarLeaderboard
								key={index}
								funder={funder}
								count={index + 1}
								project={project}
							/>
						))}
				</VStack>
			</Box>
		</VStack>
	);
};

export const InfoPageSkeleton = () => {
	const isMobile = isMobileMode();

	return (
		<VStack
			padding={isMobile ? '10px 5px 0px 5px' : '10px 20px'}
			spacing="15px"
			width="100%"
			height="100%"
			overflowY="hidden"
			position="relative"

		>
			<SkeletonText noOfLines={3} width="185px" />
			<SkeletonCircle height="208px" width="208px" marginY="30px"/>
			<Skeleton height="40px" width="100%" />

			<Box width="100%" display="flex" flexDirection="column" alignItems="center" overflow="hidden" flex="1">
				<HStack display="flex" marginBottom="10px" w="95%" spacing="5px">
					<Box w="50%">
						<Skeleton w="100%" h="40px"/>
					</Box>
					<Box w="50%">
						<Skeleton w="100%" h="40px"/>
					</Box>
				</HStack>
				<VStack spacing={'8px'} w="95%" overflow="auto" height={isMobile ? 'calc(100% - 44px)' : '100%'} paddingBottom="10px">
					<Skeleton width="100%" height="80px" />
					<Skeleton width="100%" height="80px" />
					<Skeleton width="100%" height="80px" />
					<Skeleton width="100%" height="80px" />
				</VStack>
			</Box>
		</VStack>
	);
};
