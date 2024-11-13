import { Avatar, Button, HStack, IconButton, Link, Tooltip, useClipboard, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiCopy, PiShareFat } from 'react-icons/pi'

import { AnonymousAvatar } from '@/components/ui/AnonymousAvatar'
import { useFundingFlowAtom } from '@/modules/project/funding/hooks/useFundingFlowAtom'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CampaignContent, useProjectShare } from '@/modules/project/pages1/projectView/hooks'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { Body, H3 } from '@/shared/components/typography'
import { Badge } from '@/types'

export const SuccessImageComponent = ({ currentBadge }: { currentBadge?: Badge }) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()

  const { fundingInputAfterRequest } = useFundingFlowAtom()

  const user = fundingInputAfterRequest?.user

  const heroLink = `https://geyser.fund/project/${project.name}/hero=${user?.username}`
  const contributionCount = 10 // TODO: Get actual contribution count
  const totalSats = 21212129 // TODO: Get actual sats amount

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
        background={'linear-gradient(86deg, #00C7AD 0%, #00EED2 100%)'}
        padding="6%"
        w="full"
        spacing={4}
        justifyContent="center"
        borderRadius={8}
        border="1px solid"
        borderColor="neutral1.7"
        aspectRatio={2.16}
        pl={8}
        pr={8}
      >
        {user && (
          <HStack spacing={2}>
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
        <VStack spacing={1}>
          <H3 color="neutral1.11" fontSize="3xl" regular>
            {t('Successfully contributed to')}
          </H3>
          <H3 color="neutral1.12" bold fontSize="4xl">
            {project.title}
          </H3>
        </VStack>

        <VStack spacing={2} w="full">
          <Body color="neutral1.11" size="xl" regular pb={4}>
            {t('Become an')}{' '}
            <Tooltip label={t('Share your hero link to become a project ambassador')} placement="top">
              <Body as="span" color="neutral1.12" textDecoration="underline dotted" display="inline">
                {t('Ambassador')}
              </Body>
            </Tooltip>{' '}
            {t('for this project by spreading the word using your')}{' '}
            <Tooltip label={t('A unique link that tracks contributions you helped generate')} placement="top">
              <Body as="span" color="neutral1.12" textDecoration="underline dotted" display="inline">
                {t('Hero link')}
              </Body>
            </Tooltip>
            . {t('So far,')}{' '}
            <Body as="span" color="neutral1.12">
              {contributionCount}
            </Body>{' '}
            {t('people')} {t('have enabled')}{' '}
            <Body as="span" color="neutral1.12">
              {totalSats}
            </Body>{' '}
            {t('sats in contributions to this project.')}
          </Body>

          <HStack
            h="40px"
            w="full"
            p={2}
            bg="whiteAlpha.700"
            borderRadius={10}
            border="1px solid"
            borderColor="neutral1.7"
          >
            <Body color="neutral1.12" flex={1}>
              <strong>{t('Hero Link:')}</strong> {heroLink.replace('https://', '')}
            </Body>
            <IconButton aria-label="Copy hero link" icon={<PiCopy />} variant="ghost" size="md" onClick={onCopy} />
          </HStack>
        </VStack>
        <HStack w="full" justifyContent="center" spacing={4}>
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
