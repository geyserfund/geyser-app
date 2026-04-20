import { Box, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import ReactPlayer from 'react-player'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import { creatorWelcomeVideoUrl } from '../constants.ts'
import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

/** Welcome section with introduction copy and a featured video container. */
export const CreatorWelcomeSection = () => {
  const sectionBackground = 'utils.pbg'
  const videoCardBackground = useColorModeValue('neutral1.1', 'neutral1.3')
  const videoCardBorderColor = useColorModeValue('neutral1.6', 'neutral1.7')
  const videoCaptionBackground = useColorModeValue(
    'linear(to-t, var(--chakra-colors-overlay-black-8), var(--chakra-colors-overlay-black-3), transparent)',
    'linear(to-t, var(--chakra-colors-overlay-white-8), var(--chakra-colors-overlay-white-3), transparent)',
  )
  const videoCardShadow = useColorModeValue(
    '0 28px 70px var(--chakra-colors-overlay-black-4)',
    '0 28px 70px var(--chakra-colors-overlay-white-5)',
  )

  return (
    <Box as="section" w="full" py={{ base: 14, lg: 20 }} backgroundColor={sectionBackground}>
      <CreatorSectionContainer>
        <VStack align="stretch" spacing={{ base: 8, lg: 10 }}>
          <VStack align={{ base: 'start', lg: 'center' }} spacing={3} textAlign={{ base: 'left', lg: 'center' }}>
            <Body size="sm" color="primary1.9" fontWeight={700} textTransform="uppercase" letterSpacing="0.09em">
              {t('Built around creators')}
            </Body>
            <H2 size={{ base: '2xl', lg: '4xl' }} bold>
              {t('Welcome to Geyser')}
            </H2>
            <Body size="md" color="neutral1.10" maxW="780px">
              {t('Geyser is where ideas meet community, helping creators rally support around what matters most.')}
            </Body>
          </VStack>

          <Box
            position="relative"
            borderRadius="2xl"
            overflow="hidden"
            borderWidth="1px"
            borderColor={videoCardBorderColor}
            backgroundColor={videoCardBackground}
            aspectRatio={{ base: '16 / 10', lg: '16 / 9' }}
            boxShadow={videoCardShadow}
            maxW={{ base: 'full', lg: '1020px' }}
            mx="auto"
            w="full"
          >
            <ReactPlayer
              url={creatorWelcomeVideoUrl}
              width="100%"
              height="100%"
              controls={true}
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
            <Box pointerEvents="none" position="absolute" inset={0} bgGradient={videoCaptionBackground} />
            <Box pointerEvents="none" position="absolute" left={0} right={0} bottom={0} px={6} py={4}>
              <Body
                fontSize="xs"
                fontWeight={700}
                color="whiteAlpha.850"
                letterSpacing="0.04em"
                textTransform="uppercase"
              >
                {t('Our story • 3 min')}
              </Body>
            </Box>
          </Box>
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
