import { Box, Text, VStack, HStack } from '@chakra-ui/layout';
import React, {useState} from 'react';
import { SatoshiIcon } from '../../../components/icons';
import { ProjectBalanceCircularProgress, ProjectBalance } from '../../../components/molecules';
import { IdBar } from '../../../components/molecules/IdBar';
import { IdBarLeaderboard } from '../../../components/molecules/IdBarLeaderboard';
import { ButtonComponent, FundingStatus } from '../../../components/ui';
import { isMobileMode } from '../../../utils';
import { Button } from '@chakra-ui/react';

import { useStyles } from './styles';
import { IProject, IFundingTx, IFunder } from '../../../interfaces';
import { Countdown } from './Countdown';

interface IInfoPage {
    project: IProject;
    handleFundClick: () => void;
    handleFundProject: () => void;
    loading: boolean;
    btcRate: number;
    fundingTxs: IFundingTx[]
    funders: IFunder[]
}

export const InfoPage = ({
	handleFundClick,
	handleFundProject,
	loading,
	project,
	btcRate,
	fundingTxs,
	funders,
}: IInfoPage) => {
	const isMobile = isMobileMode();
	const classes = useStyles({isMobile});
	const showCountdown = () => project.active && project.expiresAt;
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

	return (
		<VStack
			padding={isMobile ? '10px 5px 0px 5px' : '10px 20px'}
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"
			position="relative"
		>
			{isMobile && <Button className={classes.fundButton} onClick={handleFundClick}>
				<Text fontSize="12px">Project</Text>
			</Button>}
			<FundingStatus open={project.active} />
			{showCountdown() && <Countdown endDate={project.expiresAt}/>}
			{project.fundingGoal
				? <ProjectBalanceCircularProgress loading={loading} rate={btcRate} goal={project.fundingGoal} balance={project.balance} />
				: <ProjectBalance balance={project.balance} rate={btcRate}/>
			}
			{project.active && <ButtonComponent
				primary
				standard
				leftIcon={<SatoshiIcon />}
				width="100%"
				onClick={handleFundProject}
			>
				Fund this project
			</ButtonComponent>}
			<Box width="100%" display="flex" flexDirection="column" alignItems="center" overflow="hidden" flex="1">
				<HStack spacing="10px">
					<Button fontSize="16px" marginBottom="10px" marginTop="10px" onClick={() => setView('activity')} bg={view === 'activity' ? 'brand.bgGrey' : 'none'} shadow="md">
						{`Activity ${fundingTxs.length ? `( ${fundingTxs.length} )` : ''}`}
					</Button>
					<Button fontSize="16px" marginBottom="10px" marginTop="10px" onClick={() => setView('leaderboard')} bg={view === 'activity' ? 'none' : 'brand.bgGrey'} shadow="md">
      Leaderboard
					</Button>
				</HStack>
				<VStack spacing={'8px'} width="100%" overflow="auto" height={isMobile ? 'calc(100% - 44px)' : '100%'} paddingBottom="10px">
					{ view === 'activity'
						? fundingTxs.map((fundingTx, index) => (
							<IdBar key={index} fundingTx={fundingTx} project={project}/>
						)) : sortedFunders.map((funder, index) => (
							<IdBarLeaderboard key={index} funder={funder} count={index + 1} project={project}/>
						))
					}
				</VStack>
			</Box>
		</VStack>
	);
};
