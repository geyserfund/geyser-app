import { useMutation } from '@apollo/client';
import {
  GridItem,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { DeleteConfirmModal, RewardCard } from '../../components/molecules';
import { ButtonComponent } from '../../components/ui';
import { MUTATION_UPDATE_PROJECT_REWARD } from '../../graphql/mutations';
import {
  Project,
  ProjectReward,
  RewardCurrency,
} from '../../types/generated/graphql';
import { toInt, useNotification } from '../../utils';
import { RewardAdditionModal } from '../creation/projectCreate/components/RewardAdditionModal';

export const RewardSettings = ({ project }: { project: Project }) => {
  const { toast } = useNotification();

  const [rewards, setRewards] = useState<ProjectReward[]>([]);
  const [selectedReward, setSelectedReward] = useState<ProjectReward>();

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

  const isSatoshi =
    project.rewardCurrency !== null &&
    project.rewardCurrency !== undefined &&
    project.rewardCurrency !== RewardCurrency.Usdcent;

  const [updateReward] = useMutation(MUTATION_UPDATE_PROJECT_REWARD);

  useEffect(() => {
    if (project.rewards && project.rewards.length > 0) {
      setRewards(project.rewards.map((reward) => reward!));
    }
  }, [project]);

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

  const handleRemoveReward = async (id?: number) => {
    if (!id) {
      return;
    }

    try {
      const currentReward = rewards.find((reward) => reward.id === id);

      await updateReward({
        variables: {
          input: {
            projectRewardId: toInt(id),
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

  return (
    <>
      <GridItem colSpan={6} display="flex" justifyContent="center">
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
          <VStack width="100%" alignItems="flex-start" spacing="40px">
            <VStack width="100%" alignItems="flex-start">
              <Text>Rewards </Text>
              <ButtonComponent
                w="full"
                onClick={() => {
                  setSelectedReward(undefined);
                  openReward();
                }}
              >
                Add a reward
              </ButtonComponent>
              <Text fontSize="12px">
                Rewards are a powerful way of exchanging value with your
                community. Check here our list of prohibited items. You can edit
                or add Rewards later.
              </Text>
            </VStack>
            <VStack
              alignItems="flex-start"
              maxWidth="370px"
              spacing="10px"
              width="100%"
            >
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
                        key={index}
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
              ) : null}
            </VStack>
          </VStack>
        </VStack>
      </GridItem>

      {isRewardOpen && (
        <RewardAdditionModal
          isOpen={isRewardOpen}
          onClose={onRewardClose}
          reward={selectedReward}
          onSubmit={handleRewardUpdate}
          isSatoshi={isSatoshi}
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
