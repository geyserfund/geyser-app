import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiPencil } from 'react-icons/bi'

import { CardLayout } from '../../../../../../../components/layouts'
import { IconButtonComponent } from '../../../../../../../components/ui'
import { TitleDivider } from '../../../../../../../components/ui/TitleDivider'
import { ProjectGoal } from '../../../../../../../types'
import { useProjectContext } from '../../../../../context'
import { useProjectGoals } from '../../../hooks/useProjectGoals'
import { Goal } from '../components/Goal'

export const Goals = () => {
  const { t } = useTranslation()
  const { project, isProjectOwner, onMilestonesModalOpen } = useProjectContext()

  const { inProgressGoals, completedGoals } = useProjectGoals()

  if (!project) {
    return null
  }

  const renderInProgressGoals = () => {
    if (inProgressGoals && inProgressGoals.length > 0) {
      return inProgressGoals.map((goal: ProjectGoal) => {
        if (goal) {
          return <Goal goal={goal} key={goal.id} />
        }
      })
    }

    return <Text>There are no goals available.</Text>
  }

  const renderCompletedGoals = () => {
    if (completedGoals && completedGoals.length > 0) {
      return completedGoals.map((goal: ProjectGoal) => {
        if (goal) {
          return <Goal goal={goal} key={goal.id} />
        }
      })
    }

    return <Text>There are no goals available.</Text>
  }

  if (inProgressGoals?.length === 0 && completedGoals?.length === 0) {
    return null
  }

  return (
    <>
      <CardLayout flexDirection="column" width="100%" alignItems="flex-start" spacing="25px" mobileDense>
        {inProgressGoals && inProgressGoals?.length > 0 && (
          <>
            <TitleDivider
              badge={inProgressGoals?.length}
              rightAction={
                isProjectOwner && (
                  <IconButtonComponent
                    aria-label="edit-goal"
                    noBorder
                    variant="ghost"
                    onClick={onMilestonesModalOpen}
                    icon={<BiPencil fontSize="16px" />}
                  />
                )
              }
            >
              {t('Goals')}
            </TitleDivider>
            <VStack alignItems="flex-start" gap={30} width="100%">
              {renderInProgressGoals()}
            </VStack>
          </>
        )}
        {completedGoals && completedGoals?.length > 0 && (
          <>
            <TitleDivider badge={completedGoals?.length}>{t('Completed Goals')}</TitleDivider>
            <VStack alignItems="flex-start" gap={30} width="100%">
              {renderCompletedGoals()}
            </VStack>
          </>
        )}
      </CardLayout>
    </>
  )
}
