import { useColorMode } from '@chakra-ui/react'
import SumsubWebSdk from '@sumsub/websdk-react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { DateTime } from 'luxon'

import { updateComplianceStatusForUserAtom } from '@/modules/auth/state/authAtom.ts'
import { UserVerificationLevel } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

const SUM_SUB_LEVEL_2 = 'phone-verification-only'
const SUM_SUB_LEVEL_3 = 'id-and-phone-verification'

type SumsubMessageData = {
  levelName?: unknown
  reviewResult?: {
    reviewAnswer?: unknown
  }
}

export const getSumsubVerificationLevelName = (verificationLevel?: UserVerificationLevel): string => {
  return verificationLevel === UserVerificationLevel.Level_2 ? SUM_SUB_LEVEL_2 : SUM_SUB_LEVEL_3
}

export const isSuccessfulVerificationMessage = (
  props: string,
  data: SumsubMessageData | null | undefined,
  verificationLevel?: UserVerificationLevel,
): boolean => {
  return (
    props.includes('idCheck.onApplicantStatusChanged') &&
    data?.reviewResult?.reviewAnswer === 'GREEN' &&
    data.levelName === getSumsubVerificationLevelName(verificationLevel)
  )
}

export const SumSubVerification = ({
  accessToken,
  onComplete,
  verificationLevel,
}: {
  accessToken: string
  onComplete: () => void
  verificationLevel?: UserVerificationLevel
}) => {
  const toast = useNotification()
  const { colorMode } = useColorMode()

  const updateComplianceStatusForUser = useSetAtom(updateComplianceStatusForUserAtom)

  const handleError = () => {
    toast.error({
      title: t('Failed to verify your identity'),
      description: t('Please try again'),
    })
  }

  const handleMessage = (props: string, data: SumsubMessageData) => {
    if (isSuccessfulVerificationMessage(props, data, verificationLevel)) {
      toast.success({ title: t('Verification Successful') })
      const level = verificationLevel === UserVerificationLevel.Level_2 ? 'phoneNumber' : 'identity'
      updateComplianceStatusForUser({
        [level]: {
          verified: true,
          verifiedAt: DateTime.now().toMillis(),
        },
      })
      onComplete()
    }
  }

  return (
    <SumsubWebSdk
      accessToken={accessToken}
      expirationHandler={() => {}}
      config={{
        customizationName: 'Geyser Web SDK Customization',
        theme: colorMode,
      }}
      onMessage={handleMessage}
      onError={handleError}
    />
  )
}
