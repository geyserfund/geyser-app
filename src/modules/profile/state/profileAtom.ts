import { atom, useAtomValue } from 'jotai'

import { authUserAtom } from '../../../modules/auth/state'
import { UserForProfilePageFragment } from '../../../types'

export const defaultUser: UserForProfilePageFragment = {
  id: 0,
  bio: '',
  heroId: '',
  username: '',
  imageUrl: '',
  ranking: 0,
  isEmailVerified: false,
  externalAccounts: [],
  complianceDetails: {
    verifiedDetails: {
      email: {
        verified: false,
        verifiedAt: null,
      },
      identity: {
        verified: false,
        verifiedAt: null,
      },
      phoneNumber: {
        verified: false,
        verifiedAt: null,
      },
    },
  },
}

/** This atom is used to store the user profile data */
export const userProfileAtom = atom<UserForProfilePageFragment>(defaultUser as UserForProfilePageFragment)

/** This atom is used to store the loading state of the user profile data, initially true */
export const userProfileLoadingAtom = atom<boolean>(true)

export const useUserProfileAtom = () => {
  const userProfile = useAtomValue(userProfileAtom)
  const isLoading = useAtomValue(userProfileLoadingAtom)
  return { userProfile, isLoading }
}

export const isViewingOwnProfileAtom = atom<boolean>((get) => {
  const authUser = get(authUserAtom)

  const profileUser = get(userProfileAtom)

  if (authUser.id && profileUser.id && authUser.id === profileUser.id) {
    return true
  }

  return false
})

export const useViewingOwnProfileAtomValue = () => useAtomValue(isViewingOwnProfileAtom)
