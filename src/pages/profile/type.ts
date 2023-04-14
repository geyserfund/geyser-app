import { User } from '../../types'

export type UserProfileState = {
  userProfile: User
  setUserProfile: React.Dispatch<React.SetStateAction<User>>
}
