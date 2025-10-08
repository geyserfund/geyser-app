import { Button } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { isRouteForProjectCreationAtom } from '@/config/routes/state/privateRoutesAtom.ts'
import { useAuthContext } from '@/context'
import { getPath } from '@/shared/constants/index.ts'

import { CreateProjectButton } from './CreateProjectButton'

export const ProjectSelectMenu = () => {
  const { t } = useTranslation()
  const isRouteForProjectCreation = useAtomValue(isRouteForProjectCreationAtom)

  const { isUserAProjectCreator } = useAuthContext()

  if (isRouteForProjectCreation) {
    return null
  }

  if (!isUserAProjectCreator) {
    return <CreateProjectButton />
  }

  return (
    <Button as={Link} to={getPath('discoveryMyProjects')} size="md" variant="outline" colorScheme="neutral1">
      {t('Creator')}
    </Button>
  )
}
