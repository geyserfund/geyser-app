import { Box, HStack, Icon, Link as ChakraLink, SkeletonText, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowSquareOut, PiWarning } from 'react-icons/pi'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body } from '@/shared/components/typography'

import { useOgPreview } from '../hooks/useOgPreview.ts'

type OgLinkPreviewCardProps = {
  /** The URL to preview */
  url: string
  /** When provided, shows a "Remove" button for composer context */
  onRemove?: () => void
}

/** Renders an Open Graph preview card for a URL. Handles loading, error, and success states. */
export const OgLinkPreviewCard = ({ url, onRemove }: OgLinkPreviewCardProps) => {
  const { data, loading, error } = useOgPreview(url)

  if (loading) {
    return (
      <CardLayout w="full" padding={3} spacing={2}>
        <HStack w="full" spacing={3}>
          <SkeletonLayout width="72px" height="72px" borderRadius="8px" flexShrink={0} />
          <VStack flex={1} alignItems="start" spacing={2}>
            <SkeletonLayout height="12px" width="80px" />
            <SkeletonLayout height="16px" width="full" />
            <SkeletonText noOfLines={2} width="full" />
          </VStack>
        </HStack>
      </CardLayout>
    )
  }

  if (error || !data) {
    return (
      <CardLayout w="full" padding={3} spacing={2}>
        <HStack spacing={2} alignItems="start">
          <Icon as={PiWarning} color="orange.9" mt="2px" flexShrink={0} />
          <VStack alignItems="start" spacing={1} flex={1}>
            <Body size="sm" muted>
              {t('Preview unavailable')} —{' '}
              <ChakraLink href={url} isExternal color="primary1.11" fontSize="sm">
                {url}
              </ChakraLink>
            </Body>
          </VStack>
          {onRemove && (
            <Body
              size="xs"
              color="error.11"
              cursor="pointer"
              onClick={onRemove}
              _hover={{ textDecoration: 'underline' }}
              flexShrink={0}
            >
              {t('Remove')}
            </Body>
          )}
        </HStack>
      </CardLayout>
    )
  }

  return (
    <ChakraLink href={url} isExternal _hover={{ textDecoration: 'none' }} w="full" display="block">
      <CardLayout w="full" padding={0} spacing={0} overflow="hidden" hover>
        {data.image && (
          <Box w="full" maxHeight="200px" overflow="hidden">
            <ImageWithReload
              src={data.image}
              alt={data.title ?? ''}
              w="full"
              objectFit="cover"
              maxHeight="200px"
            />
          </Box>
        )}
        <VStack alignItems="start" spacing={1} padding={3}>
          {data.domain && (
            <Body size="xs" muted>
              {data.domain}
            </Body>
          )}
          {data.title && (
            <Body size="sm" medium dark noOfLines={2}>
              {data.title}
            </Body>
          )}
          {data.description && (
            <Body size="xs" muted noOfLines={2}>
              {data.description}
            </Body>
          )}
          <HStack spacing={1} color="primary1.11" mt={1}>
            <Icon as={PiArrowSquareOut} fontSize="12px" />
            <Body size="xs" color="primary1.11">
              {t('Visit link')}
            </Body>
          </HStack>
        </VStack>
        {onRemove && (
          <HStack
            w="full"
            borderTop="1px solid"
            borderColor="neutral1.6"
            px={3}
            py={2}
            justifyContent="flex-end"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onRemove()
            }}
          >
            <Body
              size="xs"
              color="error.11"
              cursor="pointer"
              _hover={{ textDecoration: 'underline' }}
            >
              {t('Remove link')}
            </Body>
          </HStack>
        )}
      </CardLayout>
    </ChakraLink>
  )
}
