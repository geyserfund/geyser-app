import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PropsWithChildren } from 'react'
import { PiArrowLeft } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useCurrentRouteMatchAtom } from '@/config'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectNavContainer } from '@/modules/project/navigation/ProjectNavContainer'
import { H1 } from '@/shared/components/typography'
import { getPath, PathName } from '@/shared/constants'

import { projectDashboardItems } from './dashboardNavData'

export const DashboardNavLayout = ({ children }: PropsWithChildren) => {
  const { project } = useProjectAtom()

  const currentRouteMatch = useCurrentRouteMatchAtom()

  const isDashboardMainRoute = currentRouteMatch?.path === getPath('projectDashboard', PathName.projectName)

  const currentDashboardItem = projectDashboardItems.find(
    (item) => currentRouteMatch?.path === getPath(item.path, PathName.projectName),
  )

  return (
    <VStack w="full" height="100%" paddingBottom="120px">
      <ProjectNavContainer display={{ base: isDashboardMainRoute ? 'none' : undefined, lg: 'none' }}>
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
      <VStack w="full" height="100%" spacing={4} paddingY={3}>
        {currentDashboardItem && (
          <HStack w="full" justifyContent={'start'} spacing={2} display={{ base: 'flex', lg: 'none' }}>
            <currentDashboardItem.icon size={24} />
            <H1 size="2xl" dark bold>
              {t(currentDashboardItem.label)}
            </H1>
          </HStack>
        )}
        {children}
      </VStack>
      )
    </VStack>
  )
}
