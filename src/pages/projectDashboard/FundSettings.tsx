import { useMutation } from '@apollo/client';
import { EditIcon } from '@chakra-ui/icons';
import {
  HStack,
  Text,
  useDisclosure,
  VStack,
  GridItem,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { useHistory, useParams } from 'react-router';
import {
  CalendarButton,
  DeleteConfirmModal,
  RewardCard,
} from '../../components/molecules';
import {
  ButtonComponent,
  IconButtonComponent,
  SatoshiAmount,
} from '../../components/ui';
import { colors } from '../../constants';
import {
  MUTATION_UPDATE_PROJECT,
  MUTATION_UPDATE_PROJECT_REWARD,
} from '../../graphql/mutations';
import { IProject } from '../../interfaces';
import { useNotification } from '../../utils';
import {
  AddMilestones,
  defaultMilestone,
} from '../creation/projectCreate/components';
import { AddRewards } from '../creation/projectCreate/components/AddRewards';
import { TMilestone, TRewards } from '../creation/projectCreate/types';

export const FundSettings = ({ project }: { project: IProject }) => {
  console.log('FundSettings');
  const params = useParams<{ projectId: string }>();
  const history = useHistory();
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
        // history.push(`/launch/${params.projectId}/node`);
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

  useEffect(() => {
    if (project.milestones && project.milestones.length > 0) {
      setMilestones(project.milestones);
    }

    if (project.rewards && project.rewards.length > 0) {
      setRewards(project.rewards);
    }
  }, [project]);

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

  useEffect(() => {
    if (project.id) {
      const updateProjectInput: any = {
        projectId: project.id,
        rewardCurrency: isSatoshi ? 'btc' : 'usd',
        expiresAt: finalDate || undefined,
      };
      if (rewards.length > 0) {
        updateProjectInput.type = 'reward';
      }

      updateProject({ variables: { input: updateProjectInput } });
    }
  }, [finalDate, isSatoshi]);

  const node = project.wallets && project.wallets[0];

  return (
    <>
      <GridItem colSpan={8} display="flex" justifyContent="center">
        <VStack
          spacing="30px"
          width="100%"
          minWidth="350px"
          maxWidth="400px"
          marginBottom="40px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <VStack w="100%" spacing="40px">
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
            </VStack>
            <VStack
              justifyContent="flex-start"
              alignItems="flex-start"
              width="100%"
              spacing="10px"
              paddingY="80px"
            >
              {node && node.name && (
                <VStack
                  width="100%"
                  border="1px solid"
                  borderColor={colors.gray300}
                  borderRadius="4px"
                  alignItems="flex-start"
                  padding="10px"
                >
                  <HStack width="100%" justifyContent="space-between">
                    <Text fontWeight={500}>{node?.name}</Text>
                  </HStack>

                  <VStack width="100%" alignItems="flex-start">
                    <Text color="brand.neutral700">Hostname or IP address</Text>
                    <Text
                      wordBreak="break-all"
                      color="brand.neutral700"
                      fontSize="12px"
                    >
                      {node?.connectionDetails.hostname}
                    </Text>
                  </VStack>

                  <VStack width="100%" alignItems="flex-start">
                    <Text color="brand.neutral700">Public key</Text>
                    <Text
                      wordBreak="break-all"
                      color="brand.neutral700"
                      fontSize="12px"
                    >
                      {node?.connectionDetails.pubkey}
                    </Text>
                  </VStack>
                  <VStack width="100%" alignItems="flex-start" flexWrap="wrap">
                    <Text color="brand.neutral700">Invoice Macaroon</Text>
                    <Text wordBreak="break-all">
                      {node?.connectionDetails.macaroon}
                    </Text>
                  </VStack>
                  <VStack width="100%" alignItems="flex-start">
                    <Text color="brand.neutral700">TLS certificate</Text>
                    <Text
                      wordBreak="break-all"
                      color="brand.neutral700"
                      fontSize="12px"
                    >
                      {node?.connectionDetails.tlsCertificate}
                    </Text>
                  </VStack>
                  <VStack width="100%" alignItems="flex-start">
                    <Text color="brand.neutral700">gRPC port</Text>
                    <Text
                      wordBreak="break-all"
                      color="brand.neutral700"
                      fontSize="12px"
                    >
                      {node?.connectionDetails.grpcPort}
                    </Text>
                  </VStack>
                </VStack>
              )}
              <Text color="brand.neutral700" fontSize="10px">
                If you want to change your node reach out to hello@geyser.fund
              </Text>
            </VStack>
          </VStack>
        </VStack>
      </GridItem>
      <GridItem colSpan={5} display="flex" justifyContent="center">
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
                <IconButtonComponent aria-label="edit" onClick={openMilestone}>
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
      {isMilestoneOpen && (
        <AddMilestones
          isOpen={isMilestoneOpen}
          onClose={onMilestoneClose}
          milestones={milestones.length > 0 ? milestones : [defaultMilestone]}
          onSubmit={handleMilestoneSubmit}
          isSatoshi={isSatoshi}
          setIsSatoshi={setIsSatoshi}
          projectId={parseInt(`${project.id}`, 10)}
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
          projectId={parseInt(`${project.id}`, 10)}
        />
      )}
      <DeleteConfirmModal
        isOpen={isRewardDeleteOpen}
        onClose={onRewardDeleteClose}
        title={`Delete reward ${selectedReward?.name}`}
        description={'Are you sure you want to remove the reward'}
        confirm={() => handleRemoveReward(selectedReward?.id)}
      />
    </>
  );
};
