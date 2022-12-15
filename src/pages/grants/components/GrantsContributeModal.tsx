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
import React, { useState, useRef, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  fundingStages,
  getPath,
  MAX_FUNDING_AMOUNT_USD,
} from '../../../constants';
import { useAuthContext } from '../../../context';
import { useFundingFlow } from '../../../hooks';
import { useBTCConverter } from '../../../helpers';
import {
  FundingInput,
  FundingResourceType,
} from '../../../types/generated/graphql';
import { ProjectFundingQRScreenQRCodeSection } from '../../projectView/ActivityPanel/ProjectFundingQRScreenQRCodeSection';
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../../graphql';

const GRANTS_PROJECT_NAME = 'grants';

export const GrantsContributeModal = ({ onLink }: { onLink: any }) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { loading, data: grantsData } = useQuery(QUERY_PROJECT_BY_NAME_OR_ID, {
    variables: { where: { name: GRANTS_PROJECT_NAME } },
  });

  const { user } = useAuthContext();
  const { getSatoshisAmount } = useBTCConverter();
  const fundingFlow = useFundingFlow();

  const {
    fundState,
    fundingTx,
    gotoNextStage,
    resetFundingFlow,
    requestFunding,
  } = fundingFlow;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const defaultModalHeader = 'Contribute';
  const [modalHeader, setModalHeader] = useState(defaultModalHeader);
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const initialRef = useRef(null);

  const linkChangeHandler = (e: any) => {
    setImageUrl(e.target.value);
    onLink(e.target.value);
  };

  useEffect(() => {
    console.log('FUND STATE', fundState);
    if (fundState === fundingStages.completed) {
      setModalHeader('Contribution Successful');
    }
  }, [fundState]);

  const handleClose = () => {
    resetFundingFlow();
    onClose();
    setModalHeader(defaultModalHeader);
  };

  const handleFormConfirmClick = () => {
    const input: FundingInput = {
      projectId: Number(grantsData?.project.id),
      anonymous: Boolean(user),
      ...(amount !== 0 && {
        donationInput: { donationAmount: getSatoshisAmount(amount * 100) },
      }),
      metadataInput: {
        ...(email && { email }),
        ...(imageUrl && { media: imageUrl }),
        ...(comment && { comment: `${name}: ${comment}` }),
      },
      sourceResourceInput: {
        resourceId: Number(grantsData?.project.id),
        resourceType: FundingResourceType.Project,
      },
    };

    requestFunding(input);
    gotoNextStage();
  };

  const renderModalBody = () => {
    switch (fundState) {
      case fundingStages.started:
        return (
          <ModalBody>
            <ProjectFundingQRScreenQRCodeSection fundingFlow={fundingFlow} />
          </ModalBody>
        );

      case fundingStages.completed:
        return (
          <ModalBody>
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
                  {getSatoshisAmount(amount)} sats{' '}
                </span>{' '}
                to the Geyser Grants Pool.
              </Text>
              <Text fontSize={'14px'}>
                100 % of the funds are used to support the Bitcoin ecosystem
                through{' '}
                <Link to={getPath('projectDiscovery')}>Geyser Projects</Link>.
              </Text>
              <Text fontSize={'14px'}>
                Donations are non-refundable and not tax deductible. You
                contributed
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
          </ModalBody>
        );

      default:
        return (
          <ModalBody>
            <Box>
              <Text fontWeight={'500'} mb={2} fontSize="16px">
                Contribute to Geyser Grants to support the Bitcoin ecosystem.
                Donations are non-refundable and not tax deductible.
              </Text>
              <Box mb={3}>
                <Text fontWeight={'700'} fontSize="14px">
                  Amount
                </Text>
                <Box display="flex" alignItems={'center'} gap={3}>
                  <Box
                    display="flex"
                    alignItems={'center'}
                    mt={1}
                    cursor="pointer"
                  >
                    <Box
                      px={4}
                      py={2}
                      border={
                        amount === 100
                          ? '2px solid #20ECC7'
                          : '2px solid #E9ECEF'
                      }
                      rounded="md"
                      fontWeight={'bold'}
                      onClick={() => setAmount(100)}
                    >
                      $100
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    alignItems={'center'}
                    mt={1}
                    cursor="pointer"
                  >
                    <Box
                      px={4}
                      py={2}
                      fontWeight="bold"
                      border={
                        amount === 1000
                          ? '2px solid #20ECC7'
                          : '2px solid #E9ECEF'
                      }
                      rounded="md"
                      onClick={() => setAmount(1000)}
                    >
                      $1,000
                    </Box>
                  </Box>

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
                      value={amount}
                      _placeholder={{ fontWeight: 'bold' }}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      variant={'outline'}
                      isInvalid={amount <= 0 || amount > MAX_FUNDING_AMOUNT_USD}
                    />
                  </InputGroup>
                </Box>
              </Box>

              <FormControl mb={3}>
                <FormLabel fontWeight={'700'} fontSize="14px">
                  Name/ Nym (optional)
                </FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Satoshi"
                  _placeholder={{ fontSize: '12px' }}
                  _focus={{ borderColor: 'brand.primary' }}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel fontWeight={'700'} fontSize="14px">
                  Email/contact (optional)
                </FormLabel>
                <Input
                  ref={initialRef}
                  _placeholder={{ fontSize: '12px' }}
                  placeholder="satoshi@geyser.fund"
                  _focus={{ borderColor: 'brand.primary' }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel fontWeight={'700'} fontSize="14px">
                  Leave us comment (optional)
                </FormLabel>
                <Input
                  ref={initialRef}
                  _placeholder={{ fontSize: '12px' }}
                  _focus={{ borderColor: 'brand.primary' }}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="satoshi@geyser.fund"
                />
              </FormControl>
              <Box>
                <Text fontWeight={'700'} fontSize="14px">
                  Add a Profile Image Link (optional)
                </Text>
                <Text fontWeight={'400'} fontSize="11px">
                  If you would like to feature your profile or business in the
                  Grant page drop the Image link in here and we will add it to
                  the list of sponsors on the Grant page and the landing page
                </Text>
                <Textarea
                  mt={3}
                  onChange={linkChangeHandler}
                  size={'lg'}
                  _placeholder={{ fontSize: '12px' }}
                  _focus={{ borderColor: 'brand.primary' }}
                  placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAccAAABvCAMAAACuGvu3AAAAe1BMVEX////60ij+9tb60SP60R36zwD61U..."
                />
              </Box>
              <Box mt={4}>
                <Button
                  bg="brand.primary"
                  onClick={handleFormConfirmClick}
                  isFullWidth
                >
                  Confirm
                </Button>
              </Box>
            </Box>
          </ModalBody>
        );
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
          setOverlay(<OverlayOne />);
          onOpen();
          gotoNextStage();
        }}
        backgroundColor="brand.primary400"
      >
        Contribute
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={handleClose} size="sm">
        {overlay}
        <ModalContent bg="transparent" boxShadow={0} borderRadius={4}>
          <Box bg="brand.bgWhite" pb={3}>
            <ModalHeader pb={2}>{modalHeader}</ModalHeader>
            <ModalCloseButton />
            {renderModalBody()}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
