import { HStack, IconButton, Tab, TabList, Tabs, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import { PiCaretLeft, PiCaretRight, PiGlobeHemisphereWest, PiMoneyWavy, PiStorefront } from 'react-icons/pi'
import { Outlet, useLocation, useNavigate } from 'react-router'

import { getPath } from '@/shared/constants/index.ts'
import { ProjectCategory, ProjectSubCategory } from '@/types/index.ts'

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
  {
    label: `⛏️ ${t(' Hardware products')}`,
    path: getPath('discoveryFundraisersSubCategory', ProjectSubCategory.Hardware),
  },
  {
    label: `🎵 ${t('Culture')}`,
    path: getPath('discoveryFundraisersCategory', ProjectCategory.Culture),
  },
]

const campaignCards = [
  {
    icon: PiMoneyWavy,
    titleKey: 'fundraisers.cards.receiveInstantly.title',
    descriptionKey: 'fundraisers.cards.receiveInstantly.description',
    fallbackTitle: 'Receive instantly',
    fallbackDescription: 'Funds hit your wallet immediately',
  },
  {
    icon: PiStorefront,
    titleKey: 'fundraisers.cards.sellProducts.title',
    descriptionKey: 'fundraisers.cards.sellProducts.description',
    fallbackTitle: 'Sell products',
    fallbackDescription: 'Easily launch your own storefront',
  },
  {
    icon: PiGlobeHemisphereWest,
    titleKey: 'fundraisers.cards.goGlobal.title',
    descriptionKey: 'fundraisers.cards.goGlobal.description',
    fallbackTitle: 'Go Global',
    fallbackDescription: 'Fund from anywhere.',
  },
]
export const Fundraisers = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const tabListRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const currentTabIndex = Math.max(
    tabs.findIndex((tab) => tab.path === location.pathname),
    0,
  )

  useEffect(() => {
    const element = tabListRef.current
    if (!element) return

    const updateScrollState = () => {
      setCanScrollLeft(element.scrollLeft > 0)
      setCanScrollRight(element.scrollLeft + element.clientWidth < element.scrollWidth - 1)
    }

    updateScrollState()
    element.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)

    return () => {
      element.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const scrollTabs = (direction: 'left' | 'right') => {
    const element = tabListRef.current
    if (!element) return

    element.scrollBy({
      left: direction === 'left' ? -280 : 280,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <CampaignTitleBlock
        title={t('Open Fundraisers')}
        description={t('Fund your project as it grows.')}
        campaignCards={campaignCards}
      />
      <Tabs
        w="full"
        variant="secondary"
        index={currentTabIndex}
        onChange={(index) => navigate(tabs?.[index]?.path ?? '')}
      >
        <HStack w="full" spacing={2} alignItems="center">
          {canScrollLeft ? (
            <IconButton
              aria-label={t('Scroll categories left')}
              icon={<PiCaretLeft />}
              variant="ghost"
              colorScheme="neutral1"
              onClick={() => scrollTabs('left')}
            />
          ) : null}
          <TabList
            ref={tabListRef}
            gap={4}
            overflowX="auto"
            sx={{
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.label}
                fontSize={{ base: 'xs', sm: 'md' }}
                color="neutral1.11"
                _selected={{
                  color: 'neutral1.11',
                  borderColor: 'neutral1.8',
                }}
                whiteSpace="nowrap"
                overflow="visible"
                maxW="none"
                title={tab.label}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>
          {canScrollRight ? (
            <IconButton
              aria-label={t('Scroll categories right')}
              icon={<PiCaretRight />}
              variant="ghost"
              colorScheme="neutral1"
              onClick={() => scrollTabs('right')}
            />
          ) : null}
        </HStack>

        <VStack w="full" minHeight="100vh" paddingTop={8}>
          <Outlet />
        </VStack>
      </Tabs>
    </>
  )
}
