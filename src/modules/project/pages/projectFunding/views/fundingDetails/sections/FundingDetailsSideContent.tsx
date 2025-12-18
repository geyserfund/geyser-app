import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { FormEvent } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context'
import { useAuthModal } from '@/modules/auth/hooks'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { FundingUserInfoError } from '@/modules/project/funding/state/fundingFormAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { AlertDialogue } from '@/shared/molecules/AlertDialogue'
import { useNotification } from '@/utils'

import { ProjectFundingSummary } from '../../../components/ProjectFundingSummary'
import { FundingCheckoutWrapper, FundingSummaryWrapper } from '../../../layouts/FundingSummaryWrapper'
import { LaunchpadSummary, NonProfitSummary, TAndCs } from '../../fundingInit/sections/FundingInitSideContent.tsx'
import { ShippingHandleSubmitType } from '../hooks/useShippingAddressForm.tsx'
import { ShippingAddressFormData } from './FundingDetailsShippingAddress.tsx'

type FundingDetailsSummaryProps = {
  handleSubmit: ShippingHandleSubmitType
  addressForm: UseFormReturn<ShippingAddressFormData, any, undefined>
}

export const FundingDetailsBottomContent = ({ handleSubmit, addressForm }: FundingDetailsSummaryProps) => {
  return <FundingDetailsSummary handleSubmit={handleSubmit} addressForm={addressForm} />
}

export const FundingDetailsSideContent = ({ handleSubmit, addressForm }: FundingDetailsSummaryProps) => {
  return (
    <CardLayout w="full" h="full" padding={0}>
      <FundingDetailsSummary handleSubmit={handleSubmit} addressForm={addressForm} />
    </CardLayout>
  )
}

export const FundingDetailsSummary = ({ handleSubmit, addressForm }: FundingDetailsSummaryProps) => {
  const navigate = useNavigate()
  const toast = useNotification()

  const warningModal = useModal()

  const { isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()

  const { isFundingUserInfoValid, project, setErrorstate, formState } = useFundingFormAtom()

  const hasSubscription = Boolean(formState.subscription?.subscriptionId)

  const onSubmitFunction = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (formState.needsShipping) {
      handleSubmit(
        e,
        () => {
          handleCheckoutButtonPressed(e as FormEvent<HTMLDivElement>)
        },
        () => {
          toast.warning({ title: t('Invalid shipping address') })
        },
      )
    } else {
      handleCheckoutButtonPressed(e as FormEvent<HTMLDivElement>)
    }
  }

  const handleCheckoutButtonPressed = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { title, description, error, valid } = isFundingUserInfoValid

    if (valid) {
      if (!isLoggedIn && hasSubscription) {
        warningModal.onOpen()
        return
      }

      handleGoNext()
    } else if (error === FundingUserInfoError.EMAIL) {
      setErrorstate({ key: 'email', value: 'Email is a required field' })
      toast.error({
        title,
        description,
      })
    } else if (error === FundingUserInfoError.PRIVATE_COMMENT) {
      setErrorstate({ key: 'privateComment', value: 'Private message is a required field' })
      toast.error({
        title,
        description,
      })
    }
  }

  const handleGoNext = () => {
    if (isLoggedIn) {
      navigate(getPath('fundingGuardians', project.name))
    } else {
      navigate(getPath('fundingStart', project.name))
    }
  }

  return (
    <VStack
      as="form"
      width="100%"
      height="100%"
      maxHeight={{ base: 'calc(100vh - 177px)', lg: 'auto' }}
      overflowY="auto"
      justifyContent={'space-between'}
      onSubmit={onSubmitFunction}
    >
      <FundingSummaryWrapper>
        <ProjectFundingSummary />
      </FundingSummaryWrapper>

      <FundingCheckoutWrapper>
        <VStack w="full" alignItems="flex-start">
          <NonProfitSummary disableMobile={true} />
          <LaunchpadSummary disableMobile={true} />
          <TAndCs disableMobile={true} />
          <Button size="lg" w="full" variant="solid" colorScheme="primary1" type="submit">
            {t('Checkout')}
          </Button>
        </VStack>

        <AlertDialogue
          {...warningModal}
          title={t('Subscribing anonymously')}
          description={t('You would not be able to manage your subscription through geyser.')}
          positiveButtonProps={{
            onClick() {
              warningModal.onClose()
              loginOnOpen()
            },
            children: t('Login'),
          }}
          neutralButtonProps={{
            onClick() {
              warningModal.onClose()
              handleGoNext()
            },
            children: t('Continue'),
          }}
        >
          <Body size="sm" light>
            {t('To manage your subscription in the future, please login to stripe with your provided email.')}
          </Body>
        </AlertDialogue>
      </FundingCheckoutWrapper>
    </VStack>
  )
}
