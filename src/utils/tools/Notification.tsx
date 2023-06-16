import { useToast, UseToastOptions } from '@chakra-ui/react'
import { useCallback } from 'react'
// "subtle" | "solid" | "left-accent" | "top-accent"

export const useNotification = (options?: UseToastOptions | undefined) => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
    position: 'top-right',
    variant: 'solid',
    containerStyle: {
      marginTop: 65,
      marginRight: 10,
    },
    ...options,
  })

  const unexpected = useCallback(() => {
    toast({
      status: 'error',
      title: 'Something went wrong.',
      description: 'Please try again',
    })
  }, [toast])

  return { toast, unexpected }
}
