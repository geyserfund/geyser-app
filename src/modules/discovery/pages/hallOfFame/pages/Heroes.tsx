import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiArrowLeft, PiShare } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { CardLayout } from '@/shared/components/layouts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { dimensions, getPath } from '@/shared/constants'
import { toPx } from '@/utils'

import { IndividualHallOfFameTitle } from '../components/IndividualHallOfFameTitle'
import { HeroType, TopHeroes } from '../components/TopHeroes'
import { heroTypeFromRoute } from '../states/heroRoute'
import { HallOfFameHeroBackgroundGradient } from '../styles'

export const Heroes = () => {
  const heroType = useAtomValue(heroTypeFromRoute)

  const items = [
    {
      name: t('Contributors'),
      key: HeroType.Contributors,
      render: () => <TopHeroes heroType={HeroType.Contributors} />,
      path: getPath('hallOfFameHeroesContributor'),
    },
    {
      name: t('Creators'),
      key: HeroType.Creators,
      render: () => <TopHeroes heroType={HeroType.Creators} />,
      path: getPath('hallOfFameHeroesCreator'),
    },
    {
      name: t('Ambassadors'),
      key: HeroType.Ambassadors,
      render: () => <TopHeroes heroType={HeroType.Ambassadors} />,
      path: getPath('hallOfFameHeroesAmbassador'),
    },
  ] as AnimatedNavBarItem[]

  const animatedNavBarProps = {
    items,
    activeIndex: heroType === HeroType.Contributors ? 0 : heroType === HeroType.Creators ? 1 : 2,
  }

  if (!heroType) return null
  return (
    <VStack
      w="full"
      height={{ base: 'full', lg: `calc(100vh - ${toPx(dimensions.topNavBar.desktop.height + 40)})` }}
      paddingTop={{
        base: toPx(dimensions.projectNavBar.mobile.height),
        lg: toPx(dimensions.projectNavBar.desktop.height),
      }}
    >
      <TopNavContainerBar>
        <Button
          as={Link}
          to={getPath('discoveryHallOfFame')}
          size="lg"
          variant="ghost"
          colorScheme="neutral1"
          leftIcon={<PiArrowLeft />}
        >
          {t('Back')}
        </Button>
        <Button size="lg" variant="soft" colorScheme="neutral1" leftIcon={<PiShare />}>
          {t('Share')}
        </Button>
      </TopNavContainerBar>
      <CardLayout w="full" h="full" dense>
        <IndividualHallOfFameTitle
          title={t('Hall of Fame')}
          description={t('Individuals whose contributions power projects on Geyser, impacting Bitcoin adoption.')}
          background={HallOfFameHeroBackgroundGradient[heroType]}
          noborder
          borderRadius={0}
        >
          <AnimatedNavBar marginTop="24px" showLabel {...animatedNavBarProps} />
        </IndividualHallOfFameTitle>
        <TopHeroes heroType={heroType} />
      </CardLayout>
    </VStack>
  )
}
