import { Box, BoxProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body, H1 } from '@/shared/components/typography/index.ts'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles'

export const Hero = (props: BoxProps) => {
  return (
    <Box w="full" position="relative" overflow="hidden" borderRadius={0} minHeight={{ base: '270px', lg: '390px' }} {...props}>
      <Box
        position="absolute"
        inset={0}
        backgroundImage="url('/images/landing-hero-market.png')"
        backgroundPosition={{ base: 'center', lg: 'center right' }}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      />
      <Box
        position="absolute"
        inset={0}
        background="linear-gradient(90deg, rgba(0, 0, 0, 0.86) 0%, rgba(0, 0, 0, 0.78) 26%, rgba(0, 0, 0, 0.58) 40%, rgba(0, 0, 0, 0.18) 62%, rgba(0, 0, 0, 0.04) 100%)"
      />

      <Box
        position="relative"
        w="full"
        maxWidth={`${dimensions.maxWidth + 24 * 2}px`}
        minHeight={{ base: '270px', lg: '390px' }}
        mx="auto"
        paddingX={standardPadding}
        paddingTop={{ base: 10, lg: 13 }}
        paddingBottom={{ base: 10, lg: 13 }}
        display="flex"
        alignItems="center"
      >
        <VStack
          w="full"
          maxWidth={{ base: 'full', lg: '38%' }}
          spacing={{ base: 4, lg: 5 }}
          textAlign={{ base: 'center', lg: 'left' }}
          alignItems={{ base: 'center', lg: 'flex-start' }}
          justifyContent="flex-start"
        >
          <H1
            size={{ base: '2xl', md: '4xl', lg: '5xl' }}
            bold
            lineHeight={1.2}
            letterSpacing="-0.01em"
            color="white"
            w="full"
          >
            {t('Accelerate global Bitcoin adoption')}
          </H1>
          <Body size={{ base: 'lg', lg: 'xl' }} color="whiteAlpha.900" lineHeight={1.6} w="full">
            {t('Contribute to causes, initiatives and creators that push Bitcoin adoption around the world.')}
          </Body>
        </VStack>
      </Box>
    </Box>
  )
}
