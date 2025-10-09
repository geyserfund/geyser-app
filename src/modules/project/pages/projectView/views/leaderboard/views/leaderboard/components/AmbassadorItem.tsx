import { HStack, SkeletonCircle, StackProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { useAuthContext } from '@/context'
import { ProfileText } from '@/shared/components/display/ProfileText.tsx'
import { RankMedal } from '@/shared/components/display/RankMedal'
import { SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { FormatCurrencyType, useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter'
import { ProjectLeaderboardAmbassadorsFragment } from '@/types'
import { commaFormatted } from '@/utils'

import { UserAvatar } from '../../../../../../../../../shared/molecules/UserAvatar'

type AmbassadorItemProps = {
  ambassador: ProjectLeaderboardAmbassadorsFragment
  rank: number
} & StackProps

export const AmbassadorItem = ({ ambassador, rank, ...props }: AmbassadorItemProps) => {
  const { t } = useTranslation()

  const { user } = useAuthContext()
  const { formatAmount } = useCurrencyFormatter()
  const isViewer = user.id ? user.id === ambassador.user?.id : false

  return (
    <>
      <HStack
        as={Link}
        to={getPath('userProfile', ambassador.user?.id)}
        w="full"
        spacing={1}
        paddingX={6}
        paddingY={2}
        _hover={{ backgroundColor: 'neutral1.3', cursor: 'pointer' }}
        backgroundColor={isViewer ? 'indigoAlpha.2' : 'unset'}
        {...props}
      >
        <RankMedal rank={rank} />
        <UserAvatar user={ambassador.user} id={ambassador.user?.id} />
        <VStack flex={1} alignItems={'start'} justifyContent={'center'} spacing={0}>
          <ProfileText guardian={ambassador.user?.guardianType} size="sm" bold dark>
            {ambassador.user?.username || t('Anonymous')}
          </ProfileText>
          <HStack spacing={2}>
            <Body size="sm">
              {`${formatAmount(ambassador.contributionsTotalUsd, FormatCurrencyType.Usd)}`}{' '}
              <Body as="span" size="sm" muted>
                {`(${commaFormatted(ambassador.contributionsTotal)} sats)`}
              </Body>
            </Body>
          </HStack>
        </VStack>
      </HStack>
    </>
  )
}

export const AmbassadorItemSkeleton = () => {
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
