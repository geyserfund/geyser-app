import { Tab, TabList, Tabs, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Outlet, useNavigate } from 'react-router'

import { getPath } from '@/shared/constants/index.ts'

const tabs = [
  {
    label: `🔥 ${t('Trending')}`,
    path: getPath('discoveryFundraisers'),
  },
  {
    label: `${t('Latest')}`,
    path: getPath('discoveryFundraisersLatest'),
  },
  {
    label: `${t('In your region')}`,
    path: getPath('discoveryFundraisersInYourRegion'),
  },
]

export const Fundraisers = () => {
  const navigate = useNavigate()

  return (
    <>
      <Tabs w="full" variant="secondary" onChange={(index) => navigate(tabs?.[index]?.path ?? '')}>
        <TabList gap={4}>
          {tabs.map((tab) => (
            <Tab key={tab.label} fontSize={{ base: 'xs', sm: 'md' }}>
              {tab.label}
            </Tab>
          ))}
        </TabList>

        <VStack w="full" minHeight="100vh" paddingTop={8}>
          <Outlet />
        </VStack>
      </Tabs>
    </>
  )
}
