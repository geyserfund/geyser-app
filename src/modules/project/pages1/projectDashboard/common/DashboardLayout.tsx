import { Button, HStack, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PropsWithChildren } from 'react'
import { PiArrowLeft } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { H1 } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { currentDashboardItemAtom, isDashboardMainRouteAtom } from '../navigation/dashboardAtom'

type DashboardLayoutProps = {
  mobileTopNavRightComponent?: React.ReactNode
  deskTopBottomComponent?: React.ReactNode
  desktopTitle?: string
} & StackProps

/** All Dashboard main Pages must be wrapped by this Layout container */
export const DashboardLayout = ({
  children,
  mobileTopNavRightComponent,
  deskTopBottomComponent,
  desktopTitle,
  ...props
}: PropsWithChildren<DashboardLayoutProps>) => {
  const isMobileMode = useMobileMode()

  const currentDashboardItem = useAtomValue(currentDashboardItemAtom)
  const isDashboardMainRoute = useAtomValue(isDashboardMainRouteAtom)

  const showTopNavBar = isMobileMode && !isDashboardMainRoute

  if (!currentDashboardItem && !isDashboardMainRoute) {
    return null
  }

  return (
    <VStack
      height="100%"
      width={{ base: '100%', lg: `calc(100% - ${dimensions.project.dashboard.menu.width + 24 * 2 + 1}px)` }}
      position="relative"
      {...props}
    >
      {showTopNavBar && (
        <TopNavContainerBar>
          <Button
            as={Link}
            to={'..'}
            size={'lg'}
            variant="ghost"
            colorScheme="neutral1"
            leftIcon={<PiArrowLeft />}
            _pressed={{}}
          >
            {t('Dashboard')}
          </Button>
          {mobileTopNavRightComponent}
        </TopNavContainerBar>
      )}
      <VStack
        w="full"
        height="100%"
        overflowY="auto"
        spacing={4}
        paddingTop={{ base: 3, lg: 6 }}
        paddingBottom={{ base: 3, lg: deskTopBottomComponent ? 28 : 6 }}
        alignItems={'start'}
      >
        {currentDashboardItem && (
          <HStack w="full" h="32px" justifyContent={'start'} spacing={2} display={{ base: 'flex', lg: 'none' }}>
            <currentDashboardItem.icon size={24} />
            <H1 size="2xl" dark bold>
              {t(currentDashboardItem.label)}
            </H1>
          </HStack>
        )}
        {desktopTitle && (
          <H1 size="2xl" medium paddingX={6} display={{ base: 'none', lg: 'block' }}>
            {desktopTitle}
          </H1>
        )}
        {children}
      </VStack>
      {deskTopBottomComponent && (
        <HStack
          backgroundColor="utils.pbg"
          position="absolute"
          bottom={0}
          borderTop="1px solid"
          borderColor="neutral1.6"
          w="full"
          justifyContent={'center'}
          display={{ base: 'none', lg: 'flex' }}
          p={4}
          zIndex={2}
        >
          {deskTopBottomComponent}
        </HStack>
      )}
    </VStack>
  )
}
