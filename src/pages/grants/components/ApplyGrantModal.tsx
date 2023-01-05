import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Box,
  Text,
  FormControl,
  FormLabel,
  Select,
  HStack,
  VStack,
} from '@chakra-ui/react';
import React, { useState, useContext, useMemo, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

import { useAuthContext } from '../../../context';
import { createApplicantRecordRound2 } from '../../../api';
import {
  hasTwitterAccount,
  useNotification,
  validEmail,
  validUrl,
} from '../../../utils';
import { TwitterConnect } from '../../../components/molecules';
import { TextInputBox, TextArea } from '../../../components/ui';
import { AuthContext } from '../../../context';
import { useFormState } from '../../../hooks';
import { FormStateError } from '../../../interfaces';
import { BiLeftArrowAlt } from 'react-icons/bi';

interface Grant {
  applicant: number;
  title: string;
  subtitle: string;
  about: string;
  image: string;
  isClose: Boolean;
}

export type GrantApplicantInput = {
  area: string;
  email: string;
  grantType: string;
  link: string;
  name: string;
  goals: string;
};

export const defaultGrantApplicant = {
  area: 'Online',
  email: '',
  grantType: 'Bitcoin Education',
  link: '',
  name: '',
  goals: '',
};

enum GrantApplicationStages {
  info = 'info',
  form = 'form',
  complete = 'complete',
}

export const ApplyGrantModal = ({
  applicant,
  image,
  title,
  subtitle,
  isClose,
  about,
}: Grant) => {
  const { user } = useAuthContext();
  const { toast } = useNotification();
  const { externalAccounts } = user;

  const { loginOnClose } = useContext(AuthContext);
  const { onClose: onLoginAlertModalClose } = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { state, setState, setTarget } = useFormState<GrantApplicantInput>(
    defaultGrantApplicant,
  );
  const { area, goals, email, grantType, link, name } = state;

  const [formError, setFormError] = useState<
    FormStateError<GrantApplicantInput>
  >({});

  const [applicationStages, setApplicationStages] =
    useState<GrantApplicationStages>(GrantApplicationStages.info);

  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setLoading(true);
    const data = {
      fields: {
        'Project Name': name,
        Grant: grantType,
        'Project Link': link,
        Goals: goals,
        Region: area,
        'Twitter ID': externalAccounts[0]?.externalUsername,
        Links: '',
      },
    };
    try {
      await createApplicantRecordRound2(data);
      setApplicationStages(GrantApplicationStages.complete);
      setState(defaultGrantApplicant);
    } catch (error) {
      toast({
        status: 'error',
        title: 'Failed to submit application',
        description: 'Please try again later.',
      });
    }

    setLoading(false);
  };

  const handleClose = () => {
    onClose();
    setApplicationStages(GrantApplicationStages.info);
    setState(defaultGrantApplicant);
  };

  const validateForm = () => {
    const error: FormStateError<GrantApplicantInput> = {};
    let isValid = true;

    if (!state.name) {
      error.name = 'Name is a required field';
      isValid = false;
    }

    if (!state.goals) {
      error.goals = 'this is a required required field';
      isValid = false;
    }

    if (!state.link) {
      error.link = 'Link is a required field.';
      isValid = false;
    } else if (!validUrl.test(state.link)) {
      error.link = 'Link needs to be a valid URL';
      isValid = false;
    }

    if (!state.email) {
      error.email = 'Email is a required field';
      isValid = false;
    } else if (!validEmail.test(state.email)) {
      error.email = 'Email needs to be valid';
      isValid = false;
    }

    setFormError(error);

    return isValid;
  };

  useEffect(() => {
    setFormError({});
  }, [state]);

  const OverlayOne = useMemo(
    () => (
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
    ),
    [],
  );

  const grantInfo = () => (
    <>
      <Box
        width={'100%'}
        display={isClose ? 'block' : 'flex'}
        justifyContent={'center'}
        borderTopRightRadius="4px"
        borderTopLeftRadius="4px"
        overflow="hidden"
      >
        <img src={image} width={isClose ? '100%' : '60%'} />
      </Box>

      <ModalBody>
        <Text fontWeight={'600'} mb={2} fontSize="18px">
          {title}
        </Text>
        <Text fontWeight={400} mb={2} fontSize="13px">
          {subtitle}
        </Text>
        <Box my={4}>
          <Box
            display="flex"
            justifyContent={'center'}
            alignContent="center"
            flexDirection={'column'}
          >
            <Text justify="center">{about}</Text>
          </Box>
        </Box>
        <Box mt={4}>
          {isClose ? (
            <Button
              bg="brand.primary"
              onClick={() => {
                setApplicationStages(GrantApplicationStages.form);
              }}
              isFullWidth
            >
              {user?.id ? 'Apply' : 'Confirm'}
            </Button>
          ) : (
            <Button isFullWidth disabled>
              Apply
            </Button>
          )}
        </Box>
      </ModalBody>
    </>
  );

  const applicationForm = () => (
    <>
      {hasTwitterAccount(user) ? (
        <ModalBody>
          <Text
            fontWeight={'700'}
            color="brand.gray700"
            mb={2}
            mt={4}
            fontSize="22px"
          >
            Apply
          </Text>
          <VStack spacing="15px" marginTop="25px">
            <FormControl mb={3}>
              <FormLabel fontWeight={400} fontSize="14px">
                Which Grant are you applying to?
              </FormLabel>
              <Select
                _focus={{ borderColor: 'brand.primary' }}
                name="grantType"
                value={state.grantType}
                onChange={setTarget}
              >
                {' '}
                <option value="Bitcoin Education">Bitcoin Education</option>
                <option value="Bitcoin Culture">Bitcoin Culture</option>
                <option value="Bitcoin Builders">Bitcoin Builders</option>
              </Select>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel fontWeight={400} fontSize="14px">
                What’s your project name?
              </FormLabel>
              <TextInputBox
                placeholder="Bitcoin for Fairness"
                _focus={{ borderColor: 'brand.primary' }}
                name="name"
                value={state.name}
                onChange={setTarget}
                error={formError.name}
              />
            </FormControl>
            <Box>
              <Text fontWeight={400} fontSize="14px">
                Drop your Geyser or Bolt.fun project link with an explainer of
                your project idea and intent.
              </Text>
              <Text fontWeight={400} fontSize="12px">
                Make sure to explain the problem you are trying to solve and how
                your project aims to tackle it. You can write Entries (articles)
                to provide more depth and Milestones to divide your plan in
                phases.
              </Text>

              <TextArea
                mt={3}
                name="link"
                value={state.link}
                onChange={setTarget}
                error={formError.link}
                size={'md'}
                _focus={{ borderColor: 'brand.primary' }}
                placeholder="https://geyser.fund/project/bitcoin-for-fairness"
              />
            </Box>
            <FormControl mb={3}>
              <FormLabel fontWeight={400} fontSize="14px">
                What are your main project milestones and goals?
              </FormLabel>
              <TextArea
                mt={3}
                name="goals"
                value={state.goals}
                onChange={setTarget}
                error={formError.goals}
                size={'md'}
                _focus={{ borderColor: 'brand.primary' }}
                placeholder="The project aims to raise 5,000 $ for ...."
              />
            </FormControl>
            <FormControl mb={3} mt={3}>
              <FormLabel fontWeight={400} fontSize="14px">
                Which area of the world will you be focusing your efforts on?
              </FormLabel>
              <Select
                _focus={{ borderColor: 'brand.primary' }}
                name="area"
                value={state.area}
                onChange={setTarget}
              >
                <option value="Asia">Asia</option>
                <option value="South america">South america</option>
                <option value="North America">North America</option>
                <option value="Africa">Africa</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Online">Online</option>
                Online
              </Select>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel fontWeight={'700'} fontSize="12px">
                Email
              </FormLabel>
              <TextInputBox
                placeholder="Yolo@protonmail.com"
                _focus={{ borderColor: 'brand.primary' }}
                name="email"
                value={state.email}
                onChange={setTarget}
                error={formError.email}
              />
            </FormControl>
          </VStack>

          <Box mt="20px">
            {loading ? (
              <Button
                isLoading
                loadingText="Loading"
                bg="brand.primary"
                isFullWidth
                isDisabled
                spinnerPlacement="start"
              >
                Submit
              </Button>
            ) : (
              <Button bg="brand.primary" onClick={submitForm} isFullWidth>
                Submit
              </Button>
            )}
          </Box>
        </ModalBody>
      ) : (
        <>
          <Box width={'100%'}>
            <img src={image} width={'100%'} />
          </Box>
          <ModalBody>
            <Text fontWeight={'700'} mb={3} fontSize="22px">
              Apply
            </Text>
            <Text fontWeight={'400'} mb={2} fontSize="15px">
              You need to link your Twitter account to apply to a Grant. This is
              to verify your identity and that you are not impersonating someone
              else
            </Text>

            <Box mt={6}>
              <TwitterConnect
                onClose={() => {
                  loginOnClose();
                  onLoginAlertModalClose();
                }}
              />
            </Box>
          </ModalBody>
        </>
      )}
    </>
  );

  const completion = () => (
    <ModalBody>
      <Text fontWeight={'700'} fontSize="22px">
        Apply
      </Text>

      <Box display="flex" justifyContent={'center'} my={4}>
        {' '}
        <Box
          height={'55px'}
          width={'55px'}
          rounded="full"
          display="flex"
          justifyContent={'center'}
          alignItems="center"
          bg="brand.primary"
        >
          <FaCheck />
        </Box>
      </Box>
      <Text fontSize={'20px'} textAlign="center" fontWeight={600}>
        Application Submitted
      </Text>
      <Text fontSize="14px" fontWeight={400} marginTop="20px">
        You can review your application status at the bottom of the Grants Round
        #2 Page.
      </Text>
    </ModalBody>
  );

  const renderBody = () => {
    switch (applicationStages) {
      case GrantApplicationStages.info:
        return grantInfo();
      case GrantApplicationStages.form:
        return applicationForm();
      case GrantApplicationStages.complete:
        return completion();
      default:
        return grantInfo();
    }
  };

  return (
    <>
      {isClose ? (
        <Button
          mt={3}
          size="sm"
          minWidth={'100%'}
          fontSize="14px"
          onClick={onOpen}
          backgroundColor="brand.primary"
        >
          View
        </Button>
      ) : (
        <Button
          variant={'outline'}
          size="sm"
          isFullWidth
          onClick={onOpen}
          style={{ border: 'solid 2px #20ECC7' }}
        >
          Closed
        </Button>
      )}

      <Modal isCentered isOpen={isOpen} onClose={handleClose} size="md">
        {OverlayOne}

        <ModalContent
          bg="transparent"
          boxShadow={0}
          marginX="10px"
          maxWidth="450px"
          maxHeight="calc(100% - 120px)"
          display="flex"
          flexDirection="column"
        >
          <HStack width="100%" justifyContent="space-between" mb={2}>
            <Box>
              {applicationStages === GrantApplicationStages.form && (
                <Button
                  fontSize="sm"
                  rounded={0}
                  onClick={() =>
                    setApplicationStages(GrantApplicationStages.info)
                  }
                  gap={2}
                  width="50px"
                  backgroundColor="brand.bgWhite"
                >
                  <BiLeftArrowAlt fontSize={'25px'} />
                </Button>
              )}
            </Box>

            <Button
              fontSize="sm"
              rounded={0}
              onClick={handleClose}
              gap={2}
              width="100px"
              backgroundColor="brand.bgWhite"
            >
              <MdClose fontSize={'18px'} /> Close
            </Button>
          </HStack>

          <Box
            flex="1"
            bg="brand.bgWhite"
            pb={3}
            borderRadius="4px"
            overflowY="auto"
          >
            {renderBody()}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
