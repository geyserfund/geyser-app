import { Button, ButtonProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { currentDashboardItemAtom } from './dashboardAtom'
import { projectDashboardItems } from './dashboardNavData'

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

  return (
    <>
      {projectDashboardItems.map((item) => {
        const isActive = isMobile ? false : currentDashboardItem?.path === item.path

        return (
          <Button
            variant="menu"
            colorScheme="primary1"
            width={'200px'}
            backgroundColor={'neutral1.1'}
            key={item.label}
            leftIcon={<item.icon />}
            as={Link}
            to={getPath(item.path, project.name)}
            isActive={isActive}
            {...props}
          >
            {t(item.label)}
          </Button>
        )
      })}
    </>
  )
}
