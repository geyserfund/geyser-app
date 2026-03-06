import { Tab, TabList, Tabs, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Outlet, useNavigate } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { CampaignsComingSoon } from './CampaignsComingSoon.tsx'

const tabs = [
  {
    label: `🔥 ${t('Trending')}`,
    path: getPath('discoveryCampaigns'),
  },
  {
    label: `💎 ${t('Almost funded')}`,
    path: getPath('discoveryCampaignsAlmostFunded'),
  },
  {
    label: `${t('Almost over')}`,
    path: getPath('discoveryCampaignsAlmostOver'),
  },
  {
    label: `${t('Latest')}`,
    path: getPath('discoveryCampaignsLatest'),
  },
  {
    label: `${t('In your region')}`,
    path: getPath('discoveryCampaignsInYourRegion'),
  },
]

const isComingSoon = true

export const Campaigns = () => {
  const navigate = useNavigate()
  if (isComingSoon) {
    return (
      <>
        <Head
          title={t('Bitcoin campaigns')}
          description={t('Discover all-or-nothing Bitcoin campaigns raising funds on Geyser.')}
          type="website"
        />
        <CampaignsComingSoon />
      </>
    )
  }

  return (
    <>
      <Head
        title={t('Bitcoin campaigns')}
        description={t('Discover all-or-nothing Bitcoin campaigns raising funds on Geyser.')}
        type="website"
      />
      <Tabs w="full" variant="secondary" onChange={(index) => navigate(tabs?.[index]?.path ?? '')}>
        <TabList gap={4} overflowX="auto">
          {tabs.map((tab) => (
            <Tab key={tab.label} whiteSpace="nowrap" overflow="visible" maxW="none" title={tab.label}>
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
