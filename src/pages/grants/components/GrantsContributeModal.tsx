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
import { Trans, useTranslation } from 'react-i18next'
import { FaCheck } from 'react-icons/fa'

import { Body2, Caption } from '../../../components/typography'
import { MAX_FUNDING_AMOUNT_USD } from '../../../constants'
import { useAuthContext } from '../../../context'
import { useBTCConverter } from '../../../helpers'
import { useFormState } from '../../../hooks'
import { FormStateError } from '../../../interfaces'
import { FundingProvider, useFundingContext } from '../../../modules/project/funding/context/FundingFlow'
import { FundingStages, useFundingStage } from '../../../modules/project/funding/state'
import { QRCodeSection } from '../../../modules/project/pages/projectView/views/projectActivityPanel/screens'
import { FundingInput, FundingResourceType, USDCents, useProjectByNameOrIdQuery } from '../../../types'
import { toInt, useNotification } from '../../../utils'
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
  grantProjectName?: string
}

export const GrantsContributeModalContent = ({ grantProjectName }: Props) => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const { user } = useAuthContext()
  const { getSatoshisFromUSDCents } = useBTCConverter()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [modalHeader, setModalHeader] = useState(defaultModalHeader)

  const { state, setState, setTarget, setValue } = useFormState<GrantContributeInput>(defaultGrantContribution)

  const [formError, setFormError] = useState<FormStateError<GrantContributeInput>>()

  const { data: grantsData } = useProjectByNameOrIdQuery({
    variables: { where: { name: grantProjectName || GRANTS_PROJECT_NAME } },
    onCompleted(data) {
      if (!data?.projectGet?.id) {
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

  const { fundingStage, setNextFundingStage } = useFundingStage()

  const { fundingTx, resetFundingFlow, requestFunding } = useFundingContext()

  useEffect(() => {
    setFormError({})
  }, [state])

  useEffect(() => {
    if (fundingStage === FundingStages.completed) {
      setModalHeader('Contribution Successful')
    }
  }, [fundingStage])

  const handleClose = () => {
    resetFundingFlow()
    setModalHeader(defaultModalHeader)
    setState(defaultGrantContribution)
    onClose()
  }

  const handleFormConfirmClick = () => {
    const isValid = validateForm()

    if (!grantsData?.projectGet?.id) {
      toast({
        status: 'error',
        title: 'Something went wrong.',
        description: 'Please refresh the page and try again.',
      })
      return
    }

    if (isValid) {
      const input: FundingInput = {
        projectId: toInt(grantsData?.projectGet?.id),
        anonymous: Boolean(user),
        donationAmount: getSatoshisFromUSDCents((state.amount * 100) as USDCents),
        metadataInput: {
          ...(state.comment && { comment: state.comment }),
        },
        sourceResourceInput: {
          resourceId: toInt(grantsData?.projectGet.id),
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
        amount: `amount cannot be greater than \${{MAX_FUNDING_AMOUNT_USD}} in value`,
      })
      return false
    }

    return true
  }

  const OverlayOne = useMemo(() => <ModalOverlay />, [])

  const contributionForm = () => (
    <VStack w="full" spacing="20px">
      <Text fontWeight={'500'} mb={2} fontSize="16px">
        {t(
          'Contribute to Geyser Grants to support the Bitcoin ecosystem. Donations are non-refundable and not tax deductible.',
        )}
      </Text>
      <VStack mb={3} spacing="10px" w="full" alignItems="start">
        <Text fontWeight={'700'} fontSize="14px">
          {t('Amount')}
        </Text>
        <Box display="flex" alignItems={'flex-start'} gap={3}>
          <AmountButtonComponent stateAmount={state.amount} amount={10} setValue={setValue} />
          <AmountButtonComponent stateAmount={state.amount} amount={50} setValue={setValue} />
          <AmountButtonComponent stateAmount={state.amount} amount={100} setValue={setValue} />
          <AmountButtonComponent stateAmount={state.amount} amount={1000} setValue={setValue} />
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
          {t(
            'Funding over $1000 can get you featured as a sponsor. Reach out to us at hello@geyser.fund to let us know.',
          )}
        </Caption>
      </VStack>

      <VStack w="full" spacing="10px" alignItems="start">
        <Body2 bold fontSize="14px">
          {t('Leave us a comment (optional)')}
        </Body2>
        <Input
          _focus={{ borderColor: 'primary.400' }}
          placeholder={t('Love what you guys are doing.')}
          name="comment"
          value={state.comment}
          onChange={setTarget}
        />
      </VStack>

      <Button variant={'primary'} onClick={handleFormConfirmClick} w="full">
        {t('Confirm')}
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
          <Trans
            i18nKey={'Your <1>{{amount}}</1> contribution to Geyser Grants was successful!'}
            values={{
              amount: `${getSatoshisFromUSDCents((state.amount * 100) as USDCents)} sats`,
            }}
          >
            Your <span style={{ fontWeight: 'bold' }}>{'{{amount}}'}</span> contribution to Geyser Grants Round 2 was
            successful!
          </Trans>
        </Text>
        <Text fontSize={'14px'}>
          {t(
            'Your donation will help accelerate bitcoin adoption by recognizing and pushing forward bitcoin projects.',
          )}
        </Text>
        <Text fontSize={'14px'}>{t('Donations are non-refundable and not tax deductible.')}</Text>
        {fundingTx.onChain && (
          <Text mt={4} fontSize={'14px'}>
            {t('Check out')}{' '}
            <ChakraLink href={`https://mempool.space/address/${fundingTx.address}`}>
              <Box as="span" fontWeight="bold" borderBottom="1px solid" borderColor="neutral.1000">
                {t('the block explorer')}
              </Box>
            </ChakraLink>
          </Text>
        )}
      </VStack>
    )
  }

  const qrSection = () => <QRCodeSection />

  const renderModalBody = () => {
    switch (fundingStage) {
      case FundingStages.started:
        return qrSection()
      case FundingStages.completed:
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
          setNextFundingStage()
          onOpen()
        }}
      >
        {t('Contribute')}
      </Button>
      {isOpen && (
        <Modal isCentered isOpen={isOpen} onClose={handleClose} size="sm">
          {OverlayOne}
          <ModalContent bg="transparent" boxShadow={0}>
            <Box borderRadius="4px" bg="neutral.0" pb={3}>
              <ModalHeader pb={2}>{t(modalHeader)}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{renderModalBody()}</ModalBody>
            </Box>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

export const GrantsContributeModal = ({ grantProjectName }: Props) => {
  return (
    <FundingProvider>
      <GrantsContributeModalContent grantProjectName={grantProjectName} />
    </FundingProvider>
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
