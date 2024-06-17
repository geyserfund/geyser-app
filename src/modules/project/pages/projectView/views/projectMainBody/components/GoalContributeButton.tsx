import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { isActive } from '../../../../../../../utils'
import { useProjectAtom } from '../../../../../pages1/projectView/hooks/useProjectAtom'

type GoalContributeButtonProps = ButtonProps & {
  projectGoalId: string
}

export const GoalContributeButton = ({ projectGoalId, ...props }: GoalContributeButtonProps) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()

  if (!project) {
    return null
  }

  const isFundingDisabled = !isActive(project.status)

  const handleContributeClick = () => {}

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
