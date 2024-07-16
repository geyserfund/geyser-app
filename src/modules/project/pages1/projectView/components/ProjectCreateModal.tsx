import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useModal } from '../../../../../shared/hooks'
import { ProjectCreateDraftModal } from './ProjectCreateDraftModal'
import { ProjectCreateLaunchedModal } from './ProjectCreateLaunchedModal'

export const ProjectCreateModal = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onModalClose = () => {
    navigate(location.pathname, { replace: true })
  }

  const launchModal = useModal({ onClose: onModalClose })
  const draftModal = useModal({ onClose: onModalClose })

  useEffect(() => {
    const launchModalShouldOpen = location.search.includes('launch')
    const draftModalShouldOpen = location.search.includes('draft')

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
  return (
    <>
      <ProjectCreateLaunchedModal {...launchModal} />
      <ProjectCreateDraftModal {...draftModal} />
    </>
  )
}
