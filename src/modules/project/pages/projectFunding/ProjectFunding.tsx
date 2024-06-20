import { useEffect, useState } from 'react'

import { Grant, Project, UserMeFragment, useWalletLimitQuery } from '../../../../types'
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
  grant?: Grant
}

const noop = () => {}

export const ProjectFundingContent = ({ project, user, onTitleChange = noop, grant }: Props) => {
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

  const handleClose = () => {
    setFundingStage(FundingStages.form)
    setTitle(null)
    resetFundingFlow()
  }

  const handleFundingCompleteClose = () => {
    setFundingStage(FundingStages.form)
    setTitle(null)
    resetFundingFlow()
    window.location.reload()
  }

  if (!project) {
    return null
  }

  switch (fundingStage) {
    case FundingStages.started:
      return <QRCodeSection onCloseClick={handleClose} openedFromGrant={Boolean(grant)} />
    case FundingStages.completed:
      return (
        <FundingComplete onClose={handleFundingCompleteClose} project={project} formState={formState} grant={grant} />
      )
    default:
      return <FundingForm project={project} user={user} onFundingRequested={setFormState} />
  }
}

export const ProjectFunding = (props: Props) => {
  const { data } = useWalletLimitQuery({
    variables: {
      getWalletId: props.project?.wallets[0]?.id,
    },
    skip: !props.project || !props.project.wallets[0] || !props.project.wallets[0].id,
  })
  const limits = data?.getWallet.limits
  return (
    <FundingProvider project={props.project} limits={limits}>
      <ProjectFundingContent {...props} />
    </FundingProvider>
  )
}
