import { useAtom, useSetAtom } from 'jotai'

import { AuthModalAdditionalprops } from '@/components/molecules'

import { isLoginModalOpenAtom, loginModalAdditionalPropsAtom, resetLoginModalAdditionalPropsAtom } from '../state'

export const useAuthModal = () => {
  const [loginIsOpen, setLoginIsOpen] = useAtom(isLoginModalOpenAtom)
  const [loginModalAdditionalProps, setLoginModalAdditionalProps] = useAtom(loginModalAdditionalPropsAtom)
  const resetLoginModalAdditionalProps = useSetAtom(resetLoginModalAdditionalPropsAtom)

  const loginOnOpen = (props?: AuthModalAdditionalprops) => {
    setLoginIsOpen(true)
    if (props) {
      setLoginModalAdditionalProps(props)
    }
  }

  const loginOnClose = () => {
    setLoginIsOpen(false)
    resetLoginModalAdditionalProps()
  }

  return { loginIsOpen, loginOnOpen, loginOnClose, loginModalAdditionalProps }
}
