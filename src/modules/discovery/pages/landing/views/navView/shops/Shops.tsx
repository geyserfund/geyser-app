import { HStack, IconButton, Tab, TabList, Tabs, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi'
import { Outlet, useLocation, useNavigate } from 'react-router'

import { getPath } from '@/shared/constants/index.ts'
import { CollectibleImageUrl, MerchImageUrl, PhysicalProductImageUrl } from '@/shared/constants/platform/url.ts'
import { useRewardCategoriesQuery } from '@/types/index.ts'

import { CampaignTitleBlock } from '../components/CampaignTitleBlock.tsx'
import { ShopsFeatured } from './components/ShopsFeatured.tsx'

const campaignCards = [
  {
    imageUrl: PhysicalProductImageUrl,
    alt: 'Limited Edition',
    title: 'Limited Edition',
    description: 'Get limited edition items',
  },
  {
    imageUrl: MerchImageUrl,
    alt: 'Early Backing',
    title: 'Early Backing',
    description: 'Be the early backer of a new Bitcoin product',
  },
  {
    imageUrl: CollectibleImageUrl,
    alt: 'Collectibles',
    title: 'Collectibles',
    description: 'Buy unique Bitcoin collectibles',
  },
]

const rewardCategoryEmojiMap: Record<string, string> = {
  Collectible: '🧩',
  Book: '📚',
  Course: '🎓',
  Ticket: '🎟️',
  Gift: '🎁',
  Game: '🎮',
  Membership: '💎',
  Merch: '👕',
  'Nostr Badge': '🏅',
  Raffle: '🎲',
  Sponsorship: '🤝',
  Service: '🛠️',
  Shoutout: '📣',
  'Digital Content': '💾',
  Artwork: '🎨',
  'Physical Product': '📦',
  Experience: '✨',
  'Mining Hardware': '⛏️',
}

export const Shops = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { data } = useRewardCategoriesQuery()
  const tabListRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const tabs = useMemo(() => {
    const categories = data?.projectRewardCategoriesGet ?? []

    return [
      {
        label: `🔥 ${t('Trending')}`,
        path: getPath('discoveryProducts'),
      },
      ...categories.map((category) => ({
        label: `${rewardCategoryEmojiMap[category] || '📦'} ${category}`,
        path: getPath('discoveryProductsCategory', encodeURIComponent(category)),
      })),
    ]
  }, [data?.projectRewardCategoriesGet])

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
  }, [tabs.length])

  const scrollTabs = (direction: 'left' | 'right') => {
    const element = tabListRef.current
    if (!element) return

    element.scrollBy({
      left: direction === 'left' ? -280 : 280,
      behavior: 'smooth',
    })
  }

  return (
    <VStack w="full" spacing={8} alignItems="start">
      <CampaignTitleBlock
        title={t('Shops')}
        description={t('Discover Bitcoin products from active projects')}
        campaignCards={campaignCards}
      />

      <ShopsFeatured />

      <Tabs
        w="full"
        variant="secondary"
        index={currentTabIndex}
        onChange={(index) => navigate(tabs?.[index]?.path ?? getPath('discoveryProducts'))}
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

        <VStack w="full" minHeight="100vh" paddingTop={8} alignItems="start">
          <Outlet />
        </VStack>
      </Tabs>
    </VStack>
  )
}
