import { Button, HStack, IconButton, Link, useClipboard, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { Trans, useTranslation } from 'react-i18next'
import { PiArrowClockwiseBold, PiCopy, PiShareFat } from 'react-icons/pi'

import { useAuthContext } from '@/context'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom.ts'
import { fundingInputAfterRequestAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CampaignContent, useProjectShare } from '@/modules/project/pages/projectView/hooks'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H2 } from '@/shared/components/typography'
import { lightModeColors, standardPadding } from '@/shared/styles'
import { SuccessImageBackgroundGradient } from '@/shared/styles/custom'
import { useProjectAmbassadorStatsQuery, usePublishNostrEventMutation } from '@/types'
import { useNotification } from '@/utils'

import { useNostrPostForFundingSuccess } from '../useNostrPostForFundingSuccess.tsx'

type LinkActionsSectionProps = {
  heroLink: string
  heroId?: string
  twitterShareText: string
  handleCopy: () => void
}

/** Shared link display and action buttons component */
const LinkActionsSection = ({ heroLink, heroId, twitterShareText, handleCopy }: LinkActionsSectionProps) => {
  const { t } = useTranslation()
  const toast = useNotification()

  const { createPostEvent, isPosting } = useNostrPostForFundingSuccess()
  const [publishNostrEvent, { loading: isPublishingNostrEvent }] = usePublishNostrEventMutation()

  const { project } = useProjectAtom()

  const { totalSats } = useFundingFormAtom()

  const handleNostrPost = async () => {
    const event = await createPostEvent(project.title, project.keys.nostrKeys.publicKey.hex, totalSats)

    if (event) {
      await publishNostrEvent({
        variables: { event: JSON.stringify(event) },
        onCompleted() {
          toast.success({
            title: t('Post successful'),
            description: t('Your Nostr post has been published'),
          })
        },
        onError(error) {
          toast.error({
            title: t('Post failed'),
            description: error.message,
          })
        },
      })
    }
  }

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
          aria-label={heroId ? 'Copy hero link' : 'Copy link'}
          icon={<PiCopy />}
          variant="ghost"
          size="md"
          onClick={handleCopy}
        />
      </HStack>

      <HStack w="full" justifyContent="center" spacing={4} zIndex={1}>
        {window.nostr && (
          <Button
            size="lg"
            variant="soft"
            colorScheme="nostr"
            rightIcon={<PiArrowClockwiseBold />}
            w="full"
            isLoading={isPublishingNostrEvent || isPosting}
            onClick={handleNostrPost}
          >
            {t('Post on Nostr')}
          </Button>
        )}
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
          _hover={{
            bg: 'whiteAlpha.900',
          }}
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
          {heroId ? t('Copy hero link') : t('Copy link')}
        </Button>
      </HStack>
    </>
  )
}

/** Share project component for non-logged in users */
const ShareProjectCard = ({ heroLink, heroId, twitterShareText, handleCopy }: LinkActionsSectionProps) => {
  const { t } = useTranslation()

  return (
    <CardLayout w={'full'}>
      <H2 bold>{t('Share Project')}</H2>
      <Body>{t('Spread the word to help this project become a success.')}</Body>
      <LinkActionsSection
        heroLink={heroLink}
        heroId={heroId}
        twitterShareText={twitterShareText}
        handleCopy={handleCopy}
      />
    </CardLayout>
  )
}

type AmbassadorCardProps = LinkActionsSectionProps & {
  ambassadorsCount?: number
  totalSats?: number
}

/** Ambassador section for logged in users */
const AmbassadorCard = ({
  heroLink,
  heroId,
  twitterShareText,
  handleCopy,
  ambassadorsCount,
  totalSats,
}: AmbassadorCardProps) => {
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
          {t('Become an ambassador')}
        </H2>
      </HStack>
      <Body color="black">
        <Trans
          i18nKey="Spread the word using your own <1>Hero link</1>. So far, {{ambassadorsCount}} ambassadors have enabled {{totalSats}} sats in contributions to this project."
          values={{
            ambassadorsCount: ambassadorsCount || 0,
            totalSats: totalSats || 0,
          }}
        >
          {'Spread the word using your own '}
          <Body as="span" color={lightModeColors.neutral1[12]} textDecoration="underline">
            {'Hero link'}
          </Body>
          {
            '. So far, {{ambassadorsCount}} ambassadors have enabled {{totalSats}} sats in contributions to this project.'
          }
        </Trans>
      </Body>

      <LinkActionsSection
        heroLink={heroLink}
        heroId={heroId}
        twitterShareText={twitterShareText}
        handleCopy={handleCopy}
      />
    </VStack>
  )
}

export const BecomeAnAmbassador = () => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
  const { user: loggedInUser, isLoggedIn } = useAuthContext()
  const fundingInputAfterRequest = useAtomValue(fundingInputAfterRequestAtom)

  const user = loggedInUser || fundingInputAfterRequest?.user
  const heroId = user?.heroId
  const heroLink = `https://geyser.fund/project/${project.name}${heroId ? `?hero=${heroId}` : ''}`

  const { data } = useProjectAmbassadorStatsQuery({ variables: { where: { id: project.id } } })
  const ambassadorsCount = data?.projectGet?.ambassadors?.stats?.count
  const totalSats = data?.projectGet?.ambassadors?.stats?.contributionsSum

  const { onCopy } = useClipboard(heroLink)
  const toast = useNotification()
  const { getShareProjectUrl } = useProjectShare()

  const projectShareUrl = heroId ? heroLink : getShareProjectUrl({ clickedFrom: CampaignContent.successScreen })
  const twitterShareText = `I just contributed to ${project.title} on Geyser! Check it out: ${projectShareUrl}`

  const handleCopy = () => {
    onCopy()
    toast.success({
      title: t('Copied!'),
      description: heroId ? t('Hero link copied to clipboard') : t('Link copied to clipboard'),
    })
  }

  if (!project) {
    return null
  }

  const sharedProps = {
    heroLink,
    heroId,
    twitterShareText,
    handleCopy,
  }

  return isLoggedIn ? (
    <AmbassadorCard {...sharedProps} ambassadorsCount={ambassadorsCount} totalSats={totalSats} />
  ) : (
    <ShareProjectCard {...sharedProps} />
  )
}
