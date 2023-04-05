import { useDisclosure } from '@chakra-ui/react'
import { useCallback, useState } from 'react'

export type UseModalReturn<T extends Record<string, any>> = ReturnType<
  typeof useModal<T>
>

export function useModal<T extends Record<string, any>>(defaultProps?: T) {
  const {
    isOpen,
    onClose,
    onToggle: _onToggle,
    onOpen: _onOpen,
  } = useDisclosure()

  const [props, setProps] = useState<T>(defaultProps || ({} as T))

  const onOpen = useCallback(
    (props?: T) => {
      setProps(props || ({} as T))
      _onOpen()
    },
    [_onOpen],
  )

  const onToggle = useCallback(
    (props?: T) => {
      setProps(props || ({} as T))
      _onToggle()
    },
    [_onToggle],
  )

  return { onOpen, onClose, onToggle, isOpen, props }
}
