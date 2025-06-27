import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { GoalModal } from '@/modules/project/pages1/projectView/components/GoalModal.tsx'
import { useGoalsModal } from '@/modules/project/pages1/projectView/hooks/useGoalsModal.tsx'
import { RenderGoals } from '@/modules/project/pages1/projectView/views/goals/common/RenderGoals.tsx'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'

import { ProjectCreationLayout } from '../../../Layouts/ProjectCreationLayout.tsx'

export const OpenFundingGoal = () => {
  const navigate = useNavigate()

  const { project } = useProjectAtom()

  const { onGoalModalOpen } = useGoalsModal()

  const continueProps = {
    onClick() {
      navigate(getPath('launchProjectRewards', project.id))
    },
    isDisabled: false,
  }

  const backButtonProps = {
    onClick() {
      navigate(getPath('launchFundingStrategy', project.id))
    },
  }

  return (
    <ProjectCreationLayout
      title={t('Funding Goals')}
      continueButtonProps={continueProps}
      backButtonProps={backButtonProps}
    >
      <VStack w="full" h="full" align="flex-start" spacing={8}>
        <Body size="sm">
          {t(
            'Set one goal or more to help your contributors understand how you plan to use the funds. If you create multiple goals, contributions will go towards the default goal. You can re-order the goals to set a different default goal at any time.',
          )}
        </Body>

        <RenderGoals creationMode />
        <Button width="full" size="xl" variant="soft" colorScheme="neutral1" onClick={() => onGoalModalOpen()}>
          {t('Add a goal')}
        </Button>
      </VStack>
      <GoalModal />
    </ProjectCreationLayout>
  )
}
