import { ComponentType, useEffect, useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { AuthModal } from '../../components/molecules'
import { getPath } from '../../constants'
import { useAuthContext } from '../../context'
import { LoadingPage } from '../../pages/loading'
import { hasNostrAccount, hasTwitterAccount } from '../../utils'
import { useRouteMatchesForPrivateRoute } from './privateRoutesAtom'

interface IPrivateRoute {
  children: React.ReactNode
}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const {
    loading,
    user,
    isAnonymous,
    loginOnClose,
    isAuthModalOpen: loginIsOpen,
    loginOnOpen,
  } = useAuthContext()

  const params = useParams<{ projectId: string }>()

  const {
    isProjectCreatorRoute,
    isEntryCreationRoute,
    isPrivateProjectLaunchRoute,
  } = useRouteMatchesForPrivateRoute()

  const isUserViewingTheirOwnProject: boolean = useMemo(() => {
    return user.ownerOf.some(
      ({ project }) =>
        project?.id === params.projectId || project?.name === params.projectId,
    )
  }, [params.projectId, user.ownerOf])

  useEffect(() => {
    if (!loading) {
      if (
        isAnonymous ||
        (isPrivateProjectLaunchRoute &&
          user &&
          !hasTwitterAccount(user) &&
          !hasNostrAccount(user))
      ) {
        loginOnOpen()
      }
    }
  }, [user, loading, isPrivateProjectLaunchRoute, loginOnOpen, isAnonymous])

  const modalTitle = () => {
    if (
      isPrivateProjectLaunchRoute &&
      user &&
      !hasTwitterAccount(user) &&
      !hasNostrAccount(user)
    ) {
      return 'Connect'
    }

    return 'The page you are trying to access required authorization.'
  }

  const modalDescription = () => {
    if (
      isPrivateProjectLaunchRoute &&
      user &&
      !hasTwitterAccount(user) &&
      !hasNostrAccount(user)
    ) {
      return 'Connect your Twitter social profile to create a project. We require creators to login with twitter to start their Geyser projects.'
    }

    if (isEntryCreationRoute) {
      return 'You must be logged in to create an entry.'
    }

    return 'Login to continue'
  }

  const renderUnauthorized = () => (
    <AuthModal
      title={modalTitle()}
      description={modalDescription()}
      showLightning={!isPrivateProjectLaunchRoute}
      isOpen={loginIsOpen}
      privateRoute={true}
      onClose={loginOnClose}
    />
  )

  const isForbidden = () => {
    if (user && isPrivateProjectLaunchRoute) {
      return false
    }

    return (
      user &&
      (isPrivateProjectLaunchRoute || isProjectCreatorRoute) &&
      Boolean(isUserViewingTheirOwnProject) === false
    )
  }

  const renderForbidden = () => <Navigate to={getPath('notAuthorized')} />

  if (loading) {
    return <LoadingPage />
  }

  return (
    <>
      {children}
      {isForbidden() ? renderForbidden() : renderUnauthorized()}
    </>
  )
}

export const renderPrivateRoute = (Component: ComponentType<{}>) => {
  return (
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  )
}
