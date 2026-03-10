import { useAtom } from 'jotai'

import type { EmailPromptVariant } from '../state/emailPromptAtom'
import {
  emailPromptOnCloseActionAtom,
  emailPromptVariantAtom,
  isEmailPromptModalOpenAtom,
} from '../state/emailPromptAtom'

export const useEmailPromptModal = () => {
  const [emailPromptIsOpen, setEmailPromptIsOpen] = useAtom(isEmailPromptModalOpenAtom)
  const [emailPromptOnCloseAction, setEmailPromptOnCloseAction] = useAtom(emailPromptOnCloseActionAtom)
  const [emailPromptVariant, setEmailPromptVariant] = useAtom(emailPromptVariantAtom)

  const emailPromptOnOpen = (variant: EmailPromptVariant = 'default') => {
    setEmailPromptVariant(variant)
    setEmailPromptIsOpen(true)
  }

  const emailPromptOnClose = ({ runOnCloseAction = true }: { runOnCloseAction?: boolean } = {}) => {
    setEmailPromptIsOpen(false)
    if (runOnCloseAction) {
      emailPromptOnCloseAction?.()
    }

    setEmailPromptOnCloseAction(null)
    setEmailPromptVariant('default')
  }

  return {
    emailPromptIsOpen,
    emailPromptOnOpen,
    emailPromptOnClose,
    emailPromptVariant,
    setEmailPromptOnCloseAction,
  }
}
