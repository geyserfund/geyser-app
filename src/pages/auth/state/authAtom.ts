import { atom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { Project, UserMeFragment } from '../../../types'
import { ExternalAccountType, SocialAccountType } from '../type'

export const defaultUser: UserMeFragment = {
  id: 0,
  email: '',
  username: '',
  imageUrl: '',
  isEmailVerified: false,
  externalAccounts: [],
  ownerOf: [],
  hasSocialAccount: false,
}

/** Primary user that is logged in */
export const authUserAtom = atom<UserMeFragment>(defaultUser)

/** Is current User a project creator ? */
export const isUserAProjectCreatorAtom = atom<boolean>((get) => {
  const user = get(authUserAtom)
  return user.ownerOf.length > 0
})

/** Projects followed by the current User. */
export const followedProjectsAtom = atom<Pick<Project, 'id' | 'title' | 'name'>[]>([])
export const useFollowedProjectsValue = () => useAtomValue(followedProjectsAtom)

/** Used to open login modal from any place */
export const isLoginModalOpenAtom = atom<boolean>(false)

/** Login method used by the current User */
export const loginMethodAtom = atomWithStorage<ExternalAccountType | SocialAccountType | ''>('loginMethod', '')
