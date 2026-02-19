import { Button, HStack, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router'

import MarketplaceNavIcon from '@/assets/marketplace-nav.png'
import { AnimatedNavSlide, AnimatedNavSlideItem } from '@/shared/components/navigation/AnimatedNavSlide.tsx'
import { CampaignIconUrl, FundraiserIconUrl, ImpactFundsIconUrl } from '@/shared/constants/index.ts'
import { useMobileMode } from '@/utils/index.ts'

export const PlatformNav = () => {
  const location = useLocation()
  const isMobileMode = useMobileMode()

  const ProjectNavigationButtons = useMemo(() => {
    const buttonDimension = isMobileMode ? '34px' : '50px'
    const campaignButtonDimension = buttonDimension
    const marketplaceButtonDimension = isMobileMode ? '38px' : '55px'
    const buttonList = [
      {
        name: 'Fundraisers',
        path: '/fundraisers',
        icon: <Image src={FundraiserIconUrl} height={buttonDimension} width={buttonDimension} />,
      },
      {
        name: 'Campaigns',
        path: '/campaigns',
        icon: <Image src={CampaignIconUrl} height={campaignButtonDimension} width={campaignButtonDimension} />,
      },

      {
        name: 'Shops',
        path: '/products',
        icon: <Image src={MarketplaceNavIcon} height={marketplaceButtonDimension} width={marketplaceButtonDimension} />,
      },
      {
        name: 'Impact Funds',
        path: '/impact-funds',
        icon: <Image src={ImpactFundsIconUrl} height={buttonDimension} width={buttonDimension} />,
      },
    ] as AnimatedNavSlideItem[]

    return buttonList
  }, [isMobileMode])

  const activeButtonIndex = useMemo(() => {
    let activeIndex = -1
    ProjectNavigationButtons.map((navButton) => {
      if (navButton.path && location.pathname.includes(navButton.path)) {
        activeIndex = ProjectNavigationButtons.indexOf(navButton)
      }
    })
    return activeIndex
  }, [location.pathname, ProjectNavigationButtons])

  if (isMobileMode) {
    return (
      <HStack w="full" spacing={1}>
        {ProjectNavigationButtons.map((item, index) => {
          const isActive = index === activeButtonIndex
          return (
            <Button
              key={item.name}
              as={Link}
              to={item.path || ''}
              aria-label={t(item.name)}
              variant={isActive ? 'surface' : 'ghost'}
              colorScheme="primary1"
              flex={1}
              minWidth={0}
              height="58px"
              padding={1}
            >
              <VStack spacing={0} lineHeight={1} alignItems="center" justifyContent="center">
                {item.icon}
                <span style={{ fontSize: '10px', fontWeight: 600 }}>{t(item.name)}</span>
              </VStack>
            </Button>
          )
        })}
      </HStack>
    )
  }

  return (
    <HStack h="full" alignItems="start">
      <AnimatedNavSlide items={ProjectNavigationButtons} activeIndex={activeButtonIndex} zIndex={9} spacing={4} />
    </HStack>
  )
}
