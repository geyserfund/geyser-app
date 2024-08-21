import { HStack, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import { PiLightning, PiMedal, PiRocketLaunch } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'

import { SkeletonLayout } from '../../../../../../../shared/components/layouts'
import { UserProjectContributionsFragment } from '../../../../../../../types'
import { commaFormatted, getShortAmountLabel } from '../../../../../../../utils'
import { useUserProfileAtom } from '../../../../../state'
import { useProfileContributionQuery } from '../../profileTabs/hooks/useProfileContributionQuery'

export const Summary = () => {
  const { userProfile, isLoading: userProfileLoading } = useUserProfileAtom()

  const { contributions, isLoading } = useProfileContributionQuery(userProfile.id)

  const totalFunded = useMemo(() => {
    return contributions.reduce((acc: number, c: UserProjectContributionsFragment) => {
      return acc + (c.funder?.amountFunded ?? 0)
    }, 0)
  }, [contributions])

  const projectsFunded = useMemo(() => {
    return contributions.length
  }, [contributions])

  const { t } = useTranslation()

  const renderSkeleton = (children: React.ReactNode) => {
    if (userProfileLoading || isLoading) {
      return <SkeletonLayout height="70px" width="100%" />
    }

    return children
  }

  const ranking = userProfile.ranking ? Number(userProfile.ranking) : undefined

  return (
    <VStack w="full" alignItems={'start'}>
      <Body size="xl" medium>
        {t('Stats')}:
      </Body>
      {renderSkeleton(
        <StatBody
          title={t('Total funded')}
          Icon={PiLightning}
          value={
            <Body size="xl" medium>
              {getShortAmountLabel(totalFunded)}
              <Body as="span" size="xl" medium light>
                {' sats'}
              </Body>
            </Body>
          }
        />,
      )}
      {renderSkeleton(
        <StatBody
          title={t('Projects funded')}
          Icon={PiRocketLaunch}
          value={
            <Body size="xl" medium>
              {getShortAmountLabel(projectsFunded)}
            </Body>
          }
        />,
      )}
      {renderSkeleton(
        <StatBody
          title={t('Ranking')}
          Icon={PiMedal}
          value={
            <Body size="xl" medium>
              {commaFormatted(ranking)}
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
}

const StatBody = ({ title, Icon, value }: StatBodyProps) => {
  return (
    <HStack w="full" paddingX={3} paddingY={2} spacing={3} backgroundColor={'neutral1.3'} borderRadius="8px">
      <Icon fontSize="32px" />
      <VStack flex="1" alignItems="start" spacing={0}>
        <Body size="sm" medium light>
          {title}:
        </Body>
        {value}
      </VStack>
    </HStack>
  )
}
