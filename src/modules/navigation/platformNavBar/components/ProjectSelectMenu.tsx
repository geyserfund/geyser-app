import { Box, Button } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { isProjectCreationRouteAtom } from '@/config/routes/state/privateRoutesAtom.ts'
import { useAuthContext } from '@/context'
import { myProjectsActivityDotAtom } from '@/modules/discovery/state/activityDotAtom.ts'
import { getPath } from '@/shared/constants/index.ts'

import { isProjectFundingRoutesAtom } from '../platformNavBarAtom.ts'
import { CreateProjectButton } from './CreateProjectButton'

export const ProjectSelectMenu = () => {
  const { t } = useTranslation()

  const { isUserAProjectCreator } = useAuthContext()

  const isProjectFundingRoute = useAtomValue(isProjectFundingRoutesAtom)
  const isProjectCreationRoute = useAtomValue(isProjectCreationRouteAtom)

  const myProjectActivityDot = useAtomValue(myProjectsActivityDotAtom)

  // For funding flow and creation flow, we don't want to show the project select menu
  if (isProjectFundingRoute || isProjectCreationRoute) {
    return null
  }

  if (!isUserAProjectCreator) {
    return <CreateProjectButton />
  }

  return (
    <Button
      as={Link}
      to={getPath('discoveryMyProjects')}
      size="md"
      variant="outline"
      colorScheme="neutral1"
      position="relative"
    >
      {t('My projects')}
      {myProjectActivityDot && (
        <Box
          position="absolute"
          bottom={-1}
          right={-1}
          borderRadius="50%"
          backgroundColor="error.9"
          height="8px"
          width="8px"
        />
      )}
    </Button>
  )
}
