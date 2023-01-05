import {
  VStack,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  InputLeftElement,
  Link as ChakraLink,
} from '@chakra-ui/react';
import React, { useState, useEffect, useMemo } from 'react';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  fundingStages,
  getPath,
  MAX_FUNDING_AMOUNT_USD,
} from '../../../constants';
import { useAuthContext } from '../../../context';
import { useFormState, useFundingFlow } from '../../../hooks';
import { useBTCConverter } from '../../../helpers';
import {
  FundingInput,
  FundingResourceType,
} from '../../../types/generated/graphql';
import { ProjectFundingQRScreenQRCodeSection } from '../../projectView/ActivityPanel/ProjectFundingQRScreenQRCodeSection';
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../../graphql';
import { createGrantContributionRecord } from '../../../api';
import { FormStateError } from '../../../interfaces';
import { useNotification } from '../../../utils';

const GRANTS_PROJECT_NAME = 'grants';
const defaultModalHeader = 'Contribute';

export type GrantContributeInput = {
  amount: number;
  email?: string;
  comment?: string;
  imageUrl?: string;
  name?: string;
};

export const defaultGrantContribution = {
  amount: 0,
  email: '',
  comment: '',
  link: '',
  name: '',
};

export const GrantsContributeModal = ({ onLink }: { onLink: any }) => {
  const { toast } = useNotification();
  const { user } = useAuthContext();
  const { getSatoshisFromUSDCents } = useBTCConverter();
  const fundingFlow = useFundingFlow();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalHeader, setModalHeader] = useState(defaultModalHeader);

  const { state, setState, setTarget, setValue } =
    useFormState<GrantContributeInput>(defaultGrantContribution);

  const [formError, setFormError] =
    useState<FormStateError<GrantContributeInput>>();

  const { data: grantsData } = useQuery(QUERY_PROJECT_BY_NAME_OR_ID, {
    variables: { where: { name: GRANTS_PROJECT_NAME } },
    onCompleted(data) {
      if (!data?.project?.id) {
        toast({
          status: 'error',
          title: 'Failed to fetch grants project.',
          description: 'Please refresh the page and try again.',
        });
      }
    },
    onError() {
      toast({
        status: 'error',
        title: 'Failed to fetch grants project.',
        description: 'Please refresh the page and try again.',
      });
    },
  });

  const {
    fundState,
    fundingTx,
    gotoNextStage,
    resetFundingFlow,
    requestFunding,
  } = fundingFlow;

  useEffect(() => {
    setFormError({});
  }, [state]);

  useEffect(() => {
    if (fundState === fundingStages.completed) {
      onLink(state.imageUrl);
    }
  }, [fundState]);

  useEffect(() => {
    if (fundState === fundingStages.completed) {
      setModalHeader('Contribution Successful');
      const data = {
        records: [
          {
            fields: {
              Name: state.name || undefined,
              Amount: state.amount,
              Comment: state.comment || undefined,
              'Email/contact': state.email || undefined,
              'PFP link': state.imageUrl || undefined,
            },
          },
        ],
      };
      try {
        createGrantContributionRecord(data);
      } catch (error) {
        console.log('checking error', error);
      }
    }
  }, [fundState]);

  const linkChangeHandler = (e: any) => {
    setValue('imageUrl', e.target.value);
  };

  const handleClose = () => {
    resetFundingFlow();
    setModalHeader(defaultModalHeader);
    setState(defaultGrantContribution);
    onClose();
  };

  const handleFormConfirmClick = () => {
    const isValid = validateForm();

    if (!grantsData?.project?.id) {
      toast({
        status: 'error',
        title: 'Something went wrong.',
        description: 'Please refresh the page and try again.',
      });
      return;
    }

    if (isValid) {
      const input: FundingInput = {
        projectId: Number(grantsData?.project?.id),
        anonymous: Boolean(user),
        ...(state.amount !== 0 && {
          donationInput: {
            donationAmount: getSatoshisFromUSDCents(state.amount * 100),
          },
        }),
        metadataInput: {
          ...(state.comment && { comment: state.comment }),
        },
        sourceResourceInput: {
          resourceId: Number(grantsData?.project.id),
          resourceType: FundingResourceType.Project,
        },
      };

      requestFunding(input);
      gotoNextStage();
    }
  };

  const validateForm = () => {
    if (state.amount && state.amount !== 0) {
      return true;
    }

    if (!state.amount || state.amount === 0) {
      setFormError({ amount: 'amount is required' });
      return false;
    }

    if (state.amount > MAX_FUNDING_AMOUNT_USD) {
      setFormError({
        amount: `amount cannot be greater than $${MAX_FUNDING_AMOUNT_USD} in value`,
      });
      return false;
    }

    return true;
  };

  const OverlayOne = useMemo(
    () => (
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
    ),
    [],
  );

  const contributionForm = () => (
    <Box>
      <Text fontWeight={'500'} mb={2} fontSize="16px">
        Contribute to Geyser Grants to support the Bitcoin ecosystem. Donations
        are non-refundable and not tax deductible.
      </Text>
      <Box mb={3}>
        <Text fontWeight={'700'} fontSize="14px">
          Amount
        </Text>
        <Box display="flex" alignItems={'flex-start'} gap={3}>
          <Box display="flex" alignItems={'center'} mt={1} cursor="pointer">
            <Box
              px="20px"
              py="6px"
              border={
                state.amount === 100 ? '2px solid #20ECC7' : '2px solid #E9ECEF'
              }
              rounded="md"
              fontWeight={'bold'}
              onClick={() => setValue('amount', 100)}
            >
              $100
            </Box>
          </Box>
          <Box display="flex" alignItems={'center'} mt={1} cursor="pointer">
            <Box
              px="20px"
              py="6px"
              fontWeight="bold"
              border={
                state.amount === 1000
                  ? '2px solid #20ECC7'
                  : '2px solid #E9ECEF'
              }
              rounded="md"
              onClick={() => setValue('amount', 1000)}
            >
              $1,000
            </Box>
          </Box>

          <VStack width="100%" alignItems={'center'} mt={1} cursor="pointer">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Text>$</Text>
              </InputLeftElement>
              <Input
                placeholder="12,120"
                type={'number'}
                _focus={{
                  borderColor: 'brand.primary',
                }}
                border="2px solid #20ECC7"
                value={state.amount}
                name="amount"
                variant={'outline'}
                isInvalid={Boolean(formError?.amount)}
                onChange={setTarget}
              />
            </InputGroup>
            {formError?.amount && (
              <Text color="brand.error" fontSize="12px">
                {formError?.amount}
              </Text>
            )}
          </VStack>
        </Box>
      </Box>

      <FormControl mb={3}>
        <FormLabel fontWeight={'700'} fontSize="14px">
          Name/ Nym (optional)
        </FormLabel>
        <Input
          placeholder="Satoshi"
          _focus={{ borderColor: 'brand.primary' }}
          name="name"
          value={state.name}
          onChange={setTarget}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel fontWeight={'700'} fontSize="14px">
          Email/contact (optional)
        </FormLabel>
        <Input
          placeholder="satoshi@geyser.fund"
          _focus={{ borderColor: 'brand.primary' }}
          value={state.email}
          name="email"
          onChange={setTarget}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel fontWeight={'700'} fontSize="14px">
          Leave us a comment (optional)
        </FormLabel>
        <Input
          _focus={{ borderColor: 'brand.primary' }}
          placeholder="Love what you guys are doing. Let the Sats flow!"
          name="comment"
          value={state.comment}
          onChange={setTarget}
        />
      </FormControl>
      <Box>
        <Text fontWeight={'700'} fontSize="14px">
          Add a profile image link (optional)
        </Text>
        <Text fontWeight={'400'} fontSize="11px">
          If you would like to feature your profile or business in the Grant
          page drop the Image link in here and we will add it to the list of
          sponsors on the Grant page and the landing page
        </Text>
        <Textarea
          mt={3}
          onChange={linkChangeHandler}
          size={'lg'}
          _focus={{ borderColor: 'brand.primary' }}
          placeholder="https://pbs.twimg.com/profile_images/15544291/img_400x400.jpg"
        />
      </Box>
      <Box mt={4}>
        <Button bg="brand.primary" onClick={handleFormConfirmClick} isFullWidth>
          Confirm
        </Button>
      </Box>
    </Box>
  );

  const completedScreen = () => {
    return (
      <VStack justify={'center'} spacing={5}>
        <Box display="flex" justifyContent={'center'} my={4}>
          <Box
            height={'61px'}
            width={'61px'}
            rounded="full"
            display="flex"
            justifyContent={'center'}
            alignItems="center"
            bg="brand.primary"
          >
            <FaCheck />
          </Box>
        </Box>

        <Text fontSize={'14px'}>
          You contributed{' '}
          <span style={{ fontWeight: 'bold' }}>
            {' '}
            {getSatoshisFromUSDCents(state.amount * 100)} sats{' '}
          </span>{' '}
          to the Geyser Grants Pool.
        </Text>
        <Text fontSize={'14px'}>
          100 % of the funds are used to support the Bitcoin ecosystem through{' '}
          <Link to={getPath('projectDiscovery')}>Geyser Projects</Link>.
        </Text>
        <Text fontSize={'14px'}>
          Donations are non-refundable and not tax deductible. You contributed
        </Text>
        {!fundingTx.onChain && (
          <Text mt={4} fontSize={'14px'}>
            Check out the{' '}
            <ChakraLink
              href={`https://mempool.space/address/${fundingTx.address}`}
            >
              <span
                style={{
                  fontWeight: 'bold',
                  borderBottom: '1px solid black',
                }}
              >
                block explorer
              </span>
            </ChakraLink>
          </Text>
        )}
      </VStack>
    );
  };

  const qrSection = () => (
    <ProjectFundingQRScreenQRCodeSection fundingFlow={fundingFlow} />
  );

  const renderModalBody = () => {
    switch (fundState) {
      case fundingStages.started:
        return qrSection();
      case fundingStages.completed:
        return completedScreen();
      default:
        return contributionForm();
    }
  };

  return (
    <>
      <Button
        variant={'solid'}
        fontSize="sm"
        px={10}
        mr="2"
        onClick={() => {
          onOpen();
          gotoNextStage();
        }}
        backgroundColor="brand.primary"
      >
        Sponsor
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={handleClose} size="sm">
        {OverlayOne}
        <ModalContent bg="transparent" boxShadow={0}>
          <Box borderRadius="4px" bg="brand.bgWhite" pb={3}>
            <ModalHeader pb={2}>{modalHeader}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{renderModalBody()}</ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
