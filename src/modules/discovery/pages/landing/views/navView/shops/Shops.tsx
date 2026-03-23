import { HStack, IconButton, Tab, TabList, Tabs, VStack } from '@chakra-ui/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCaretLeft, PiCaretRight, PiCube, PiMagnifyingGlass, PiSparkle } from 'react-icons/pi'
import { Outlet, useLocation, useNavigate } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { getPath, ShopsSeoImageUrl } from '@/shared/constants/index.ts'
import { useRewardCategoriesQuery } from '@/types/index.ts'

import { CampaignTitleBlock } from '../components/CampaignTitleBlock.tsx'
import { ShopsFeatured } from './components/ShopsFeatured.tsx'

const rewardCategoryEmojiMap: Record<string, string> = {
  collectible: '🧩',
  merch: '👕',
  'physical product': '📦',
  hardware: '🛠',
  'mining hardware': '🛠',
  book: '📚',
  'nostr badge': '🏷️',
  'digital content': '💾',
  course: '🎓',
  game: '🎮',
  ticket: '🎟️',
  experience: '✨',
  membership: '🔐',
  gift: '🎁',
  artwork: '🎨',
  service: '🤝',
  sponsorship: '📢',
  raffle: '🎲',
  shoutout: '📣',
}
const DEFAULT_CATEGORY_EMOJI = '📦'
const TAB_SCROLL_OFFSET = 280
const REWARD_CATEGORY_DISPLAY_ORDER = [
  'collectible',
  'merch',
  'physical product',
  'hardware',
  'mining hardware',
  'book',
  'nostr badge',
  'digital content',
  'course',
  'game',
  'ticket',
  'experience',
  'membership',
  'gift',
  'artwork',
  'service',
  'sponsorship',
  'raffle',
  'shoutout',
]

export const Shops = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { data } = useRewardCategoriesQuery()
  const tabListRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const campaignCards = [
    {
      icon: PiCube,
      titleKey: 'shops.limitedEdition.title',
      descriptionKey: 'shops.limitedEdition.description',
    },
    {
      icon: PiMagnifyingGlass,
      titleKey: 'shops.rareFinds.title',
      descriptionKey: 'shops.rareFinds.description',
    },
    {
      icon: PiSparkle,
      titleKey: 'shops.collectibles.title',
      descriptionKey: 'shops.collectibles.description',
    },
  ]

  const tabs = useMemo(() => {
    const categories = data?.projectRewardCategoriesGet ?? []
    const normalizeCategory = (category: string) => category.trim().toLowerCase()
    const getCategoryOrder = (category: string) => {
      const index = REWARD_CATEGORY_DISPLAY_ORDER.indexOf(category)

      return index === -1 ? Number.POSITIVE_INFINITY : index
    }

    const canonicalCategoryByLowercase = new Map<string, string>()
    categories.forEach((category) => {
      const normalizedCategory = normalizeCategory(category)
      if (!canonicalCategoryByLowercase.has(normalizedCategory)) {
        canonicalCategoryByLowercase.set(normalizedCategory, category.trim())
      }
    })

    const orderedCategories = [...canonicalCategoryByLowercase.entries()].sort((a, b) => {
      const aIndex = getCategoryOrder(a[0])
      const bIndex = getCategoryOrder(b[0])

      if (aIndex === bIndex) return a[1].localeCompare(b[1])
      return aIndex - bIndex
    })

    return [
      {
        label: `🔥 ${t('Trending')}`,
        path: getPath('discoveryProducts'),
      },
      ...orderedCategories.map(([normalizedCategory, displayCategory]) => ({
        label: `${rewardCategoryEmojiMap[normalizedCategory] ?? DEFAULT_CATEGORY_EMOJI} ${displayCategory}`,
        path: getPath('discoveryProductsCategory', encodeURIComponent(displayCategory)),
      })),
    ]
  }, [data?.projectRewardCategoriesGet, t])

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
      left: direction === 'left' ? -TAB_SCROLL_OFFSET : TAB_SCROLL_OFFSET,
      behavior: 'smooth',
    })
  }

  return (
    <VStack w="full" spacing={8} alignItems="start">
      <Head
        title={t('Shops')}
        description={t('Discover and shop Bitcoin products. Find limited edition collectibles, merch, and more on Geyser.')}
        image={ShopsSeoImageUrl}
      />
      <CampaignTitleBlock
        title={t('Shops')}
        description={t('Discover and shop Bitcoin products.')}
        campaignCards={campaignCards}
      />

      <ShopsFeatured />

      <Tabs
        w="full"
        variant="secondary"
        index={currentTabIndex}
        onChange={(index) =>
          navigate(
            {
              pathname: tabs[index]?.path ?? getPath('discoveryProducts'),
              search: location.search,
            },
            {
              preventScrollReset: true,
            },
          )
        }
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
                key={tab.path}
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

        <VStack w="full" minHeight="100vh" paddingTop={8} alignItems="start">
          <Outlet />
        </VStack>
      </Tabs>
    </VStack>
  )
}
