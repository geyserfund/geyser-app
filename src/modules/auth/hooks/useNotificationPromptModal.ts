import { useAtom } from 'jotai'

import {
  dontAskNotificationAgainAtom,
  isNotificationPromptAtomModalOpenAtom,
  notificationPromptAtomOnCloseActionAtom,
} from '../state/notificationPromptAtom'

export const useNotificationPromptModal = () => {
  const [notificationPromptIsOpen, setNotificationPromptIsOpen] = useAtom(isNotificationPromptAtomModalOpenAtom)
  const [dontAskNotificationAgain, setDontAskNotificationAgain] = useAtom(dontAskNotificationAgainAtom)
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
    dontAskNotificationAgain,
    setDontAskNotificationAgain,
    notificationPromptOnOpen,
    notificationPromptOnClose,
    setNotificationPromptOnCloseAction,
  }
}
