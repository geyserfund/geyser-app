import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import { PiIdentificationBadge, PiLightning, PiMegaphone, PiRocketLaunch } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'

import { SkeletonLayout } from '../../../../../../../shared/components/layouts'
import { HeroStats, useUserHeroStatsQuery } from '../../../../../../../types'
import { getShortAmountLabel } from '../../../../../../../utils'
import { useUserProfileAtom } from '../../../../../state'
import { HeroCard } from './HeroCard'

export const Summary = () => {
  const { userProfile, isLoading: userProfileLoading } = useUserProfileAtom()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, loading } = useUserHeroStatsQuery({
    variables: {
      where: {
        id: userProfile.id,
      },
    },
  })

  const stats = useMemo(() => {
    const defaultStats: HeroStats = {
      contributionsCount: 0,
      contributionsTotal: 0,
      // contributionsTotalUsd: 0,
      projectsCount: 0,
      rank: 0,
    }

    return {
      ambassadorStats: data?.user?.heroStats?.ambassadorStats ?? defaultStats,
      contributorStats: data?.user?.heroStats?.contributorStats ?? defaultStats,
      creatorStats: data?.user?.heroStats?.creatorStats ?? defaultStats,
    }
  }, [data])

  const { t } = useTranslation()

  const renderSkeleton = (children: React.ReactNode) => {
    if (userProfileLoading || loading) return <SkeletonLayout height="70px" width="100%" />
    return children
  }

  return (
    <VStack w="full" alignItems={'start'}>
      <Body size="xl" medium>
        {t('Hero Rank')}
      </Body>
      <Button
        variant="surface"
        size="sm"
        w="full"
        leftIcon={<PiIdentificationBadge />}
        alignContent="center"
        colorScheme="primary1"
        height="32px"
        onClick={onOpen}
      >
        {t('Hero Card')}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="400px" borderRadius={12}>
          <ModalHeader>{t('Hero Card')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Hero card content goes here */}
            <VStack spacing={4}>
              <Body>
                {t(
                  'Hero cards are a summary of your activity in the Bitcoin space. You can share them with your friends as well as get a physical collectible copy on your doorstep!',
                )}
              </Body>
              <HeroCard user={userProfile} stats={stats} />
            </VStack>
          </ModalBody>
          <ModalFooter pt={2}>
            <VStack spacing={2} w="100%">
              <Button variant="outline" onClick={onClose} w="100%" h="40px">
                {t('Buy physical card')}
              </Button>
              <Button colorScheme="primary1" onClick={onClose} w="100%" h="40px">
                {t('Copy Card')}
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {renderSkeleton(
        <StatBody
          title={t('Contributor')}
          subtitle={t('made in contributions')}
          rank={stats.contributorStats.rank}
          Icon={PiLightning}
          value={
            <Body size="md" medium>
              {/* ${getShortAmountLabel(stats.contributorStats.contributionsTotalUsd).toLocaleLowerCase()} */}
              <Body as="span" size="md" medium light>
                {' '}
                ({getShortAmountLabel(stats.contributorStats.contributionsTotal)} sats)
              </Body>
            </Body>
          }
        />,
      )}
      {renderSkeleton(
        <StatBody
          title={t('Creator')}
          subtitle={t('raised in contributions')}
          rank={stats.creatorStats.rank}
          Icon={PiRocketLaunch}
          rankPillProps={{
            bgColor: 'pinkAlpha.3',
            textColor: 'pinkAlpha.11',
          }}
          value={
            <Body size="md" medium>
              {/* ${getShortAmountLabel(stats.creatorStats.contributionsTotalUsd).toLocaleLowerCase()} */}
              <Body as="span" size="md" medium light>
                {' '}
                ({getShortAmountLabel(stats.creatorStats.contributionsTotal)} sats)
              </Body>
            </Body>
          }
        />,
      )}
      {renderSkeleton(
        <StatBody
          title={t('Ambassador')}
          subtitle={t('of enabled contributions')}
          rank={stats.ambassadorStats.rank}
          rankPillProps={{
            bgColor: 'orangeAlpha.3',
            textColor: 'orangeAlpha.11',
          }}
          Icon={PiMegaphone}
          value={
            <Body size="md" medium>
              {/* ${getShortAmountLabel(stats.ambassadorStats.contributionsTotalUsd).toLocaleLowerCase()} */}
              <Body as="span" size="md" medium light>
                {' '}
                ({getShortAmountLabel(stats.ambassadorStats.contributionsTotal)} sats)
              </Body>
            </Body>
          }
        />,
      )}
    </VStack>
  )
}

type StatBodyProps = {
  title: string
  Icon: IconType
  value: React.ReactNode
  subtitle: string
  rank: number
  rankPillProps?: {
    bgColor?: string
    textColor?: string
  }
}

const StatBody = ({ title, Icon, value, subtitle, rank, rankPillProps }: StatBodyProps) => {
  return (
    <HStack w="full" paddingX={3} paddingY={2} spacing={3} bgColor={'neutral1.3'} borderRadius="8px">
      <Icon fontSize="32px" color="orange.1" />
      <VStack flex="1" alignItems="start" spacing={0}>
        <HStack>
          <Body size="md" medium>
            {title}
          </Body>
          <Body
            size="xs"
            borderRadius={5}
            textColor={rankPillProps?.textColor ?? 'blueAlpha.11'}
            bgColor={rankPillProps?.bgColor ?? 'blueAlpha.3'}
            pr={2}
            pl={2}
            medium
          >{`#${rank}`}</Body>
        </HStack>
        {value}
        {subtitle && (
          <Body size="sm" light>
            {subtitle}
          </Body>
        )}
      </VStack>
    </HStack>
  )
}
