import { useDisclosure } from '@chakra-ui/react'
import { useCallback, useState } from 'react'

export type UseModalReturn<T extends Record<string, any>> = ReturnType<
  typeof useModal<T>
>

export function useModal<T extends Record<string, any>>(props?: T) {
  const { isOpen, onClose: close, onToggle, onOpen } = useDisclosure()

  const [currentProps, setProps] = useState<T | void>(props)

  const open = useCallback((props?: T) => {
    setProps(props)
    onOpen()
  }, [])

  const toggle = useCallback((props?: T) => {
    setProps(props)
    onToggle()
  }, [])

  return { open, close, toggle, isOpen, props: currentProps }
}
