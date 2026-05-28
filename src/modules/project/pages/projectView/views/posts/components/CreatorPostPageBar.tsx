import { Button } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiPlus } from 'react-icons/pi'

import { BottomNavBarContainer } from '@/modules/navigation/components/bottomNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'

import { useWriteUpdateModal } from '../../../hooks/useWriteUpdateModal.ts'

export const CreatorPostPageTopBar = () => {
  const { isProjectOwner } = useProjectAtom()
  if (!isProjectOwner) {
    return null
  }

  return (
    <CardLayout dense noborder w="full" direction="row" display={{ base: 'none', lg: 'flex' }} flexWrap="wrap">
      <CreatePostButtons />
    </CardLayout>
  )
}

export const CreatorPostPageBottomBar = () => {
  const { isProjectOwner } = useProjectAtom()
  if (!isProjectOwner) {
    return null
  }

  return (
    <BottomNavBarContainer>
      <CreatePostButtons />
    </BottomNavBarContainer>
  )
}

export const CreatePostButtons = () => {
  const { openWriteUpdateModal } = useWriteUpdateModal()

  return (
    <Button
      flex={1}
      size="lg"
      variant="solid"
      colorScheme="primary1"
      rightIcon={<PiPlus />}
      onClick={() => openWriteUpdateModal()}
    >
      {t('Write update')}
    </Button>
  )
}
