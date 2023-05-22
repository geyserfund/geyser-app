import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useContext, useEffect, useMemo, useState } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

import { createApplicantRecordRound2 } from '../../../api'
import { TextArea, TextInputBox } from '../../../components/ui'
import { useAuthContext } from '../../../context'
import { AuthContext } from '../../../context'
import { useFormState } from '../../../hooks'
import { FormStateError } from '../../../interfaces'
import { hasTwitterAccount, useNotification, validUrl } from '../../../utils'
import { ConnectWithTwitter } from '../../auth/ConnectWithTwitter'

interface Grant {
  applicant: number
  title: string
  subtitle: string
  about: string
  image: string
  isClose: boolean
}

export type GrantApplicantInput = {
  area: string
  grantType: string
  link: string
  name: string
  goals: string
}

export const defaultGrantApplicant = {
  area: 'Online',
  grantType: 'Translations',
  link: '',
  name: '',
  goals: '',
}

enum GrantApplicationStages {
  info = 'info',
  form = 'form',
  complete = 'complete',
}

export enum GrantCategory {
  translations = 'Translations',
  visualArt = 'Visual Art',
  communities = 'Communities',
}

export const GrantOptions = [
  {
    label: 'Bitcoin Translations',
    value: GrantCategory.translations,
  },
  {
    label: 'Bitcoin Visual Art',
    value: GrantCategory.visualArt,
  },
  {
    label: 'Bitcoin Communities',
    value: GrantCategory.communities,
  },
]

export const ApplyGrantModal = ({
  applicant,
  image,
  title,
  subtitle,
  isClose,
  about,
}: Grant) => {
  const { user } = useAuthContext()
  const { toast } = useNotification()
  const { externalAccounts } = user

  const { loginOnClose } = useContext(AuthContext)
  const { onClose: onLoginAlertModalClose } = useDisclosure()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { state, setState, setTarget } = useFormState<GrantApplicantInput>(
    defaultGrantApplicant,
  )
  const { area, goals, grantType, link, name } = state

  const [formError, setFormError] = useState<
    FormStateError<GrantApplicantInput>
  >({})

  const [applicationStages, setApplicationStages] =
    useState<GrantApplicationStages>(GrantApplicationStages.info)

  const [loading, setLoading] = useState(false)

  const submitForm = async () => {
    const isValid = validateForm()

    if (!isValid) {
      return
    }

    setLoading(true)
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
    }
    try {
      await createApplicantRecordRound2(data)
      setApplicationStages(GrantApplicationStages.complete)
      setState(defaultGrantApplicant)
    } catch (error) {
      toast({
        status: 'error',
        title: 'Failed to submit application',
        description: 'Please try again later.',
      })
    }

    setLoading(false)
  }

  const handleClose = () => {
    onClose()
    setApplicationStages(GrantApplicationStages.info)
    setState(defaultGrantApplicant)
  }

  const validateForm = () => {
    const error: FormStateError<GrantApplicantInput> = {}
    let isValid = true

    if (!state.name) {
      error.name = 'Name is a required field'
      isValid = false
    }

    if (!state.goals) {
      error.goals = 'this is a required required field'
      isValid = false
    }

    if (!state.link) {
      error.link = 'Link is a required field.'
      isValid = false
    } else if (!validUrl.test(state.link)) {
      error.link = 'Link needs to be a valid URL'
      isValid = false
    }

    setFormError(error)

    return isValid
  }

  useEffect(() => {
    setFormError({})
  }, [state])

  const OverlayOne = useMemo(
    () => (
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
    ),
    [],
  )

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
            <Text textAlign="center">{about}</Text>
          </Box>
        </Box>
        <Box mt={4}>
          {isClose ? (
            <Button
              bg="primary.400"
              onClick={() => {
                setApplicationStages(GrantApplicationStages.form)
              }}
              w="full"
              isDisabled
            >
              {user?.id ? 'Apply' : 'Confirm'}
            </Button>
          ) : (
            <Button w="full" isDisabled>
              Apply
            </Button>
          )}
        </Box>
      </ModalBody>
    </>
  )

  const applicationForm = () => (
    <>
      {hasTwitterAccount(user) ? (
        <ModalBody>
          <Text
            fontWeight={'700'}
            color="neutral.700"
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
                _focus={{ borderColor: 'primary.400' }}
                name="grantType"
                value={state.grantType}
                onChange={setTarget}
              >
                {GrantOptions.map((grant) => (
                  <option key={grant.value} value={grant.value}>
                    {grant.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel fontWeight={400} fontSize="14px">
                What’s your project name?
              </FormLabel>
              <TextInputBox
                placeholder="Bitcoin for Fairness"
                _focus={{ borderColor: 'primary.400' }}
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
                _focus={{ borderColor: 'primary.400' }}
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
                _focus={{ borderColor: 'primary.400' }}
                placeholder="The project aims to raise 5,000 $ for ...."
              />
            </FormControl>
            <FormControl mb={3} mt={3}>
              <FormLabel fontWeight={400} fontSize="14px">
                Which area of the world will you be focusing your efforts on?
              </FormLabel>
              <Select
                _focus={{ borderColor: 'primary.400' }}
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
          </VStack>

          <Box mt="20px">
            {loading ? (
              <Button
                isLoading
                loadingText="Loading"
                bg="primary.400"
                w="full"
                isDisabled
                spinnerPlacement="start"
              >
                Submit
              </Button>
            ) : (
              <Button bg="primary.400" onClick={submitForm} w="full">
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
              <ConnectWithTwitter
                onClose={() => {
                  loginOnClose()
                  onLoginAlertModalClose()
                }}
              />
            </Box>
          </ModalBody>
        </>
      )}
    </>
  )

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
          bg="primary.400"
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
  )

  const renderBody = () => {
    switch (applicationStages) {
      case GrantApplicationStages.info:
        return grantInfo()
      case GrantApplicationStages.form:
        return applicationForm()
      case GrantApplicationStages.complete:
        return completion()
      default:
        return grantInfo()
    }
  }

  return (
    <>
      {isClose ? (
        <Button
          mt={3}
          size="sm"
          minWidth={'100%'}
          fontSize="14px"
          onClick={onOpen}
          backgroundColor="primary.400"
        >
          View
        </Button>
      ) : (
        <Button
          variant={'outline'}
          size="sm"
          w="full"
          onClick={onOpen}
          border="solid 2px"
          borderColor="primary.400"
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
                  backgroundColor="neutral.0"
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
              backgroundColor="neutral.0"
            >
              <MdClose fontSize={'18px'} /> Close
            </Button>
          </HStack>

          <Box
            flex="1"
            bg="neutral.0"
            pb={3}
            borderRadius="4px"
            overflowY="auto"
          >
            {renderBody()}
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}
