import { HStack, Image } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useLocation } from 'react-router'

import { AnimatedNavSlide, AnimatedNavSlideItem } from '@/shared/components/navigation/AnimatedNavSlide.tsx'
import { CampaignIconUrl, FundraiserIconUrl, ProductsIconUrl } from '@/shared/constants/index.ts'

export const PlatformNav = () => {
  const location = useLocation()

  const ProjectNavigationButtons = useMemo(() => {
    const buttonDimension = '65px'
    const buttonList = [
      {
        name: 'Campaigns',
        path: '/campaigns',
        icon: <Image src={CampaignIconUrl} height={buttonDimension} width={buttonDimension} />,
      },
      {
        name: 'Fundraiser',
        path: '/fundraisers',
        icon: <Image src={FundraiserIconUrl} height={buttonDimension} width={buttonDimension} />,
      },

      {
        name: 'Products',
        path: '/products',
        icon: <Image src={ProductsIconUrl} height={buttonDimension} width={buttonDimension} />,
      },
    ] as AnimatedNavSlideItem[]

    return buttonList
  }, [])

  const activeButtonIndex = useMemo(() => {
    console.log('location.pathname', location.pathname)
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
      <AnimatedNavSlide items={ProjectNavigationButtons} activeIndex={activeButtonIndex} zIndex={9} spacing={6} />
    </HStack>
  )
}
