import {
  Box,
  Grid,
  GridItem,
  HStack,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  ButtonComponent,
  IconButtonComponent,
  SatoshiAmount,
  UndecoratedLink,
} from '../../../components/ui';
import { isMobileMode, useNotification } from '../../../utils';
import { TMilestone } from './types';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { colors, getPath } from '../../../constants';
import { useHistory, useParams } from 'react-router';
import TitleWithProgressBar from '../../../components/molecules/TitleWithProgressBar';
import {
  MilestoneAdditionModal,
  defaultMilestone,
  RewardAdditionModal,
} from './components';
import { EditIcon } from '@chakra-ui/icons';
import {
  CalendarButton,
  DeleteConfirmModal,
  RewardCard,
} from '../../../components/molecules';
import { DateTime } from 'luxon';
import { useMutation, useQuery } from '@apollo/client';
import {
  MUTATION_UPDATE_PROJECT,
  MUTATION_UPDATE_PROJECT_REWARD,
} from '../../../graphql/mutations';
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../../graphql';
import Loader from '../../../components/ui/Loader';

import type { Project, ProjectReward } from '../../../types/generated/graphql';
import { RewardCurrency } from '../../../types/generated/graphql';

const useStyles = createUseStyles({
  backIcon: {
    fontSize: '25px',
  },
});

export const MilestoneAndRewards = () => {
  const isMobile = isMobileMode();
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<{ projectId: string }>();

  const { toast } = useNotification();

  const [selectedButton, setSelectedButton] = useState('ongoing');
  const [selectedDate, setSelectedDate] = useState<Date>();

  const [finalDate, setFinalDate] = useState<string>('');

  const [milestones, setMilestones] = useState<TMilestone[]>([]);
  const [rewards, setRewards] = useState<ProjectReward[]>([]);
  const [selectedReward, setSelectedReward] = useState<ProjectReward>();

  const {
    isOpen: isMilestoneOpen,
    onClose: onMilestoneClose,
    onOpen: openMilestone,
  } = useDisclosure();

  const {
    isOpen: isRewardOpen,
    onClose: onRewardClose,
    onOpen: openReward,
  } = useDisclosure();

  const {
    isOpen: isRewardDeleteOpen,
    onClose: onRewardDeleteClose,
    onOpen: openRewardDelete,
  } = useDisclosure();

  const [isSatoshiRewards, setIsSatoshiRewards] = useState(false);

  const [updateProject, { loading: updateProjectLoading }] = useMutation(
    MUTATION_UPDATE_PROJECT,
    {
      onCompleted() {
        history.push(getPath('launchProjectWithNode', params.projectId));
      },
      onError(error) {
        toast({
          title: 'Something went wrong',
          description: `${error}`,
          status: 'error',
        });
      },
    },
  );

  const [updateReward] = useMutation(MUTATION_UPDATE_PROJECT_REWARD);

  const { loading, data } = useQuery(QUERY_PROJECT_BY_NAME_OR_ID, {
    variables: { where: { id: params.projectId } },
    fetchPolicy: 'network-only',
    onError() {
      toast({
        title: 'Error fetching project',
        status: 'error',
      });
    },
    onCompleted(data) {
      const { project }: { project: Project } = data;
      if (project?.rewardCurrency) {
        setIsSatoshiRewards(project.rewardCurrency !== RewardCurrency.Usdcent);
      }

      if (Number(project?.milestones?.length) > 0) {
        setMilestones(data.project.milestones);
      }

      if (Number(project?.rewards?.length) > 0) {
        setRewards(data.project.rewards);
      }
    },
  });

  const handleMilestoneSubmit = (milestones: TMilestone[]) => {
    setMilestones(milestones);
    onMilestoneClose();
  };

  const handleRewardUpdate = (addReward: ProjectReward) => {
    const findReward = rewards.find((reward) => reward.id === addReward.id);

    if (findReward) {
      const newRewards = rewards.map((reward) => {
        if (reward.id === addReward.id) {
          return addReward;
        }

        return reward;
      });
      setRewards(newRewards);
    } else {
      setRewards([...rewards, addReward]);
    }
  };

  const handleNext = () => {
    const updateProjectInput: any = {
      projectId: data?.project?.id,
      // TODO: Use enums from back-end after they're implemented (https://discord.com/channels/940363862723690546/960539150602342400/1032372207264997386)
      // rewardCurrency: isSatoshiRewards ? RewardCurrency.BTC : RewardCurrency.Usdcent,
      rewardCurrency: RewardCurrency.Usdcent,
      expiresAt: finalDate || null,
    };

    if (rewards.length > 0) {
      updateProjectInput.type = 'reward';
    }

    updateProject({ variables: { input: updateProjectInput } });
  };

  const handleBack = () => {
    history.push(`/launch/${params.projectId}`);
  };

  const handleRemoveReward = async (id?: number) => {
    if (!id) {
      return;
    }

    try {
      const currentReward = rewards.find((reward) => reward.id === id);
      await updateReward({
        variables: {
          input: {
            projectRewardId: id,
            deleted: true,
            name: currentReward?.name,
            cost: currentReward?.cost,
            costCurrency: RewardCurrency.Usdcent,
          },
        },
      });
      const newRewards = rewards.filter((reward) => reward.id !== id);
      setRewards(newRewards);
      onRewardDeleteClose();
      toast({
        title: 'Successfully removed!',
        description: `Reward ${currentReward?.name} was successfully removed`,
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Failed to remove reward',
        description: `${error}`,
        status: 'error',
      });
    }
  };

  const triggerRewardRemoval = (id?: number) => {
    const currentReward = rewards.find((reward) => reward.id === id);
    if (!currentReward) {
      return;
    }

    setSelectedReward(currentReward);
    openRewardDelete();
  };

  const handleDateChange = (value: Date) => {
    setSelectedButton('custom');
    setSelectedDate(value);
    setFinalDate(`${value.getTime()}`);
  };

  const handleMonthSelect = () => {
    setSelectedButton('month');
    const dateMonth = DateTime.now().plus({ months: 1 });
    setSelectedDate(undefined);
    setFinalDate(`${dateMonth.toJSDate().getTime()}`);
  };

  const handleOngoingSelect = () => {
    setSelectedButton('ongoing');
    setSelectedDate(undefined);
    setFinalDate('');
  };

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  if (loading) {
    return <Loader />;
  }

  return (
    <Box
      background={'brand.bgGrey4'}
      position="relative"
      height="100%"
      justifyContent="space-between"
    >
      <Grid
        width="100%"
        templateColumns={
          isLargerThan1280
            ? 'repeat(6, 1fr)'
            : isMobile
            ? 'repeat(2, 1fr)'
            : 'repeat(5, 1fr)'
        }
        padding={isMobile ? '10px' : '40px 40px 20px 40px'}
      >
        <GridItem
          colSpan={isLargerThan1280 ? 2 : 1}
          display="flex"
          justifyContent="flex-start"
        >
          <UndecoratedLink href={`/launch/${params.projectId}`}>
            <ButtonComponent
              leftIcon={
                <BiLeftArrowAlt
                  className={classes.backIcon}
                  onClick={handleBack}
                />
              }
            >
              Back
            </ButtonComponent>
          </UndecoratedLink>
        </GridItem>
        <GridItem
          colSpan={2}
          display="flex"
          justifyContent={isMobile ? 'center' : 'flex-start'}
        >
          <VStack
            spacing="30px"
            width="100%"
            maxWidth="400px"
            minWidth="350px"
            marginBottom="40px"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <VStack width="100%" spacing="40px" alignItems="flex-start">
              <Text color="brand.gray500" fontSize="30px" fontWeight={700}>
                {' '}
                Create new Project
              </Text>
              <TitleWithProgressBar
                paddingBottom="20px"
                title="Milestones & Rewards"
                subTitle="Step 2 of 3"
                percentage={67}
              />
            </VStack>
            <VStack width="100%" alignItems="flex-start">
              <Text>Fundraising deadline</Text>
              <HStack width="100%" justifyContent="space-around">
                <ButtonComponent
                  primary={selectedButton === 'ongoing'}
                  onClick={handleOngoingSelect}
                >
                  Ongoing
                </ButtonComponent>
                <ButtonComponent
                  primary={selectedButton === 'month'}
                  onClick={handleMonthSelect}
                >
                  1 Month
                </ButtonComponent>
                <CalendarButton
                  primary={selectedButton === 'custom'}
                  value={selectedDate}
                  onChange={handleDateChange}
                >
                  Custom
                </CalendarButton>
              </HStack>
              <Text fontSize="12px">
                Add a deadline for your project if you have one, or just keep it
                as ongoing.
              </Text>
            </VStack>
            <VStack width="100%" alignItems="flex-start" spacing="40px">
              <VStack width="100%" alignItems="flex-start">
                <Text name="title">Project Milestones (optional)</Text>
                <ButtonComponent isFullWidth onClick={openMilestone}>
                  Add a Milestone
                </ButtonComponent>
                <Text fontSize="12px">
                  Milestones help you and your community keep track of your
                  progress and set your expectations. You can edit Milestones
                  later.
                </Text>
              </VStack>
              <VStack width="100%" alignItems="flex-start">
                <Text>Rewards (optional)</Text>
                <ButtonComponent
                  isFullWidth
                  onClick={() => {
                    setSelectedReward(undefined);
                    openReward();
                  }}
                >
                  Add a Reward
                </ButtonComponent>
                <Text fontSize="12px">
                  Rewards are a powerful way of exchanging value with your
                  community. Check here our list of prohibited items. You can
                  edit or add Rewards later.
                </Text>
              </VStack>
              <ButtonComponent
                primary
                isFullWidth
                onClick={handleNext}
                isLoading={updateProjectLoading}
              >
                Continue
              </ButtonComponent>
            </VStack>
          </VStack>
        </GridItem>

        <GridItem colSpan={2} display="flex" justifyContent="center">
          <VStack
            alignItems="flex-start"
            maxWidth="370px"
            spacing="10px"
            width="100%"
          >
            {milestones.length > 0 && (
              <>
                <HStack justifyContent="space-between" width="100%">
                  <Text fontSize="18px" fontWeight={500}>
                    MILESTONES
                  </Text>
                  <IconButtonComponent
                    aria-label="edit"
                    onClick={openMilestone}
                  >
                    <EditIcon />
                  </IconButtonComponent>
                </HStack>

                {milestones.map((milestone, index) => (
                  <VStack
                    key={index}
                    width="100%"
                    border="1px solid"
                    borderColor={colors.gray300}
                    borderRadius="4px"
                    alignItems="flex-start"
                    padding="10px"
                  >
                    <Text>{milestone.name}</Text>
                    <SatoshiAmount>{milestone.amount}</SatoshiAmount>
                  </VStack>
                ))}
              </>
            )}

            {rewards.length > 0 ? (
              <>
                <HStack justifyContent="space-between" width="100%">
                  <Text fontSize="18px" fontWeight={500}>
                    Rewards
                  </Text>
                </HStack>

                <VStack width="100%">
                  {rewards.map((reward, index) => (
                    <RewardCard
                      key="index"
                      width="100%"
                      reward={reward}
                      isSatoshi={isSatoshiRewards}
                      handleEdit={() => {
                        setSelectedReward(reward);
                        openReward();
                      }}
                      handleRemove={() => triggerRewardRemoval(reward.id)}
                    />
                  ))}
                </VStack>
              </>
            ) : null}
          </VStack>
        </GridItem>
      </Grid>

      {isMilestoneOpen && (
        <MilestoneAdditionModal
          isOpen={isMilestoneOpen}
          onClose={onMilestoneClose}
          availableMilestones={
            milestones.length > 0 ? milestones : [defaultMilestone]
          }
          onSubmit={handleMilestoneSubmit}
          projectId={data?.project?.id}
        />
      )}

      {isRewardOpen && (
        <RewardAdditionModal
          isOpen={isRewardOpen}
          onClose={onRewardClose}
          reward={selectedReward}
          onSubmit={handleRewardUpdate}
          isSatoshi={isSatoshiRewards}
          projectId={data?.project?.id}
        />
      )}
      <DeleteConfirmModal
        isOpen={isRewardDeleteOpen}
        onClose={onRewardDeleteClose}
        title={`Delete reward ${selectedReward?.name}`}
        description={'Are you sure you want to remove the reward'}
        confirm={() => handleRemoveReward(selectedReward?.id)}
      />
    </Box>
  );
};
