import { Box, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCopy } from 'react-icons/pi'

import { AmbassadorReferralTermsNotice } from '@/components/molecules/AmbassadorReferralTermsNotice.tsx'
import { Body } from '@/shared/components/typography'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton.ts'

type CopyableLinkCardProps = {
  label: string
  linkValue: string
  colorScheme?: 'primary1' | 'amber'
  showAmbassadorTerms?: boolean
}

/** Clickable link card that mirrors the Ambassador Earnings page copy interaction. */
export const CopyableLinkCard = ({
  label,
  linkValue,
  colorScheme = 'primary1',
  showAmbassadorTerms = false,
}: CopyableLinkCardProps) => {
  const { onCopy, hasCopied } = useCopyToClipboard(linkValue)
  const isAmber = colorScheme === 'amber'
  const containerBg = isAmber ? 'amber.1' : 'neutral1.1'
  const containerBorderColor = isAmber ? 'amber.4' : 'neutral1.5'
  const containerHoverBg = isAmber ? 'amber.2' : 'neutral1.2'
  const containerHoverBorderColor = isAmber ? 'amber.5' : 'neutral1.6'
  const badgeBg = isAmber ? 'amber.2' : 'neutral1.3'
  const badgeBorderColor = isAmber ? 'amber.4' : 'neutral1.5'
  const badgeTextColor = isAmber ? 'amber.11' : 'neutral1.11'
  const activeBorderColor = colorScheme === 'amber' ? 'amber.6' : 'primary1.6'
  const activeLabelColor = colorScheme === 'amber' ? 'amber.9' : 'primary1.9'
  const activeBadgeBg = colorScheme === 'amber' ? 'amber.3' : 'primary1.3'
  const activeBadgeBorderColor = colorScheme === 'amber' ? 'amber.5' : 'primary1.5'
  const activeBadgeTextColor = colorScheme === 'amber' ? 'amber.11' : 'primary1.10'

  return (
    <VStack w="100%" spacing={2} alignItems="stretch">
      <HStack
        as="button"
        type="button"
        onClick={onCopy}
        w="100%"
        p={4}
        bg={containerBg}
        borderWidth="1px"
        borderColor={hasCopied ? activeBorderColor : containerBorderColor}
        borderRadius="xl"
        spacing={4}
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        transition="border-color 0.2s ease, background-color 0.2s ease"
        _hover={{
          borderColor: hasCopied ? activeBorderColor : containerHoverBorderColor,
          bg: containerHoverBg,
        }}
        _active={{
          bg: containerHoverBg,
        }}
      >
        <VStack spacing={1} alignItems="flex-start" flex={1} minW={0}>
          <Body size="xs" medium color={hasCopied ? activeLabelColor : badgeTextColor}>
            {label}
          </Body>
          <Box w="100%" minW={0}>
            <Body
              size="xs"
              color="neutral1.12"
              textAlign="left"
              medium
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              display="block"
            >
              {linkValue.replace('https://', '')}
            </Body>
          </Box>
        </VStack>

        <HStack
          spacing={2}
          px={2.5}
          py={1.5}
          borderRadius="full"
          bg={hasCopied ? activeBadgeBg : badgeBg}
          borderWidth="1px"
          borderColor={hasCopied ? activeBadgeBorderColor : badgeBorderColor}
          flexShrink={0}
        >
          <Body size="sm" medium color={hasCopied ? activeBadgeTextColor : badgeTextColor}>
            {hasCopied ? t('Copied') : t('Copy')}
          </Body>
          <Icon as={PiCopy} boxSize={5} color={hasCopied ? activeBadgeTextColor : badgeTextColor} />
        </HStack>
      </HStack>

      {showAmbassadorTerms ? <AmbassadorReferralTermsNotice /> : null}
    </VStack>
  )
}
