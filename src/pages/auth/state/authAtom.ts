import { atom, useAtomValue } from 'jotai'

import { Project, UserMeFragment } from '../../../types'

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

export const authUserAtom = atom<UserMeFragment>(defaultUser)

const isUserAProjectCreatorAtom = atom<boolean>((get) => {
  const user = get(authUserAtom)
  return user.ownerOf.length > 0
})
export const useIsUserAProjectCreatorValue = () => useAtomValue(isUserAProjectCreatorAtom)

export const followedProjectsAtom = atom<Pick<Project, 'id' | 'title' | 'name'>[]>([])
export const useFollowedProjectsValue = () => useAtomValue(followedProjectsAtom)

export const isLoginModalOpenAtom = atom<boolean>(false)
