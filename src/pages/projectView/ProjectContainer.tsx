import { Box } from '@chakra-ui/react'

import { ProjectNav } from '../../components/nav/bottomNav/ProjectNav'
import Loader from '../../components/ui/Loader'
import { Head } from '../../config/Head'
import { useProjectContext } from '../../context'
import { useFundingFormState } from '../../hooks'
import {
  FundingResourceType,
  ProjectRewardForCreateUpdateFragment,
} from '../../types/generated/graphql'
import { useMobileMode } from '../../utils'
import { ProjectActivityPanel } from './projectActivityPanel'
import { ProjectMainBody } from './projectMainBody'
import { ProjectBackButton } from './projectMainBody/components/ProjectBackButton'

type Props = {
  fundingFlow: any
}

export const ProjectContainer = ({ fundingFlow }: Props) => {
  const { project, loading } = useProjectContext()

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

  const { setFundState, fundState } = fundingFlow

  if (loading || !project) {
    return (
      <Box width="100%" display="flex" justifyContent="center">
        <Loader paddingTop="65px" />
      </Box>
    )
  }

  return (
    <>
      <Head
        title={project.title}
        description={project.description}
        image={project.image || ''}
        type="article"
      />

      <ProjectBackButton />

      <ProjectMainBody
        {...{
          project,
          fundState,
          setFundState,
          updateReward: fundForm.updateReward,
        }}
      />

      <ProjectActivityPanel
        project={project}
        {...{ fundingFlow, fundForm }}
        resourceType={FundingResourceType.Project}
        resourceId={project.id}
      />

      {isMobile && <ProjectNav fixed />}
    </>
  )
}
