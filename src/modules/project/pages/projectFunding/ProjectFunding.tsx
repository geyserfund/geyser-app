import { useEffect, useState } from 'react'

import { Project, UserMeFragment } from '../../../../types'
import { FundingProvider, useFundingContext } from '../../context/FundingProvider'
import { FundingStages, useFundingStage } from '../../funding/state'
import { QRCodeSection } from '../projectView/views/projectActivityPanel/screens'
import { FundingComplete } from './views/FundingComplete'
import { FundingForm, ProjectFundingFormState } from './views/FundingForm'

const SUCCESS_TITLE = 'Contribution Successfull'

interface Props {
  project: Project | undefined
  user: UserMeFragment
  onTitleChange?(title: string | null): void
}

const noop = () => {}

export const ProjectFundingContent = ({ project, user, onTitleChange = noop }: Props) => {
  const [title, setTitle] = useState<string | null>(null)

  useEffect(() => {
    if (title) {
      onTitleChange(title)
    }
  }, [onTitleChange, title])

  const [formState, setFormState] = useState<ProjectFundingFormState | undefined>()

  const { fundingStage, setFundingStage } = useFundingStage()
  const { resetFundingFlow } = useFundingContext()

  useEffect(() => {
    if (fundingStage === FundingStages.initial) {
      setFundingStage(FundingStages.form)
    }

    if (fundingStage === FundingStages.completed) {
      setTitle(SUCCESS_TITLE)
    }
  }, [fundingStage, setFundingStage])

  useEffect(() => {
    return () => {
      resetFundingFlow()
    }
  }, [resetFundingFlow])

  if (!project) {
    return null
  }

  switch (fundingStage) {
    case FundingStages.started:
      return <QRCodeSection />
    case FundingStages.completed:
      return <FundingComplete formState={formState} />
    default:
      return <FundingForm project={project} user={user} onFundingRequested={setFormState} />
  }
}

export const ProjectFunding = (props: Props) => {
  return (
    <FundingProvider project={props.project}>
      <ProjectFundingContent {...props} />
    </FundingProvider>
  )
}
