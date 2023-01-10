/* eslint-disable complexity */
import {
  Badge,
  Button,
  Center,
  GridItem,
  HStack,
  SimpleGrid,
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
import {
  fundingStages,
  getPath,
  IFundingStages,
  projectTypes,
} from '../../constants';
import { useAuthContext } from '../../context';
import { UpdateReward } from '../../hooks';
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

type Props = {
  project: Project;
  setFundState: React.Dispatch<React.SetStateAction<IFundingStages>>;
  updateReward: UpdateReward;
  fundState: IFundingStages;
};

export const ProjectDetailsAccessoriesSections = ({
  project,
  setFundState,
  updateReward,
  fundState,
}: Props) => {
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

  const isRewardBased = project.type === projectTypes.reward;
  const hasMilestones = project.milestones && project.milestones.length > 0;
  const hasEntries = project.entries && project.entries.length > 0;

  const isUserOwnerOfCurrentProject: boolean =
    user?.id && user.id === project.owners[0].user.id;

  const canCreateEntries: boolean =
    isUserOwnerOfCurrentProject && (project.active || project.draft);

  const [isSmallerThan1265] = useMediaQuery('(max-width: 1265px)');

  const renderEntries = () => {
    if (project.entries && project.entries.length > 0) {
      const sortedEntries =
        project.entries &&
        project.entries.sort(
          (a, b) =>
            parseInt(b?.createdAt || '', 10) - parseInt(a?.createdAt || '', 10),
        );
      return sortedEntries.map((entry) => {
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
            <GridItem key={reward.id} colSpan={isSmallerThan1265 ? 2 : 1}>
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
        <Text>There are no rewards available.</Text>
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
              isReached={milestone.amount <= project.balance}
              amountRemaining={milestone.amount - project.balance}
            />
          );
        }
      });
    }

    return <Text>There are no milestones available.</Text>;
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

  const handleMilestonesClick = () => {
    if (milestonesRef) {
      milestonesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCreateNewEntry = () => [
    history.push(getPath('projectEntryCreation', project.name)),
  ];

  return (
    <VStack width="100%" spacing="40px">
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
            onClick={handleMilestonesClick}
          >
            Milestones
          </Button>
        )}
      </HStack>

      {hasEntries || isUserOwnerOfCurrentProject ? (
        <VStack
          ref={entriesRef}
          width="100%"
          alignItems="flex-start"
          spacing="20px"
        >
          <ProjectSectionBar name={'Entries'} number={entriesLength} />

          {renderEntries()}

          {isUserOwnerOfCurrentProject ? (
            <>
              <ButtonComponent
                onClick={handleCreateNewEntry}
                isFullWidth
                disabled={Boolean(canCreateEntries) === false}
              >
                <BiPlus style={{ marginRight: '10px' }} />
                Create A New Entry
              </ButtonComponent>

              {Boolean(canCreateEntries) === false ? (
                <Center>
                  <Text
                    textColor={'brand.neutral600'}
                    textAlign="center"
                    paddingX={2}
                  >
                    You cannot publish an entry in an inactive project. Finish
                    the project configuration or re-activate the project to
                    publish this entry.
                  </Text>
                </Center>
              ) : null}
            </>
          ) : null}
        </VStack>
      ) : null}

      {isRewardBased ? (
        <VStack
          ref={rewardsRef}
          width="100%"
          alignItems="flex-start"
          spacing="20px"
        >
          <ProjectSectionBar name={'Rewards'} number={rewardsLength} />

          <SimpleGrid
            columns={isSmallerThan1265 ? 1 : 2}
            spacingX={7}
            spacingY={8}
          >
            {renderRewards()}
          </SimpleGrid>
        </VStack>
      ) : null}

      {hasMilestones ? (
        <VStack
          ref={milestonesRef}
          width="100%"
          alignItems="flex-start"
          spacing="10px"
        >
          <ProjectSectionBar name={'Milestones'} number={milestoneLength} />
          <VStack alignItems="flex-start">{renderMilestones()}</VStack>
        </VStack>
      ) : null}
    </VStack>
  );
};
