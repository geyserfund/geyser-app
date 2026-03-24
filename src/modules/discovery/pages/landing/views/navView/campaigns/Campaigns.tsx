import { Tab, TabList, Tabs, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Outlet, useNavigate } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { CampaignsSeoImageUrl, getPath } from '@/shared/constants/index.ts'

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

  const head = (
    <Head
      title={t('Campaigns')}
      description={t(
        'Explore All-or-Nothing Bitcoin crowdfunding campaigns on Geyser. Back bold ideas that only succeed when their goal is met.',
      )}
      image={CampaignsSeoImageUrl}
    />
  )

  if (isComingSoon) {
    return (
      <>
        {head}
        <CampaignsComingSoon />
      </>
    )
  }

  return (
    <>
      {head}
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
