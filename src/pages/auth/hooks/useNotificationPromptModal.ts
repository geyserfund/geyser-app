import { useAtom } from 'jotai'

import {
  isNotificationPromptAtomModalOpenAtom,
  notificationPromptAtomOnCloseActionAtom,
} from '../state/notificationPromptAtom'

export const useNotificationPromptModal = () => {
  const [notificationPromptIsOpen, setNotificationPromptIsOpen] = useAtom(isNotificationPromptAtomModalOpenAtom)
  const [notificationPromptOnCloseAction, setNotificationPromptOnCloseAction] = useAtom(
    notificationPromptAtomOnCloseActionAtom,
  )

  const notificationPromptOnOpen = () => setNotificationPromptIsOpen(true)
  const notificationPromptOnClose = () => {
    setNotificationPromptIsOpen(false)
    notificationPromptOnCloseAction?.()
  }

  return {
    notificationPromptIsOpen,
    notificationPromptOnOpen,
    notificationPromptOnClose,
    setNotificationPromptOnCloseAction,
  }
}
