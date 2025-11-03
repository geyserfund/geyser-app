import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { useAccountPasswordForm } from '@/modules/project/forms/accountPassword/useAccountPasswordForm.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { isAllOrNothing } from '@/utils/index.ts'

import { PaymentDownloadRefundFile } from './PaymentDownloadRefundFile.tsx'
import { PaymentLoadingContribution } from './PaymentLoadingContribution.tsx'

export const PaymentLoading = () => {
  const navigate = useNavigate()

  const { user, loading: authLoading } = useAuthContext()
  const { project, loading: projectLoading } = useProjectAtom()
  const [passwordConfirmed, setPasswordConfirmed] = useState(false)
  const [downloadRefundFile, setDownloadRefundFile] = useState(false)

  const handleComplete = (contributionId: string) => {
    if (user.id) {
      navigate(
        {
          pathname: getPath('fundingPaymentLightning', project.name),
          search: `?transactionId=${contributionId}`,
        },
        { replace: true },
      )
    } else {
      setDownloadRefundFile(true)
    }
  }

  if (authLoading || projectLoading) {
    return null
  }

  if (isAllOrNothing(project)) {
    if (user?.id && !passwordConfirmed) {
      return <PaymentPassword onComplete={() => setPasswordConfirmed(true)} />
    }

    if (!user?.id && downloadRefundFile) {
      return <PaymentDownloadRefundFile onComplete={() => setDownloadRefundFile(false)} />
    }
  }

  return <PaymentLoadingContribution onComplete={handleComplete} />
}

export const PaymentPassword = ({ onComplete }: { onComplete: () => void }) => {
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
    <VStack w="full" spacing={6}>
      <Body size="lg" bold alignSelf="start">
        {titles}
      </Body>
      {renderForm()}
      <Button width="200px" size="lg" colorScheme="primary1" onClick={currentForm.onSubmit}>
        {t('Continue')}
      </Button>
    </VStack>
  )
}
