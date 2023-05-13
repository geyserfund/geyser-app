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

  const launchModalOpen = location.search.split('launch').length > 1
  const draftModalOpen = location.search.split('draft').length > 1

  useEffect(() => {
    if (launchModalOpen) {
      return launchModal.onOpen()
    }

    if (draftModalOpen) {
      return draftModal.onOpen()
    }

    launchModal.onClose()
    draftModal.onClose()
  }, [
    draftModal,
    draftModalOpen,
    launchModal,
    launchModalOpen,
    location.search,
  ])

  const fundForm = useFundingFormState({
    /*
     * Passing an empty array as fallback would probably make
     * more sense but I think at the moment most checks look
     * for an undefined value.
      
     */
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
