import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useModal } from '../../../../../shared/hooks'
import { ProjectCreateDraftModal } from './ProjectCreateDraftModal'
import { ProjectCreatePreLaunchedModal } from './ProjectCreatePreLaunchedModal.tsx'

export const ProjectCreateModal = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onModalClose = () => {
    navigate(location.pathname, { replace: true })
  }

  const draftModal = useModal({ onClose: onModalClose })
  const preLaunchModal = useModal({ onClose: onModalClose })

  useEffect(() => {
    const preLaunchModalShouldOpen = location.search.includes('prelaunch')
    const draftModalShouldOpen = location.search.includes('draft')

    if (preLaunchModalShouldOpen) {
      return preLaunchModal.onOpen()
    }

    if (draftModalShouldOpen) {
      return draftModal.onOpen()
    }

    if (draftModal.isOpen) {
      draftModal.onClose()
    }
  }, [draftModal, location.search, preLaunchModal])
  return (
    <>
      <ProjectCreateDraftModal {...draftModal} />
      <ProjectCreatePreLaunchedModal {...preLaunchModal} />
    </>
  )
}
