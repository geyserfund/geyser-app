import { Button } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect } from 'react'
import { PiNotePencil, PiPlus } from 'react-icons/pi'

import { BottomNavBarContainer } from '@/modules/navigation/components/bottomNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'

import { useGoalsModal } from '../../../hooks'

export const CreatorGoalPageTopBar = () => {
  const { isProjectOwner } = useProjectAtom()
  if (!isProjectOwner) {
    return null
  }

  return (
    <CardLayout w="full" direction="row" display={{ base: 'none', lg: 'flex' }}>
      <CreateGoalButtons />
    </CardLayout>
  )
}

export const CreatorGoalPageBottomBar = () => {
  const { isProjectOwner } = useProjectAtom()
  if (!isProjectOwner) {
    return null
  }

  return (
    <BottomNavBarContainer>
      <CreateGoalButtons />
    </BottomNavBarContainer>
  )
}

export const CreateGoalButtons = () => {
  const { onGoalModalOpen, isGoalinEditMode, setGoalInEditMode } = useGoalsModal()

  useEffect(() => {
    return () => {
      setGoalInEditMode(false)
    }
  }, [setGoalInEditMode])

  return (
    <>
      <Button
        flex={1}
        size="lg"
        variant="outline"
        colorScheme="neutral1"
        leftIcon={<PiNotePencil />}
        onClick={() => setGoalInEditMode(!isGoalinEditMode)}
      >
        {!isGoalinEditMode ? t('Edit') : t('Finish editing')}
      </Button>
      <Button
        flex={1}
        size="lg"
        variant="solid"
        colorScheme="primary1"
        leftIcon={<PiPlus />}
        onClick={() => onGoalModalOpen()}
      >
        {t('Add goal')}
      </Button>
    </>
  )
}
