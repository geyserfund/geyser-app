import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { isActive } from '../../../../../../../../../utils'
import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom'

type GoalContributeButtonProps = ButtonProps & {
  projectGoalId: string
  isPriorityGoal?: boolean
}

export const GoalContributeButton = ({ projectGoalId, isPriorityGoal, ...props }: GoalContributeButtonProps) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()

  if (!project) {
    return null
  }

  const isFundingDisabled = !isActive(project.status)

  const handleContributeClick = () => {}

  return (
    <Button
      variant={isPriorityGoal ? 'solid' : 'outline'}
      colorScheme={isPriorityGoal ? 'primary1' : 'neutral1'}
      size={'sm'}
      width={{ base: '100%', lg: '192px' }}
      onClick={handleContributeClick}
      isDisabled={isFundingDisabled}
      {...props}
    >
      {t('Contribute')}
    </Button>
  )
}
