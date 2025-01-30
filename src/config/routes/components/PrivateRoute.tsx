import { useDisclosure } from '@chakra-ui/react'
import { ComponentType, useEffect, useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { AuthModal } from '../../../components/molecules'
import { useAuthContext } from '../../../context'
import { ExternalAccountType } from '../../../pages/auth'
import { LoadingPage } from '../../../pages/loading'
import { getPath } from '../../../shared/constants'
import { useRouteMatchesForPrivateRoute } from '../state/privateRoutesAtom'

interface IPrivateRoute {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: IPrivateRoute) => {
  const { loading, user, isAnonymous } = useAuthContext()

  const params = useParams<{ projectId: string; projectName: string; userId: string }>()

  const { onOpen, onClose, isOpen } = useDisclosure()

  const { isProjectCreatorRoute, isEntryCreationRoute, isPrivateProjectLaunchRoute, isProfileSettingsRoute } =
    useRouteMatchesForPrivateRoute()

  const isUserViewingTheirOwnProject: boolean = useMemo(() => {
    return user?.ownerOf?.some(
      ({ project }) => project?.id === params.projectId || project?.name === params.projectName,
    )
  }, [params.projectId, params.projectName, user.ownerOf])

  const isViewingOwnProfile = useMemo(() => {
    return user.id === params.userId
  }, [params.userId, user.id])

  const isUserCreatorEnabled: boolean = useMemo(() => {
    return Boolean(
      user?.externalAccounts.find(
        (account) =>
          account.accountType !== ExternalAccountType.lightning && account.accountType !== ExternalAccountType.google,
      ),
    )
  }, [user])

  useEffect(() => {
    if (!loading) {
      if (isAnonymous) {
        onOpen()
      } else {
        onClose()
      }
    }
  }, [loading, onOpen, onClose, isAnonymous])

  const modalTitle = 'Sign in to Geyser'

  const modalDescription = () => {
    if (isEntryCreationRoute) {
      return 'You must be logged in to create an entry.'
    }

    return ' '
  }

  if (loading) {
    return <LoadingPage />
  }

  if (isPrivateProjectLaunchRoute && !isUserCreatorEnabled) {
    return <Navigate to={getPath('launchStart')} />
  }

  if (isProjectCreatorRoute && Boolean(isUserViewingTheirOwnProject) === false && params?.projectName) {
    return <Navigate to={getPath('project', params?.projectName)} />
  }

  /** Items returned after anonymous, will ask users to login before trying to open the page. */
  if (isAnonymous) {
    return (
      <AuthModal
        title={modalTitle}
        description={modalDescription()}
        isOpen={isOpen}
        privateRoute={true}
        onClose={onClose}
      />
    )
  }

  if (isProfileSettingsRoute && !isViewingOwnProfile && params?.userId) {
    return <Navigate to={getPath('userProfile', params?.userId)} />
  }

  return <>{children}</>
}

export const renderPrivateRoute = (Component: ComponentType<{}>) => {
  return (
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  )
}
