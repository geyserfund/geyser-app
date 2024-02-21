import { useAtom } from 'jotai'

import { isLoginModalOpenAtom } from '../state'

export const useAuthModal = () => {
  const [loginIsOpen, setLoginIsOpen] = useAtom(isLoginModalOpenAtom)

  const loginOnOpen = () => setLoginIsOpen(true)

  const loginOnClose = () => setLoginIsOpen(false)

  return { loginIsOpen, loginOnOpen, loginOnClose }
}
