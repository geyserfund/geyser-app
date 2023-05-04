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
import { BiCopy, BiDownload } from 'react-icons/bi'
import { HiOutlineCheck } from 'react-icons/hi'

import { Body2, H3 } from '../../../../components/typography'
import { useProjectContext } from '../../../../context'
import { colors, fonts } from '../../../../styles'
import { Badge, FundingTx } from '../../../../types/generated/graphql'
import { useNotification } from '../../../../utils'
import { AvatarElement } from '../../projectMainBody/components'

export const SuccessImageComponent = ({
  currentBadge,
  fundingTx,
}: {
  currentBadge?: Badge
  fundingTx: FundingTx
}) => {
  const { toast } = useNotification()
  const [copied, setCopied] = useState(false)

  const { project } = useProjectContext()

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
        title: 'failed to download image',
        description: 'please try again',
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
        title: 'failed to download image',
        description: 'please try again',
      })
    }
  }

  const getDataUrl = async () => {
    const element = document.getElementById('successful-contribution-banner')
    if (element) {
      const dataUrl = await htmlToImage.toPng(element, {
        style: { backgroundColor: colors.primary, borderStyle: 'double' },
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
        borderColor="neutral.200"
        borderRadius="8px"
        padding="10px 20px"
        w="full"
      >
        <VStack spacing="0px">
          <H3 fontSize="22px" fontWeight={500} fontFamily={fonts.livvic}>
            Successful contribution to
          </H3>
          <H3 fontSize="22px" fontWeight={700} fontFamily={fonts.livvic}>
            {project.title}
          </H3>
        </VStack>
        {currentBadge ? (
          <VStack w="full" spacing="0px">
            <Image src={currentBadge.image} width="125px" />
            <Body2 color="neutral.900">You won a Nostr badge!</Body2>
          </VStack>
        ) : (
          <Center
            boxSize={'70px'}
            borderRadius="full"
            backgroundColor={'brand.neutral50'}
          >
            <HiOutlineCheck color={'brand.textBlack'} fontSize="50px" />
          </Center>
        )}

        <VStack w="full" alignItems="start">
          <HStack>
            <AvatarElement
              borderRadius="50%"
              user={user}
              noLink
              textProps={{ color: 'neutral.900' }}
            />
          </HStack>
          <Body2 fontStyle="italic">{comment}</Body2>
        </VStack>
      </VStack>
      <HStack w="full" justifyContent="end">
        <Tooltip placement="top" label={copied ? 'copied' : 'copy'}>
          <Button
            size="sm"
            isActive={copied}
            variant="containedWhite"
            aria-label="copy-success-image"
            leftIcon={<BiCopy />}
            onClick={handleCopy}
          >
            <Text variant="caption">Copy</Text>
          </Button>
        </Tooltip>
        <Tooltip placement="top" label="download">
          <Button
            size="sm"
            variant="containedWhite"
            aria-label="download-success-image"
            leftIcon={<BiDownload />}
            onClick={handleDownload}
          >
            <Text variant="caption">Download</Text>
          </Button>
        </Tooltip>
      </HStack>
    </VStack>
  )
}
