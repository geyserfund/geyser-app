import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'

import Loader from '../../components/ui/Loader'
import { Head } from '../../config'
import { getPath } from '../../constants'
import { useProjectContext } from '../../context'
import { useModal } from '../../hooks/useModal'
import { useMobileMode } from '../../utils'
import { ProjectCreateDraftModal } from '../projectCreate/components/ProjectCreateDraftModal'
import { ProjectCreateLaunchedModal } from '../projectCreate/components/ProjectCreateLaunchedModal'
import { ProjectMobileBottomNavigation } from './projectNavigation/components/ProjectMobileBottomNavigation'
import { ProjectMobileNavigation } from './projectNavigation/components/ProjectMobileNavigation'
import { ProjectNavigation } from './projectNavigation/components/ProjectNavigation'

export const ProjectContainer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<{ projectId: string }>()

  const onModalClose = () => navigate(location.pathname, { replace: true })

  const launchModal = useModal({ onClose: onModalClose })
  const draftModal = useModal({ onClose: onModalClose })

  const { project, loading, isProjectOwner } = useProjectContext()

  useEffect(() => {
    let redirected = false
    if (isProjectOwner && !redirected) {
      redirected = true
      navigate(getPath('projectOverview', `${params.projectId}`))
    }

    return () => {
      redirected = false
    }
  }, [isProjectOwner, params.projectId])

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

  if (loading) {
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

  return (
    <>
      <Head
        title={project?.title || ''}
        description={project?.shortDescription || ''}
        image={project?.thumbnailImage || ''}
        type="article"
      />
      {isMobile ? <ProjectMobileNavigation /> : <ProjectNavigation />}

      <Outlet />

      <ProjectCreateLaunchedModal {...launchModal} />
      <ProjectCreateDraftModal {...draftModal} />

      {isMobile && <ProjectMobileBottomNavigation fixed />}
    </>
  )
}
