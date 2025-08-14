import { Button, useBreakpointValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/context/auth.tsx'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { useAccountPasswordForm } from '@/modules/project/forms/accountPassword/useAccountPasswordForm.tsx'
import { useFundingAPI } from '@/modules/project/funding/hooks/useFundingAPI'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants'
import { isAllOrNothing } from '@/utils/index.ts'

import { QRCodeSizeMap } from '../components/QRCodeComponent'

export const PaymentLoading = () => {
  const { user, loading: authLoading } = useAuthContext()
  const { project, loading: projectLoading } = useProjectAtom()
  const [passwordConfirmed, setPasswordConfirmed] = useState(false)

  if (authLoading || projectLoading) {
    return null
  }

  if (user?.id && isAllOrNothing(project) && !passwordConfirmed) {
    return <PaymentPassword onComplete={() => setPasswordConfirmed(true)} />
  }

  return <PaymentLoadingContribution />
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

export const PaymentLoadingContribution = () => {
  const { requestFundingFromContext, requestFundingOptions } = useFundingAPI()

  const { isFundingInputAmountValid, isFundingUserInfoValid, project } = useFundingFormAtom()

  const qrSize = useBreakpointValue(QRCodeSizeMap)

  const navigate = useNavigate()

  const data = useRef(false)

  useEffect(() => {
    if (isFundingInputAmountValid.valid && isFundingUserInfoValid.valid && !data.current) {
      data.current = true
      requestFundingFromContext((data) => {
        const contributionId = data.contributionCreate.contribution.uuid

        if (contributionId && data.contributionCreate.contribution.isSubscription) {
          navigate(
            {
              pathname: getPath('fundingSubscription', project.name),
              search: `?transactionId=${contributionId}`,
            },
            { replace: true },
          )
        } else if (contributionId) {
          navigate(
            {
              pathname: getPath('fundingPaymentLightning', project.name),
              search: `?transactionId=${contributionId}`,
            },
            { replace: true },
          )
        }
      })
    }
    // NOTE: adding `requestFundingFromContext` to dependencies causes rerender loops, do not add until resolved
  }, [isFundingInputAmountValid, isFundingUserInfoValid, navigate, project.name])

  useEffect(() => {
    if (requestFundingOptions.error) {
      navigate(getPath('fundingPaymentFailed', project.name), { replace: true })
    }
  }, [requestFundingOptions.error, project.name, navigate])

  return (
    <VStack w="full" spacing={4}>
      <VStack w="full" alignItems="start">
        <SkeletonLayout height="26px" width="120px" />
        <SkeletonLayout height="44px" width="full" />
      </VStack>

      <SkeletonLayout height={qrSize} width={qrSize} />
      <SkeletonLayout height="26px" width="200px" />
      <VStack w="full" spacing={6} pt={4}>
        <SkeletonLayout height="26px" width="230px" />
        <SkeletonLayout height="40px" width="310px" />
      </VStack>
    </VStack>
  )
}
