import {
  Box,
  CloseButton,
  Divider,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BoltIcon } from '../../../components/icons';
import {
  ButtonComponent,
  SatoshiAmount,
  SectionTitle,
  TextInputBox,
} from '../../../components/ui';
import { MAX_FUNDING_AMOUNT_USD, noFeeProjects } from '../../../constants';
import { useFundCalc } from '../../../helpers/fundingCalculation';
import { IFundForm } from '../../../hooks';
import { IProjectType } from '../../../interfaces';
import { useNotification } from '../../../utils';
import { ProjectReward } from '../../../types/generated/graphql';
import { FundingFormSection } from '../FundingFormSection';
import { ProjectPaymentFormFundingComment } from '../components/ProjectPaymentFormFundingComment';

type Props = {
  isMobile: boolean;
  fundingRequestLoading: boolean;
  handleCloseButton: () => void;
  formState: IFundForm;
  setTarget: (_: any) => void;
  updateReward: any;
  setFormState: any;
  handleFund: () => void;
  type: IProjectType;
  rewards?: ProjectReward[];
  name: string;
};

export const ProjectFundingSelectionFormScreen = ({
  isMobile,
  fundingRequestLoading,
  handleCloseButton,
  handleFund,
  formState,
  setTarget,
  setFormState,
  updateReward,
  rewards,
  name,
}: Props) => {
  const { getTotalAmount } = useFundCalc(formState);

  const { toast } = useNotification();
  const hasRewards = rewards && rewards.length > 0;
  const hasSelectedRewards =
    formState.rewardsByIDAndCount &&
    Object.entries(formState.rewardsByIDAndCount).length > 0;
  const submit = () => {
    const valid = validateFundingAmount();
    if (valid) {
      handleFund();
    }
  };

  const validateFundingAmount = () => {
    if (getTotalAmount('dollar', name) >= MAX_FUNDING_AMOUNT_USD) {
      toast({
        title: `Payment above ${MAX_FUNDING_AMOUNT_USD} is not allowed at the moment.`,
        description:
          'Please update the amount, or contact us for donating a higher amount.',
        status: 'error',
      });
      return false;
    }

    if (getTotalAmount('sats', name) < 1) {
      toast({
        title: 'The payment minimum is 1 satoshi.',
        description: 'Please update the amount.',
        status: 'error',
      });
      return false;
    }

    if (formState.rewardsCost && !formState.email) {
      toast({
        title: 'Email is a required field when donating for a reward.',
        description: 'Please enter an email.',
        status: 'error',
      });
      return false;
    }

    return true;
  };

  return (
    <VStack
      padding={isMobile ? '20px 10px' : '20px'}
      width="100%"
      height="100%"
      position="relative"
      alignItems="flex-start"
      backgroundColor="#FFFFFF"
    >
      <CloseButton
        position="absolute"
        right={0}
        top={0}
        _hover={{ bg: 'none' }}
        _active={{ bg: 'none' }}
        onClick={handleCloseButton}
      />

      <Box width="100%" overflowY="auto" flex={1}>
        <FundingFormSection
          {...{
            rewards,
            setFormState,
            updateReward,
            formState,
          }}
        />
        {hasRewards && (
          <Divider
            borderTopWidth="3px"
            borderBottomWidth="0px"
            orientation="horizontal"
            marginTop="0px !important"
          />
        )}
      </Box>

      <VStack
        padding={2}
        width={'full'}
        borderRadius={'md'}
        backgroundColor={'brand.neutral100'}
        spacing={2}
      >
        <VStack spacing={1.5} alignItems="flex-start" width={'full'}>
          <SectionTitle>Comment</SectionTitle>

          <ProjectPaymentFormFundingComment
            comment={formState.comment}
            setTarget={setTarget}
            setFormState={setFormState}
            width={'full'}
          />

          {formState.rewardsCost && (
            <Box width="100%">
              <TextInputBox
                type="email"
                name="email"
                fontSize="14px"
                backgroundColor={'brand.bgWhite'}
                placeholder="Contact Email"
                value={formState.email}
                onChange={setTarget}
              />
            </Box>
          )}
        </VStack>

        <VStack
          padding={2}
          color={'brand.neutral700'}
          fontWeight={'medium'}
          width={'full'}
          alignItems="flex-start"
          spacing={2}
        >
          {hasRewards && hasSelectedRewards ? (
            <HStack
              justifyContent={'space-between'}
              width={'full'}
              alignItems="flex-start"
              color="brand.neutral700"
            >
              <Text
                flex={0}
                fontSize="14px"
                textColor={'brand.neutral700'}
                fontWeight={'normal'}
              >
                Rewards
              </Text>
              <VStack flex={1} flexWrap={'wrap'} alignItems="flex-end">
                {Object.entries(formState.rewardsByIDAndCount!).map(
                  ([key, value]) => {
                    const reward = rewards.find(({ id }) => id === key);
                    if (reward) {
                      return (
                        <Text key={key}>
                          {value}x {reward.name}
                        </Text>
                      );
                    }
                  },
                )}
              </VStack>
            </HStack>
          ) : null}

          <HStack
            justifyContent={'space-between'}
            width={'full'}
            fontSize={'14px'}
          >
            <Text
              fontSize="14px"
              textColor={'brand.neutral700'}
              fontWeight={'normal'}
            >
              {'Geyser fee'}
            </Text>
            <Text>{!noFeeProjects.includes(name) ? '2%' : '0%'}</Text>
          </HStack>

          <HStack
            justifyContent={'space-between'}
            width={'full'}
            fontSize={'10px'}
          >
            <SectionTitle>Total</SectionTitle>

            <HStack>
              <SatoshiAmount
                color="#1A1A1A"
                fontWeight="bold"
                marginLeft={'auto'}
                fontSize={'21px'}
              >
                {getTotalAmount('sats', name)}
              </SatoshiAmount>

              <Text color="#1A1A1A" fontWeight="bold" fontSize={'21px'}>
                {`($${getTotalAmount('dollar', name)})`}
              </Text>
            </HStack>
          </HStack>
        </VStack>

        <Box width="100%" marginTop={2}>
          <ButtonComponent
            isLoading={fundingRequestLoading}
            primary
            standard
            leftIcon={<BoltIcon />}
            width="100%"
            onClick={submit}
          >
            Fund Project
          </ButtonComponent>
        </Box>
      </VStack>
    </VStack>
  );
};
