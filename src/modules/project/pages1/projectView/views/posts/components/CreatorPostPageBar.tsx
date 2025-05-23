import { Button } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiPlus } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { BottomNavBarContainer } from '@/modules/navigation/components/bottomNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { getPath } from '@/shared/constants'

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
  const { project } = useProjectAtom()
  return (
    <>
      <Button
        as={Link}
        to={getPath('projectPostCreate', project.name)}
        flex={1}
        size={'lg'}
        variant="solid"
        colorScheme="primary1"
        rightIcon={<PiPlus />}
      >
        {t('Write post')}
      </Button>
    </>
  )
}
