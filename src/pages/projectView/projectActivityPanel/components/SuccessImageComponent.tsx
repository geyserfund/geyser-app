import {
  Button,
  Center,
  HStack,
  Image,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import * as htmlToImage from 'html-to-image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiCopy, BiDownload } from 'react-icons/bi'
import { HiOutlineCheck } from 'react-icons/hi'

import { Body2, H3 } from '../../../../components/typography'
import { useProjectContext } from '../../../../context'
import { fonts, lightModeColors } from '../../../../styles'
import { Badge, FundingTxFragment } from '../../../../types/generated/graphql'
import { useNotification } from '../../../../utils'
import { AvatarElement } from '../../projectMainBody/components'

export const SuccessImageComponent = ({
  currentBadge,
  fundingTx,
}: {
  currentBadge?: Badge
  fundingTx: FundingTxFragment
}) => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const [copied, setCopied] = useState(false)

  const { project } = useProjectContext()

  if (!project) {
    return null
  }

  const handleDownload = async () => {
    try {
      const dataUrl = await getDataUrl()
      const link = document.createElement('a')
      link.download = `share-contribution-to-${project.name}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      toast({
        status: 'error',
        title: 'Failed to download image',
        description: 'Please try again',
      })
    }
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
      }, 1000)
    } catch {
      toast({
        status: 'error',
        title: 'Failed to download image',
        description: 'Please try again',
      })
    }
  }

  const getDataUrl = async () => {
    const element = document.getElementById('successful-contribution-banner')
    if (element) {
      const dataUrl = await htmlToImage.toPng(element, {
        style: { backgroundColor: 'primary.400', borderStyle: 'double' },
      })
      return dataUrl
    }

    return ''
  }

  const {
    comment,
    funder: { user },
  } = fundingTx

  return (
    <VStack w="full" spacing="10px">
      <VStack
        id="successful-contribution-banner"
        spacing="20px"
        borderStyle="dashed"
        borderWidth="2px"
        borderColor={lightModeColors.neutral[900]}
        borderRadius="8px"
        padding="10px 20px"
        w="full"
      >
        <VStack spacing="0px">
          <H3
            color={lightModeColors.neutral[900]}
            fontSize="22px"
            fontWeight={500}
            fontFamily={fonts.livvic}
          >
            {t('Successful contribution to')}
          </H3>
          <H3
            color={lightModeColors.neutral[900]}
            fontSize="22px"
            fontWeight={700}
            fontFamily={fonts.livvic}
          >
            {project.title}
          </H3>
        </VStack>
        {currentBadge ? (
          <VStack w="full" spacing="0px">
            <Image src={currentBadge.image} width="125px" />
            <Body2 color={lightModeColors.neutral[900]}>
              {t('You won a Nostr badge!')}
            </Body2>
          </VStack>
        ) : (
          <Center
            boxSize={'70px'}
            borderRadius="full"
            backgroundColor={lightModeColors.neutral[50]}
          >
            <HiOutlineCheck
              color={lightModeColors.neutral[1000]}
              fontSize="50px"
            />
          </Center>
        )}

        <VStack w="full" alignItems="start">
          <HStack>
            <AvatarElement
              borderRadius="50%"
              user={user}
              noLink
              textProps={{ color: lightModeColors.neutral[900] }}
            />
          </HStack>
          <Body2 color={lightModeColors.neutral[900]} fontStyle="italic">
            {comment}
          </Body2>
        </VStack>
      </VStack>
      <HStack w="full" justifyContent="end">
        <Tooltip placement="top" label={copied ? t('copied') : t('copy')}>
          <Button
            size="sm"
            isActive={copied}
            variant="secondary"
            aria-label="copy-success-image"
            leftIcon={<BiCopy />}
            onClick={handleCopy}
          >
            <Text
              variant="caption"
              fontWeight="bold"
              textTransform="capitalize"
            >
              {t('copy')}
            </Text>
          </Button>
        </Tooltip>
        <Tooltip placement="top" label="download">
          <Button
            size="sm"
            variant="secondary"
            aria-label="download-success-image"
            leftIcon={<BiDownload />}
            onClick={handleDownload}
          >
            <Text variant="caption" fontWeight="bold">
              {t('Download')}
            </Text>
          </Button>
        </Tooltip>
      </HStack>
    </VStack>
  )
}
