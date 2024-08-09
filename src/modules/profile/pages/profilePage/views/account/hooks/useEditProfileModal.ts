import { useModal } from '../../../../../../../shared/hooks/useModal'
import { UserForProfilePageFragment } from '../../../../../../../types'

export type EditProfileModalProps = ReturnType<typeof useEditProfileModal>

export const useEditProfileModal = () => {
  return useModal<{ user: UserForProfilePageFragment }>()
}
