import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { FormEvent, useRef } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'

import { useAuthContext } from '@/context'
import { useAuthModal } from '@/modules/auth/hooks'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { FundingUserInfoError } from '@/modules/project/funding/state/fundingFormAtom'
import { recurringFundingModes } from '@/modules/project/recurring/graphql'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { AlertDialogue } from '@/shared/molecules/AlertDialogue'
import { useNotification } from '@/utils'

import { ContinueWithButtons } from '../../../components/ContinueWithButtons.tsx'
import { ProjectFundingSummary } from '../../../components/ProjectFundingSummary'
import { FundingCheckoutWrapper, FundingSummaryWrapper } from '../../../layouts/FundingSummaryWrapper'
import { LaunchpadSummary, NonProfitSummary, TAndCs } from '../../fundingInit/sections/FundingInitSideContent.tsx'
import {
  fiatCheckoutMethods,
  fiatPaymentMethodAtom,
  hasFiatPaymentMethodAtom,
  hasStripePaymentMethodAtom,
  intendedPaymentMethodAtom,
  PaymentMethods,
} from '../../fundingPayment/state/paymentMethodAtom.ts'
import { ShippingHandleSubmitType } from '../hooks/useShippingAddressForm.tsx'
import { ShippingAddressFormData } from './FundingDetailsShippingAddress.tsx'

type FundingDetailsSummaryProps = {
  handleSubmit: ShippingHandleSubmitType
  addressForm: UseFormReturn<ShippingAddressFormData, any, undefined>
}

type SelectedPaymentOption = {
  intendedPaymentMethod?: PaymentMethods
  fiatPaymentMethod?: typeof fiatCheckoutMethods.creditCard | typeof fiatCheckoutMethods.applePay
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
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useNotification()

  const warningModal = useModal()

  const { isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()

  const { isFundingUserInfoValid, isOneTimeFundingMode, project, setErrorstate, formState } = useFundingFormAtom()
  const intendedPaymentMethod = useAtomValue(intendedPaymentMethodAtom)
  const fiatPaymentMethod = useAtomValue(fiatPaymentMethodAtom)
  const hasFiatPaymentMethod = useAtomValue(hasFiatPaymentMethodAtom)
  const hasStripePaymentMethod = useAtomValue(hasStripePaymentMethodAtom)
  const selectedPaymentOptionRef = useRef<SelectedPaymentOption | null>(null)

  const hasRecurringSelection = formState.fundingMode !== recurringFundingModes.oneTime
  const shouldShowPaymentMethodButtons = true
  const getSelectedPaymentOption = (e?: FormEvent<HTMLDivElement>): SelectedPaymentOption | null => {
    const submitter = (e?.nativeEvent as SubmitEvent | undefined)?.submitter as HTMLButtonElement | null
    const selectedPaymentMethod = submitter?.dataset.paymentMethod as PaymentMethods | undefined
    const selectedFiatPaymentMethod = submitter?.dataset.fiatCheckoutMethod as
      | typeof fiatCheckoutMethods.creditCard
      | typeof fiatCheckoutMethods.applePay
      | undefined

    if (!selectedPaymentMethod) {
      return null
    }

    return {
      intendedPaymentMethod: selectedPaymentMethod,
      fiatPaymentMethod: selectedFiatPaymentMethod,
    }
  }
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
    const selectedPaymentOption = getSelectedPaymentOption(e)
    if (selectedPaymentOption) {
      selectedPaymentOptionRef.current = selectedPaymentOption
    }
    const { title, description, error, valid } = isFundingUserInfoValid

    if (valid) {
      if (!isLoggedIn && hasRecurringSelection) {
        warningModal.onOpen()
        return
      }

      handleGoNext(selectedPaymentOption)
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

  const handleGoNext = (selectedPaymentOption?: SelectedPaymentOption | null) => {
    const nextPaymentMethod = selectedPaymentOption?.intendedPaymentMethod || intendedPaymentMethod
    const nextFiatPaymentMethod = selectedPaymentOption?.fiatPaymentMethod || fiatPaymentMethod
    const navigationTarget = {
      search: location.search,
    }

    if (isLoggedIn && isOneTimeFundingMode && !nextPaymentMethod) {
      navigate({
        pathname: getPath('fundingGuardians', project.name),
        ...navigationTarget,
      })
    } else {
      if (nextPaymentMethod === PaymentMethods.fiatSwap && hasFiatPaymentMethod) {
        const paymentPath = hasStripePaymentMethod
          ? getPath('fundingPaymentFiatStripe', project.name)
          : nextFiatPaymentMethod === fiatCheckoutMethods.applePay
          ? getPath('fundingPaymentFiatBanxaApplePay', project.name)
          : getPath('fundingPaymentFiatBanxa', project.name)
        navigate({
          pathname: paymentPath,
          ...navigationTarget,
        })
        return
      }

      navigate({
        pathname: getPath('fundingStart', project.name),
        ...navigationTarget,
      })
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
          {hasRecurringSelection && (
            <Body size="sm" light>
              {t(
                'You are making a recurring contribution, the amount will be fixed either in Bitcoin or in dollars, based on the payment method you pick.',
              )}
            </Body>
          )}
          {shouldShowPaymentMethodButtons ? (
            <ContinueWithButtons useFormSubmit={true} />
          ) : (
            <Button size="lg" w="full" variant="solid" colorScheme="primary1" type="submit">
              {t('Continue')}
            </Button>
          )}
        </VStack>

        <AlertDialogue
          {...warningModal}
          title={t('Continuing anonymously')}
          description={t('You would not be able to manage this recurring payment through geyser.')}
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
              handleGoNext(selectedPaymentOptionRef.current)
            },
            children: t('Continue'),
          }}
        >
          <Body size="sm" light>
            {t(
              'To manage this recurring payment in the future, please create an account or keep access to the email used here.',
            )}
          </Body>
        </AlertDialogue>
      </FundingCheckoutWrapper>
    </VStack>
  )
}
