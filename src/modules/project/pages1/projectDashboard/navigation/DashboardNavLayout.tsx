import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PropsWithChildren } from 'react'
import { PiArrowLeft } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectNavContainer } from '@/modules/project/navigation/ProjectNavContainer'
import { H1 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { currentDashboardItemAtom, isDashboardMainRouteAtom } from './dashboardAtom'

export const DashboardNavLayout = ({ children }: PropsWithChildren) => {
  const { project } = useProjectAtom()

  const isMobileMode = useMobileMode()

  const currentDashboardItem = useAtomValue(currentDashboardItemAtom)
  const isDashboardMainRoute = useAtomValue(isDashboardMainRouteAtom)

  console.log('checking if isDashboardMainRoute', isDashboardMainRoute)

  const showTopNavBar = isMobileMode && !isDashboardMainRoute

  if (!currentDashboardItem && !isDashboardMainRoute) {
    return null
  }

  return (
    <VStack w="full" height="100%" paddingBottom="120px">
      {showTopNavBar && (
        <ProjectNavContainer>
          <Button
            as={Link}
            to={getPath('projectDashboard', project?.name)}
            size={{ base: 'md', lg: 'lg' }}
            variant="ghost"
            colorScheme="neutral1"
            leftIcon={<PiArrowLeft />}
            _pressed={{}}
          >
            {t('Dashboard')}
          </Button>
        </ProjectNavContainer>
      )}
      <VStack w="full" height="100%" spacing={4} paddingY={3}>
        {currentDashboardItem && (
          <HStack w="full" h="32px" justifyContent={'start'} spacing={2} display={{ base: 'flex', lg: 'none' }}>
            <currentDashboardItem.icon size={24} />
            <H1 size="2xl" dark bold>
              {t(currentDashboardItem.label)}
            </H1>
          </HStack>
        )}
        {children}
      </VStack>
    </VStack>
  )
}
