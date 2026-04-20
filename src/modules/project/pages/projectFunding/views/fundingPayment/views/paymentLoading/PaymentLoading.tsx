import { Button, HStack, Tooltip, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { useAccountPasswordForm } from '@/modules/project/forms/accountPassword/useAccountPasswordForm.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectFundingStrategy } from '@/types/index.ts'
import { isAllOrNothing } from '@/utils/index.ts'

import {
  fiatCheckoutMethods,
  fiatPaymentMethodAtom,
  intendedPaymentMethodAtom,
  PaymentMethods,
} from '../../state/paymentMethodAtom.ts'
import { PaymentDownloadRefundFile } from './PaymentDownloadRefundFile.tsx'
import { PaymentLoadingContribution } from './PaymentLoadingContribution.tsx'

export const PaymentLoading = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { user, loading: authLoading } = useAuthContext()
  const { project, loading: projectLoading, isPrismEnabled } = useProjectAtom()
  const intendedPaymentMethod = useAtomValue(intendedPaymentMethodAtom)
  const fiatPaymentMethod = useAtomValue(fiatPaymentMethodAtom)
  const [passwordConfirmed, setPasswordConfirmed] = useState(false)
  const [downloadedRefundFile, setDownloadedRefundFile] = useState(false)
  const [currentContributionId, setCurrentContributionId] = useState('')
  const hasStripePaymentMethod =
    project?.fundingStrategy === ProjectFundingStrategy.TakeItAll && Boolean(project?.paymentMethods?.fiat?.stripe)
  const shouldUseProtectedPaymentLoading =
    isAllOrNothing(project) || (isPrismEnabled && intendedPaymentMethod !== PaymentMethods.fiatSwap)

  const handleNext = (contributionId?: string, forceCardRoute?: boolean) => {
    const paymentPath =
      forceCardRoute || intendedPaymentMethod === PaymentMethods.fiatSwap
        ? hasStripePaymentMethod
          ? getPath('fundingPaymentFiatStripe', project.name)
          : fiatPaymentMethod === fiatCheckoutMethods.applePay
          ? getPath('fundingPaymentFiatBanxaApplePay', project.name)
          : getPath('fundingPaymentFiatBanxa', project.name)
        : getPath('fundingPaymentLightning', project.name)

    const searchParams = new URLSearchParams(location.search)
    searchParams.set('transactionId', contributionId || currentContributionId)

    navigate(
      {
        pathname: paymentPath,
        search: `?${searchParams.toString()}`,
      },
      { replace: true },
    )
  }

  const handleComplete = (contributionId: string, forceCardRoute?: boolean) => {
    if (user.id) {
      handleNext(contributionId, forceCardRoute)
    } else {
      setDownloadedRefundFile(true)
      setCurrentContributionId(contributionId)
    }
  }

  if (authLoading || projectLoading) {
    return null
  }

  if (shouldUseProtectedPaymentLoading) {
    if (user?.id && !passwordConfirmed) {
      return <PaymentPassword onComplete={() => setPasswordConfirmed(true)} />
    }

    if (!user?.id && downloadedRefundFile) {
      return <PaymentDownloadRefundFile isPrismContribution={isPrismEnabled} onComplete={handleNext} />
    }

    return <PaymentLoadingContribution onComplete={handleComplete} />
  }

  return <PaymentLoadingContribution />
}

const PaymentPassword = ({ onComplete }: { onComplete: () => void }) => {
  const setFundingUserAccountKeys = useSetAtom(userAccountKeysAtom)
  const passwordHelpTextColor = useColorModeValue('gray.500', 'gray.400')

  const { accountPasswordType, currentForm, renderForm, titles } = useAccountPasswordForm({
    onComplete(data) {
      if (data) {
        setFundingUserAccountKeys(data)
      }

      onComplete()
    },
    copy: {
      introText: {
        confirm: '',
      },
    },
  })

  return (
    <VStack as="form" onSubmit={currentForm.onSubmit} w="full" spacing={6}>
      <HStack w="full" justifyContent="space-between" alignItems="baseline" gap={3}>
        <Body size="lg" bold>
          {titles}
        </Body>
        {accountPasswordType === 'confirm' ? (
          <Tooltip
            label={t(
              'Contributions on Geyser require a private key. This password encrypts and decrypts your private key so it can be stored securely, and only be known by you.',
            )}
            placement="top"
            hasArrow
            shouldWrapChildren
          >
            <Body
              as="span"
              size="12px"
              color={passwordHelpTextColor}
              textDecoration="underline"
              textDecorationStyle="dashed"
              cursor="help"
              whiteSpace="nowrap"
            >
              {t('Why is a password needed')}
              {'?'}
            </Body>
          </Tooltip>
        ) : null}
      </HStack>
      {renderForm()}

      <Button width="200px" size="lg" colorScheme="primary1" type="submit">
        {t('Continue')}
      </Button>
    </VStack>
  )
}
