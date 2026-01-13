import { ApolloError } from '@apollo/client'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'

import { authUserAtom, followedProjectsAtom, isUserAProjectCreatorAtom } from '@/modules/auth/state/authAtom'
import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { accountPasswordAtom } from '@/modules/project/forms/accountPassword/state/passwordStorageAtom.ts'

import { getAuthEndPoint } from '../config/domain'
import {
  useMeLazyQuery,
  useMeProjectFollowsLazyQuery,
  UserMeFragment,
  UserVerificationLevel,
  UserVerificationStatus,
} from '../types'

export const defaultUser: Omit<UserMeFragment, 'heroStats'> = {
  __typename: 'User',
  id: 0,
  email: '',
  username: '',
  heroId: '',
  imageUrl: '',
  externalAccounts: [],
  ownerOf: [],
  isEmailVerified: false,
  hasSocialAccount: false,
  complianceDetails: {
    contributionLimits: {
      monthly: {
        limit: 0,
        reached: false,
        remaining: 0,
      },
    },
    currentVerificationLevel: {
      level: UserVerificationLevel.Level_0,
      status: UserVerificationStatus.Verified,
      verifiedAt: null,
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

const defaultContext: AuthContextProps = {
  isLoggedIn: false,
  user: defaultUser,
  isAnonymous: true,
  loading: false,
  error: undefined,
  login() {},
  logout() {},
  isUserAProjectCreator: false,
  queryCurrentUser() {},
  setUser() {},
  queryFollowedProjects() {},
}

export type NavContextProps = {
  projectName: string
  projectTitle: string
  projectPath: string
  projectOwnerIDs: number[]
}

type AuthContextProps = {
  isLoggedIn: boolean
  user: UserMeFragment
  isAnonymous: boolean
  loading: boolean
  error?: ApolloError
  login: (me: UserMeFragment) => void
  logout: () => void
  isUserAProjectCreator: boolean
  queryCurrentUser: () => void
  queryFollowedProjects: () => void
  setUser: Dispatch<SetStateAction<UserMeFragment>>
}

const authServiceEndPoint = getAuthEndPoint()

const AuthContext = createContext<AuthContextProps>(defaultContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [user, setUser] = useAtom(authUserAtom)
  const setFollowedProjects = useSetAtom(followedProjectsAtom)
  const isUserAProjectCreator = useAtomValue(isUserAProjectCreatorAtom)
  const setUserAccountKeyPair = useSetAtom(userAccountKeyPairAtom)
  const setUserAccountKeys = useSetAtom(userAccountKeysAtom)
  const setAccountPassword = useSetAtom(accountPasswordAtom)

  const [queryCurrentUser, { loading: loadingUser, error }] = useMeLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted(data) {
      if (data && data.me) {
        login(data.me)
      }
    },
  })

  const [queryFollowedProjects] = useMeProjectFollowsLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted(data) {
      if (data?.me?.projectFollows) {
        setFollowedProjects(data?.me.projectFollows)
      }
    },
  })

  const login = (me: UserMeFragment) => {
    setUser(me)
    setIsLoggedIn(true)
    setInitialLoad(false)
  }

  const logout = useCallback(() => {
    setUser({ ...defaultUser })
    setUserAccountKeyPair(undefined)
    setUserAccountKeys(undefined)
    setFollowedProjects([])
    setAccountPassword(null)
    try {
      fetch(`${authServiceEndPoint}/logout`, {
        credentials: 'include',
      })
    } catch {
      alert('Failed to log out properly. Please clear your cookies.')
    }
  }, [setFollowedProjects, setUser, setUserAccountKeyPair, setUserAccountKeys, setAccountPassword])

  useEffect(() => {
    try {
      queryCurrentUser()
      queryFollowedProjects()
    } catch (_) {
      setIsLoggedIn(false)
    }

    setInitialLoad(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user.id === 0) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  }, [user])

  useEffect(() => {
    if (initialLoad) {
      setLoading(loadingUser)
    }
  }, [initialLoad, loadingUser])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAnonymous: !isLoggedIn,
        queryCurrentUser,
        setUser,
        loading,
        error,
        isLoggedIn,
        isUserAProjectCreator,
        login,
        logout,
        queryFollowedProjects,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = (): AuthContextProps => useContext(AuthContext)
