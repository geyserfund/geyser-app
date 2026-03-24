import { useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'

/** LandingHero renders the redesigned discovery hero for the landing page. */
export const LandingHero = () => {
  const backgroundColor = useColorModeValue('#f5f0e6', '#1f2937')
  const accentBorder = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')
  const mutedColor = useColorModeValue('gray.700', 'gray.300')

  return (
    <VStack
      align="stretch"
      spacing={5}
      width="100%"
      padding={{ base: 6, md: 8, xl: 10 }}
      borderRadius="36px"
      background={`radial-gradient(circle at top left, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 35%), ${backgroundColor}`}
      border="1px solid"
      borderColor={accentBorder}
      boxShadow="0 32px 90px rgba(15, 23, 42, 0.09)"
    >
      <H1 size={{ base: '2xl', md: '3xl', xl: '4xl' }} dark bold lineHeight={1} maxW="12ch">
        {t('Accelerate global Bitcoin adoption')}
      </H1>

      <Body size={{ base: 'md', lg: 'lg' }} color={mutedColor} lineHeight={1.7} maxW="56ch">
        {t(
          'Back grassroots initiatives, fund open tools, and help creators turn Bitcoin-first ideas into real-world impact.',
        )}
      </Body>
    </VStack>
  )
}
