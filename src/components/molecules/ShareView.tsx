import { Button, HStack, Icon, Link, useClipboard, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiCopy, PiShareFat } from 'react-icons/pi'
import Truncate from 'react-truncate-inside'

import { FlowingGifBackground } from '@/modules/discovery/pages/hallOfFame/components/FlowingGifBackground'
import { Body } from '@/shared/components/typography'
import { useNotification } from '@/utils'

export const ShareView = ({
  shareOnXUrl,
  shareUrl,
  shareUrlLabel,
  children,
}: {
  shareOnXUrl: string
  shareUrl: string
  shareUrlLabel: string
  children: React.ReactNode
}) => {
  const { onCopy } = useClipboard(shareUrl)
  const toast = useNotification()
  const { t } = useTranslation()

  const handleCopy = () => {
    onCopy()
    toast.success({
      title: t('Copied!'),
      description: t('Hero link copied to clipboard'),
    })
  }

  return (
    <VStack w="100%">
      <VStack
        bgGradient={'linear(to-r, primary1.4, indigo.3)'}
        p={4}
        borderRadius="md"
        width="100%"
        spacing={2}
        position="relative"
      >
        <Body size="md" textAlign="center">
          <FlowingGifBackground />
          <Body zIndex={1}>{children}</Body>
        </Body>
      </VStack>
      <VStack width="100%" p={3} bgColor="neutral1.2" borderRadius="md" border="1px solid" borderColor="neutral1.6">
        <HStack
          h="40px"
          w="full"
          p={2}
          bg="whiteAlpha.700"
          borderRadius={10}
          border="1px solid"
          borderColor="neutral1.7"
          zIndex={1}
          onClick={handleCopy}
          cursor="pointer"
          _hover={{
            bg: 'whiteAlpha.800',
          }}
        >
          <Body color="neutral1.12">
            <strong>{shareUrlLabel}</strong>
          </Body>

          <>
            {shareUrlLabel || shareUrl.replace('https://', '').length > 40 ? (
              <Truncate text={shareUrl.replace('https://', '')} width={245} offset={20} />
            ) : (
              <Body color="neutral1.12">{shareUrl.replace('https://', '')}</Body>
            )}
            <Icon as={PiCopy} color="neutral1.11" />
          </>
        </HStack>
        <HStack w="full" justifyContent="center" spacing={2}>
          <Button
            variant="solid"
            bg="neutral1.3"
            color="neutral1.11"
            borderRadius={8}
            rightIcon={<PiShareFat />}
            as={Link}
            isExternal
            href={shareOnXUrl}
            w="full"
            _hover={{
              bg: 'whiteAlpha.900',
            }}
          >
            {t('Share on X')}
          </Button>
          <Button
            variant="solid"
            colorScheme="primary1"
            w="full"
            rightIcon={<PiCopy />}
            onClick={handleCopy}
            fontSize="md"
          >
            {t('Copy link')}
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}
