import { Button, HStack, IconButton, Link, useClipboard, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { PiCopy, PiShareFat } from 'react-icons/pi'

import { useAuthContext } from '@/context'
import { fundingInputAfterRequestAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CampaignContent, useProjectShare } from '@/modules/project/pages/projectView/hooks'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H2 } from '@/shared/components/typography'
import { lightModeColors, standardPadding } from '@/shared/styles'
import { SuccessImageBackgroundGradient } from '@/shared/styles/custom'
import { useProjectAmbassadorStatsQuery } from '@/types'
import { commaFormatted, useNotification } from '@/utils'

type LinkActionsSectionProps = {
  heroLink: string
  heroId?: string
  twitterShareText: string
  handleCopy: () => void
}

const getHeroLink = (projectName?: string, heroId?: string) => {
  const heroSuffix = heroId ? `?hero=${heroId}` : ''
  return `${window.location.origin || 'https://geyser.fund'}/project/${projectName ?? ''}${heroSuffix}`
}

const getTwitterShareText = (projectTitle: string | undefined, projectShareUrl: string) => {
  return `I just contributed to ${projectTitle ?? ''} on Geyser! Check it out: ${projectShareUrl}`
}

/** Shared link display and action buttons component */
const LinkActionsSection = ({ heroLink, heroId, twitterShareText, handleCopy }: LinkActionsSectionProps) => {
  const { t } = useTranslation()

  return (
    <>
      <HStack
        minHeight="40px"
        w="full"
        px={2}
        py={1}
        bg="whiteAlpha.700"
        borderRadius={10}
        border="1px solid"
        borderColor={lightModeColors.neutral1[7]}
        zIndex={1}
      >
        <Body color={lightModeColors.neutral1[12]} flex={1}>
          {heroLink.replace('https://', '')}
        </Body>
        <IconButton
          aria-label={heroId ? t('Copy hero link') : t('Copy link')}
          icon={<PiCopy />}
          variant="ghost"
          size="md"
          onClick={handleCopy}
        />
      </HStack>

      <HStack w="full" justifyContent="center" spacing={4} zIndex={1}>
        <Button
          size="lg"
          variant="solid"
          bg="whiteAlpha.800"
          color={lightModeColors.neutral1[11]}
          border="1px solid"
          borderColor={lightModeColors.neutral1[7]}
          borderRadius={8}
          rightIcon={<PiShareFat />}
          as={Link}
          isExternal
          href={generateTwitterShareUrl(twitterShareText)}
          w="full"
          _hover={{ bg: 'whiteAlpha.900' }}
        >
          {t('Share on X')}
        </Button>
        <Button
          size="lg"
          variant="solid"
          bg="blackAlpha.800"
          color="white"
          rightIcon={<PiCopy />}
          onClick={handleCopy}
          w="full"
        >
          {t('Copy link')}
        </Button>
      </HStack>
    </>
  )
}

type ShareProjectCardProps = LinkActionsSectionProps

/** Share project component for non-logged-in users */
const ShareProjectCard = (props: ShareProjectCardProps) => {
  const { t } = useTranslation()

  return (
    <CardLayout w="full">
      <H2 bold>{t('Share Project')}</H2>
      <Body>{t('Spread the word to help this project become a success.')}</Body>
      <LinkActionsSection {...props} />
    </CardLayout>
  )
}

type AmbassadorCardProps = LinkActionsSectionProps & {
  ambassadorsCount?: number
  totalSats?: number
}

/** Ambassador section for logged-in users */
const AmbassadorCard = ({ ambassadorsCount, totalSats, ...props }: AmbassadorCardProps) => {
  const { t } = useTranslation()

  return (
    <VStack
      padding={standardPadding}
      w="full"
      spacing={2}
      justifyContent="center"
      borderRadius={8}
      border="1px solid"
      borderColor="neutral1.3"
      background={SuccessImageBackgroundGradient}
      alignItems="start"
    >
      <HStack w="full" justifyContent="start">
        <H2 bold color="black">
          {t('Share this project')}
        </H2>
      </HStack>
      <Body color="black">
        {t('Help this project reach more supporters by sharing it with your network. ')}
        {t('So far, {{count}} ambassadors have enabled {{amount}} sats in contributions to this project.', {
          count: ambassadorsCount || 0,
          amount: commaFormatted(totalSats || 0),
        })}
      </Body>
      <LinkActionsSection {...props} />
    </VStack>
  )
}

export const BecomeAnAmbassador = () => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
  const { user: loggedInUser, isLoggedIn } = useAuthContext()
  const fundingInputAfterRequest = useAtomValue(fundingInputAfterRequestAtom)
  const toast = useNotification()
  const { getShareProjectUrl } = useProjectShare()

  const user = loggedInUser || fundingInputAfterRequest?.user
  const heroId = user?.heroId
  const heroLink = getHeroLink(project?.name, heroId)
  const projectShareUrl = heroId ? heroLink : getShareProjectUrl({ clickedFrom: CampaignContent.successScreen })
  const twitterShareText = getTwitterShareText(project?.title, projectShareUrl)

  const { data } = useProjectAmbassadorStatsQuery({
    skip: !project?.id,
    variables: { where: { id: project?.id } },
  })
  const { onCopy } = useClipboard(heroLink)

  if (!project) {
    return null
  }

  const handleCopy = () => {
    onCopy()
    toast.success({
      title: t('Copied!'),
      description: t('Link copied to clipboard'),
    })
  }

  const sharedProps = {
    heroLink,
    heroId,
    twitterShareText,
    handleCopy,
  }
  const ambassadorsCount = data?.projectGet?.ambassadors?.stats?.count
  const totalSats = data?.projectGet?.ambassadors?.stats?.contributionsSum

  return isLoggedIn ? (
    <AmbassadorCard {...sharedProps} ambassadorsCount={ambassadorsCount} totalSats={totalSats} />
  ) : (
    <ShareProjectCard {...sharedProps} />
  )
}
