import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { isActive } from '../../../../../../../utils'
import { MobileViews, useProjectContext } from '../../../../../context'

type GoalContributeButtonProps = ButtonProps & {
  projectGoalId: string
}

export const GoalContributeButton = ({ projectGoalId, ...props }: GoalContributeButtonProps) => {
  const { t } = useTranslation()
  const { project, setMobileView, setProjectGoalId } = useProjectContext()

  if (!project) {
    return null
  }

  const isFundingDisabled = !isActive(project.status)

  const handleContributeClick = () => {
    setMobileView(MobileViews.funding)
    setProjectGoalId(projectGoalId)
  }

  return (
    <Button
      variant="primary"
      size={'md'}
      width={{ base: '100%', lg: '192px' }}
      height="32px"
      onClick={handleContributeClick}
      isDisabled={isFundingDisabled}
      {...props}
    >
      {t('Contribute')}
    </Button>
  )
}
