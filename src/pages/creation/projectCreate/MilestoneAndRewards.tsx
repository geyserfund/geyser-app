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
import React, { useEffect, useState } from 'react';
import {
  ButtonComponent,
  IconButtonComponent,
  Linkin,
  SatoshiAmount,
} from '../../../components/ui';
import { isMobileMode, useNotification } from '../../../utils';
import { TMilestone, TRewards } from './types';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { colors } from '../../../constants';
import { useHistory, useParams } from 'react-router';
import TitleWithProgressBar from '../../../components/molecules/TitleWithProgressBar';
import { AddMilestones, defaultMilestone } from './components';
import { EditIcon } from '@chakra-ui/icons';
import { AddRewards } from './components/AddRewards';
import {
  CalendarButton,
  DeleteConfirmModal,
  RewardCard,
} from '../../../components/molecules';
import { DateTime } from 'luxon';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  MUTATION_UPDATE_PROJECT,
  MUTATION_UPDATE_PROJECT_REWARD,
} from '../../../graphql/mutations';
import { QUERY_PROJECT_BY_NAME } from '../../../graphql';
import Loader from '../../../components/ui/Loader';

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
  const [rewards, setRewards] = useState<TRewards[]>([]);
  const [selectedReward, setSelectedReward] = useState<TRewards>();

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
  const [isSatoshi, setIsSatoshi] = useState(true);

  const [updateProject, { loading: updateProjectLoading }] = useMutation(
    MUTATION_UPDATE_PROJECT,
    {
      onCompleted() {
        history.push(`/launch/${params.projectId}/node`);
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

  const [updateReward, { loading: updateRewardLoading }] = useMutation(
    MUTATION_UPDATE_PROJECT_REWARD,
  );

  const { loading, data } = useQuery(QUERY_PROJECT_BY_NAME, {
    variables: { where: { name: params.projectId } },
    fetchPolicy: 'network-only',
    onError() {
      toast({
        title: 'Error fetching project',
        status: 'error',
      });
    },
    onCompleted(data) {
      console.log('checking data', data);
      if (
        data.project &&
        data.project.milestones &&
        data.project.milestones.length > 0
      ) {
        setMilestones(data.project.milestones);
      }

      if (
        data.project &&
        data.project.rewards &&
        data.project.rewards.length > 0
      ) {
        setRewards(data.project.rewards);
      }
    },
  });

  const handleMilestoneSubmit = (milestones: TMilestone[]) => {
    setMilestones(milestones);
  };

  const handleRewardUpdate = (addReward: TRewards) => {
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
      rewardCurrency: isSatoshi ? 'btc' : 'usd',
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
      paddingTop="60px"
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
          <Linkin href={`/launch/${params.projectId}`}>
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
          </Linkin>
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
                  Add a milestone
                </ButtonComponent>
                <Text fontSize="12px">
                  Milestones help you and your community keep track of your
                  progress and set your expectations.
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
                  Add a reward
                </ButtonComponent>
                <Text fontSize="12px">
                  Rewards are a powerful way of exchanging value with your
                  community
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
                    {isSatoshi ? (
                      <SatoshiAmount>{milestone.amount}</SatoshiAmount>
                    ) : (
                      <Text>{`$ ${milestone.amount}`}</Text>
                    )}
                  </VStack>
                ))}
              </>
            )}
            {rewards.length > 0 && (
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
                      isSatoshi={isSatoshi}
                      handleEdit={() => {
                        setSelectedReward(reward);
                        openReward();
                      }}
                      handleRemove={() => triggerRewardRemoval(reward.id)}
                    />
                  ))}
                </VStack>
              </>
            )}
          </VStack>
        </GridItem>
      </Grid>
      {isMilestoneOpen && (
        <AddMilestones
          isOpen={isMilestoneOpen}
          onClose={onMilestoneClose}
          milestones={milestones.length > 0 ? milestones : [defaultMilestone]}
          onSubmit={handleMilestoneSubmit}
          isSatoshi={isSatoshi}
          setIsSatoshi={setIsSatoshi}
          projectId={data?.project?.id}
        />
      )}

      {isRewardOpen && (
        <AddRewards
          isOpen={isRewardOpen}
          onClose={onRewardClose}
          rewards={selectedReward}
          onSubmit={handleRewardUpdate}
          isSatoshi={isSatoshi}
          setIsSatoshi={setIsSatoshi}
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
