import { HStack, Image, SkeletonCircle, StackProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiChatCircle, PiLightning } from 'react-icons/pi'

import { SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { BronzeMedalUrl, GoldMedalUrl, SilverMedalUrl } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { ProjectLeaderboardContributorsFragment } from '@/types'
import { commaFormatted } from '@/utils'

import { UserAvatar } from '../../../../../../../../../shared/molecules/UserAvatar'
import { FunderContributionModal } from '../../../shared/FunderContributionModal'

type LeaderboardItemProps = {
  funder: ProjectLeaderboardContributorsFragment
  rank: number
} & StackProps

export const LeaderboardItem = ({ funder, rank, ...props }: LeaderboardItemProps) => {
  const { t } = useTranslation()

  const funderContributionModal = useModal()

  return (
    <>
      <HStack
        w="full"
        spacing={1}
        paddingX={6}
        paddingY={2}
        _hover={{ backgroundColor: 'neutral1.3', cursor: 'pointer' }}
        onClick={funderContributionModal.onOpen}
        {...props}
      >
        <RankMedal rank={rank} />
        <UserAvatar user={funder.user} id={funder.funderId} />
        <VStack flex={1} alignItems={'start'} justifyContent={'center'} spacing={0}>
          <Body size="sm" bold dark>
            {funder.user?.username || t('Anonymous')}
          </Body>
          <HStack spacing={2}>
            <Body size="sm">
              {commaFormatted(funder.contributionsTotal)}{' '}
              <Body as="span" size="sm" muted>
                Sats
              </Body>
            </Body>

            {funder.contributionsCount && funder.contributionsCount > 1 && (
              <HStack spacing={0}>
                <PiLightning fontSize={'12px'} />
                <Body size="sm" dark>
                  {funder.contributionsCount}
                </Body>
              </HStack>
            )}

            {funder.commentsCount && funder.commentsCount > 0 && (
              <HStack spacing={0}>
                <PiChatCircle fontSize={'12px'} />
                <Body size="sm" dark>
                  {funder.commentsCount}
                </Body>
              </HStack>
            )}
          </HStack>
        </VStack>
      </HStack>
      {funderContributionModal.isOpen && <FunderContributionModal funder={funder} {...funderContributionModal} />}
    </>
  )
}

export const LeaderboardItemSkeleton = () => {
  return (
    <HStack w="full" spacing={1} paddingX={6} paddingY={2}>
      <SkeletonCircle size="12px" />

      <SkeletonCircle size="40px" />
      <VStack flex={1} alignItems={'start'} justifyContent={'center'} spacing={0.5}>
        <SkeletonLayout height="16px" width="150px" />
        <SkeletonLayout height="16px" width="200px" />
      </VStack>
    </HStack>
  )
}

const RankMedal = ({ rank }: { rank: number }) => {
  const medalUrl = [GoldMedalUrl, SilverMedalUrl, BronzeMedalUrl]
  const src = medalUrl[rank - 1]
  if (src) {
    return <Image src={src} alt={`Rank ${rank}`} boxSize="20px" />
  }

  return (
    <Body size="xs" bold muted paddingX="6px">
      {rank}
    </Body>
  )
}
