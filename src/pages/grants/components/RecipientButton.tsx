import React, { useEffect, useState, useContext } from 'react';
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
  Textarea,
  Image,
  HStack,
  Select,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { VStack } from '@chakra-ui/layout';
import { ButtonComponent, UndecoratedLink } from '../../../components/ui';
import { isMobileMode, useNotification } from '../../../utils';
import Loader from '../../../components/ui/Loader';
import { createApplicantRecord } from '../../../api';
import { Subscribe } from '../../../components/nav/Subscribe';
import { AuthContext } from '../../../context';
import { SiTwitter } from 'react-icons/si';
import Icon from '@chakra-ui/icon';
import { AUTH_SERVICE_ENDPOINT } from '../../../constants';
import { Maybe } from '../../../types/generated/graphql';

interface RecipientButtonProps {
  active: boolean;
  title: string;
  grant: string;
  image?: Maybe<string>;
}

export const RecipientButton = ({
  active,
  title,
  grant,
  image,
}: RecipientButtonProps) => {
  const isMobile = isMobileMode();
  const [step, setStep] = useState(0);
  const [grantee, setGrantee] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [stage, setStage] = useState('');
  const [region, setRegion] = useState('');
  const [contact, setContact] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useNotification();
  const initialRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subscribed, setSubscribed] = useState(false);
  const { user } = useContext(AuthContext);

  const [copy, setCopy] = useState(false);
  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    }
  }, [copy]);

  const handleSubmission = async () => {
    try {
      setSubmitting(true);
      const userCopy = JSON.parse(JSON.stringify(user));
      const twitterID = userCopy.externalAccounts.find(
        (account: any) => account.type === 'twitter',
      ).externalId;
      const records = [
        {
          fields: {
            Title: grantee,
            fldSKBmoxAUYc1NxQ: description,
            Links: url,
            fldBXbm6GY73CQwgL: stage,
            Region: region,
            Contact: contact,
            Grant: grant,
            fld0eyFwj2EWLH8Yh: twitterID,
          },
        },
      ];
      await createApplicantRecord({ records });
      setStep(1);
    } catch (_) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        status: 'error',
      });
    }

    setSubmitting(false);
  };

  const close = () => {
    setGrantee('');
    setDescription('');
    setUrl('');
    setStage('');
    setRegion('');
    setContact('');
    setSubscribed(false);
    setStep(0);
    onClose();
  };

  const renderModal = () => {
    if (step === 0) {
      return renderFormModal();
    }

    if (step === 1) {
      return renderSuccessModal();
    }
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
            <Image src={`${image}`} alt="icon" rounded="lg" w="100px" mr={1} />
            <Box>
              <ModalHeader fontWeight="bold" fontSize="2xl" p={0}>
                {submitting ? 'Applying' : 'Apply'}
              </ModalHeader>
              <Text textAlign="justify">
                Apply to this grant if you are working on a project that
                supports {grant}.
              </Text>
            </Box>
          </HStack>
          <ModalCloseButton onClick={close} />
          <ModalBody>
            {user.id ? (
              <>
                {submitting ? (
                  <Loader />
                ) : (
                  <>
                    <Text fontWeight="bold">
                      What’s your project or initiative called?
                    </Text>
                    <Input
                      ref={initialRef}
                      name="name"
                      placeholder="Bitcoin for Fairness"
                      focusBorderColor="#20ECC7"
                      onChange={(event) => setGrantee(event.target.value)}
                      value={grantee}
                      isRequired={true}
                    />
                    <Text mt={5} fontWeight="bold">
                      How are you supporting {grant}?
                    </Text>
                    <Textarea
                      name="description"
                      placeholder="Teaching young Africans the basics about Bitcoin."
                      focusBorderColor="#20ECC7"
                      onChange={(event) => setDescription(event.target.value)}
                      value={description}
                      isRequired={true}
                    />
                    <Text mt={5} fontWeight="bold">
                      Where can we find more information about your project or
                      initiative? Drop a link to your project, whether it’s on
                      Geyser or elsewhere.
                    </Text>
                    <Input
                      name="link"
                      placeholder="https://geyser.fund/project/bitcoin-for-fairness"
                      focusBorderColor="#20ECC7"
                      onChange={(event) => setUrl(event.target.value)}
                      value={url}
                      isRequired={true}
                    />
                    <Text fontWeight="bold" mt={5}>
                      At what stage is your project?
                    </Text>
                    <Input
                      name="stage"
                      placeholder="Implementation stage"
                      focusBorderColor="#20ECC7"
                      onChange={(event) => setStage(event.target.value)}
                      value={stage}
                      isRequired={true}
                    />
                    <Text fontWeight="bold" mt={5}>
                      Which region or country will this project impact?
                    </Text>
                    <Select
                      name="region"
                      placeholder="Select option"
                      focusBorderColor="#20ECC7"
                      onChange={(event) => setRegion(event.target.value)}
                      isRequired={true}
                    >
                      <option value="North America">North America</option>
                      <option value="South America">South America</option>
                      <option value="Europe">Europe</option>
                      <option value="Africa">Africa</option>
                      <option value="Asia">Asia</option>
                      <option value="Oceania">Oceania</option>
                      <option value="Online">Online</option>
                    </Select>
                    <Text mt={5} fontWeight="bold">
                      Your email / contact info:
                    </Text>
                    <Input
                      name="contact"
                      placeholder="anita@geyser.fund"
                      focusBorderColor="#20ECC7"
                      onChange={(event) => setContact(event.target.value)}
                      value={contact}
                      isRequired={true}
                    />
                  </>
                )}
              </>
            ) : (
              <Box>
                <Text textAlign="center" mb={4}>
                  You need to link your Twitter account to apply for a Grant.
                </Text>
                <UndecoratedLink href={`${AUTH_SERVICE_ENDPOINT}/twitter`}>
                  <ButtonComponent
                    isFullWidth
                    primary
                    standard
                    leftIcon={<Icon as={SiTwitter} />}
                  >
                    Login with Twitter
                  </ButtonComponent>
                </UndecoratedLink>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            {!submitting && user.id ? (
              <ButtonComponent
                primary
                width="100%"
                onClick={handleSubmission}
                disabled={
                  grantee.length === 0 ||
                  description.length === 0 ||
                  url.length === 0 ||
                  contact.length === 0 ||
                  stage.length === 0 ||
                  region.length === 0
                }
              >
                Submit
              </ButtonComponent>
            ) : (
              <></>
            )}
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
          Success!
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
                  <b>{grantee}</b> has applied to receive the <b>{grant}</b>{' '}
                  Geyser Grant.
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

  return (
    <>
      <ButtonComponent
        disabled={!active}
        primary
        standard
        w="100%"
        onClick={() => {
          onOpen();
        }}
      >
        {title}
      </ButtonComponent>
      {renderModal()}
    </>
  );
};
