import { useMutation } from '@apollo/client';
import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';
import { SatoshiIconTilted } from '../../../../components/icons';
import { FileUpload } from '../../../../components/molecules';
import {
  ButtonComponent,
  ImageWithReload,
  TextArea,
  TextInputBox,
} from '../../../../components/ui';

import {
  MUTATION_CREATE_PROJECT_REWARD,
  MUTATION_UPDATE_PROJECT_REWARD,
} from '../../../../graphql/mutations';
import { commaFormatted, useNotification } from '../../../../utils';
import {
  ProjectReward,
  RewardCurrency,
} from '../../../../types/generated/graphql';
import { defaultProjectReward } from '../../../../defaults';
import {
  ProjectRewardCreationVariables,
  ProjectRewardUpdateVariables,
} from '../types';
import { ProjectRewardValidations } from '../../../../constants/validations';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (_: ProjectReward) => void;
  reward?: ProjectReward;
  isSatoshi: boolean;
  projectId: number;
};

type CreateRewardMutationResponseData = {
  createdReward: ProjectReward;
};

type UpdateRewardMutationResponseData = {
  updatedReward: ProjectReward;
};

export const RewardAdditionModal = ({
  isOpen,
  onClose,
  reward: availableReward,
  onSubmit,
  projectId,
  isSatoshi,
}: Props) => {
  const { toast } = useNotification();

  const [formCostDollarValue, setFormCostDollarValue] = useState(
    (availableReward || defaultProjectReward).cost / 100,
  );

  const [_rewards, _setRewards] = useState<ProjectReward>(
    availableReward || defaultProjectReward,
  );

  const rewards = useRef(_rewards);

  const setRewards = (value: ProjectReward) => {
    rewards.current = value;
    _setRewards(value);
  };

  const [formError, setFormError] = useState<any>({});

  const [createReward, { loading: createRewardLoading }] = useMutation<
    CreateRewardMutationResponseData,
    { input: ProjectRewardCreationVariables }
  >(MUTATION_CREATE_PROJECT_REWARD, {
    onCompleted({ createdReward }) {
      toast({
        title: 'Successfully created!',
        description: `Reward ${createdReward.name} was successfully created`,
        status: 'success',
      });
      onSubmit(createdReward);
      onClose();
    },
    onError(error) {
      toast({
        title: 'Failed to create reward',
        description: `${error}`,
        status: 'error',
      });
    },
  });

  const [updateReward, { loading: updateRewardLoading }] = useMutation<
    UpdateRewardMutationResponseData,
    { input: ProjectRewardUpdateVariables }
  >(MUTATION_UPDATE_PROJECT_REWARD, {
    onCompleted({ updatedReward }) {
      toast({
        title: 'Successfully updated!',
        description: `Reward ${updatedReward.name} was successfully updated`,
        status: 'success',
      });
      onSubmit(updatedReward);
      onClose();
    },
    onError(error) {
      toast({
        title: 'Failed to update reward',
        description: `${error}`,
        status: 'error',
      });
    },
  });

  const getRewardCreationInputVariables =
    (): ProjectRewardCreationVariables => {
      return {
        projectId,
        cost: rewards.current.cost,
        costCurrency: rewards.current.costCurrency,
        description: rewards.current.description,
        image: rewards.current.image || undefined,
        name: rewards.current.name,
        stock: rewards.current.stock,
      };
    };

  const getRewardUpdateInputVariables = (): ProjectRewardUpdateVariables => {
    return {
      projectRewardId: (rewards.current as ProjectReward).id,
      cost: rewards.current.cost,
      costCurrency: RewardCurrency.Usdcent,
      description: rewards.current.description,
      image: rewards.current.image || undefined,
      name: rewards.current.name,
      stock: rewards.current.stock,
    };
  };

  useEffect(() => {
    if (availableReward && availableReward !== rewards.current) {
      setRewards(availableReward);
    }
  }, [availableReward]);

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormError({});
    const { name, value } = event.target;
    if (name) {
      setRewards({ ...rewards.current, [name]: value });
    }
  };

  const handleCostAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormError({});

    // Dollar value rounded to two decimal places
    const dollarValue = Math.round(parseFloat(event.target.value) * 100) / 100;

    setFormCostDollarValue(dollarValue);

    // set cost with the dollar value converted to cents
    setRewards({ ...rewards.current, ...{ cost: dollarValue * 100 } });
  };

  const handleConfirmReward = () => {
    const isValid = validateReward();

    if (!isValid) {
      return;
    }

    if ((rewards.current as ProjectReward).id) {
      updateReward({
        variables: { input: getRewardUpdateInputVariables() },
      });
    } else {
      createReward({
        variables: {
          input: getRewardCreationInputVariables(),
        },
      });
    }
  };

  const handleUpload = (url: string) => {
    setRewards({ ...rewards.current, image: url });
  };

  const validateReward = () => {
    const errors: any = {};
    let isValid = true;

    if (!rewards.current.name) {
      errors.name = 'Name is a required field';
      isValid = false;
    } else if (
      rewards.current.name.length > ProjectRewardValidations.name.maxLength
    ) {
      errors.name = `Name should be less than ${ProjectRewardValidations.name.maxLength} characters`;
      isValid = false;
    }

    if (!rewards.current.cost || rewards.current.cost <= 0) {
      errors.cost = `Cost must be greater than 0.`;
      isValid = false;
    }

    if (
      formCostDollarValue * 100 >
      ProjectRewardValidations.cost.maxUSDCentsAmount
    ) {
      errors.cost = `Cost must be less than $${commaFormatted(
        ProjectRewardValidations.cost.maxUSDCentsAmount / 100,
      )}.`;
      isValid = false;
    }

    if (
      rewards.current.description &&
      rewards.current.description.length >
        ProjectRewardValidations.description.maxLength
    ) {
      errors.description = `Description should be less than ${ProjectRewardValidations.description.maxLength} characters`;
      isValid = false;
    }

    if (!isValid) {
      setFormError(errors);
    }

    return isValid;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="flex-start" padding="20px 0px">
        <ModalHeader paddingX="20px">
          <Text fontSize="18px" fontWeight={600}>
            Add a Reward
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody width="100%">
          <VStack
            width="100%"
            paddingBottom="20px"
            marginBottom="20px"
            maxHeight="600px"
            overflowY="auto"
            alignItems="flex-start"
            spacing="10px"
            paddingX="2px"
          >
            <VStack width="100%" alignItems="flex-start">
              <Text>Name</Text>
              <TextInputBox
                placeholder={'T - Shirt ...'}
                value={rewards.current.name}
                name="name"
                onChange={handleTextChange}
                error={formError.name}
              />
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <Text>Description</Text>
              <TextArea
                placeholder={' ...'}
                value={rewards.current.description!}
                name="description"
                onChange={handleTextChange}
                error={formError.description}
              />
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <FileUpload onUploadComplete={handleUpload}>
                {rewards.current.image ? (
                  <HStack justifyContent="center">
                    <ImageWithReload
                      borderRadius="4px"
                      src={rewards.current.image}
                      maxHeight="200px"
                    />
                  </HStack>
                ) : (
                  <HStack
                    borderRadius="4px"
                    backgroundColor="brand.bgGrey"
                    width="100%"
                    height="70px"
                    justifyContent="center"
                    alignItems="center"
                    _hover={{ backgroundColor: 'brand.gray300' }}
                  >
                    <AiOutlineUpload />
                    <Text>Add image</Text>
                  </HStack>
                )}
              </FileUpload>
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <Text textTransform={'capitalize'}>Cost of Reward</Text>

              <InputGroup>
                <InputLeftAddon>
                  {isSatoshi ? <SatoshiIconTilted /> : <BiDollar />}
                </InputLeftAddon>

                {/*
                   TODO: Use a different `value` here if when we support currency
                   types beyond USD cents (e.g: satoshis)
                 */}
                <Input
                  focusBorderColor="brand.primary"
                  name="Dollar Amount Cost"
                  type="number"
                  onChange={handleCostAmountChange}
                  value={formCostDollarValue}
                  isInvalid={formError.cost}
                />
              </InputGroup>

              {formError.cost ? (
                <Text fontSize="12px" color="red.500">
                  {formError.cost}
                </Text>
              ) : null}
            </VStack>
          </VStack>

          <VStack spacing="10px">
            <ButtonComponent
              isLoading={createRewardLoading || updateRewardLoading}
              isFullWidth
              primary
              onClick={handleConfirmReward}
            >
              Confirm
            </ButtonComponent>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
