import { useColorMode } from '@chakra-ui/react'
import SumsubWebSdk from '@sumsub/websdk-react'
import { useSetAtom } from 'jotai'
import { DateTime } from 'luxon'

import { updateComplianceStatusForUserAtom } from '@/modules/auth/state/authAtom.ts'
import { UserVerificationLevel } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

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

  const handleError = (error: any) => {
    console.log(error)
    toast.error({
      title: 'Failed to verify your identity',
      description: 'Please try again',
    })
  }

  const handleMessage = (props: string) => {
    if (props.includes('idCheck.onStepCompleted')) {
      toast.success({ title: 'Verification Successful' })
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
