import { Tab, TabList, Tabs, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Outlet, useNavigate } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { CampaignsSeoImageUrl, getAiSeoPageContent, getPath } from '@/shared/constants/index.ts'
import { buildCollectionPageJsonLd } from '@/shared/utils/seo.ts'

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
  const campaignsSeoContent = getAiSeoPageContent('campaigns')

  const head = (
    <Head
      title={campaignsSeoContent.title}
      description={campaignsSeoContent.description}
      image={CampaignsSeoImageUrl}
      keywords={campaignsSeoContent.keywords}
      url={`https://geyser.fund${getPath('discoveryCampaigns')}`}
    >
      <script type="application/ld+json">
        {buildCollectionPageJsonLd({
          name: 'Geyser Campaigns',
          description: campaignsSeoContent.description,
          path: getPath('discoveryCampaigns'),
          about: campaignsSeoContent.about,
          keywords: campaignsSeoContent.keywords,
          items: [
            {
              name: 'New Campaign Launches',
              path: getPath('discoveryCampaignsLatest'),
              description: 'Track fresh all-or-nothing campaign launches on Geyser.',
            },
            {
              name: 'Bitcoin Fundraisers',
              path: getPath('discoveryFundraisers'),
              description: 'Support ongoing Bitcoin fundraisers and humanitarian causes.',
            },
            {
              name: 'Impact Funds',
              path: getPath('discoveryImpactFunds'),
              description: 'Discover impact funds supporting adoption-focused projects.',
            },
          ],
        })}
      </script>
    </Head>
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
