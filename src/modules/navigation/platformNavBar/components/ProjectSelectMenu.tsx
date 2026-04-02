import { Box, Button, useColorModeValue } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { isProjectCreationRouteAtom } from '@/config/routes/state/privateRoutesAtom.ts'
import { useAuthContext } from '@/context'
import { myProjectsActivityDotAtom } from '@/modules/discovery/state/activityDotAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { useMobileMode } from '@/utils/index.ts'

import { isProjectFundingRoutesAtom } from '../platformNavBarAtom.ts'
import { CreateProjectButton } from './CreateProjectButton'

export const ProjectSelectMenu = ({ transparentMode = false }: { transparentMode?: boolean }) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const { isUserAProjectCreator } = useAuthContext()

  const isProjectFundingRoute = useAtomValue(isProjectFundingRoutesAtom)
  const isProjectCreationRoute = useAtomValue(isProjectCreationRouteAtom)

  const myProjectActivityDot = useAtomValue(myProjectsActivityDotAtom)
  const transparentBackground = useColorModeValue('whiteAlpha.220', 'whiteAlpha.220')
  const transparentBorderColor = useColorModeValue('whiteAlpha.500', 'whiteAlpha.500')
  const transparentHoverBackground = useColorModeValue('whiteAlpha.320', 'whiteAlpha.320')

  // For funding flow and creation flow, we don't want to show the project select menu
  if (isProjectFundingRoute || isProjectCreationRoute) {
    return null
  }

  if (!isUserAProjectCreator) {
    if (isMobile) {
      return null
    }

    return <CreateProjectButton />
  }

  return (
    <Button
      as={Link}
      to={getPath('discoveryMyProjects')}
      size={{ base: 'md', lg: 'lg' }}
      variant="outline"
      colorScheme="neutral1"
      color={transparentMode ? 'white' : undefined}
      bg={transparentMode ? transparentBackground : undefined}
      borderColor={transparentMode ? transparentBorderColor : undefined}
      _hover={transparentMode ? { backgroundColor: transparentHoverBackground } : undefined}
      _active={transparentMode ? { backgroundColor: transparentHoverBackground } : undefined}
      borderRadius={{ base: '8px', lg: '10px' }}
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
