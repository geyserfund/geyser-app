import { VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'

import { CopyableLinkCard } from '@/components/molecules/CopyableLinkCard.tsx'
import { useAuthContext } from '@/context'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography'
import { lightModeColors } from '@/shared/styles'
import {
  DEFAULT_CONTRIBUTION_REFERRAL_PAYOUT_RATE,
  formatEffectiveAffiliatePayoutRate,
  GEYSER_PROMOTION_FEE_RATE,
} from '@/shared/utils/affiliatePayout.ts'
import { useProjectAmbassadorStatsQuery, useUserAffiliatePartnerTermsQuery, useUserHeroStatsQuery } from '@/types'
import { commaFormatted } from '@/utils'

export const ProjectShareView = () => {
  const { t } = useTranslation()
  const { user, isLoggedIn } = useAuthContext()
  const { project } = useProjectAtom()

  const { data } = useProjectAmbassadorStatsQuery({ variables: { where: { id: project.id } } })
  const { data: affiliateTermsData } = useUserAffiliatePartnerTermsQuery({
    skip: !user?.id,
    variables: { where: { id: user?.id } },
  })
  const { data: userHeroStatsData } = useUserHeroStatsQuery({
    skip: !user?.id,
    variables: { where: { id: user?.id } },
  })

  const heroId = user?.heroId
  const heroLink = `${window.location.origin || 'https://geyser.fund'}/project/${project.name}${
    heroId ? `?hero=${heroId}` : ''
  }`
  const effectiveContributionPayout = formatEffectiveAffiliatePayoutRate(
    affiliateTermsData?.user?.affiliatePartnerTerms?.contributionReferralPayoutRate ??
      DEFAULT_CONTRIBUTION_REFERRAL_PAYOUT_RATE,
    GEYSER_PROMOTION_FEE_RATE,
  )

  const ambassadorsCount = data?.projectGet?.ambassadors?.stats?.count
  const satAmount = data?.projectGet?.ambassadors?.stats?.contributionsSum
  const userAmbassadorStats = userHeroStatsData?.user?.heroStats.ambassadorStats
  const hasUserEnabledContributions = (userAmbassadorStats?.contributionsCount ?? 0) > 0

  const renderSharingStats = () => {
    if (hasUserEnabledContributions && userAmbassadorStats) {
      return (
        <Body color="amber.11" size="sm" regular textAlign="left">
          {userAmbassadorStats.projectsCount === 1 ? (
            <Trans
              i18nKey="So far, you have enabled <0>{{contributions}}</0> contributions and <1>{{amount}}</1> sats across <2>1</2> project"
              values={{
                contributions: userAmbassadorStats.contributionsCount,
                amount: commaFormatted(userAmbassadorStats.contributionsTotal),
              }}
              components={[
                <Body as="span" bold display="inline" color="amber.11" />,
                <Body as="span" bold display="inline" color="amber.11" />,
                <Body as="span" bold display="inline" color="amber.11" />,
              ]}
            />
          ) : (
            <Trans
              i18nKey="So far, you have enabled <0>{{contributions}}</0> contributions and <1>{{amount}}</1> sats across <2>{{count}}</2> projects"
              values={{
                contributions: userAmbassadorStats.contributionsCount,
                amount: commaFormatted(userAmbassadorStats.contributionsTotal),
                count: userAmbassadorStats.projectsCount,
              }}
              components={[
                <Body as="span" bold display="inline" color="amber.11" />,
                <Body as="span" bold display="inline" color="amber.11" />,
                <Body as="span" bold display="inline" color="amber.11" />,
              ]}
            />
          )}
          .
        </Body>
      )
    }

    if (ambassadorsCount) {
      return (
        <Body color="amber.11" size="sm" regular textAlign="left">
          {ambassadorsCount === 1 ? (
            <Trans
              i18nKey="So far, <0>1</0> ambassador has enabled <1>{{amount}}</1> sats in contributions to this project"
              values={{ amount: commaFormatted(satAmount ?? 0) }}
              components={[
                <Body as="span" bold display="inline" color="amber.11" />,
                <Body as="span" bold display="inline" color="amber.11" />,
              ]}
            />
          ) : (
            <Trans
              i18nKey="So far, <0>{{count}}</0> ambassadors have enabled <1>{{amount}}</1> sats in contributions to this project"
              values={{ count: ambassadorsCount, amount: commaFormatted(satAmount ?? 0) }}
              components={[
                <Body as="span" bold display="inline" color="amber.11" />,
                <Body as="span" bold display="inline" color="amber.11" />,
              ]}
            />
          )}
          .
        </Body>
      )
    }

    return null
  }

  const renderAmbassadorCopy = () => {
    if (!isLoggedIn) {
      return (
        <Body zIndex={1} color={lightModeColors.neutral1[12]} size="md" regular textAlign="left">
          {t('Share this project with your network to help it reach more supporters.')}
        </Body>
      )
    }

    return (
      <VStack spacing={3} alignItems="stretch">
        <Body zIndex={1} color={lightModeColors.neutral1[12]} size="md" regular textAlign="left">
          {t('Earn {{rate}} of each contribution you enable by sharing your ambassador link.', {
            rate: effectiveContributionPayout,
          })}
        </Body>
        {renderSharingStats()}
      </VStack>
    )
  }

  return (
    <VStack w="100%" spacing={3}>
      <VStack p={1} width="100%" spacing={2} position="relative" alignItems="stretch">
        {renderAmbassadorCopy()}
      </VStack>
      <CopyableLinkCard label={t('Ambassador link')} linkValue={heroLink} colorScheme="amber" />
    </VStack>
  )
}
