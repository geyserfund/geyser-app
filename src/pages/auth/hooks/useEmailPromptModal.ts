import { useAtom } from 'jotai'

import { isEmailPromptModalOpenAtom } from '../state/emailPromptAtom'

export const useEmailPromptModal = () => {
  const [emailPromptIsOpen, setEmailPromptIsOpen] = useAtom(isEmailPromptModalOpenAtom)

  const emailPromptOnOpen = () => setEmailPromptIsOpen(true)
  const emailPromptOnClose = () => setEmailPromptIsOpen(false)

  return { emailPromptIsOpen, emailPromptOnOpen, emailPromptOnClose }
}
