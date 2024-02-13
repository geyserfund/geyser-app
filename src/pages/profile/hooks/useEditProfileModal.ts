import { useModal } from '../../../hooks/useModal'
import { UserProfile } from '../type'

export type EditProfileModalProps = ReturnType<typeof useEditProfileModal>

export const useEditProfileModal = () => {
  return useModal<{ user?: UserProfile }>()
}
