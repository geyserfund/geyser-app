import { HStack, Icon, SkeletonCircle, StackProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiChatCircle, PiLightning } from 'react-icons/pi'

import { useAuthContext } from '@/context'
import { RankMedal } from '@/shared/components/display/RankMedal'
import { SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { FormatCurrencyType } from '@/shared/utils/hooks/useCurrencyFormatter'
import { ProjectLeaderboardContributorsFragment } from '@/types'
import { commaFormatted } from '@/utils'

import { UserAvatar } from '../../../../../../../../../shared/molecules/UserAvatar'
import { FunderContributionModal } from '../../../shared/FunderContributionModal'

type LeaderboardItemProps = {
  funder: ProjectLeaderboardContributorsFragment
  rank: number
  hideLabel?: boolean
} & StackProps

export const LeaderboardItem = ({ funder, rank, hideLabel, ...props }: LeaderboardItemProps) => {
  const { t } = useTranslation()

  const { user } = useAuthContext()
  const { formatAmount } = useCurrencyFormatter()

  const funderContributionModal = useModal()

  const isViewer = user.id ? user.id === funder.user?.id : false

  return (
    <>
      <HStack
        w="full"
        spacing={1}
        paddingX={6}
        paddingY={2}
        _hover={{ backgroundColor: 'neutral1.3', cursor: 'pointer' }}
        backgroundColor={isViewer ? 'indigoAlpha.2' : 'unset'}
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
              {`${formatAmount(funder.contributionsTotalUsd, FormatCurrencyType.Usd)}`}{' '}
              <Body as="span" size="sm" muted>
                {`(${commaFormatted(funder.contributionsTotal)} sats)`}
              </Body>
            </Body>

            {funder.contributionsCount && funder.contributionsCount > 1 && (
              <HStack spacing={1} alignItems={'center'}>
                {!hideLabel && (
                  <Body size="sm" muted display={{ base: 'none', lg: 'unset' }}>
                    {t('with')}
                  </Body>
                )}
                <Body size="sm" dark>
                  {funder.contributionsCount}
                </Body>
                <Icon
                  as={PiLightning}
                  display={hideLabel ? 'unset' : { base: 'unset', lg: 'none' }}
                  fontSize={'12px'}
                />
                {!hideLabel && (
                  <Body size="sm" muted display={{ base: 'none', lg: 'unset' }}>
                    {t('contributions')}
                  </Body>
                )}
              </HStack>
            )}

            {funder.commentsCount && funder.commentsCount > 0 && (
              <HStack spacing={0}>
                <Body size="sm" dark>
                  {funder.commentsCount}
                </Body>
                <PiChatCircle fontSize={'12px'} />
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
