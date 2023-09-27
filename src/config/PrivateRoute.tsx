import { useEffect, useMemo } from 'react'
import { PathMatch, useMatch, useNavigate, useParams } from 'react-router'

import { AuthModal } from '../components/molecules'
import { getPath, PathName } from '../constants'
import { useAuthContext } from '../context'
import { LoadingPage } from '../pages/loading'
import { hasNostrAccount, hasTwitterAccount } from '../utils'

interface IPrivateRoute {
  children: React.ReactNode
}

const privateProjectLaunchRoutes = [getPath('privateProjectLaunch')]

const projectEntryCreationRoutes = [
  `/${PathName.project}/:projectId/${PathName.entry}`,
  `/${PathName.project}/:projectId/${PathName.entry}/:entryId`,
  `/${PathName.project}/:projectId/${PathName.entry}/:entryId/${PathName.preview}`,
]

const projectCreatorRoutes = [
  ...privateProjectLaunchRoutes,
  getPath('projectContributors', PathName.projectId),
  getPath('projectInsights', PathName.projectId),
  getPath('projectOverview', PathName.projectId),
]

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const {
    loading,
    user,
    isAnonymous,
    loginOnClose,
    isAuthModalOpen: loginIsOpen,
    loginOnOpen,
  } = useAuthContext()

  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()

  const routeMatchesForPrivateProjectLaunch =
    privateProjectLaunchRoutes.map(useMatch)

  const routeMatchesForEntryProjectCreation =
    projectEntryCreationRoutes.map(useMatch)

  const routeMatchForTopLevelProjectCreation = useMatch(
    getPath('privateProjectLaunch'),
  )
  const routeMatchForProjectCreatorPages = projectCreatorRoutes.map(useMatch)

  const isPrivateProjectCreationPath: boolean = useMemo(
    () =>
      routeMatchesForPrivateProjectLaunch.some((routeMatch) =>
        Boolean(routeMatch as PathMatch),
      ),
    [routeMatchesForPrivateProjectLaunch],
  )

  const isProjectEntryCreationPath: boolean = useMemo(
    () =>
      routeMatchesForEntryProjectCreation.some((routeMatch) =>
        Boolean(routeMatch as PathMatch),
      ),
    [routeMatchesForEntryProjectCreation],
  )

  const isTopLevelProjectCreationRoute: boolean = useMemo(
    () => Boolean(routeMatchForTopLevelProjectCreation),
    [routeMatchForTopLevelProjectCreation],
  )

  const isProjectCreatorPagesRoute: boolean = useMemo(
    () =>
      routeMatchForProjectCreatorPages.some((routeMatch) =>
        Boolean(routeMatch as PathMatch),
      ),
    [routeMatchForProjectCreatorPages],
  )

  const isUserViewingTheirOwnProject: boolean = useMemo(
    () => user.ownerOf.some(({ project }) => project?.id === params.projectId),
    [params.projectId, user.ownerOf],
  )

  useEffect(() => {
    if (!loading) {
      if (
        isAnonymous ||
        (isPrivateProjectCreationPath &&
          user &&
          !hasTwitterAccount(user) &&
          !hasNostrAccount(user))
      ) {
        loginOnOpen()
      }
    }
  }, [user, loading, isPrivateProjectCreationPath, loginOnOpen, isAnonymous])

  const modalTitle = () => {
    if (
      isPrivateProjectCreationPath &&
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
      isPrivateProjectCreationPath &&
      user &&
      !hasTwitterAccount(user) &&
      !hasNostrAccount(user)
    ) {
      return 'Connect your Twitter social profile to create a project. We require creators to login with twitter to start their Geyser projects.'
    }

    if (isProjectEntryCreationPath) {
      return 'You must be logged in to create an entry.'
    }

    return 'Login to continue'
  }

  const renderUnauthorized = () => (
    <AuthModal
      title={modalTitle()}
      description={modalDescription()}
      showLightning={!isPrivateProjectCreationPath}
      isOpen={loginIsOpen}
      privateRoute={true}
      onClose={loginOnClose}
    />
  )

  const isForbidden = () => {
    if (user && isTopLevelProjectCreationRoute) {
      return false
    }

    return (
      user &&
      isProjectCreatorPagesRoute &&
      Boolean(isUserViewingTheirOwnProject) === false
    )
  }

  const renderForbidden = () => navigate(getPath('notAuthorized'))

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
