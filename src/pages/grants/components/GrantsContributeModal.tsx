import { useQuery } from '@apollo/client'
import {
  Box,
  Button,
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
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { FaCheck } from 'react-icons/fa'

import { createGrantContributionRecord } from '../../../api'
import { Body2, Caption } from '../../../components/typography'
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
  grantProjectName?: string
}

export const GrantsContributeModal = ({
  onSuccess,
  grantProjectName,
}: Props) => {
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
    variables: { where: { name: grantProjectName || GRANTS_PROJECT_NAME } },
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

  const OverlayOne = useMemo(() => <ModalOverlay />, [])

  const contributionForm = () => (
    <VStack w="full" spacing="20px">
      <Text fontWeight={'500'} mb={2} fontSize="16px">
        Contribute to Geyser Grants to support the Bitcoin ecosystem. Donations
        are non-refundable and not tax deductible.
      </Text>
      <VStack mb={3} spacing="10px" w="full" alignItems="start">
        <Text fontWeight={'700'} fontSize="14px">
          Amount
        </Text>
        <Box display="flex" alignItems={'flex-start'} gap={3}>
          <AmountButtonComponent
            stateAmount={state.amount}
            amount={10}
            setValue={setValue}
          />
          <AmountButtonComponent
            stateAmount={state.amount}
            amount={50}
            setValue={setValue}
          />
          <AmountButtonComponent
            stateAmount={state.amount}
            amount={100}
            setValue={setValue}
          />
          <AmountButtonComponent
            stateAmount={state.amount}
            amount={1000}
            setValue={setValue}
          />
        </Box>
      </VStack>
      <VStack width="100%" alignItems={'center'} mt={1} cursor="pointer">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Text>$</Text>
          </InputLeftElement>
          <Input
            placeholder="12,120"
            type={'number'}
            _focus={{
              borderColor: 'primary.500',
            }}
            border="2px solid"
            borderColor="primary.400"
            value={state.amount}
            name="amount"
            variant={'outline'}
            isInvalid={Boolean(formError?.amount)}
            onChange={setTarget}
          />
        </InputGroup>
        {formError?.amount && (
          <Text color="secondary.red" fontSize="12px">
            {formError?.amount}
          </Text>
        )}
        <Caption>
          Funding over $1000 can get you featured as a sponsor. Reach out to us
          at hello@geyser.fund to let us know.
        </Caption>
      </VStack>

      <VStack w="full" spacing="10px" alignItems="start">
        <Body2 bold fontSize="14px">
          Leave us a comment (optional)
        </Body2>
        <Input
          _focus={{ borderColor: 'primary.400' }}
          placeholder="Love what you guys are doing."
          name="comment"
          value={state.comment}
          onChange={setTarget}
        />
      </VStack>

      <Button bg="primary.400" onClick={handleFormConfirmClick} w="full">
        Confirm
      </Button>
    </VStack>
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
            bg="primary.400"
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
        {fundingTx.onChain && (
          <Text mt={4} fontSize={'14px'}>
            Check out the{' '}
            <ChakraLink
              href={`https://mempool.space/address/${fundingTx.address}`}
            >
              <Box
                as="span"
                fontWeight="bold"
                borderBottom="1px solid"
                borderBottomColor="neutral.1000"
              >
                block explorer
              </Box>
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
        variant="primary"
        px={12}
        onClick={() => {
          gotoNextStage()
          onOpen()
        }}
      >
        Contribute
      </Button>
      {isOpen && (
        <Modal isCentered isOpen={isOpen} onClose={handleClose} size="sm">
          {OverlayOne}
          <ModalContent bg="transparent" boxShadow={0}>
            <Box borderRadius="4px" bg="neutral.0" pb={3}>
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

export const AmountButtonComponent = ({
  amount,
  setValue,
  stateAmount,
}: {
  amount: number
  setValue: any
  stateAmount: number
}) => {
  return (
    <Box
      display="flex"
      alignItems={'center'}
      mt={1}
      cursor="pointer"
      px="15px"
      py="6px"
      border="2px solid"
      borderColor={stateAmount === amount ? 'primary.400' : 'neutral.200'}
      rounded="md"
      fontWeight={'bold'}
      onClick={() => setValue('amount', amount)}
    >
      {`$${amount}`}
    </Box>
  )
}
