import { atom, useAtomValue } from 'jotai'

import { UserForProfilePageFragment } from '../../../types'
import { authUserAtom } from '../../auth/state'

export const defaultUser: UserForProfilePageFragment = {
  id: 0,
  bio: '',
  username: '',
  imageUrl: '',
  ranking: 0,
  isEmailVerified: false,
  externalAccounts: [],
}

export const userProfileAtom = atom<UserForProfilePageFragment>(defaultUser as UserForProfilePageFragment)

export const useUserProfileAtomValue = () => useAtomValue(userProfileAtom)

const isViewingOwnProfileAtom = atom<boolean>((get) => {
  const authUser = get(authUserAtom)

  const profileUser = get(userProfileAtom)

  if (authUser.id && profileUser.id && authUser.id === profileUser.id) {
    return true
  }

  return false
})

export const useViewingOwnProfileAtomValue = () => useAtomValue(isViewingOwnProfileAtom)
