import { useEffect, useState } from 'react'

import { fundingStages } from '../../constants'
import { useFundingFlow } from '../../hooks'
import { Project, User } from '../../types'
import { ProjectFundingQRScreenQRCodeSection } from '../projectView/projectActivityPanel/components'
import { FundingComplete } from './stages/FundingComplete'
import { FundingForm, ProjectFundingFormState } from './stages/FundingForm'

const SUCCESS_TITLE = 'Contribution Successfull'

interface Props {
  project: Project | undefined
  user: User
  onTitleChange?(title: string | null): void
}

const noop = () => {}

export const ProjectFunding = ({
  project,
  user,
  onTitleChange = noop,
}: Props) => {
  const fundingFlow = useFundingFlow()

  const [title, setTitle] = useState<string | null>(null)

  useEffect(() => {
    if (title) {
      onTitleChange(title)
    }
  }, [onTitleChange, title])

  const [formState, setFormState] = useState<
    ProjectFundingFormState | undefined
  >()

  const { fundState } = fundingFlow

  if (!project) {
    return null
  }

  switch (fundState) {
    case fundingStages.started:
      return <ProjectFundingQRScreenQRCodeSection fundingFlow={fundingFlow} />
    case fundingStages.completed:
      return (
        <FundingComplete
          formState={formState}
          onSuccess={() => setTitle(SUCCESS_TITLE)}
          fundingFlow={fundingFlow}
        />
      )
    default:
      return (
        <FundingForm
          fundingFlow={fundingFlow}
          project={project}
          user={user}
          onFundingRequested={setFormState}
        />
      )
  }
}
