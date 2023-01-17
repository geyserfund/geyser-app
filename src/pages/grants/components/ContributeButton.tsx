/* eslint-disable radix */

import React, { useEffect, useState } from 'react';
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Box,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Image,
  HStack,
  InputGroup,
  InputLeftElement,
  Link,
  IconButton,
} from '@chakra-ui/react';
import QRCode from 'react-qr-code';
import { CheckIcon } from '@chakra-ui/icons';
import { VStack } from '@chakra-ui/layout';
import { ButtonComponent } from '../../../components/ui';
import { useNotification, isMobileMode } from '../../../utils';
import Loader from '../../../components/ui/Loader';
import { createCreatorRecord } from '../../../api';
import { commaFormatted } from '../../../utils/helperFunctions';
import { IProject, IFundingInput } from '../../../interfaces';
import { useFundingFlow } from '../../../hooks';
import { fundingStages, GeyserTelegramUrl } from '../../../constants';
import { RiLinksLine, RiLinkUnlinkM } from 'react-icons/ri';
import { useBtcContext } from '../../../context/btc';
import { Subscribe } from '../../../components/nav/Subscribe';
import { FaTelegramPlane } from 'react-icons/fa';
import {
  FundingInput,
  FundingResourceType,
} from '../../../types/generated/graphql';

interface ContributeButtonProps {
  active: boolean;
  title: string;
  project: IProject;
}

export const ContributeButton = ({
  active,
  title,
  project,
}: ContributeButtonProps) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [contributeAmount, setContributeAmount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(false);
  const [copy, setCopy] = useState(false);
  const { toast } = useNotification();
  const initialRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { btcRate } = useBtcContext();
  const {
    fundState,
    fundingTx,
    gotoNextStage,
    resetFundingFlow,
    requestFunding,
  } = useFundingFlow({ hasWebLN: false });
  const [subscribed, setSubscribed] = useState(false);
  const [thousandAmount, setThousandAmount] = useState(false);
  const [hundredAmount, setHundredAmount] = useState(false);

  const isMobile = isMobileMode();

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    }
  }, [copy]);

  useEffect(() => {
    if (fundState === 'completed') {
      if (name || contact) {
        const records = [
          {
            fields: {
              Title: name,
              fldGla9o00ogzrquw: contact,
              Type: ['Grants Contributor'],
              fldOWbMeUVrRjXrYu: ['Geyser Grants'],
              Grant: project.title,
              fldNsoC4hNwXXYBUZ: contributeAmount,
            },
          },
        ];
        createCreatorRecord({ records });
      }
    }
  }, [fundState]);

  const { address } = fundingTx;

  const getOnchainAddress = () => {
    const bitcoins =
      parseInt((contributeAmount / btcRate).toFixed(0)) / 100000000;
    return `bitcoin:${address}?amount=${bitcoins}`;
  };

  const handleCopyOnchain = () => {
    navigator.clipboard.writeText(getOnchainAddress());
    setCopy(true);
  };

  const handleFund = async () => {
    const input: FundingInput = {
      projectId: Number(project.id),
      anonymous: true,
      donationInput: {
        donationAmount: parseInt((contributeAmount / btcRate).toFixed(0)),
      },
      sourceResourceInput: {
        resourceId: Number(project.id),
        resourceType: FundingResourceType.Project,
      },
    };
    requestFunding(input);
  };

  const handleConfirm = async () => {
    if (parseInt((contributeAmount / btcRate).toFixed(0)) > 15000000) {
      setMessage(true);
    } else if (contributeAmount === 0) {
      toast({
        title: 'Payment below 1 sats is not allowed at the moment.',
        description: 'Please update the amount.',
        status: 'error',
      });
    } else {
      try {
        setSubmitting(true);
        handleFund();
      } catch (_) {
        toast({
          title: 'Something went wrong',
          description: 'Please try again',
          status: 'error',
        });
        setSubmitting(false);
      }
    }
  };

  const close = () => {
    setName('');
    setContact('');
    setContributeAmount(0);
    setThousandAmount(false);
    setHundredAmount(false);
    setSubmitting(false);
    setMessage(false);
    setSubscribed(false);
    resetFundingFlow();
    onClose();
  };

  const renderFormModal = () => (
    <>
      <Modal
        onClose={close}
        isOpen={isOpen}
        isCentered
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <HStack p={6}>
            <Image
              src={project.image}
              alt="icon"
              rounded="lg"
              w="100px"
              mr={1}
            />
            <Box>
              <ModalHeader fontWeight="bold" fontSize="2xl" p={0}>
                Contribute
              </ModalHeader>
              <Text textAlign="justify">
                Contribute to this grant to support the Bitcoin ecosystem.
                Donations are non-refundable and not tax deductible.
              </Text>
            </Box>
          </HStack>
          <ModalCloseButton onClick={close} />
          <ModalBody>
            {submitting ? (
              <Loader />
            ) : (
              <>
                <HStack>
                  <Text fontWeight="bold">Name / Nym</Text>{' '}
                  <Text>(optional)</Text>
                </HStack>
                <Input
                  name="name"
                  placeholder="Satoshi"
                  focusBorderColor="#20ECC7"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                />
                <HStack mt={5}>
                  <Text fontWeight="bold">Email / Contact</Text>{' '}
                  <Text>(optional)</Text>
                </HStack>
                <Input
                  name="contact"
                  placeholder="satoshi@geyser.fund"
                  focusBorderColor="#20ECC7"
                  onChange={(event) => setContact(event.target.value)}
                  value={contact}
                />
                <Text mt={5} fontWeight="bold">
                  Amount
                </Text>
                <HStack>
                  <ButtonComponent
                    border={hundredAmount ? '3px solid #20ECC7' : ''}
                    onClick={() => {
                      if (thousandAmount) {
                        setThousandAmount(false);
                      }

                      setMessage(false);
                      setContributeAmount(100);
                      setHundredAmount(true);
                    }}
                  >
                    $100
                  </ButtonComponent>
                  <ButtonComponent
                    border={thousandAmount ? '3px solid #20ECC7' : ''}
                    onClick={() => {
                      if (hundredAmount) {
                        setHundredAmount(false);
                      }

                      setMessage(false);
                      setContributeAmount(1000);
                      setThousandAmount(true);
                    }}
                  >
                    $1000
                  </ButtonComponent>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" fontWeight="bold">
                      $
                    </InputLeftElement>
                    <Input
                      ref={initialRef}
                      name="amount"
                      type="number"
                      placeholder="0"
                      focusBorderColor="#20ECC7"
                      fontWeight="bold"
                      onChange={(event) => {
                        if (message) {
                          setMessage(false);
                        }

                        if (thousandAmount || hundredAmount) {
                          setThousandAmount(false);
                          setHundredAmount(false);
                        }

                        if (parseInt(event.target.value, 10) > 0) {
                          setContributeAmount(parseInt(event.target.value, 10));
                        } else {
                          setContributeAmount(0);
                        }
                      }}
                      value={contributeAmount <= 0 ? '' : contributeAmount}
                      isRequired={true}
                    />
                  </InputGroup>
                </HStack>
                {message && (
                  <Text textAlign="justify" mt={5}>
                    Payment above 15,000,000 sats is not allowed at the moment.
                    Please update the amount, or contact us for donating a
                    higher amount
                  </Text>
                )}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            {!submitting && (
              <ButtonComponent
                primary
                width="100%"
                onClick={handleConfirm}
                disabled={
                  !contributeAmount ||
                  contributeAmount <= 0 ||
                  submitting ||
                  message
                }
              >
                Confirm
              </ButtonComponent>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  const renderPaymentModal = () => (
    <>
      <Modal onClose={close} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <HStack p={6}>
            <Image
              src={project.image}
              alt="icon"
              rounded="lg"
              w="100px"
              mr={1}
            />
            <Box>
              <ModalHeader fontWeight="bold" fontSize="2xl" p={0}>
                Contribute
              </ModalHeader>
              <Text textAlign="justify">
                Contribute to this grant to support the Bitcoin ecosystem.
                Donations are non-refundable and not tax deductible.
              </Text>
            </Box>
          </HStack>
          <ModalCloseButton onClick={close} />
          <ModalBody>
            <Text textAlign="center" fontWeight="bold" fontSize="md">
              Contribute using Bitcoin on-chain
            </Text>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              pt="15px"
              cursor="pointer"
              w="186px"
              h="186px"
              margin="0 auto"
            >
              <QRCode
                size={186}
                value={getOnchainAddress()}
                onClick={handleCopyOnchain}
              />
            </Box>
            <Text
              paddingTop="15px"
              textAlign="center"
              color="#1BD5B3"
              fontWeight="bold"
            >
              Waiting for payment...
            </Text>
          </ModalBody>
          <ModalFooter display="block">
            <ButtonComponent
              isFullWidth
              primary={copy}
              onClick={handleCopyOnchain}
              leftIcon={copy ? <RiLinkUnlinkM /> : <RiLinksLine />}
            >
              {!copy ? 'Copy Address' : 'Address Copied'}
            </ButtonComponent>
            <HStack mt={5}>
              <Text>
                If you’re experiencing any issues with this payment please reach
                out to us on Telegram.
              </Text>
              <Link href={GeyserTelegramUrl} isExternal>
                <IconButton
                  background={'none'}
                  aria-label="telegram"
                  icon={<FaTelegramPlane fontSize="20px" />}
                  color={'#6C757D'}
                />
              </Link>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  const renderSuccessModal = () => (
    <Modal onClose={close} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="bold" fontSize="2xl" textAlign="center">
          Successful contribution!
        </ModalHeader>
        <ModalCloseButton onClick={close} />
        <ModalBody>
          <VStack
            padding={isMobile ? '10px 10px' : '5px 20px'}
            spacing="12px"
            width="100%"
            height="100%"
            overflowY="hidden"
            position="relative"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              bg="brand.primary"
              borderRadius="full"
              width="100px"
              height="100px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CheckIcon w={10} h={10} />
            </Box>
            {!subscribed && (
              <>
                <Text>
                  You contributed{' '}
                  <b>{`$${commaFormatted(contributeAmount)}`}</b> to{' '}
                  <b>{project.title}.</b>
                </Text>
                <Text>
                  Check it out on the{' '}
                  <Link
                    isExternal
                    href={`https://mempool.space/address/${address}`}
                    textDecoration="underline"
                  >
                    <b>block explorer</b>
                  </Link>
                  .
                </Text>
                <Text>
                  Subscribe below to Geyser Grants to receive updates on where
                  the funds are being distributed, the impact they are having,
                  and receive notices on new upcoming grants.
                </Text>
              </>
            )}
            <Box w="100%">
              <Subscribe
                style="inline-minimal"
                interest="grants"
                parentState={setSubscribed}
              />
            </Box>
            <ButtonComponent width="100%" onClick={close}>
              Close
            </ButtonComponent>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  const renderModal = () => {
    switch (fundState) {
      case fundingStages.initial:
        return null;
      case fundingStages.form:
        return renderFormModal();
      case fundingStages.started:
        return renderPaymentModal();
      case fundingStages.completed:
        return renderSuccessModal();
      default:
        return null;
    }
  };

  return (
    <>
      <ButtonComponent
        disabled={!active}
        primary
        standard
        w="100%"
        onClick={() => {
          onOpen();
          gotoNextStage();
        }}
      >
        {title}
      </ButtonComponent>
      {renderModal()}
    </>
  );
};
