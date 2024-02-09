import { useDisclosure } from '@chakra-ui/react'
import { ComponentType, useEffect, useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { AuthModal } from '../../components/molecules'
import { getPath } from '../../constants'
import { useAuthContext } from '../../context'
import { LoadingPage } from '../../pages/loading'
import { useRouteMatchesForPrivateRoute } from './privateRoutesAtom'

interface IPrivateRoute {
  children: React.ReactNode
}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const { loading, user, isAnonymous } = useAuthContext()

  const params = useParams<{ projectId: string }>()

  const { onOpen, onClose, isOpen } = useDisclosure()

  const { isProjectCreatorRoute, isEntryCreationRoute } = useRouteMatchesForPrivateRoute()

  const isUserViewingTheirOwnProject: boolean = useMemo(() => {
    return user?.ownerOf?.some(({ project }) => project?.id === params.projectId || project?.name === params.projectId)
  }, [params.projectId, user.ownerOf])

  useEffect(() => {
    if (!loading) {
      if (isAnonymous) {
        onOpen()
      }
    }
  }, [loading, onOpen, isAnonymous])

  const modalTitle = 'The page you are trying to access required authorization.'

  const modalDescription = () => {
    if (isEntryCreationRoute) {
      return 'You must be logged in to create an entry.'
    }

    return 'Login to continue'
  }

  if (loading) {
    return <LoadingPage />
  }

  if (isProjectCreatorRoute && Boolean(isUserViewingTheirOwnProject) === false && params?.projectId) {
    return <Navigate to={getPath('project', params?.projectId)} />
  }

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

  return <>{children}</>
}

export const renderPrivateRoute = (Component: ComponentType<{}>) => {
  return (
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  )
}
