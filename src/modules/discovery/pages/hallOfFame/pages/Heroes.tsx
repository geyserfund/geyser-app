import { Button, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiArrowLeft, PiShare } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { ShareView } from '@/components/molecules/ShareView'
import { useAuthContext } from '@/context'
import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { Modal } from '@/shared/components/layouts'
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
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { user } = useAuthContext()

  const heroDescriptions = {
    [HeroType.Contributors]: t('Those whose contributions power projects on Geyser, driving Bitcoin adoption'),
    [HeroType.Creators]: t('Those bringing the most successful projects to life'),
    [HeroType.Ambassadors]: t('Those spreading the word about valuable projects and enabling contributions to happen'),
  }

  const pathsMap = {
    [HeroType.Contributors]: getPath('hallOfFameHeroesContributor'),
    [HeroType.Creators]: getPath('hallOfFameHeroesCreator'),
    [HeroType.Ambassadors]: getPath('hallOfFameHeroesAmbassador'),
  }

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

  const shareUrl = `${process.env.APP_URL}${pathsMap[heroType]}${user?.heroId ? `?hero=${user?.heroId}` : ''}`

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
        <Button size="lg" variant="soft" colorScheme="neutral1" leftIcon={<PiShare />} onClick={onOpen}>
          {t('Share')}
        </Button>
      </TopNavContainerBar>
      <CardLayout w="full" h="full" dense>
        <IndividualHallOfFameTitle
          title={t('Heroes Hall of Fame')}
          description={heroDescriptions[heroType]}
          background={HallOfFameHeroBackgroundGradient[heroType]}
          noborder
          borderRadius={0}
        >
          <AnimatedNavBar marginTop="24px" showLabel disableColorMode {...animatedNavBarProps} />
        </IndividualHallOfFameTitle>
        <TopHeroes heroType={heroType} />
      </CardLayout>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'md'}
        isCentered
        title={t('Spread the word')}
        bodyProps={{
          as: VStack,
          gap: 3,
          alignItems: 'stretch',
        }}
      >
        <ShareView
          shareOnXUrl={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `Check out the Heroes Hall of Fame on @GeyserFund ${shareUrl}`,
          )}`}
          shareUrl={shareUrl}
          shareUrlLabel={user?.heroId ? t('Hero link:') : ''}
        >
          {t(
            'Share the Heroes Hall of Fame to showcase the top Contributors, Creators, and Ambassadors of the Bitcoin ecosystem!',
          )}
        </ShareView>
      </Modal>
    </VStack>
  )
}
