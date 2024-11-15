import { Avatar, Button, HStack, IconButton, Link, Tooltip, useClipboard, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiCopy, PiShareFat } from 'react-icons/pi'

import { AnonymousAvatar } from '@/components/ui/AnonymousAvatar'
import { useAuthContext } from '@/context'
import { FlowingGifBackground } from '@/modules/discovery/pages/hallOfFame/components/FlowingGifBackground'
import { useFundingFlowAtom } from '@/modules/project/funding/hooks/useFundingFlowAtom'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CampaignContent, useProjectShare } from '@/modules/project/pages1/projectView/hooks'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { useAuthModal } from '@/pages/auth/hooks'
import { Body, H3 } from '@/shared/components/typography'
import { Badge, useProjectAmbassadorStatsQuery } from '@/types'

export const SuccessImageComponent = ({ currentBadge }: { currentBadge?: Badge }) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
  const { loginOnOpen } = useAuthModal()
  const { user: loggedInUser, isLoggedIn } = useAuthContext()

  const { fundingInputAfterRequest } = useFundingFlowAtom()

  const user = loggedInUser || fundingInputAfterRequest?.user

  const heroLink = `https://geyser.fund/project/${project.name}${user?.heroId ? `&hero=${user?.heroId}` : ''}`

  const { data } = useProjectAmbassadorStatsQuery({ variables: { where: { id: project.id } } })
  const contributionCount = data?.projectGet?.ambassadors?.stats?.count
  const totalSats = data?.projectGet?.ambassadors?.stats?.contributionsSum

  const { onCopy } = useClipboard(heroLink)
  const { getShareProjectUrl } = useProjectShare()

  const projectShareUrl = getShareProjectUrl({ clickedFrom: CampaignContent.successScreen })

  if (!project) {
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
        background={'linear-gradient(81deg, #B2FAEC -9.6%, #EDF2FE 109.2%)'}
        backgroundColor="utils.pbg"
        position="relative"
      >
        <FlowingGifBackground />
        {user && (
          <HStack spacing={2} zIndex={1}>
            {user.imageUrl ? (
              <Avatar src={user.imageUrl || ''} size="md" />
            ) : (
              <AnonymousAvatar seed={user.id} imageSize="48px" />
            )}
            <Body color="neutral1.11" size="2xl" medium>
              {user.username}
            </Body>
          </HStack>
        )}
        <VStack spacing={1} zIndex={1}>
          <H3 color="neutral1.11" fontSize="3xl" regular>
            {t('Successfully contributed to')}
          </H3>
          <H3 color="neutral1.12" bold fontSize="4xl">
            {project.title}
          </H3>
        </VStack>

        <VStack spacing={2} w="full" zIndex={1}>
          <Body color="neutral1.11" size="xl" regular pb={4} textAlign="center">
            {t('Become an')}{' '}
            <Tooltip label={t('Share your hero link to become a project ambassador')} placement="top">
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <Body as="span" color="neutral1.12" textDecoration="underline dotted" display="inline">
                  {t('Ambassador')}
                </Body>
              </span>
            </Tooltip>{' '}
            {t('for this project by spreading the word using your')}{' '}
            <Tooltip label={t('A unique link that tracks contributions you helped generate')} placement="top">
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <Body as="span" color="neutral1.12" textDecoration="underline dotted" display="inline">
                  {t('Hero link')}
                </Body>
              </span>
            </Tooltip>
            . {t('So far,')}{' '}
            <Body as="span" color="neutral1.12">
              {contributionCount}
            </Body>{' '}
            {t('heroes')} {t('have enabled')}{' '}
            <Body as="span" color="neutral1.12">
              {totalSats.toLocaleString()}
            </Body>{' '}
            {t('sats in contributions to this project.')}
          </Body>
          {!isLoggedIn && (
            <Body
              size="xl"
              pt={4}
              pb={4}
              textAlign="center"
              color="neutral1.11"
              borderTop="1px solid"
              w="full"
              borderColor="neutral1.11"
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
                  <Body as="span" color="neutral1.12" textDecoration="underline dotted" display="inline" bold>
                    {t('Hero link')}
                  </Body>
                </span>
              </Tooltip>{' '}
              {t('and track the impact of sharing.')}
            </Body>
          )}
          <HStack
            h="40px"
            w="full"
            p={2}
            bg="whiteAlpha.700"
            borderRadius={10}
            border="1px solid"
            borderColor="neutral1.7"
            zIndex={1}
          >
            <Body color="neutral1.12" flex={1}>
              <strong>{t('Hero Link:')}</strong> {heroLink.replace('https://', '')}
            </Body>
            <IconButton aria-label="Copy hero link" icon={<PiCopy />} variant="ghost" size="md" onClick={onCopy} />
          </HStack>
        </VStack>
        <HStack w="full" justifyContent="center" spacing={4} zIndex={1}>
          <Button
            size="lg"
            variant="solid"
            bg="whiteAlpha.800"
            color="neutral1.11"
            border="1px solid"
            borderColor="neutral1.7"
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
            onClick={onCopy}
            w="full"
          >
            {t('Copy Hero link')}
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}
