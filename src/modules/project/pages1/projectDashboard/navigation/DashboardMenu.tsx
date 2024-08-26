import { Button, ButtonProps, Divider, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectState } from '@/modules/project/state/projectAtom'
import { dimensions, getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { currentDashboardItemAtom } from './dashboardAtom'
import { DashboardType, ProjectDashboardItem, projectDashboardItems } from './dashboardNavData'

export const DashboardMenuMobile = () => {
  return (
    <VStack w="full" paddingX={1} spacing={4} paddingTop={3}>
      <DashboardMenuContent width="100%" />
    </VStack>
  )
}

export const DashboardMenuDesktop = () => {
  return (
    <VStack height={'100%'} p={6} spacing={3} borderRight="1px solid" borderColor="neutral1.6">
      <DashboardMenuContent />
    </VStack>
  )
}

const DashboardMenuContent = (props: ButtonProps) => {
  const { project } = useProjectAtom()

  const isMobile = useMobileMode()

  const currentDashboardItem = useAtomValue(currentDashboardItemAtom)

  const dashboardAnalyticsItems = projectDashboardItems.filter((item) => item.type === DashboardType.analytics)
  const dashboardSettingsItems = projectDashboardItems.filter((item) => item.type === DashboardType.settings)
  const dashboardFeaturesItems = projectDashboardItems.filter((item) => item.type === DashboardType.features)

  return (
    <>
      {dashboardAnalyticsItems.map((item) => (
        <DashboardMenuButton
          key={item.label}
          item={item}
          currentDashboardItem={currentDashboardItem}
          isMobile={isMobile}
          project={project}
          {...props}
        />
      ))}
      <Divider />
      {dashboardFeaturesItems.map((item) => (
        <DashboardMenuButton
          key={item.label}
          item={item}
          currentDashboardItem={currentDashboardItem}
          isMobile={isMobile}
          project={project}
          {...props}
        />
      ))}
      <Divider />
      {dashboardSettingsItems.map((item) => (
        <DashboardMenuButton
          key={item.label}
          item={item}
          currentDashboardItem={currentDashboardItem}
          isMobile={isMobile}
          project={project}
          {...props}
        />
      ))}
    </>
  )
}

type DashboardMenuButtonProps = {
  item: ProjectDashboardItem
  currentDashboardItem?: ProjectDashboardItem
  isMobile?: boolean
  project: ProjectState
} & ButtonProps

const DashboardMenuButton = ({ item, currentDashboardItem, isMobile, project, ...rest }: DashboardMenuButtonProps) => {
  const isActive = isMobile ? false : currentDashboardItem?.path === item.path

  return (
    <Button
      variant="menu"
      colorScheme="primary1"
      size="lg"
      width={`${dimensions.project.dashboard.menu.width}px`}
      backgroundColor={'utils.pbg'}
      key={item.label}
      leftIcon={<item.icon fontSize="18px" />}
      as={Link}
      to={getPath(item.path, project.name)}
      isActive={isActive}
      {...rest}
    >
      {t(item.label)}
    </Button>
  )
}
