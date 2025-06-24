import { Avatar, Button, HStack, IconButton, Image, Link, useClipboard, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Trans, useTranslation } from 'react-i18next'
import { PiCopy, PiShareFat } from 'react-icons/pi'

import { useAuthContext } from '@/context'
import { fundingInputAfterRequestAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CampaignContent, useProjectShare } from '@/modules/project/pages1/projectView/hooks'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H2, H3 } from '@/shared/components/typography'
import {
  ContributionSuccessIllustrationUrl,
  MailIllustrationUrl,
  SuccessfullySubscribedIllustrationUrl,
} from '@/shared/constants/index.ts'
import { useEmailForm } from '@/shared/hooks/forms/useEmailForm.tsx'
import { lightModeColors, standardPadding } from '@/shared/styles'
import { SuccessImageBackgroundGradient } from '@/shared/styles/custom'
import { useProjectAmbassadorStatsQuery } from '@/types'
import { useNotification } from '@/utils'

export const SuccessImageComponent = () => {
  const { isLoggedIn } = useAuthContext()

  return (
    <VStack w="full" alignItems="start" spacing={12}>
      <SuccessfulContributionBanner />
      {!isLoggedIn && <SubscribeToGeyser />}
      <BecomeAnAmbassador />
    </VStack>
  )
}

export const SuccessfulContributionBanner = () => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
  const { user: loggedInUser } = useAuthContext()

  const fundingInputAfterRequest = useAtomValue(fundingInputAfterRequestAtom)

  const user = loggedInUser || fundingInputAfterRequest?.user

  if (!project) {
    return null
  }

  return (
    <VStack
      id="successful-contribution-banner"
      w="full"
      spacing={4}
      justifyContent="center"
      backgroundColor="utils.pbg"
    >
      <HStack spacing={2} zIndex={1}>
        {user.imageUrl ? (
          <Avatar src={user.imageUrl || ''} size="md" />
        ) : (
          <Image height="140px" src={ContributionSuccessIllustrationUrl} alt="Contribution success" />
        )}
        <Body light size="2xl" medium>
          {user.username}
        </Body>
      </HStack>

      <VStack w="full" spacing={1} zIndex={1}>
        <H3 light fontSize="2xl" regular w="full" textAlign={'center'}>
          {user.username ? t('successfully contributed to') : t('You successfully contributed to')}
        </H3>
        <H3 dark bold fontSize="4xl">
          {project.title}
        </H3>
      </VStack>
    </VStack>
  )
}

export const SubscribeToGeyser = () => {
  const { control, handleSubmit, subscribed } = useEmailForm()

  return (
    <VStack
      padding={standardPadding}
      w="full"
      spacing={4}
      justifyContent="center"
      borderRadius={8}
      border="1px solid"
      borderColor="neutral1.3"
      background={SuccessImageBackgroundGradient}
      alignItems="start"
    >
      {subscribed ? (
        <VStack w="full">
          <Image height="100px" src={SuccessfullySubscribedIllustrationUrl} alt="Mail" />
          <Body color="black" size="lg">
            {t('You’re successfully signed up to Geyser Newsletter!')}
          </Body>
        </VStack>
      ) : (
        <>
          <HStack w="full" justifyContent="start">
            <Image height="40px" src={MailIllustrationUrl} alt="Mail" />
            <H2 bold color="black">
              {t('Don’t miss the next big Bitcoin project!')}
            </H2>
          </HStack>
          <Body color="black">
            {t(
              'Get exclusive early access to new Bitcoin projects, powerful updates, and progress reports from the global Bitcoin movement. Join thousands already subscribed, and be the first to know what’s next.',
            )}
          </Body>
          <HStack as="form" onSubmit={handleSubmit} w="full" justifyContent="start" alignItems="start">
            <ControlledTextInput
              containerProps={{ flex: 1 }}
              control={control}
              name="email"
              placeholder="bitcoiner@xmail.com"
              borderColor="lightModeColors.neutral1[6]"
              backgroundColor="white"
              color="black"
            />
            <Button type="submit" flex={1} size="lg" variant="solid" colorScheme="neutral1" backgroundColor="black">
              {t('Sign up')}
            </Button>
          </HStack>
        </>
      )}
    </VStack>
  )
}

type LinkActionsSectionProps = {
  heroLink: string
  heroId?: string
  twitterShareText: string
  handleCopy: () => void
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
          aria-label={heroId ? 'Copy hero link' : 'Copy link'}
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
          {'Spread the word using your own'}{' '}
          <Body as="span" color={lightModeColors.neutral1[12]} textDecoration="underline">
            {'Hero link'}
          </Body>{' '}
          {'So far, {{ambassadorsCount}} ambassadors have enabled {{totalSats}} sats in contributions to this project.'}
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
