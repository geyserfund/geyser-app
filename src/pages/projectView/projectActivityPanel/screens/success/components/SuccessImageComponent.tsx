import {
  Button,
  HStack,
  Image,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import * as htmlToImage from 'html-to-image'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Body2, H3 } from '../../../../../../components/typography'
import { useProjectContext } from '../../../../../../context'
import { Badge, FundingTxFragment } from '../../../../../../types'
import { useCustomTheme, useNotification } from '../../../../../../utils'
import { AvatarElement } from '../../../../projectMainBody/components'
import ContributionIcon from './ContributionIcon.svg'
import { BiCopy } from 'react-icons/bi'

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

  const { colors } = useCustomTheme()

  const successComponent = useRef<HTMLDivElement>(null)

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
    const element = successComponent.current
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
    <>
      <VStack w="full" spacing="10px">
        <HStack
          id="successful-contribution-banner"
          ref={successComponent}
          spacing={0}
          backgroundColor={colors.primary[100]}
          padding="10px 20px"
          w="full"
          gap={4}
          mb={1}
          borderRadius="8px"
        >
          <Image src={ContributionIcon} width={"100px"}></Image>
          <VStack alignItems={"flex-start"} gap={1}>
            {user && (
              <AvatarElement
                borderRadius="50%"
                user={user}
                noLink
                textProps={{ color: 'neutral.700' }}
              />
            )}
            <H3
              color={"neutral.600"}
              fontSize="18px"
              fontWeight={600}
            >
              {t('Successfully contributed to')}
            </H3>
            <H3
              color={"neutral.900"}
              fontSize="24px"
              fontWeight={700}
            >
              {project.title}
            </H3>
            {currentBadge && (
              <VStack w="full" spacing="0px">
                <Image src={currentBadge.image} width="125px" />
                <Body2 color={'neutral.900'}>
                  {t('You won a Nostr badge!')}
                </Body2>
              </VStack>
            )}
          </VStack>
        </HStack>

        <HStack w="full" justifyContent="end">
          <Tooltip
            w="100%"
            placement="top"
            label={copied ? t('copied') : t('copy')}
          >
            <Button
              size="md"
              w="100%"
              isActive={copied}
              variant="secondary"
              aria-label="copy-success-image"
              leftIcon={<BiCopy />}
              onClick={handleCopy}
              isLoading={successComponent.current === null}
            >
              <Text fontSize="16px" fontWeight="500" color={"neutral.900"}>
                {t('Copy Success image')}
              </Text>
            </Button>
          </Tooltip>
        </HStack>
      </VStack>
      <VStack
        padding={2}
        width={'full'}
        borderRadius="8px"
        backgroundColor={colors.primary[50]}
        spacing={0}
        justify={'flex-start'}
        alignItems="flex-start"
      >
        <HStack>
          <Text
            fontSize={'16px'}
            fontWeight={'normal'}
            textColor={'neutral.900'}
          >
            {t('By')}
          </Text>
          <AvatarElement
            borderRadius="50%"
            user={user}
            noLink
            textProps={{ color: 'neutral.700' }}
          />
        </HStack>
        {comment && (
          <Body2 color={'neutral.700'} fontStyle="italic" mt={2}>
            {comment}
          </Body2>
        )}
      </VStack>
    </>
  )
}
