import { Button, ButtonProps } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { selectedGoalIdAtom } from '@/modules/project/funding/state'
import { getPath } from '@/shared/constants'

import { isActive } from '../../../../../../../utils'
import { useProjectAtom } from '../../../../../hooks/useProjectAtom'

type GoalContributeButtonProps = ButtonProps & {
  projectGoalId: string
  isPriorityGoal?: boolean
  isNavButton?: boolean
  displayOnMobile?: boolean
}

export const GoalContributeButton = ({
  projectGoalId,
  isPriorityGoal,
  isNavButton,
  displayOnMobile,
  ...props
}: GoalContributeButtonProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { project } = useProjectAtom()
  const setSelectedGoalId = useSetAtom(selectedGoalIdAtom)

  if (!project) {
    return null
  }

  const isFundingDisabled = !isActive(project.status)

  const handleContributeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (isPriorityGoal) {
      setSelectedGoalId(null)
    } else {
      setSelectedGoalId(projectGoalId)
    }

    navigate(getPath('projectFunding', project.name))
  }

  if (isNavButton) {
    return (
      <Button
        variant="solid"
        colorScheme="primary1"
        size="lg"
        width={{ base: '100%', lg: '160px' }}
        display={{ base: displayOnMobile ? 'flex' : 'none', lg: 'flex' }}
        onClick={handleContributeClick}
        isDisabled={isFundingDisabled}
        {...props}
      >
        {t('Contribute')}
      </Button>
    )
  }

  return (
    <Button
      variant={isPriorityGoal ? 'solid' : 'outline'}
      colorScheme={isPriorityGoal ? 'primary1' : 'neutral1'}
      size={'md'}
      width={{ base: '100%', lg: '192px' }}
      onClick={handleContributeClick}
      isDisabled={isFundingDisabled}
      {...props}
    >
      {t('Contribute')}
    </Button>
  )
}
