import { useEffect, useState } from 'react'

import { useFundingFlow } from '../../hooks'
import { FundingStages, useFundingStage } from '../../hooks/fundingFlow/state'
import { Project, UserMeFragment } from '../../types'
import { QRCodeSection } from '../projectView/projectActivityPanel/screens'
import { FundingComplete } from './stages/FundingComplete'
import { FundingForm, ProjectFundingFormState } from './stages/FundingForm'

const SUCCESS_TITLE = 'Contribution Successfull'

interface Props {
  project: Project | undefined
  user: UserMeFragment
  onTitleChange?(title: string | null): void
}

const noop = () => {}

export const ProjectFunding = ({ project, user, onTitleChange = noop }: Props) => {
  const fundingFlow = useFundingFlow()

  const [title, setTitle] = useState<string | null>(null)

  useEffect(() => {
    if (title) {
      onTitleChange(title)
    }
  }, [onTitleChange, title])

  const [formState, setFormState] = useState<ProjectFundingFormState | undefined>()

  const { fundingStage, setFundingStage } = useFundingStage()

  useEffect(() => {
    if (fundingStage === FundingStages.initial) {
      setFundingStage(FundingStages.form)
    }

    if (fundingStage === FundingStages.completed) {
      setTitle(SUCCESS_TITLE)
    }
  }, [fundingStage, setFundingStage])

  if (!project) {
    return null
  }

  switch (fundingStage) {
    case FundingStages.started:
      return <QRCodeSection fundingFlow={fundingFlow} />
    case FundingStages.completed:
      return <FundingComplete formState={formState} fundingFlow={fundingFlow} />
    default:
      return <FundingForm fundingFlow={fundingFlow} project={project} user={user} onFundingRequested={setFormState} />
  }
}
