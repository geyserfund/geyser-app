import { ApolloError } from '@apollo/client'
import { useAtom, useSetAtom } from 'jotai'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

import { getAuthEndPoint } from '../config/domain'
import { defaultUser } from '../defaults'
import { authUserAtom, followedProjectsAtom, useIsUserAProjectCreatorValue } from '../pages/auth/state/authAtom'
import { useMeLazyQuery, useMeProjectFollowsLazyQuery, UserMeFragment } from '../types'

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

export const AuthContext = createContext<AuthContextProps>(defaultContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [user, setUser] = useAtom(authUserAtom)
  const setFollowedProjects = useSetAtom(followedProjectsAtom)
  const isUserAProjectCreator = useIsUserAProjectCreatorValue()

  const authServiceEndPoint = getAuthEndPoint()

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

  const logout = () => {
    setUser({ ...defaultUser })
    setFollowedProjects([])
    try {
      fetch(`${authServiceEndPoint}/logout`, {
        credentials: 'include',
      })
    } catch {
      alert('Failed to log out properly. Please clear your cookies.')
    }
  }

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
        isAnonymous: !user || !user.id,
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
