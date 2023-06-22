import { useToast, UseToastOptions } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
// "subtle" | "solid" | "left-accent" | "top-accent"

export const useNotification = (options?: UseToastOptions | undefined) => {
  const { t } = useTranslation()

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
    invokeToast({
      status: 'error',
      title: 'Something went wrong.',
      description: 'Please try again',
    })
  }, [toast])

  const invokeToast = (
    input: UseToastOptions & { description?: string; title: string },
  ) => {
    toast({
      ...input,
      description: t(input.description || ''),
      title: t(input.title),
    })
  }

  return { toast: invokeToast, unexpected }
}
