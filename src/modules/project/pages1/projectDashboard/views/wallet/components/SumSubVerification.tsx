import { useColorMode } from '@chakra-ui/react'
import SumsubWebSdk from '@sumsub/websdk-react'

import { useAuthContext } from '@/context/auth.tsx'
import { useNotification } from '@/utils/index.ts'

export const SumSubVerification = ({ accessToken, onComplete }: { accessToken: string; onComplete: () => void }) => {
  const toast = useNotification()
  const { queryCurrentUser } = useAuthContext()
  const { colorMode } = useColorMode()

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
      queryCurrentUser()
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
