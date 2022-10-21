import {
  Badge,
  Button,
  Grid,
  GridItem,
  HStack,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import {
  ProjectEntryCard,
  ProjectSectionBar,
} from '../../components/molecules';
import { ButtonComponent } from '../../components/ui';
import { fundingStages, IFundingStages, projectTypes } from '../../constants';
import { useAuthContext } from '../../context';
import { TupdateReward } from '../../hooks';
import { isMobileMode } from '../../utils';
import { MilestoneComponent } from './components/MilestoneComponent';
import { BiPlus } from 'react-icons/bi';
import { FundingFormRewardItem } from './components/FundingFormRewardItem';
import { Project } from '../../types/generated/graphql';

const useStyles = createUseStyles({
  navButton: {
    background: 'none',
  },
});

interface IProjectAccesories {
  project: Project;
  setFundState: React.Dispatch<React.SetStateAction<IFundingStages>>;
  updateReward: TupdateReward;
  fundState: IFundingStages;
}

export const ProjectAccesories = ({
  project,
  setFundState,
  updateReward,
  fundState,
}: IProjectAccesories) => {
  const classes = useStyles();
  const isMobile = isMobileMode();
  const history = useHistory();

  const { user } = useAuthContext();

  const entriesRef = useRef<any>(null);
  const rewardsRef = useRef<any>(null);
  const milestonesRef = useRef<any>(null);

  const entriesLength = project.entries ? project.entries.length : 0;
  const rewardsLength = project.rewards ? project.rewards.length : 0;
  const milestoneLength = project.milestones ? project.milestones.length : 0;

  const [isSmallerThan1265] = useMediaQuery('(min-width: 1265px)');

  const renderEntries = () => {
    if (project.entries && project.entries.length > 0) {
      return project.entries.map((entry) => {
        if (entry) {
          const entryWithProject = { ...entry, project };
          return <ProjectEntryCard entry={entryWithProject} key={entry.id} />;
        }
      });
    }

    return <Text>There are no any entries available </Text>;
  };

  const renderRewards = () => {
    if (project.rewards && project.rewards.length > 0) {
      return project.rewards.map((reward) => {
        if (reward) {
          return (
            <GridItem key={reward.id} colSpan={isSmallerThan1265 ? 1 : 2}>
              <FundingFormRewardItem
                onClick={() => {
                  if (fundState === fundingStages.initial) {
                    updateReward({ id: reward.id, count: 1 });
                    setFundState(fundingStages.form);
                  }
                }}
                item={{ ...reward }}
                readOnly
              />
            </GridItem>
          );
        }
      });
    }

    return (
      <GridItem colSpan={isMobile ? 2 : 1}>
        <Text>There are no any rewards available </Text>
      </GridItem>
    );
  };

  const renderMilestones = () => {
    if (project.milestones && project.milestones.length > 0) {
      return project.milestones.map((milestone) => {
        if (milestone) {
          return (
            <MilestoneComponent
              key={milestone.id}
              name={milestone.name}
              description={milestone.description}
              checked={milestone.amount <= project.balance}
              amount={milestone.amount - project.balance}
            />
          );
        }
      });
    }

    return <Text>There are no any milestones available </Text>;
  };

  const handleEntriesClick = () => {
    if (entriesRef) {
      entriesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRewardsClick = () => {
    if (rewardsRef) {
      rewardsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMielstonesClick = () => {
    if (milestonesRef) {
      milestonesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCreateNewEntry = () => [
    history.push(`/projects/${project.name}/entry`),
  ];

  const isRewardBased = project.type === projectTypes.reward;
  const hasMilestones = project.milestones && project.milestones.length > 0;
  const hasEntries = project.entries && project.entries.length > 0;
  const isOwner = user?.id && user.id === project.owners[0].user.id;

  return (
    <VStack w="100%" spacing="40px">
      <HStack justifyContent="center" spacing="13px">
        {hasEntries && (
          <Button
            className={classes.navButton}
            rightIcon={
              entriesLength ? <Badge>{entriesLength}</Badge> : undefined
            }
            onClick={handleEntriesClick}
          >
            Entries
          </Button>
        )}
        {isRewardBased && (
          <Button
            className={classes.navButton}
            rightIcon={
              rewardsLength ? <Badge>{rewardsLength}</Badge> : undefined
            }
            onClick={handleRewardsClick}
          >
            Rewards
          </Button>
        )}
        {hasMilestones && (
          <Button
            className={classes.navButton}
            rightIcon={
              milestoneLength ? <Badge>{milestoneLength}</Badge> : undefined
            }
            onClick={handleMielstonesClick}
          >
            Milestones
          </Button>
        )}
      </HStack>
      {(hasEntries || isOwner) && (
        <VStack
          ref={entriesRef}
          width="100%"
          alignItems="flex-start"
          spacing="20px"
        >
          <ProjectSectionBar name={'Entries'} number={entriesLength} />
          {renderEntries()}
          {isOwner && (
            <ButtonComponent onClick={handleCreateNewEntry} isFullWidth>
              <BiPlus style={{ marginRight: '10px' }} />
              Create new entry
            </ButtonComponent>
          )}
        </VStack>
      )}
      {isRewardBased && (
        <VStack
          ref={rewardsRef}
          width="100%"
          alignItems="flex-start"
          spacing="20px"
        >
          <ProjectSectionBar name={'Rewards'} number={rewardsLength} />
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {renderRewards()}
          </Grid>
        </VStack>
      )}

      {hasMilestones && (
        <VStack
          ref={milestonesRef}
          width="100%"
          alignItems="flex-start"
          spacing="10px"
        >
          <ProjectSectionBar name={'Milestones'} number={milestoneLength} />
          <VStack alignItems="flex-start">{renderMilestones()}</VStack>
        </VStack>
      )}
    </VStack>
  );
};
