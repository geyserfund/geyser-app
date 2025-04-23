import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useModal } from '../../../../../shared/hooks'
import { ProjectCreateDraftModal } from './ProjectCreateDraftModal'
import { ProjectCreateLaunchedModal } from './ProjectCreateLaunchedModal'
import { ProjectCreatePreLaunchedModal } from './ProjectCreatePreLaunchedModal.tsx'

export const ProjectCreateModal = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onModalClose = () => {
    navigate(location.pathname, { replace: true })
  }

  const launchModal = useModal({ onClose: onModalClose })
  const draftModal = useModal({ onClose: onModalClose })
  const preLaunchModal = useModal({ onClose: onModalClose })

  useEffect(() => {
    const launchModalShouldOpen = location.search.includes('launch') && !location.search.includes('prelaunch')
    const preLaunchModalShouldOpen = location.search.includes('prelaunch')
    const draftModalShouldOpen = location.search.includes('draft')

    if (launchModalShouldOpen) {
      return launchModal.onOpen()
    }

    if (preLaunchModalShouldOpen) {
      return preLaunchModal.onOpen()
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
  }, [draftModal, launchModal, location.search, preLaunchModal])
  return (
    <>
      <ProjectCreateLaunchedModal {...launchModal} />
      <ProjectCreateDraftModal {...draftModal} />
      <ProjectCreatePreLaunchedModal {...preLaunchModal} />
    </>
  )
}
