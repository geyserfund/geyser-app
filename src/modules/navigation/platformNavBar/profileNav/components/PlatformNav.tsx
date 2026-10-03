import { HStack, Image } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useLocation } from 'react-router'

import MarketplaceNavIcon from '@/assets/marketplace-nav.png'
import { AnimatedNavSlide, AnimatedNavSlideItem } from '@/shared/components/navigation/AnimatedNavSlide.tsx'
import { ImpactFundsIconUrl } from '@/shared/constants/index.ts'

export const PlatformNav = () => {
  const location = useLocation()

  const ProjectNavigationButtons = useMemo(() => {
    const buttonDimension = '50px'
    const marketplaceButtonDimension = '55px'
    const buttonList = [
      {
        name: 'Shops',
        path: '/products',
        icon: <Image src={MarketplaceNavIcon} height={marketplaceButtonDimension} width={marketplaceButtonDimension} />,
      },
      {
        name: 'Adoption Impact Fund',
        path: '/impact-fund',
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
