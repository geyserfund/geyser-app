import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
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
  VStack,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import QRCode from 'react-qr-code';
import { createGrantContributionRecord } from '../../../api';
import bitcircle from '../../../assets/bitcircle.svg';
import { useFormState } from '../../../hooks';
import { FormStateError } from '../../../interfaces';

interface ContributeModalProps {
  onComplete?: (state: GrantContributeInput) => void;
}

export type GrantContributeInput = {
  amount: number;
  email?: string;
  comment?: string;
  link?: string;
  name?: string;
};

export const defaultGrantContribution = {
  amount: 0,
  email: '',
  comment: '',
  link: '',
  name: '',
};

enum GrantContributionStatus {
  initial = 'inital',
  waiting = 'waiting',
  complete = 'complete',
}

export const ContributeModal = ({ onComplete }: ContributeModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { state, setState, setTarget, setValue } =
    useFormState<GrantContributeInput>(defaultGrantContribution);

  const [formError, setFormError] =
    useState<FormStateError<GrantContributeInput>>();

  const [grantContributionState, setGrantContributionState] =
    useState<GrantContributionStatus>(GrantContributionStatus.initial);

  const OverlayOne = useMemo(
    () => (
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
    ),
    [],
  );

  const handleClose = () => {
    if (onComplete) {
      onComplete(state);
    }

    setState(defaultGrantContribution);
    onClose();
  };

  const handleInitialConfirm = async () => {
    const isValid = validateForm();

    if (isValid) {
      const data = {
        records: [
          {
            fields: {
              Name: state.name || undefined,
              Amount: state.amount,
              Comment: state.comment || undefined,
              'Email/contact': state.email || undefined,
              'PFP link': state.link || undefined,
            },
          },
        ],
      };
      try {
        const response = await createGrantContributionRecord(data);
        console.log('checking response', response);
      } catch (error) {
        console.log('checking error', error);
      }
    }

    setGrantContributionState(GrantContributionStatus.waiting);
  };

  const validateForm = () => {
    if (state.amount && state.amount !== 0) {
      return true;
    }

    setFormError({ amount: 'valid amount is required' });
    return false;
  };

  const contributionForm = () => (
    <ModalBody>
      <Text fontWeight={'500'} mb={2} fontSize="16px">
        Contribute to Geyser Grants to support the Bitcoin ecosystem. Donations
        are non-refundable and not tax deductible.
      </Text>
      <Box mb={3}>
        <Text fontWeight={'700'} fontSize="14px">
          Amount
        </Text>
        <Box display="flex" alignItems={'center'} gap={3}>
          <Box display="flex" alignItems={'center'} mt={1} cursor="pointer">
            <Box
              px={4}
              py={2}
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
              px={4}
              py={2}
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
              <InputLeftElement
                pointerEvents="none"
                // eslint-disable-next-line react/no-children-prop
                children={<Text>$</Text>}
              />
              <Input
                placeholder="12,120"
                type={'number'}
                _focus={{ borderColor: 'brand.primary' }}
                value={state.amount}
                _placeholder={{ fontWeight: 'bold' }}
                name="amount"
                isInvalid={Boolean(formError?.amount)}
                onChange={setTarget}
                variant={'outline'}
              />
            </InputGroup>
            {formError?.amount ? (
              <Text color="brand.error" fontSize="12px">
                {formError?.amount}
              </Text>
            ) : null}
          </VStack>
        </Box>
      </Box>

      <FormControl mb={3}>
        <FormLabel fontWeight={'700'} fontSize="14px">
          Name/ Nym (optional)
        </FormLabel>
        <Input
          placeholder="Satoshi"
          _placeholder={{ fontSize: '12px' }}
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
          _placeholder={{ fontSize: '12px' }}
          placeholder="satoshi@geyser.fund"
          _focus={{ borderColor: 'brand.primary' }}
          value={state.email}
          name="email"
          onChange={setTarget}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel fontWeight={'700'} fontSize="14px">
          Leave us comment (optional)
        </FormLabel>
        <Input
          _placeholder={{ fontSize: '12px' }}
          _focus={{ borderColor: 'brand.primary' }}
          name="comment"
          value={state.comment}
          onChange={setTarget}
          placeholder="satoshi@geyser.fund"
        />
      </FormControl>
      <Box>
        <Text fontWeight={'700'} fontSize="14px">
          Upload your logo or PFP link (optional)
        </Text>
        <Text fontWeight={'400'} fontSize="11px">
          If you would like to featured your profile or business in the Grant
          page drop the Image link in here and we will add it to the list of
          sponsors on the Grant page and the landing page
        </Text>
        <Textarea
          mt={3}
          name="link"
          onChange={setTarget}
          size={'lg'}
          _placeholder={{ fontSize: '12px' }}
          _focus={{ borderColor: 'brand.primary' }}
          placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAccAAABvCAMAAACuGvu3AAAAe1BMVEX////60ij+9tb60SP60R36zwD61U..."
        />
      </Box>
      <Box mt={4}>
        <Button bg="brand.primary" onClick={handleInitialConfirm} isFullWidth>
          Confirm
        </Button>
      </Box>
    </ModalBody>
  );

  const qrSection = () => (
    <ModalBody>
      <Box display="flex" alignItems={'center'} gap={4}>
        <img src={bitcircle} alt="bitcoinsymbol" width={'40px'} />
        <Text fontWeight={'400'} fontSize="10px">
          Scan this QR code to fund with Bitcoin on any wallet (on-chain or
          lightning)
        </Text>
      </Box>
      <Box display="flex" justifyContent={'center'} alignItems="center">
        <Box my={2}>
          <QRCode
            size={186}
            value={
              'orem ipsum dolor sit amet consectetur adipisicing elit. Sint tempore expedita ab quae nisi assumenda. Et reiciendis vero temporibus asperiores commodi non obcaecati tempore rerum inventore? Accusamus tempore ex dolores.'
            }
          />
        </Box>
      </Box>

      <Box display="flex" alignItems={'center'} justifyContent="center" gap={2}>
        <Button isLoading color="brand.primary" variant={'text'}>
          load
        </Button>
        <Text fontWeight={'400'}>waiting for payment...</Text>
      </Box>
      <Box mt={4}>
        <Button
          bg="brand.primary"
          onClick={() => {
            setGrantContributionState(GrantContributionStatus.complete);
            handleClose();
          }}
          isFullWidth
        >
          Confirm
        </Button>
      </Box>
    </ModalBody>
  );

  const completedScreen = () => (
    <ModalBody>
      <Text fontWeight={'500'} fontSize="16px">
        Contribute to this gramt to support the Bitcoin ecosystem. Donations are
        non-refundable and not tax deductible.
      </Text>

      <Box display="flex" justifyContent={'center'} my={4}>
        {' '}
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
          200,000 Sats to Bitcoin Education in Emerging Markets.s
        </span>
      </Text>
      <Text mt={4} fontSize={'14px'}>
        Check out the{' '}
        <span
          style={{
            fontWeight: 'bold',
            borderBottom: '1px solid black',
          }}
        >
          block explorer
        </span>
      </Text>
      <Box mt={4}>
        <Button
          bg="brand.primary"
          onClick={() => {
            setGrantContributionState(GrantContributionStatus.complete);
          }}
          isFullWidth
        >
          Confirm
        </Button>
      </Box>
    </ModalBody>
  );

  const renderBody = () => {
    switch (grantContributionState) {
      case GrantContributionStatus.initial:
        return contributionForm();
      case GrantContributionStatus.waiting:
        return qrSection();
      case GrantContributionStatus.complete:
        return completedScreen();
      default:
        break;
    }
  };

  return (
    <>
      <Button
        variant={'solid'}
        fontSize="sm"
        px={10}
        mr="2"
        onClick={onOpen}
        backgroundColor="brand.primary400"
      >
        Contribute
      </Button>

      <Modal isCentered isOpen={isOpen} size="sm" onClose={handleClose}>
        {OverlayOne}

        <ModalContent bg="transparent" boxShadow={0}>
          <Button
            fontSize="sm"
            rounded={0}
            onClick={handleClose}
            mb={2}
            gap={2}
            width="100px"
            backgroundColor="brand.bgWhite"
          >
            <MdClose fontSize={'18px'} /> Close
          </Button>
          <Box bg="brand.bgWhite" pb={3}>
            <ModalHeader pb={2}>Contribute</ModalHeader>
            {renderBody()}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
