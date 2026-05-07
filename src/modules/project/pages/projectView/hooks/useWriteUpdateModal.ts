import { useAtom } from 'jotai'

import {
  writeUpdateModalOpenAtom,
  writeUpdateModalPostIdAtom,
} from '../state/writeUpdateModalAtom'

/** Trigger the Write Update composer modal from anywhere within the Project context */
export const useWriteUpdateModal = () => {
  const [isOpen, setIsOpen] = useAtom(writeUpdateModalOpenAtom)
  const [postId, setPostId] = useAtom(writeUpdateModalPostIdAtom)

  const openWriteUpdateModal = (id?: string) => {
    setPostId(id ?? null)
    setIsOpen(true)
  }

  const closeWriteUpdateModal = () => {
    setIsOpen(false)
    setPostId(null)
  }

  return { isOpen, postId, openWriteUpdateModal, closeWriteUpdateModal }
}
