import { Avatar, Button, HStack, Image, Link, Tooltip, VStack } from '@chakra-ui/react'
import * as htmlToImage from 'html-to-image'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCopy, PiShareFat } from 'react-icons/pi'

import { useFundingFlowAtom } from '@/modules/project/funding/hooks/useFundingFlowAtom'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CampaignContent, useProjectShare } from '@/modules/project/pages1/projectView/hooks'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { Body, H3 } from '@/shared/components/typography'
import { lightModeColors } from '@/shared/styles'
import { Badge } from '@/types'
import { useNotification } from '@/utils'

import ContributionIcon from './ContributionIcon.svg'

export const SuccessImageComponent = ({ currentBadge }: { currentBadge?: Badge }) => {
  const { t } = useTranslation()
  const toast = useNotification()
  const [copied, setCopied] = useState(false)

  const [successComponent, setSuccessComponent] = useState<HTMLDivElement | null>(null)

  const { project } = useProjectAtom()

  const { fundingInputAfterRequest } = useFundingFlowAtom()

  const user = fundingInputAfterRequest?.user

  const ref = useCallback((node: HTMLDivElement | null) => {
    setSuccessComponent(node)
  }, [])

  const { getShareProjectUrl } = useProjectShare()

  const projectShareUrl = getShareProjectUrl({ clickedFrom: CampaignContent.successScreen })

  if (!project) {
    return null
  }

  const handleCopy = async () => {
    try {
      const dataUrl = await getDataUrl()
      const base64Response = await fetch(dataUrl)
      const blob = await base64Response.blob()
      const items = { [blob.type]: blob }
      const clipboardItem = new ClipboardItem(items)
      await navigator.clipboard.write([clipboardItem])
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        toast.success({
          title: 'Copied!',
          description: 'Ready to paste into Social media posts',
        })
      }, 1000)
    } catch {
      toast.error({
        title: 'Failed to download image',
        description: 'Please try again',
      })
    }
  }

  const getDataUrl = async () => {
    const element = successComponent
    if (element) {
      const dataUrl = await htmlToImage.toPng(element, {
        style: { backgroundColor: 'primary.400', borderStyle: 'double' },
      })
      return dataUrl
    }

    return ''
  }

  const twitterShareText = `I just contributed to ${project.title} on Geyser! Check it out: ${projectShareUrl}`

  return (
    <VStack w="full" spacing={6}>
      <HStack
        id="successful-contribution-banner"
        ref={ref}
        background={'linear-gradient(86deg, #00C7AD 0%, #00EED2 100%)'}
        padding="6%"
        w="full"
        gap={'10%'}
        justifyContent="center"
        borderRadius="15px"
        border="2px solid"
        borderColor={lightModeColors.primary1[11]}
        aspectRatio={2.16}
      >
        <Image src={ContributionIcon} height="100%"></Image>
        <VStack alignItems={'flex-start'} gap={1}>
          {user && user.id && (
            <HStack>
              <Avatar
                src={user.imageUrl || ''}
                height={{ base: '30px', md: '50px', lg: '60px' }}
                width={{ base: '30px', md: '50px', lg: '60px' }}
              />
              <Body size={{ base: 'xl', md: '2xl', lg: '3xl' }} color="utils.whiteContrast">
                {user.username}
              </Body>
            </HStack>
          )}
          <H3 size={{ base: 'xl', md: '3xl', lg: '4xl' }} color={lightModeColors.primary1[11]}>
            {t('Successfully contributed to')}
          </H3>
          <H3 size={{ base: '2xl', md: '4xl', lg: '5xl' }} color={lightModeColors.primary1[12]} bold>
            {project.title}
          </H3>
          {currentBadge && (
            <VStack w="full" spacing="0px">
              <Image src={currentBadge.image} width="125px" />
              <Body color="utils.whiteContrast" light>
                {t('You won a Nostr badge!')}
              </Body>
            </VStack>
          )}
        </VStack>
      </HStack>

      <HStack w="full" justifyContent="end">
        <Tooltip w="100%" placement="top" label={copied ? t('copied') : t('copy')}>
          <Button
            size="lg"
            isActive={copied}
            variant="outline"
            colorScheme="neutral1"
            aria-label="copy-success-image"
            rightIcon={<PiCopy />}
            onClick={handleCopy}
            isLoading={successComponent === null}
          >
            {t('Copy Success image')}
          </Button>
        </Tooltip>
        <Button
          size="lg"
          variant="soft"
          colorScheme="neutral1"
          aria-label="post-success-to-twitter"
          rightIcon={<PiShareFat />}
          as={Link}
          isExternal
          href={generateTwitterShareUrl(twitterShareText)}
        >
          {t('Share on X')}
        </Button>
      </HStack>
    </VStack>
  )
}
