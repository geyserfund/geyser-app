import { Box, HStack, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import ReactPlayer from 'react-player'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import { creatorWelcomeVideoUrl } from '../constants.ts'
import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

/** Welcome section with introduction copy and a featured video container. */
export const CreatorWelcomeSection = () => {
  const sectionBackground = useColorModeValue('utils.pbg', 'utils.pbg')
  const videoCardBackground = useColorModeValue('neutral1.1', 'neutral1.3')
  const videoCardBorderColor = useColorModeValue('neutral1.6', 'neutral1.7')
  const missionBadgeBackground = useColorModeValue('primary1.2', 'primary1.3')
  const missionBadgeTextColor = useColorModeValue('primary1.10', 'primary1.10')
  const quoteColor = useColorModeValue('neutral1.11', 'neutral1.11')

  return (
    <Box as="section" w="full" py={{ base: 14, lg: 20 }} backgroundColor={sectionBackground}>
      <CreatorSectionContainer>
        <VStack align="stretch" spacing={{ base: 8, lg: 12 }}>
          <VStack align={{ base: 'start', lg: 'center' }} spacing={3}>
            <Body size="sm" color="primary1.9" fontWeight={700} textTransform="uppercase" letterSpacing="0.09em">
              {t('Built around creators')}
            </Body>
            <H2 size={{ base: '2xl', lg: '4xl' }} bold>
              {t('Welcome to Geyser')}
            </H2>
          </VStack>

          <HStack align="stretch" spacing={{ base: 6, lg: 12 }} flexDirection={{ base: 'column', lg: 'row' }}>
            <Box
              position="relative"
              flex={1}
              borderRadius="2xl"
              overflow="hidden"
              borderWidth="1px"
              borderColor={videoCardBorderColor}
              backgroundColor={videoCardBackground}
              minH={{ base: '280px', lg: '420px' }}
            >
              <ReactPlayer
                url={creatorWelcomeVideoUrl}
                width="100%"
                height="100%"
                controls={true}
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
            </Box>

            <VStack flex={1} align="start" spacing={4} justify="center">
              <Box px={3} py={1} borderRadius="md" backgroundColor={missionBadgeBackground}>
                <Body
                  size="xs"
                  fontWeight={700}
                  color={missionBadgeTextColor}
                  textTransform="uppercase"
                  letterSpacing="0.08em"
                >
                  {t('Our mission')}
                </Body>
              </Box>

              <Body size={{ base: 'xl', lg: '2xl' }} color={quoteColor} fontStyle="italic">
                {t('Every great project begins with people who believe in it.')}
              </Body>

              <Body size="md" color="neutral1.10">
                {t(
                  'Geyser is where ideas meet community. From grassroots educators to artists, open-source builders, event organizers, and storytellers, creators come here to rally support around something that matters.',
                )}
              </Body>

              <Body size="md" color="neutral1.10">
                {t(
                  'Support on Geyser goes beyond transactions. It creates momentum, relationships, and a shared sense of ownership that helps projects grow over time.',
                )}
              </Body>
            </VStack>
          </HStack>
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
