import { useToast, UseToastOptions } from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
// "subtle" | "solid" | "left-accent" | "top-accent"

const DEFAULT = {}

export const useNotification = (
  options: UseToastOptions | undefined = DEFAULT,
) => {
  const toast = useToast(
    useMemo(
      () => ({
        duration: 3000,
        isClosable: true,
        position: 'top-right',
        variant: 'left-accent',
        containerStyle: {
          marginTop: 65,
        },
        ...options,
      }),
      [options],
    ),
  )

  const unexpected = useCallback(() => {
    toast({
      status: 'error',
      title: 'Something went wrong.',
      description: 'Please try again',
    })
  }, [toast])

  return { toast, unexpected }
}
