import { Avatar, Button, HStack, IconButton, Link, Tooltip, useClipboard, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { PiCopy, PiShareFat } from 'react-icons/pi'

import { AnonymousAvatar } from '@/components/ui/AnonymousAvatar'
import { useAuthContext } from '@/context'
import { useAuthModal } from '@/modules/auth/hooks'
import { fundingInputAfterRequestAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CampaignContent, useProjectShare } from '@/modules/project/pages/projectView/hooks'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { Body, H3 } from '@/shared/components/typography'
import { lightModeColors } from '@/shared/styles'
import { SuccessImageBackgroundGradient } from '@/shared/styles/custom'
import { useProjectAmbassadorStatsQuery } from '@/types'
import { useNotification } from '@/utils'

export const SuccessImageComponent = () => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
  const { loginOnOpen } = useAuthModal()
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

  const handleCopy = () => {
    onCopy()
    toast.success({
      title: t('Copied!'),
      description: t('Hero link copied to clipboard'),
    })
  }

  const { getShareProjectUrl } = useProjectShare()

  const projectShareUrl = getShareProjectUrl({ clickedFrom: CampaignContent.successScreen })

  if (!project) {
    return null
  }

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
            {totalSats.toLocaleString()}
          </Body>{' '}
          {t('sats in contributions to this project.')}
        </>
      )
    }

    return ''
  }

  const renderSignInPromptBody = () => {
    if (!isLoggedIn) {
      return (
        <Body
          size="xl"
          pt={4}
          pb={4}
          textAlign="center"
          color={lightModeColors.neutral1[11]}
          borderTop="1px solid"
          w="full"
          borderColor={lightModeColors.neutral1[11]}
        >
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
              <Body as="span" color={lightModeColors.neutral1[12]} display="inline">
                {t('Hero link')}
              </Body>
            </span>
          </Tooltip>{' '}
          {t('and track the impact of sharing.')}
        </Body>
      )
    }

    return null
  }

  const twitterShareText = `I just contributed to ${project.title} on Geyser! Check it out: ${projectShareUrl}`

  return (
    <VStack w="full" spacing={6}>
      <VStack
        id="successful-contribution-banner"
        padding="6%"
        w="full"
        spacing={4}
        justifyContent="center"
        borderRadius={8}
        border="1px solid"
        borderColor="neutral1.3"
        aspectRatio={2.16}
        pl={8}
        pr={8}
        background={SuccessImageBackgroundGradient}
        backgroundColor="utils.pbg"
        position="relative"
      >
        {user && (
          <HStack spacing={2} zIndex={1}>
            {user.imageUrl ? (
              <Avatar src={user.imageUrl || ''} size="md" />
            ) : (
              <AnonymousAvatar seed={user.id} imageSize="48px" />
            )}
            <Body color={lightModeColors.neutral1[11]} size="2xl" medium>
              {user.username}
            </Body>
          </HStack>
        )}
        <VStack w="full" spacing={1} zIndex={1}>
          <H3 color={lightModeColors.neutral1[11]} fontSize="3xl" regular w="full" textAlign={'center'}>
            {t('Successfully contributed to')}
          </H3>
          <H3 color={lightModeColors.neutral1[12]} bold fontSize="4xl">
            {project.title}
          </H3>
        </VStack>

        <VStack spacing={2} w="full" zIndex={1}>
          <Body color={lightModeColors.neutral1[11]} size="xl" regular pb={4} textAlign="center">
            {t('Become an')}{' '}
            <Tooltip
              label={t(
                'Someone who enables contributions towards projects by spreading the word using his/her unique Hero link',
              )}
              placement="top"
            >
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <Body as="span" color={lightModeColors.neutral1[12]} display="inline">
                  {t('Ambassador')}
                </Body>
              </span>
            </Tooltip>{' '}
            {t('for this project by spreading the word using your')}{' '}
            <Tooltip label={t('A unique link that tracks contributions you helped generate')} placement="top">
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <Body as="span" color={lightModeColors.neutral1[12]} textDecoration="underline dotted" display="inline">
                  {t('Hero link')}
                </Body>
              </span>
            </Tooltip>
            {'. '}
            {renderSharingStats()}
          </Body>
          {renderSignInPromptBody()}
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
              <strong>{heroId ? t('Hero Link:') : ''}</strong> {heroLink.replace('https://', '')}
            </Body>
            <IconButton
              aria-label={heroId ? 'Copy link' : 'Copy hero link'}
              icon={<PiCopy />}
              variant="ghost"
              size="md"
              onClick={handleCopy}
            />
          </HStack>
        </VStack>
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
            {t(heroId ? 'Copy link' : 'Copy hero link')}
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}
