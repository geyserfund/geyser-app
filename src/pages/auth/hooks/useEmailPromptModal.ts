import { useAtom } from 'jotai'

import { emailPromptOnCloseActionAtom, isEmailPromptModalOpenAtom } from '../state/emailPromptAtom'

export const useEmailPromptModal = () => {
  const [emailPromptIsOpen, setEmailPromptIsOpen] = useAtom(isEmailPromptModalOpenAtom)
  const [emailPromptOnCloseAction, setEmailPromptOnCloseAction] = useAtom(emailPromptOnCloseActionAtom)

  const emailPromptOnOpen = () => setEmailPromptIsOpen(true)
  const emailPromptOnClose = () => {
    setEmailPromptIsOpen(false)
    emailPromptOnCloseAction?.()
  }

  return { emailPromptIsOpen, emailPromptOnOpen, emailPromptOnClose, setEmailPromptOnCloseAction }
}
