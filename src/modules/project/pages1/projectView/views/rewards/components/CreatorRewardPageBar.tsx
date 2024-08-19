import { Button } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiBag, PiPlus } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { BottomNavBarContainer } from '@/modules/navigation/bottomNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants'

export const CreatorRewardPageTopBar = () => {
  const { isProjectOwner } = useProjectAtom()

  if (!isProjectOwner) {
    return null
  }

  return (
    <CardLayout w="full" direction="row" display={{ base: 'none', lg: 'flex' }}>
      <CreateRewardButtons />
    </CardLayout>
  )
}

export const CreatorRewardPageBottomBar = () => {
  const { isProjectOwner } = useProjectAtom()
  if (!isProjectOwner) {
    return null
  }

  return (
    <BottomNavBarContainer>
      <CreateRewardButtons />
    </BottomNavBarContainer>
  )
}

export const CreateRewardButtons = () => {
  const { project } = useProjectAtom()
  return (
    <>
      <Button
        as={Link}
        to={getPath('dashboardSales', project.name)}
        flex={1}
        size={'lg'}
        variant="outline"
        colorScheme="neutral1"
        leftIcon={<PiBag />}
      >
        {t('View Sales')}
      </Button>
      <Button
        as={Link}
        to={getPath('projectRewardCreate', project.name)}
        flex={1}
        size={'lg'}
        variant="solid"
        colorScheme="primary1"
        leftIcon={<PiPlus />}
      >
        {t('Add reward')}
      </Button>
    </>
  )
}
