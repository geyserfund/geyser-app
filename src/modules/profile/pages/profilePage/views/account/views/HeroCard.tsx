import { Avatar, Box, forwardRef, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import Tilt from 'react-parallax-tilt'

import { getBlockHeight } from '@/api'
import { Body } from '@/shared/components/typography'
import {
  HeroBackCard,
  HeroCardContributedEnabledRaised,
  HeroCardContributedRaisedEnabled,
  HeroCardEmpty,
  HeroCardEnabledContributedRaised,
  HeroCardEnabledRaisedContributed,
  HeroCardRaisedContributedEnabled,
  HeroCardRaisedEnabledContributed,
} from '@/shared/constants'
import { flipInRight, flipOutRight, fonts, lightModeColors } from '@/shared/styles'

import { UserForProfilePageFragment, UserHeroStats } from '../../../../../../../types'
import { commaFormatted, getShortAmountLabel, toInt } from '../../../../../../../utils'
const DEFAULT_BLOCK_HEIGHT = 800345

const heroBackgroundMap = {
  raisedEnabledContributed: HeroCardRaisedEnabledContributed,
  raisedContributedEnabled: HeroCardRaisedContributedEnabled,
  enabledRaisedContributed: HeroCardEnabledRaisedContributed,
  enabledContributedRaised: HeroCardEnabledContributedRaised,
  empty: HeroCardEmpty,
  contributedEnabledRaised: HeroCardContributedEnabledRaised,
  contributedRaisedEnabled: HeroCardContributedRaisedEnabled,
}

const useStyles = createUseStyles({
  ...flipInRight,
  ...flipOutRight,
})

export const HeroCard = forwardRef(
  ({ user, stats }: { user: UserForProfilePageFragment; stats: UserHeroStats }, ref) => {
    const classes = useStyles()

    const [blockHeight, setBlockHeight] = useState<number>(DEFAULT_BLOCK_HEIGHT)
    const { isOpen, onToggle } = useDisclosure()
    const { isOpen: tempOpen, onToggle: onTempToggle } = useDisclosure()

    const handleToggle = () => {
      onTempToggle()
      setTimeout(() => {
        onToggle()
      }, 300)
    }

    const amabassadorRank = stats.ambassadorStats.rank
    const creatorRank = stats.creatorStats.rank
    const contributorRank = stats.contributorStats.rank

    const ambassadorAmount = stats.ambassadorStats.contributionsTotal
    const creatorAmount = stats.creatorStats.contributionsTotal
    const contributorAmount = stats.contributorStats.contributionsTotal

    const getHeroBackground = () => {
      if (
        stats.ambassadorStats.contributionsTotal > 0 ||
        stats.creatorStats.contributionsTotal > 0 ||
        stats.contributorStats.contributionsTotal > 0
      ) {
        if (creatorAmount > ambassadorAmount && ambassadorAmount > contributorAmount) {
          return heroBackgroundMap.raisedEnabledContributed
        }

        if (creatorAmount > contributorAmount && contributorAmount > ambassadorAmount) {
          return heroBackgroundMap.raisedContributedEnabled
        }

        if (ambassadorAmount > creatorAmount && creatorAmount > contributorAmount) {
          return heroBackgroundMap.enabledRaisedContributed
        }

        if (ambassadorAmount > contributorAmount && contributorAmount > creatorAmount) {
          return heroBackgroundMap.enabledContributedRaised
        }

        if (contributorAmount > ambassadorAmount && ambassadorAmount > creatorAmount) {
          return heroBackgroundMap.contributedEnabledRaised
        }

        if (contributorAmount > creatorAmount && creatorAmount > ambassadorAmount) {
          return heroBackgroundMap.contributedRaisedEnabled
        }

        return heroBackgroundMap.empty
      }
    }

    useEffect(() => {
      const getBlockHeightInfo = async () => {
        try {
          const blockHeight = await getBlockHeight()

          setBlockHeight(toInt(`${blockHeight}`))
        } catch (error) {}
      }

      getBlockHeightInfo()
    }, [])

    return (
      <Tilt glareEnable glareMaxOpacity={0.3} tiltMaxAngleX={10} tiltMaxAngleY={10}>
        {isOpen ? (
          <VStack
            ref={ref}
            w="330px"
            h="430px"
            className={tempOpen ? classes.flipInVerticalRight : classes.flipOutVerticalRight}
            py={10}
            position="relative"
            backgroundImage={`url(${HeroBackCard})`}
            backgroundSize="contain"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            _hover={{ cursor: 'pointer' }}
            onClick={handleToggle}
          />
        ) : (
          <VStack
            ref={ref}
            w="330px"
            h="430px"
            className={tempOpen ? classes.flipOutVerticalRight : classes.flipInVerticalRight}
            py={10}
            position="relative"
            backgroundImage={`url(${getHeroBackground()})`}
            backgroundSize="contain"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            color="blackAlpha.800"
            justifyContent={'space-between'}
            fontFamily={fonts.hubotSans}
            _hover={{ cursor: 'pointer' }}
            onClick={handleToggle}
          >
            <Body
              as="span"
              position="absolute"
              top={'7px'}
              backgroundColor="transparent"
              color="white"
              paddingX="2"
              fontSize="xs"
            >
              {`Block: ${commaFormatted(blockHeight)}`}
            </Body>
            <VStack>
              <VStack spacing="0" mt={4}>
                {/* User info */}
                <Box w="80px" h="80px" borderRadius="full" overflow="hidden">
                  <Avatar src={user?.imageUrl || ''} w="100%" h="100%" objectFit="cover" />
                </Box>
                <Body fontSize="2xl" fontWeight="bold" color={lightModeColors.neutralAlpha[11]}>
                  {user?.username || 'Anonymous Hero'}
                </Body>
              </VStack>
            </VStack>

            {/* Stats */}
            <VStack spacing={4} align="stretch" alignItems="center" alignContent="center">
              <VStack spacing={0} w="full">
                <Body fontSize="lg" color={lightModeColors.neutralAlpha[11]}>
                  {t('Contributor Ranking')}:{' '}
                  <Body as="span" color={lightModeColors.neutralAlpha[12]}>
                    {contributorRank}
                  </Body>
                </Body>
                <Body fontSize="sm" color={lightModeColors.neutralAlpha[9]}>
                  Contributed {getShortAmountLabel(stats.contributorStats.contributionsTotal)} sats ($
                  {getShortAmountLabel(Math.round(stats.contributorStats.contributionsTotalUsd))}) to{' '}
                  {stats.contributorStats.projectsCount} projects
                </Body>
              </VStack>

              <VStack spacing={0} w="full">
                <Body fontSize="lg" color={lightModeColors.neutralAlpha[11]}>
                  {t('Ambassador Ranking')}:{' '}
                  <Body as="span" color={lightModeColors.neutralAlpha[12]}>
                    {amabassadorRank}
                  </Body>
                </Body>
                <Body fontSize="sm" color={lightModeColors.neutralAlpha[9]}>
                  Enabled {getShortAmountLabel(stats.ambassadorStats.contributionsTotal)} sats ($
                  {getShortAmountLabel(Math.round(stats.ambassadorStats.contributionsTotalUsd))}) to{' '}
                  {stats.ambassadorStats.projectsCount} projects
                </Body>
              </VStack>

              <VStack spacing={0} w="full">
                <Body fontSize="lg" color={lightModeColors.neutralAlpha[11]}>
                  {t('Creator Ranking')}:{' '}
                  <Body as="span" color={lightModeColors.neutralAlpha[12]}>
                    {creatorRank}
                  </Body>
                </Body>
                <Body fontSize="sm" color={lightModeColors.neutralAlpha[9]}>
                  Raised {getShortAmountLabel(stats.creatorStats.contributionsTotal)} sats ($
                  {getShortAmountLabel(Math.round(stats.creatorStats.contributionsTotalUsd))}) to{' '}
                  {stats.creatorStats.projectsCount} projects
                </Body>
              </VStack>
            </VStack>
          </VStack>
        )}
      </Tilt>
    )
  },
)
