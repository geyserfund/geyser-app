import { UserProfileQuery } from '../../types'

export type UserProfile = UserProfileQuery['user']

export type UserProfileContributionType = UserProfile['contributions'][0]

export type UserProfileState = {
  userProfile: UserProfile
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>
}
