import { Button, HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiPlus } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { isCircularGrantProject } from '@/modules/project/utils/isCircularGrantProject.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'

import { useGoalsModal } from '../../../hooks/useGoalsModal.tsx'
import { RenderGoals } from '../../goals/common/RenderGoals'
import { BodySectionLayout } from '../components/BodySectionLayout.tsx'

export const Goals = () => {
  const { t } = useTranslation()

  const { project, isProjectOwner } = useProjectAtom()
  const isCircularGrant = isCircularGrantProject(project)

  const { onGoalModalOpen, isGoalinEditMode, setGoalInEditMode } = useGoalsModal()

  return (
    <BodySectionLayout title={''}>
      <CardLayout w="full" noborder padding={0}>
        <RenderGoals />
        {isProjectOwner && (
          <HStack w="full" justifyContent="end">
            {isGoalinEditMode && !isCircularGrant && (
              <Button
                size="sm"
                variant="solid"
                colorScheme="primary1"
                leftIcon={<PiPlus />}
                onClick={() => onGoalModalOpen()}
              >
                {t('Add goal')}
              </Button>
            )}
            <Button
              size="md"
              variant="outline"
              colorScheme="neutral1"
              onClick={() => setGoalInEditMode(!isGoalinEditMode)}
            >
              {isGoalinEditMode ? t('Finish Editing') : t('Edit')}
            </Button>
          </HStack>
        )}
      </CardLayout>
    </BodySectionLayout>
  )
}
