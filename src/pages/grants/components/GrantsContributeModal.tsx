import { useQuery } from '@apollo/client'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Link as ChakraLink,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { FaCheck } from 'react-icons/fa'

import { createGrantContributionRecord } from '../../../api'
import { fundingStages, MAX_FUNDING_AMOUNT_USD } from '../../../constants'
import { useAuthContext } from '../../../context'
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../../graphql'
import { useBTCConverter } from '../../../helpers'
import { useFormState, useFundingFlow } from '../../../hooks'
import { FormStateError } from '../../../interfaces'
import { USDCents } from '../../../types'
import {
  FundingInput,
  FundingResourceType,
  Project,
} from '../../../types/generated/graphql'
import { toInt, useNotification } from '../../../utils'
import { ProjectFundingQRScreenQRCodeSection } from '../../projectView/projectActivityPanel/components/ProjectFundingQRScreenQRCodeSection'
import { GRANTS_PROJECT_NAME } from '../constants'

const defaultModalHeader = 'Contribute'

export type GrantContributeInput = {
  amount: number
  email?: string
  comment?: string
  imageUrl?: string
  name?: string
}

export const defaultGrantContribution = {
  amount: 0,
  email: '',
  comment: '',
  link: '',
  name: '',
}

interface Props {
  onSuccess?: (input: GrantContributeInput, project?: Project) => unknown
}

export const GrantsContributeModal = ({ onSuccess }: Props) => {
  const { toast } = useNotification()
  const { user } = useAuthContext()
  const { getSatoshisFromUSDCents } = useBTCConverter()
  const fundingFlow = useFundingFlow()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [modalHeader, setModalHeader] = useState(defaultModalHeader)

  const { state, setState, setTarget, setValue } =
    useFormState<GrantContributeInput>(defaultGrantContribution)

  const [formError, setFormError] =
    useState<FormStateError<GrantContributeInput>>()

  const { data: grantsData } = useQuery(QUERY_PROJECT_BY_NAME_OR_ID, {
    variables: { where: { name: GRANTS_PROJECT_NAME } },
    onCompleted(data) {
      if (!data?.project?.id) {
        toast({
          status: 'error',
          title: 'Failed to fetch grants project.',
          description: 'Please refresh the page and try again.',
        })
      }
    },
    onError() {
      toast({
        status: 'error',
        title: 'Failed to fetch grants project.',
        description: 'Please refresh the page and try again.',
      })
    },
  })

  const {
    fundState,
    fundingTx,
    gotoNextStage,
    resetFundingFlow,
    requestFunding,
  } = fundingFlow

  useEffect(() => {
    setFormError({})
  }, [state])

  useEffect(() => {
    if (fundState === fundingStages.completed && onSuccess) {
      onSuccess(state, grantsData?.project)
    }
  }, [fundState])

  useEffect(() => {
    if (fundState === fundingStages.completed) {
      setModalHeader('Contribution Successful')
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
      }
      try {
        createGrantContributionRecord(data)
      } catch (error) {
        toast({
          status: 'error',
          title: 'failed to record contribution',
          description: 'please contact us if this happended despite payment ',
        })
      }
    }
  }, [fundState])

  const linkChangeHandler = (e: any) => {
    setValue('imageUrl', e.target.value)
  }

  const handleClose = () => {
    resetFundingFlow()
    setModalHeader(defaultModalHeader)
    setState(defaultGrantContribution)
    onClose()
  }

  const handleFormConfirmClick = () => {
    const isValid = validateForm()

    if (!grantsData?.project?.id) {
      toast({
        status: 'error',
        title: 'Something went wrong.',
        description: 'Please refresh the page and try again.',
      })
      return
    }

    if (isValid) {
      const input: FundingInput = {
        projectId: toInt(grantsData?.project?.id),
        anonymous: Boolean(user),
        ...(state.amount !== 0 && {
          donationInput: {
            donationAmount: getSatoshisFromUSDCents(
              (state.amount * 100) as USDCents,
            ),
          },
        }),
        metadataInput: {
          ...(state.comment && { comment: state.comment }),
        },
        sourceResourceInput: {
          resourceId: toInt(grantsData?.project.id),
          resourceType: FundingResourceType.Project,
        },
      }

      requestFunding(input)
      gotoNextStage()
    }
  }

  const validateForm = () => {
    if (state.amount && state.amount !== 0) {
      return true
    }

    if (!state.amount || state.amount === 0) {
      setFormError({ amount: 'amount is required' })
      return false
    }

    if (state.amount > MAX_FUNDING_AMOUNT_USD) {
      setFormError({
        amount: `amount cannot be greater than $${MAX_FUNDING_AMOUNT_USD} in value`,
      })
      return false
    }

    return true
  }

  const OverlayOne = useMemo(
    () => (
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
    ),
    [],
  )

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
          If you fund over $1,000 we will feature your PFP or logo in the Grant
          page drop the Image link in here and we will add it to the list of
          sponsors on the Grant page and the landing page.
        </Text>
        <Textarea
          mt={3}
          onChange={linkChangeHandler}
          size={'lg'}
          _focus={{ borderColor: 'brand.primary' }}
          placeholder="https://pbs.twimg.com/profile_images/15544291/img_400x400.jpg"
          disabled={state.amount < 1000}
        />
      </Box>
      <Box mt={4}>
        <Button bg="brand.primary" onClick={handleFormConfirmClick} w="full">
          Confirm
        </Button>
      </Box>
    </Box>
  )

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
          Your{' '}
          <span style={{ fontWeight: 'bold' }}>
            {' '}
            {getSatoshisFromUSDCents(
              (state.amount * 100) as USDCents,
            )} sats{' '}
          </span>{' '}
          contribution to Geyser Grants Round 2 was successful!
        </Text>
        <Text fontSize={'14px'}>
          Your donation will help accelerate bitcoin adoption by recognizing and
          pushing forward bitcoin projects.
        </Text>
        <Text fontSize={'14px'}>
          Donations are non-refundable and not tax deductible.
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
    )
  }

  const qrSection = () => (
    <ProjectFundingQRScreenQRCodeSection fundingFlow={fundingFlow} />
  )

  const renderModalBody = () => {
    switch (fundState) {
      case fundingStages.started:
        return qrSection()
      case fundingStages.completed:
        return completedScreen()
      default:
        return contributionForm()
    }
  }

  return (
    <>
      <Button
        variant={'solid'}
        fontWeight="500"
        fontSize="16px"
        px={12}
        mr="2"
        height={10}
        onClick={() => {
          gotoNextStage()
          onOpen()
        }}
        backgroundColor="brand.primary"
      >
        Contribute
      </Button>
      {isOpen && (
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
      )}
    </>
  )
}
