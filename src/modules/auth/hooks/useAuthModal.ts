import { useAtom, useSetAtom } from 'jotai'

import { AuthModalAdditionalprops } from '@/components/molecules'

import { isLoginModalOpenAtom, loginModalAdditionalPropsAtom, resetLoginModalAdditionalPropsAtom } from '../state'
import { AuthFlowIntent } from '../type'

export const useAuthModal = () => {
  const [loginIsOpen, setLoginIsOpen] = useAtom(isLoginModalOpenAtom)
  const [loginModalAdditionalProps, setLoginModalAdditionalProps] = useAtom(loginModalAdditionalPropsAtom)
  const resetLoginModalAdditionalProps = useSetAtom(resetLoginModalAdditionalPropsAtom)

  const loginOnOpen = (props?: AuthModalAdditionalprops) => {
    setLoginIsOpen(true)
    setLoginModalAdditionalProps({ ...(props || {}), authFlowIntent: AuthFlowIntent.login })
  }

  const signupOnOpen = (props?: AuthModalAdditionalprops) => {
    setLoginIsOpen(true)
    setLoginModalAdditionalProps({ ...(props || {}), authFlowIntent: AuthFlowIntent.signup })
  }

  const loginOnClose = () => {
    setLoginIsOpen(false)
    resetLoginModalAdditionalProps()
  }

  return { loginIsOpen, loginOnOpen, signupOnOpen, loginOnClose, loginModalAdditionalProps }
}
