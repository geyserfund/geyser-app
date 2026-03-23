import { useQuery } from '@apollo/client'
import { Button, Tooltip } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ShareView } from '@/components/molecules/ShareView'
import { useAuthContext } from '@/context'
import { useAuthModal } from '@/modules/auth/hooks'
import { QUERY_USER_AFFILIATE_PARTNER_TERMS } from '@/modules/project/graphql/queries/affiliateQuery.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { Body } from '@/shared/components/typography'
import { lightModeColors } from '@/shared/styles'
import {
  formatEffectiveAffiliatePayoutRate,
  GEYSER_PROMOTION_FEE_RATE,
} from '@/shared/utils/affiliatePayout.ts'
import { useProjectAmbassadorStatsQuery } from '@/types'
import { commaFormatted } from '@/utils'

export const ProjectShareView = () => {
  const { t } = useTranslation()
  const { user, isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()
  const { project } = useProjectAtom()

  const { data } = useProjectAmbassadorStatsQuery({ variables: { where: { id: project.id } } })
  const { data: affiliateTermsData } = useQuery<{
    user: { affiliatePartnerTerms?: { contributionReferralPayoutRate: number } | null } | null
  }>(QUERY_USER_AFFILIATE_PARTNER_TERMS, {
    skip: !user?.id,
    variables: { where: { id: user?.id } },
  })

  const heroId = user?.heroId
  const heroLink = `${window.location.origin || 'https://geyser.fund'}/project/${project.name}${
    heroId ? `?hero=${heroId}` : ''
  }`
  const twitterShareText = `Help make this project happen! Check it out: ${heroLink}`
  const effectiveContributionPayout = formatEffectiveAffiliatePayoutRate(
    affiliateTermsData?.user?.affiliatePartnerTerms?.contributionReferralPayoutRate ?? 0.25,
    GEYSER_PROMOTION_FEE_RATE,
  )

  const ambassadorsCount = data?.projectGet?.ambassadors?.stats?.count
  const satAmount = data?.projectGet?.ambassadors?.stats?.contributionsSum

  const renderSharingStats = () => {
    if (ambassadorsCount) {
      return (
        <>
          {t('So far, ')}
          <Body as="span" color={lightModeColors.neutral1[12]}>
            {ambassadorsCount}
          </Body>{' '}
          <Body as="span" regular>
            {t('ambassador' + (ambassadorsCount === 1 ? ' has' : 's have') + ' enabled')}
          </Body>{' '}
          <Body as="span" color={lightModeColors.neutral1[12]}>
            {commaFormatted(satAmount)}
          </Body>{' '}
          {t('sats in contributions to this project.')}
        </>
      )
    }

    return ''
  }

  const renderAmbassadorCopy = () => {
    return (
      <Body>
        <Body zIndex={1} color={lightModeColors.neutral1[12]} size="md" regular textAlign="center">
          {t('Become an')}{' '}
          <Tooltip
            label={t(
              'Someone who enables contributions towards projects by spreading the word using his/her unique Hero link',
            )}
            placement="top"
          >
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <Body
                as="span"
                color={lightModeColors.neutral1[12]}
                textDecoration="underline dotted"
                display="inline"
                bold
              >
                {t('Ambassador')}
              </Body>
            </span>
          </Tooltip>{' '}
          {t('for this project by spreading the word using your')}{' '}
          <Tooltip label={t('A unique link that tracks contributions you helped generate')} placement="top">
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <Body
                as="span"
                color={lightModeColors.neutral1[12]}
                textDecoration="underline dotted"
                display="inline"
                bold
              >
                {t('Hero link')}
              </Body>
            </span>
          </Tooltip>
          {`. ${t('You will earn {{rate}} of each contribution you enable.', {
            rate: effectiveContributionPayout,
          })} `}
          {renderSharingStats()}
        </Body>
        {!isLoggedIn && (
          <Body size="md" pt={1} textAlign="center">
            <Button
              as="span"
              variant="ghost"
              color={lightModeColors.primary1[12]}
              textDecoration="underline"
              onClick={() => loginOnOpen()}
              paddingX={0}
              paddingBottom="1"
              fontSize={'md'}
              _hover={{ cursor: 'pointer' }}
              _active={{}}
              _focus={{}}
            >
              {t('Sign in')}
            </Button>{' '}
            {t('to get your custom')}{' '}
            <Tooltip label={t('A unique link that tracks contributions you helped generate')} placement="top">
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <Body
                  as="span"
                  color={lightModeColors.neutral1[12]}
                  textDecoration="underline dotted"
                  display="inline"
                  bold
                >
                  {t('Hero link')}
                </Body>
              </span>
            </Tooltip>{' '}
            {t('and track the impact of sharing.')}
          </Body>
        )}
      </Body>
    )
  }

  return (
    <ShareView
      shareOnXUrl={generateTwitterShareUrl(twitterShareText)}
      shareUrl={heroLink}
      shareUrlLabel={heroId ? t('Hero Link:') : ''}
    >
      {renderAmbassadorCopy()}
    </ShareView>
  )
}
