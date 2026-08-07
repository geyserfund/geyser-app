import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, HStack, Link, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'
import * as yup from 'yup'

import Loader from '@/components/ui/Loader'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import {
  TEMPORARY_BOLTZ_WARNING_PREFIX,
  TEMPORARY_BOLTZ_WARNING_SUFFIX,
} from '@/modules/project/constants/temporaryBoltzContingency.ts'
import { StripeConnectOnboardingCard } from '@/modules/project/pages/projectDashboard/views/wallet/components/StripeConnectOnboardingCard.tsx'
import { validateBitcoinMainnetAddress } from '@/modules/project/pages/projectFunding/views/fundingPayment/views/paymentOnchain/utils/validateAddress.ts'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { lightModeColors } from '@/shared/styles'
import { useLightningAddressVerifyLazyQuery } from '@/types/index.ts'
import { ProjectCreationStep } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

type DirectPaymentDetailsFormProps = {
  projectId: string
  directPaymentDetails?: { btcAddress?: string | null; lightningAddress?: string | null } | null
  onSaved?: () => void
  submitLabel?: string
  lastCreationStep?: ProjectCreationStep
  showStripeConfiguration?: boolean
  stripeConfigurationAfterDirectPayments?: boolean
  formId?: string
  hideSubmitButton?: boolean
  allowStripeOnly?: boolean
}

type DirectPaymentDetailsFormValues = {
  directPaymentOnchainAddress?: string
  directPaymentLightningAddress?: string
}

const directPaymentLightningAddressSchema = yup.string().email(t('Please provide a valid Lightning Address'))

const createDirectPaymentDetailsSchema = (allowEmptyDirectPaymentDetails: boolean) =>
  yup
    .object({
      directPaymentOnchainAddress: yup
        .string()
        .test(
          'bitcoin-address',
          t('Please provide a valid Bitcoin on-chain address'),
          (value) => !value || validateBitcoinMainnetAddress(value),
        ),
      directPaymentLightningAddress: directPaymentLightningAddressSchema,
    })
    .test(
      'at-least-one-payment-method',
      t('Add at least one payment detail'),
      (value) =>
        allowEmptyDirectPaymentDetails ||
        Boolean(value?.directPaymentOnchainAddress?.trim() || value?.directPaymentLightningAddress?.trim()),
    )

/** Saves creator-provided direct Bitcoin and Lightning payment details during the Boltz contingency. */
export const DirectPaymentDetailsForm = ({
  projectId,
  directPaymentDetails,
  onSaved,
  submitLabel,
  lastCreationStep,
  showStripeConfiguration = false,
  stripeConfigurationAfterDirectPayments = false,
  formId,
  hideSubmitButton = false,
  allowStripeOnly = false,
}: DirectPaymentDetailsFormProps) => {
  const toast = useNotification()
  const { updateProject } = useProjectAPI()
  const [verifyLightningAddress] = useLightningAddressVerifyLazyQuery()
  const [lightningValidationState, setLightningValidationState] = useState<'idle' | 'loading' | 'valid' | 'invalid'>(
    'idle',
  )
  const [isStripeReady, setIsStripeReady] = useState(allowStripeOnly)
  const directPaymentDetailsSchema = useMemo(() => createDirectPaymentDetailsSchema(isStripeReady), [isStripeReady])
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
    setError,
  } = useForm<DirectPaymentDetailsFormValues>({
    defaultValues: {
      directPaymentOnchainAddress: directPaymentDetails?.btcAddress || undefined,
      directPaymentLightningAddress: directPaymentDetails?.lightningAddress || undefined,
    },
    mode: 'onBlur',
    resolver: yupResolver(directPaymentDetailsSchema),
  })

  const validateLightningAddress = async (value: string) => {
    const lightningAddress = value.trim().toLowerCase()
    if (!lightningAddress) {
      setLightningValidationState('idle')
      clearErrors('directPaymentLightningAddress')
      return
    }

    if (
      !directPaymentLightningAddressSchema.isValidSync(lightningAddress) ||
      lightningAddress.endsWith('@geyser.fund')
    ) {
      setLightningValidationState('invalid')
      setError('directPaymentLightningAddress', {
        type: 'validate',
        message: t('Please provide a valid Lightning Address'),
      })
      return
    }

    setLightningValidationState('loading')
    try {
      const response = await verifyLightningAddress({ variables: { lightningAddress } })
      const verification = response.data?.lightningAddressVerify
      if (verification?.valid) {
        clearErrors('directPaymentLightningAddress')
        setLightningValidationState('valid')
      } else {
        setError('directPaymentLightningAddress', {
          type: 'validate',
          message: verification?.reason || t('Please provide a valid Lightning Address'),
        })
        setLightningValidationState('invalid')
      }
    } catch {
      setError('directPaymentLightningAddress', {
        type: 'validate',
        message: t('Unable to verify this Lightning Address. Please try again.'),
      })
      setLightningValidationState('invalid')
    }
  }

  const lightningValidationIndicator =
    lightningValidationState === 'loading' ? (
      <Loader size="md" />
    ) : lightningValidationState === 'valid' ? (
      <BsFillCheckCircleFill fill={lightModeColors.primary[500]} size="24px" />
    ) : lightningValidationState === 'invalid' ? (
      <BsFillXCircleFill fill={lightModeColors.secondary.red} size="24px" />
    ) : null

  const onSubmit = async (values: DirectPaymentDetailsFormValues) => {
    const directPaymentOnchainAddress = values.directPaymentOnchainAddress?.trim() || null
    const directPaymentLightningAddress = values.directPaymentLightningAddress?.trim().toLowerCase() || null
    if (directPaymentLightningAddress) {
      try {
        const response = await verifyLightningAddress({
          variables: { lightningAddress: directPaymentLightningAddress },
        })
        if (!response.data?.lightningAddressVerify.valid) {
          toast.error({
            title: t('Please provide a valid Lightning Address'),
            description: response.data?.lightningAddressVerify.reason || undefined,
          })
          return
        }
      } catch {
        toast.error({
          title: t('Unable to verify this Lightning Address. Please try again.'),
        })
        return
      }
    }

    updateProject.execute({
      variables: {
        input: {
          projectId,
          directPaymentDetails:
            directPaymentOnchainAddress || directPaymentLightningAddress
              ? {
                  ...(directPaymentOnchainAddress && { btcAddress: directPaymentOnchainAddress }),
                  ...(directPaymentLightningAddress && { lightningAddress: directPaymentLightningAddress }),
                }
              : undefined,
          lastCreationStep,
        },
      },
      onCompleted() {
        toast.success({ title: t('Payment details saved') })
        onSaved?.()
      },
      onError() {
        toast.error({ title: t('Failed to save payment details'), description: t('Please try again later.') })
      },
    })
  }

  const stripeConfigurationSection = showStripeConfiguration ? (
    <VStack w="full" align="stretch" spacing={4}>
      <VStack align="start" spacing={1}>
        <HStack spacing={2}>
          <Body size="lg" medium>
            {t('Configure Stripe')}
          </Body>
          <Body size="lg" light color="neutral1.7">
            {t('Recommended')}
          </Body>
        </HStack>
        <Alert status="info" borderRadius="8px" alignItems="flex-start">
          <AlertIcon />
          <AlertDescription>
            <Body size="sm">{t('Contributions are subject to an additional Stripe processing fee.')}</Body>
          </AlertDescription>
        </Alert>
      </VStack>
      <StripeConnectOnboardingCard
        projectId={projectId}
        isTiaProject
        options={{
          compact: true,
          withCard: false,
          showProcessingFeeNotice: false,
          showCompactTitle: false,
          showCompactStatus: true,
        }}
        onReadyStateChange={setIsStripeReady}
      />
    </VStack>
  ) : null

  const directPaymentDetailsSection = (
    <>
      <VStack w="full" align="stretch" spacing={4}>
        <HStack spacing={2}>
          <Body size="lg" medium>
            {t('Direct Bitcoin Payments')}
          </Body>
          <Body size="lg" light color="neutral1.7">
            {t('Temporary')}
          </Body>
        </HStack>
        <Alert status="warning" borderRadius="8px" alignItems="flex-start">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <AlertTitle>{t('Temporary payment solution')}</AlertTitle>
            <AlertDescription>
              <Body size="sm">
                {t(TEMPORARY_BOLTZ_WARNING_PREFIX)}
                <Link href="#">{t('see here')}</Link>
                {t(TEMPORARY_BOLTZ_WARNING_SUFFIX)}
              </Body>
            </AlertDescription>
          </VStack>
        </Alert>
        <Body size="md" light>
          {t('Add the direct payment details that contributors can use to support your project.')}
        </Body>
      </VStack>
      <ControlledTextInput
        name="directPaymentOnchainAddress"
        control={control}
        label={t('Bitcoin on-chain address')}
        placeholder={t('bc1...')}
        error={errors.directPaymentOnchainAddress?.message}
      />
      <ControlledTextInput
        name="directPaymentLightningAddress"
        control={control}
        label={t('Lightning Address')}
        placeholder={t('you@getalby.com')}
        error={errors.directPaymentLightningAddress?.message || errors.root?.message}
        onBlur={(event) => validateLightningAddress(event.target.value)}
        rightElement={lightningValidationIndicator}
      />
      {!hideSubmitButton && (
        <Button type="submit" alignSelf="flex-end" colorScheme="primary1" isLoading={updateProject.loading}>
          {submitLabel || t('Save direct payment details')}
        </Button>
      )}
    </>
  )

  return (
    <VStack as="form" id={formId} w="full" align="stretch" spacing={6} onSubmit={handleSubmit(onSubmit)}>
      {stripeConfigurationAfterDirectPayments ? directPaymentDetailsSection : stripeConfigurationSection}
      {stripeConfigurationAfterDirectPayments ? stripeConfigurationSection : directPaymentDetailsSection}
    </VStack>
  )
}
