import { HStack, SkeletonCircle, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiChatCircle, PiLightning } from 'react-icons/pi'

import { SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks'
import { ProjectFunderFragment } from '@/types'
import { commaFormatted } from '@/utils'

import { UserAvatar } from '../../../../../components/UserAvatar'
import { FunderContributionModal } from '../../../shared/FunderContributionModal'

export const LeaderboardItem = ({ funder, rank }: { funder: ProjectFunderFragment; rank: number }) => {
  const { t } = useTranslation()

  const funderContributionModal = useModal()

  return (
    <>
      <HStack
        w="full"
        spacing={1}
        key={funder.id}
        paddingX={6}
        paddingY={2}
        _hover={{ backgroundColor: 'neutral1.3', cursor: 'pointer' }}
        onClick={funderContributionModal.onOpen}
      >
        <Body size="xs" bold muted paddingX="6px">
          {rank}
        </Body>
        <UserAvatar user={funder.user} id={funder.id} />
        <VStack flex={1} alignItems={'start'} justifyContent={'center'} spacing={0}>
          <Body size="sm" bold dark>
            {funder.user?.username || t('Anonymous')}
          </Body>
          <HStack spacing={2}>
            <Body size="xs">
              {commaFormatted(funder.amountFunded)}{' '}
              <Body as="span" size="sm" muted>
                Sats
              </Body>
            </Body>

            {funder.timesFunded && funder.timesFunded > 1 && (
              <HStack spacing={0}>
                <PiLightning fontSize={'12px'} />
                <Body size="xs" dark>
                  {funder.timesFunded}
                </Body>
              </HStack>
            )}

            {funder.timesFunded && funder.timesFunded > 1 && (
              <HStack spacing={0}>
                <PiChatCircle fontSize={'12px'} />
                <Body size="xs" dark>
                  {funder.timesFunded}
                </Body>
              </HStack>
            )}
          </HStack>
        </VStack>
      </HStack>
      <FunderContributionModal funder={funder} {...funderContributionModal} />
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
