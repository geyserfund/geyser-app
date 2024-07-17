import { Button } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiBag, PiNotePencil, PiPlus } from 'react-icons/pi'

import { BottomNavBarContainer } from '@/modules/navigation/bottomNav'
import { CardLayout } from '@/shared/components/layouts'

import { useGoalsModal } from '../../../hooks'

export const CreatorGoalPageTopBar = () => {
  return (
    <CardLayout w="full" direction="row" display={{ base: 'none', lg: 'flex' }}>
      <CreateGoalButtons />
    </CardLayout>
  )
}

export const CreatorGoalPageBottomBar = () => {
  return (
    <BottomNavBarContainer>
      <CreateGoalButtons />
    </BottomNavBarContainer>
  )
}

export const CreateGoalButtons = () => {
  const { onGoalModalOpen, isGoalinEditMode, setGoalInEditMode } = useGoalsModal()
  return (
    <>
      <Button
        flex={1}
        size={{ base: 'md', lg: 'lg' }}
        variant="outline"
        colorScheme="neutral1"
        leftIcon={<PiNotePencil />}
        onClick={() => setGoalInEditMode(!isGoalinEditMode)}
      >
        {!isGoalinEditMode ? t('Edit') : t('Finish editing')}
      </Button>
      <Button
        flex={1}
        size={{ base: 'md', lg: 'lg' }}
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
