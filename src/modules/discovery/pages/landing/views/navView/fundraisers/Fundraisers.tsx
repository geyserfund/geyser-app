import { Tab, TabList, Tabs, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Outlet, useNavigate } from 'react-router'

import { getPath } from '@/shared/constants/index.ts'

import { CampaignsGoGlobalImageUrl, FundraiserInstantImageUrl, FundraiserShopImageUrl } from '../../../constants.ts'
import { CampaignTitleBlock } from '../components/CampaignTitleBlock.tsx'

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

const campaignCards = [
  {
    imageUrl: FundraiserInstantImageUrl,
    alt: 'Aligned incentives',
    title: 'Get funded instantly',
    description: 'Funds hit your wallet immediately',
  },
  {
    imageUrl: FundraiserShopImageUrl,
    alt: 'Fail fast, without burning trust',
    title: 'Sell & fund ongoing',
    description: 'Sell products or raise continuously',
  },
  {
    imageUrl: CampaignsGoGlobalImageUrl,
    alt: 'Go Global',
    title: 'Go global',
    description: 'Fund from anywhere.',
  },
]
export const Fundraisers = () => {
  const navigate = useNavigate()

  return (
    <>
      <CampaignTitleBlock
        title={t('Open Fundraisers')}
        description={t('Fund your project as it grows')}
        campaignCards={campaignCards}
      />
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
