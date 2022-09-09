import { Badge, Box, Button, Checkbox, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { ProjectSectionBar, RewardCard } from '../../components/molecules';
import { SatoshiAmount } from '../../components/ui';
import { EntryCard } from './components/EntryCard';
import { MilestoneComponent } from './components/MilestoneComponent';

const useStyles = createUseStyles({
	navButton: {
		background: 'none',
	},

});

export const ProjectAccesories = () => {
	const classes = useStyles();
	console.log('checkijng accesories');
	return (
		<VStack w="100%" spacing="40px">
			<HStack justifyContent="center" spacing="13px">
				<Button className={classes.navButton} rightIcon={<Badge>3</Badge>}>Entries</Button>
				<Button className={classes.navButton} rightIcon={<Badge>3</Badge>}>Rewards</Button>
				<Button className={classes.navButton} rightIcon={<Badge>3</Badge>}>Milestones</Button>
				<Button className={classes.navButton}>About</Button>
			</HStack>
			<VStack width="100%" alignItems="flex-start" spacing="20px">
				<ProjectSectionBar name={'Entries'} number={3}/>
				<EntryCard />
			</VStack>
			<VStack width="100%" alignItems="flex-start" spacing="20px">
				<ProjectSectionBar name={'Rewards'} number={2}/>
				<HStack>
					<RewardCard
						reward={{name: 'something', description: 'something something', projectId: 'sDF', cost: 500}}
						isSatoshi={true}
						minWidth="350px"
					/>
				</HStack>
			</VStack>
			<VStack width="100%" alignItems="flex-start" spacing="10px">
				<ProjectSectionBar name={'Milestones'} number={2}/>
				<VStack alignItems="flex-start">
					<MilestoneComponent name="Milestone 1" description="Taking a flight to South America" checked amount={1000}/>
					<MilestoneComponent name="Milestone 2" description="Going to camaroon" checked amount={876000}/>
					<MilestoneComponent name="Milestone 3" description="Going to Bitcoin miami" checked amount={1876000}/>
				</VStack>
			</VStack>

		</VStack>
	);
};
