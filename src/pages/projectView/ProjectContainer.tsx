import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ProjectNav } from '../../components/nav/bottomNav/ProjectNav'
import Loader from '../../components/ui/Loader'
import { Head } from '../../config/Head'
import { useProjectContext } from '../../context'
import { UseFundingFlowReturn, useFundingFormState } from '../../hooks'
import { useModal } from '../../hooks/useModal'
import {
  FundingResourceType,
  ProjectRewardForCreateUpdateFragment,
} from '../../types/generated/graphql'
import { useMobileMode } from '../../utils'
import { ProjectCreateDraftModal } from '../projectCreate/components/ProjectCreateDraftModal'
import { ProjectCreateLaunchedModal } from '../projectCreate/components/ProjectCreateLaunchedModal'
import { ProjectActivityPanel } from './projectActivityPanel'
import { ProjectMainBody } from './projectMainBody'

type Props = {
  fundingFlow: UseFundingFlowReturn
}

export const ProjectContainer = ({ fundingFlow }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()

  const onModalClose = () => navigate(location.pathname)

  const launchModal = useModal({ onClose: onModalClose })
  const draftModal = useModal({ onClose: onModalClose })

  const { project, loading } = useProjectContext()

  useEffect(() => {
    const launchModalOpen = location.search.split('launch').length > 1
    const draftModalOpen = location.search.split('draft').length > 1

    if (launchModalOpen) {
      return launchModal.onOpen()
    }

    if (draftModalOpen) {
      return draftModal.onOpen()
    }

    launchModal.onClose()
    draftModal.onClose()
  }, [draftModal, launchModal, location.search])

  const fundForm = useFundingFormState({
    rewards: project
      ? (project.rewards as ProjectRewardForCreateUpdateFragment[])
      : undefined,
  })

  const isMobile = useMobileMode()

  if (loading) {
    return (
      <Box width="100%" display="flex" justifyContent="center">
        <Loader paddingTop="65px" />
      </Box>
    )
  }

  return (
    <>
      <Head
        title={project?.title || ''}
        description={project?.description || ''}
        image={project?.image || ''}
        type="article"
      />

      <ProjectMainBody
        project={project}
        fundState={fundingFlow.fundState}
        updateReward={fundForm.updateReward}
      />

      <ProjectActivityPanel
        project={project}
        fundingFlow={fundingFlow}
        fundForm={fundForm}
        resourceType={FundingResourceType.Project}
        resourceId={project?.id}
      />

      <ProjectCreateLaunchedModal {...launchModal} />
      <ProjectCreateDraftModal {...draftModal} />

      {isMobile && <ProjectNav fixed />}
    </>
  )
}
