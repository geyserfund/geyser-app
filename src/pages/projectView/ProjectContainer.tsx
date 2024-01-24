import { Box } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'

import Loader from '../../components/ui/Loader'
import {
  Head,
  routeMatchForProjectPageAtom,
  useGetHistoryRoute,
} from '../../config'
import { getPath } from '../../constants'
import { useProjectContext } from '../../context'
import { useModal } from '../../hooks/useModal'
import { useMobileMode } from '../../utils'
import { ProjectCreateDraftModal } from '../projectCreate/components/ProjectCreateDraftModal'
import { ProjectCreateLaunchedModal } from '../projectCreate/components/ProjectCreateLaunchedModal'
import { ProjectMobileBottomNavigation } from './projectNavigation/components/ProjectMobileBottomNavigation'
import { ProjectNavigation } from './projectNavigation/components/ProjectNavigation'

export const ProjectContainer = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onModalClose = () => navigate(location.pathname, { replace: true })

  const launchModal = useModal({ onClose: onModalClose })
  const draftModal = useModal({ onClose: onModalClose })

  const { project, loading, isProjectOwner, fundingFlow } = useProjectContext()

  const params = useParams<{ projectId: string }>()
  const routeMatchForProjectPage = useAtomValue(routeMatchForProjectPageAtom)
  const historyRoutes = useGetHistoryRoute()
  const lastRoute = historyRoutes[historyRoutes.length - 2] || ''

  useEffect(() => {
    const launchModalShouldOpen = location.search.split('launch').length > 1
    const draftModalShouldOpen = location.search.split('draft').length > 1

    if (launchModalShouldOpen) {
      return launchModal.onOpen()
    }

    if (draftModalShouldOpen) {
      return draftModal.onOpen()
    }

    if (draftModal.isOpen) {
      draftModal.onClose()
    }

    if (launchModal.isOpen) {
      launchModal.onClose()
    }
  }, [draftModal, launchModal, location.search])

  const isMobile = useMobileMode()

  if (loading || isProjectOwner === undefined) {
    return (
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        background={'transparent'}
      >
        <Loader paddingTop="65px" />
      </Box>
    )
  }

  // If the user is project creator and the route is project main page, we redirect to project overview page
  if (
    params.projectId &&
    routeMatchForProjectPage &&
    isProjectOwner &&
    !lastRoute.includes('launch') &&
    !(lastRoute.includes('project') && lastRoute.includes(params.projectId))
  ) {
    return <Navigate to={getPath('projectOverview', `${params.projectId}`)} />
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      pb={{ base: (fundingFlow.fundState === 'initial' ? "70px" : 0), lg: '0px' }}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        overflow="hidden"
        position="relative"
        bg="neutral.0"
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <Head
          title={project?.title || ''}
          description={project?.shortDescription || ''}
          image={project?.thumbnailImage || ''}
          type="article"
        />
        {!isMobile ? <ProjectNavigation /> : null}

        <Outlet />

        <ProjectCreateLaunchedModal {...launchModal} />
        <ProjectCreateDraftModal {...draftModal} />

        {isMobile && fundingFlow.fundState === 'initial' && <ProjectMobileBottomNavigation fixed />}
      </Box>
    </Box>
  )
}
