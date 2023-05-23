import { useDisclosure, UseDisclosureProps } from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'react'

export type UseModalReturn<T extends Record<string, any> = {}> = ReturnType<
  typeof useModal<T>
>

export function useModal<T extends Record<string, any>>(
  disclouseProps: UseDisclosureProps = {},
  defaultProps?: T,
) {
  const {
    isOpen,
    onClose,
    onToggle: _onToggle,
    onOpen: _onOpen,
  } = useDisclosure(disclouseProps)

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

  return useMemo(
    () => ({ onOpen, onClose, onToggle, isOpen, props }),
    [isOpen, onClose, onOpen, onToggle, props],
  )
}
