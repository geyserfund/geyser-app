import { useDisclosure } from '@chakra-ui/react'
import { useCallback, useState } from 'react'

export type UseModalReturn<T extends Record<string, any>> = ReturnType<
  typeof useModal<T>
>

export function useModal<T extends Record<string, any>>(defaultProps?: T) {
  const { isOpen, onClose: close, onToggle, onOpen } = useDisclosure()

  const [props, setProps] = useState<T | void>(defaultProps)

  const open = useCallback(
    (props?: T) => {
      setProps(props)
      onOpen()
    },
    [onOpen],
  )

  const toggle = useCallback(
    (props?: T) => {
      setProps(props)
      onToggle()
    },
    [onToggle],
  )

  return { open, close, toggle, isOpen, props }
}
