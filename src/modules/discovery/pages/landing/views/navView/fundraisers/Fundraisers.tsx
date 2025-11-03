import { Tab, TabList, TabPanels, Tabs, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'

import { InYourRegionFundraisers } from './views/InYourRegionFundraisers.tsx'
import { LatestFundraisers } from './views/LatestFundraisers.tsx'
import { TrendingFundraisers } from './views/TrendingFundraisers.tsx'

const tabs = [
  {
    label: `🔥 ${t('Trending')}`,
    Component: TrendingFundraisers,
  },
  {
    label: `${t('Latest')}`,
    Component: LatestFundraisers,
  },
  {
    label: `${t('In your region')}`,
    Component: InYourRegionFundraisers,
  },
]

export const Fundraisers = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <Tabs w="full" variant="secondary" onChange={(index) => setActiveTabIndex(index)}>
      <TabList gap={4}>
        {tabs.map((tab) => (
          <Tab key={tab.label} fontSize={{ base: 'xs', sm: 'md' }}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <VStack w="full" paddingTop={8}>
          {tabs.map(({ label, Component }, index) => {
            if (index !== activeTabIndex) return null
            return <Component key={label} />
          })}
        </VStack>
      </TabPanels>
    </Tabs>
  )
}
