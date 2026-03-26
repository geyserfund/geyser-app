import { Box, BoxProps, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body, H1 } from '@/shared/components/typography/index.ts'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles'

const STATS = [
  { value: '2,500+', label: 'projects across 158 countries' },
  { value: '41+', label: 'BTC funded' },
] as const

export const Hero = (props: BoxProps) => {
  const subtitleColor = useColorModeValue('neutral1.11', 'neutral1.10')
  const overlayBg = useColorModeValue('rgba(255, 255, 255, 0.85)', 'rgba(0, 0, 0, 0.7)')
  const statLabelColor = useColorModeValue('neutral1.9', 'neutral1.8')

  return (
    <Box
      w="full"
      position="relative"
      overflow="hidden"
      borderRadius={0}
      {...props}
    >
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

      <Box
        position="relative"
        w="full"
        maxWidth={`${dimensions.maxWidth + 24 * 2}px`}
        mx="auto"
        paddingX={standardPadding}
        paddingTop={{ base: 8, lg: 10 }}
        paddingBottom={{ base: 4, lg: 5 }}
      >
        <VStack
          w="full"
          spacing={6}
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

        <HStack
          spacing={{ base: 4, md: 8 }}
          justify="center"
          align="center"
          flexDirection={{ base: 'column', sm: 'row' }}
          w="full"
          pt={{ base: 8, lg: 10 }}
        >
          {STATS.map((stat) => (
            <HStack key={stat.value} spacing={1.5}>
              <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight={700}>
                {stat.value}
              </Text>
              <Text fontSize={{ base: 'sm', md: 'md' }} color={statLabelColor}>
                {stat.label}
              </Text>
            </HStack>
          ))}
        </HStack>
      </Box>
    </Box>
  )
}
