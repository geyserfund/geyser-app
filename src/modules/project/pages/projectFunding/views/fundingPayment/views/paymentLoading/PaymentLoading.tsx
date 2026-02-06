import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { useAccountPasswordForm } from '@/modules/project/forms/accountPassword/useAccountPasswordForm.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { isAllOrNothing } from '@/utils/index.ts'
import { ProjectFundingStrategy } from '@/types/index.ts'

import { intendedPaymentMethodAtom, PaymentMethods } from '../../state/paymentMethodAtom.ts'
import { PaymentDownloadRefundFile } from './PaymentDownloadRefundFile.tsx'
import { PaymentLoadingContribution } from './PaymentLoadingContribution.tsx'

export const PaymentLoading = () => {
  const navigate = useNavigate()

  const { user, loading: authLoading } = useAuthContext()
  const { project, loading: projectLoading } = useProjectAtom()
  const intendedPaymentMethod = useAtomValue(intendedPaymentMethodAtom)
  const [passwordConfirmed, setPasswordConfirmed] = useState(false)
  const [downloadedRefundFile, setDownloadedRefundFile] = useState(false)
  const [currentContributionId, setCurrentContributionId] = useState('')

  const handleNext = (contributionId?: string) => {
    const paymentPath =
      intendedPaymentMethod === PaymentMethods.fiatSwap
        ? getPath('fundingPaymentFiatSwap', project.name)
        : getPath('fundingPaymentLightning', project.name)

    navigate(
      {
        pathname: paymentPath,
        search: `?transactionId=${contributionId || currentContributionId}`,
      },
      { replace: true },
    )
  }

  const handleComplete = (contributionId: string) => {
    if (user.id) {
      handleNext(contributionId)
    } else {
      setDownloadedRefundFile(true)
      setCurrentContributionId(contributionId)
    }
  }

  if (authLoading || projectLoading) {
    return null
  }

  const creatorRskAddress = project?.rskEoa || ''
  const isPrismTia =
    project?.fundingStrategy === ProjectFundingStrategy.TakeItAll && Boolean(creatorRskAddress)

  if (isAllOrNothing(project) || isPrismTia) {
    if (user?.id && !passwordConfirmed) {
      return <PaymentPassword onComplete={() => setPasswordConfirmed(true)} />
    }

    if (!user?.id && downloadedRefundFile) {
      return <PaymentDownloadRefundFile onComplete={handleNext} />
    }

    return <PaymentLoadingContribution onComplete={handleComplete} />
  }

  return <PaymentLoadingContribution />
}

const PaymentPassword = ({ onComplete }: { onComplete: () => void }) => {
  const setFundingUserAccountKeys = useSetAtom(userAccountKeysAtom)

  const { currentForm, renderForm, titles } = useAccountPasswordForm({
    onComplete(data) {
      if (data) {
        setFundingUserAccountKeys(data)
      }

      onComplete()
    },
  })

  return (
    <VStack as="form" onSubmit={currentForm.onSubmit} w="full" spacing={6}>
      <Body size="lg" bold alignSelf="start">
        {titles}
      </Body>
      {renderForm()}

      <Button width="200px" size="lg" colorScheme="primary1" type="submit">
        {t('Continue')}
      </Button>
    </VStack>
  )
}
