import { Button } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { isProjectCreationRouteAtom } from '@/config/routes/state/privateRoutesAtom.ts'
import { useAuthContext } from '@/context'
import { getPath } from '@/shared/constants/index.ts'

import { isProjectFundingRoutesAtom } from '../platformNavBarAtom.ts'
import { CreateProjectButton } from './CreateProjectButton'

export const ProjectSelectMenu = () => {
  const { t } = useTranslation()

  const { isUserAProjectCreator } = useAuthContext()

  const isProjectFundingRoute = useAtomValue(isProjectFundingRoutesAtom)
  const isProjectCreationRoute = useAtomValue(isProjectCreationRouteAtom)

  // For funding flow and creation flow, we don't want to show the project select menu
  if (isProjectFundingRoute || isProjectCreationRoute) {
    return null
  }

  if (!isUserAProjectCreator) {
    return <CreateProjectButton />
  }

  return (
    <Button as={Link} to={getPath('discoveryMyProjects')} size="md" variant="outline" colorScheme="neutral1">
      {t('My projects')}
    </Button>
  )
}
