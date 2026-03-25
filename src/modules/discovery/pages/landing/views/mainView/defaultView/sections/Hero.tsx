import { Box, BoxProps, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body, H1 } from '@/shared/components/typography/index.ts'

export const Hero = (props: BoxProps) => {
  const subtitleColor = useColorModeValue('neutral1.11', 'neutral1.10')
  const overlayBg = useColorModeValue('rgba(255, 255, 255, 0.85)', 'rgba(0, 0, 0, 0.7)')

  return (
    <Box w="full" position="relative" overflow="hidden" borderRadius="xl" {...props}>
      <Box
        position="absolute"
        inset={0}
        backgroundImage="url('/images/hero-background.png')"
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        filter="blur(1px)"
        transform="scale(1.05)"
      />
      <Box position="absolute" inset={0} bg={overlayBg} />

      <VStack
        position="relative"
        w="full"
        spacing={6}
        paddingTop={{ base: 8, lg: 10 }}
        paddingBottom={{ base: 16, lg: 20 }}
        paddingX={{ base: 6, lg: 12 }}
        textAlign="left"
        alignItems="flex-start"
        justifyContent="flex-start"
        maxWidth="900px"
      >
        <H1 size={{ base: 'xl', md: '2xl', lg: '4xl' }} bold lineHeight={1.2} letterSpacing="-0.01em">
          {t('Accelerate global Bitcoin Adoption')}
        </H1>
        <Body size={{ base: 'lg', lg: 'xl' }} color={subtitleColor} lineHeight={1.6} maxWidth="700px">
          {t('Contribute to causes, initiatives and creators that push Bitcoin adoption around the world.')}
        </Body>
      </VStack>
    </Box>
  )
}
