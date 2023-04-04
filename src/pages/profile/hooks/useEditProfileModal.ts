import { useModal } from '../../../hooks/useModal'
import { User } from '../../../types'

export type EditProfileModalProps = ReturnType<typeof useEditProfileModal>

export const useEditProfileModal = () => {
  return useModal<{ user?: User }>()
}
