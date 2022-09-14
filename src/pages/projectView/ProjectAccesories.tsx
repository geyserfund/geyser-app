import { Badge, Box, Button, Checkbox, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { ProjectSectionBar, RewardCard } from '../../components/molecules';
import { SatoshiAmount } from '../../components/ui';
import { LaunchImageUrl, projectTypes } from '../../constants';
import { IProject } from '../../interfaces';
import { isMobileMode } from '../../utils';
import { EntryCard } from './components/EntryCard';
import { MilestoneComponent } from './components/MilestoneComponent';

const useStyles = createUseStyles({
	navButton: {
		background: 'none',
	},

});

export const ProjectAccesories = ({ project }: { project: IProject }) => {
	const classes = useStyles();
	const isMobile = isMobileMode();

	const entriesRef = useRef<any>(null);
	const rewardsRef = useRef<any>(null);
	const milestonesRef = useRef<any>(null);

	const entriesLength = project.entries && project.entries.length;
	const rewardsLength = project.rewards && project.rewards.length;
	const milestoneLength = project.milestones && project.milestones.length;

	const renderEntries = () => {
		if (project.entries && project.entries.length > 0) {
			return (
				project.entries.map(entry => <EntryCard entry={entry} key={entry.id}/>)
			);
		}

		return (
			<Text>There are no any entries available </Text>
		);
	};

	const renderRewards = () => {
		if (project.rewards && project.rewards.length > 0) {
			return (
				project.rewards.map(reward => (
					<GridItem key={reward.id} colSpan={isMobile ? 2 : 1}>
						<RewardCard
							reward={reward}
							isSatoshi={true}
							minWidth="350px"
							maxWidth="350px"
							minHeight="155px"
						/>
					</GridItem>),
				)
			);
		}

		return (
			<GridItem colSpan={isMobile ? 2 : 1}>
				<Text>There are no any rewards available </Text>
			</GridItem>
		);
	};

	const renderMilestones = () => {
		if (project.milestones && project.milestones.length > 0) {
			console.log('project mielstones', project.milestones);
			return (
				project.milestones.map(milestone =>
					<MilestoneComponent
						key={milestone.id}
						name={milestone.name}
						description={milestone.description}
						checked={milestone.amount >= project.balance}
						amount={milestone.amount - project.balance}
					/>)
			);
		}

		return (
			<Text>There are no any milestones available </Text>
		);
	};

	const handleEntriesClick = () => {
		if (entriesRef) {
			entriesRef.current?.scrollIntoView({behavior: 'smooth'});
		}
	};

	const handleRewardsClick = () => {
		if (rewardsRef) {
			rewardsRef.current?.scrollIntoView({behavior: 'smooth'});
		}
	};

	const handleMielstonesClick = () => {
		if (milestonesRef) {
			milestonesRef.current?.scrollIntoView({behavior: 'smooth'});
		}
	};

	const isRewardBased = project.type === projectTypes.reward;

	return (
		<VStack w="100%" spacing="40px">
			<HStack justifyContent="center" spacing="13px">
				<Button
					className={classes.navButton}
					rightIcon={ entriesLength ? <Badge>{entriesLength}</Badge> : undefined}
					onClick={handleEntriesClick}
				>
					Entries
				</Button>
				{isRewardBased && <Button
					className={classes.navButton}
					rightIcon={ rewardsLength ? <Badge>{rewardsLength}</Badge> : undefined}
					onClick={handleRewardsClick}
				>
					Rewards
				</Button>}
				<Button
					className={classes.navButton}
					rightIcon={ milestoneLength ? <Badge>{milestoneLength}</Badge> : undefined}
					onClick={handleMielstonesClick}
				>
					Milestones
				</Button>
			</HStack>
			<VStack
				ref={entriesRef}
				width="100%"
				alignItems="flex-start"
				spacing="20px"
			>
				<ProjectSectionBar name={'Entries'} number={entriesLength}/>
				{renderEntries()}
			</VStack>
			{
				isRewardBased
					&& <VStack ref={rewardsRef} width="100%" alignItems="flex-start" spacing="20px">
						<ProjectSectionBar name={'Rewards'} number={rewardsLength}/>
						<Grid templateColumns="repeat(2, 1fr)" gap={6}>
							{renderRewards()}
						</Grid>
					</VStack>
			}

			<VStack ref={milestonesRef} width="100%" alignItems="flex-start" spacing="10px">
				<ProjectSectionBar name={'Milestones'} number={milestoneLength}/>
				<VStack alignItems="flex-start">
					{renderMilestones}
				</VStack>
			</VStack>

		</VStack>
	);
};
