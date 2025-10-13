import { Tab, TabList, TabPanels, Tabs, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'

import { AlmostFundedCampaigns } from './views/AlmostFundedCampaigns.tsx'
import { AlmostOverCampaigns } from './views/AlmostOverCampaigns.tsx'
import { InYourRegionCampaigns } from './views/InYourRegionCampaigns.tsx'
import { LatestCampaigns } from './views/LatestCampaigns.tsx'
import { TrendingCampaigns } from './views/TrendingCampaigns.tsx'

const tabs = [
  {
    label: `🔥 ${t('Trending')}`,
    Component: TrendingCampaigns,
  },
  {
    label: `💎 ${t('Almost funded')}`,
    Component: AlmostFundedCampaigns,
  },
  {
    label: `${t('Almost over')}`,
    Component: AlmostOverCampaigns,
  },
  {
    label: `${t('Latest')}`,
    Component: LatestCampaigns,
  },
  {
    label: `${t('In your region')}`,
    Component: InYourRegionCampaigns,
  },
]

export const Campaigns = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <Tabs w="full" variant="secondary" onChange={(index) => setActiveTabIndex(index)}>
      <TabList gap={4}>
        {tabs.map((tab) => (
          <Tab key={tab.label}>{tab.label}</Tab>
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
