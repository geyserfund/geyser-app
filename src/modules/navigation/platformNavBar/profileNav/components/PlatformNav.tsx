import { HStack, Image } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useLocation } from 'react-router'

import MarketplaceNavIcon from '@/assets/marketplace-nav.png'
import { AnimatedNavSlide, AnimatedNavSlideItem } from '@/shared/components/navigation/AnimatedNavSlide.tsx'
import { CampaignIconUrl, FundraiserIconUrl, ImpactFundsIconUrl } from '@/shared/constants/index.ts'

export const PlatformNav = () => {
  const location = useLocation()

  const ProjectNavigationButtons = useMemo(() => {
    const buttonDimension = '50px'
    const campaignButtonDimension = buttonDimension
    const marketplaceButtonDimension = '55px'
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
        new: true,
      },
    ] as AnimatedNavSlideItem[]

    return buttonList
  }, [])

  const activeButtonIndex = useMemo(() => {
    let activeIndex = -1
    ProjectNavigationButtons.map((navButton) => {
      if (navButton.path && location.pathname.includes(navButton.path)) {
        activeIndex = ProjectNavigationButtons.indexOf(navButton)
      }
    })
    return activeIndex
  }, [location.pathname, ProjectNavigationButtons])

  return (
    <HStack h="full" alignItems="start">
      <AnimatedNavSlide items={ProjectNavigationButtons} activeIndex={activeButtonIndex} zIndex={9} spacing={4} />
    </HStack>
  )
}
