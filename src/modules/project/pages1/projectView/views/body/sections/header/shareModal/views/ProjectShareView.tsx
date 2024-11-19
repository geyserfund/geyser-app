import { Link, Tooltip } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ShareView } from '@/components/molecules/ShareView'
import { useAuthContext } from '@/context'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CampaignContent, useProjectShare } from '@/modules/project/pages1/projectView/hooks'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { useAuthModal } from '@/pages/auth/hooks'
import { Body } from '@/shared/components/typography'
import { useProjectAmbassadorStatsQuery } from '@/types'

export const ProjectShareView = () => {
  const { t } = useTranslation()
  const { user, isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()
  const { project } = useProjectAtom()
  const { getShareProjectUrl } = useProjectShare()
  const { data } = useProjectAmbassadorStatsQuery({ variables: { where: { id: project.id } } })

  const projectShareUrl = getShareProjectUrl({ clickedFrom: CampaignContent.successScreen })
  const twitterShareText = `Help make this project happen! Check it out: ${projectShareUrl}`

  const heroId = user?.heroId
  const heroLink = `${window.location.origin || 'https://geyser.fund'}/project/${project.name}${
    heroId ? `?hero=${heroId}` : ''
  }`

  const ambassadorsCount = data?.projectGet?.ambassadors?.stats?.count
  const satAmount = data?.projectGet?.ambassadors?.stats?.contributionsSum

  const renderSharingStats = () => {
    if (ambassadorsCount) {
      return (
        <>
          {t('So far, ')}
          <Body as="span" color="neutral1.12">
            {ambassadorsCount}
          </Body>{' '}
          <Body as="span" regular>
            {t('ambassador' + (ambassadorsCount === 1 ? ' has' : 's have') + ' enabled')}
          </Body>{' '}
          <Body as="span" color="neutral1.12">
            {satAmount.toLocaleString()}
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
        {!ambassadorsCount ? (
          <Body zIndex={1}>
            {t('Become the first project')}{' '}
            <Tooltip
              label={t(
                'Someone who enables contributions towards projects by spreading the word using his/her unique Hero link',
              )}
              placement="top"
            >
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <Body as="span" color="neutral1.12" textDecoration="underline dotted" display="inline" bold>
                  {t('Ambassador')}
                </Body>
              </span>
            </Tooltip>{' '}
            {t('by spreading the word and enabling more contributions to this project.')}
          </Body>
        ) : (
          <Body zIndex={1} color="neutral1.12" size="md" regular textAlign="center">
            {t('Become an')}{' '}
            <Tooltip
              label={t(
                'Someone who enables contributions towards projects by spreading the word using his/her unique Hero link',
              )}
              placement="top"
            >
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <Body as="span" color="neutral1.12" textDecoration="underline dotted" display="inline" bold>
                  {t('Ambassador')}
                </Body>
              </span>
            </Tooltip>{' '}
            {t('for this project by spreading the word using your')}{' '}
            <Tooltip label={t('A unique link that tracks contributions you helped generate')} placement="top">
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <Body as="span" color="neutral1.12" textDecoration="underline dotted" display="inline" bold>
                  {t('Hero link')}
                </Body>
              </span>
            </Tooltip>
            {'. '}
            {renderSharingStats()}
          </Body>
        )}
        {!isLoggedIn && (
          <Body size="md" pt={1} textAlign="center">
            <Link
              color="primary1.500"
              textDecoration="underline"
              onClick={(e) => {
                e.preventDefault()
                loginOnOpen()
              }}
            >
              {t('Sign in')}
            </Link>{' '}
            {t('to get your custom')}{' '}
            <Tooltip label={t('A unique link that tracks contributions you helped generate')} placement="top">
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <Body as="span" color="neutral1.12" textDecoration="underline dotted" display="inline" bold>
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
