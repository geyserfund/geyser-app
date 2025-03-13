import { atom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { AuthModalAdditionalprops } from '@/components/molecules'

import { Project, UserMeFragment } from '../../../types'
import { ExternalAccountType, SocialAccountType } from '../type'

export const defaultUser: UserMeFragment = {
  id: 0,
  email: '',
  heroId: '',
  username: '',
  imageUrl: '',
  isEmailVerified: false,
  externalAccounts: [],
  ownerOf: [],
  hasSocialAccount: false,
  complianceDetails: {
    contributionLimits: {
      daily: {
        limit: 0,
        reached: false,
        remaining: 0,
      },
      monthly: {
        limit: 0,
        reached: false,
        remaining: 0,
      },
    },
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

export const defaultLoginAdditionalProps: AuthModalAdditionalprops = {
  title: '',
  description: '',
  showTwitter: true,
  showNostr: true,
  showLightning: true,
  showFacebook: true,
  showGoogle: true,
  showGithub: true,
  privateRoute: false,
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

/** Additional props for the login modal */
export const loginModalAdditionalPropsAtom = atom<AuthModalAdditionalprops>(defaultLoginAdditionalProps)

/** Reset the additional props for the login modal */
export const resetLoginModalAdditionalPropsAtom = atom(null, (_get, set) => {
  set(loginModalAdditionalPropsAtom, defaultLoginAdditionalProps)
})

/** Login method used by the current User */
export const loginMethodAtom = atomWithStorage<ExternalAccountType | SocialAccountType | ''>('loginMethod', '')
