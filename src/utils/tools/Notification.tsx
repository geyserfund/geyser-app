import { useToast, UseToastOptions } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

type IndividualToastProps = { title: string; description?: string; duration?: number }

export const useNotification = (options?: UseToastOptions | undefined) => {
  const { t } = useTranslation()

  const toast = useToast({
    duration: 3000,
    isClosable: true,
    position: 'top-right',
    variant: 'solid',
    containerStyle: {
      marginTop: 65,
      marginRight: { base: 3, lg: 10 },
    },
    ...options,
  })

  const invokeToast = useCallback(
    (input: UseToastOptions & { description?: string; title: string }) => {
      toast({
        ...input,
        description: t(input.description || ''),
        title: t(input.title),
      })
    },
    [toast, t],
  )
  const unexpected = useCallback(() => {
    invokeToast({
      status: 'error',
      title: 'Something went wrong.',
      description: 'Please try again',
    })
  }, [invokeToast])

  const success = useCallback(
    (props: IndividualToastProps) => {
      invokeToast({
        status: 'success',
        ...props,
      })
    },
    [invokeToast],
  )

  const error = useCallback(
    (props: IndividualToastProps) => {
      invokeToast({
        status: 'error',
        ...props,
      })
    },
    [invokeToast],
  )

  const warning = useCallback(
    (props: IndividualToastProps) => {
      invokeToast({
        status: 'warning',
        ...props,
      })
    },
    [invokeToast],
  )

  const info = useCallback(
    (props: IndividualToastProps) => {
      invokeToast({
        status: 'info',
        ...props,
      })
    },
    [invokeToast],
  )

  return { toast: invokeToast, unexpected, success, error, warning, info }
}
