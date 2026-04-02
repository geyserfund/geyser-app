import { Box, Button, HStack, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRight } from 'react-icons/pi'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

const successStoriesGuideUrl = 'https://guide.geyser.fund/geyser-docs/guides/success-stories'

/** Final call-to-action section closing the creator landing page narrative. */
export const CreatorFinalCtaSection = () => {
  const sectionBackground = useColorModeValue('neutral1.1', 'neutral1.1')
  const secondaryButtonBackground = useColorModeValue('whiteAlpha.260', 'whiteAlpha.260')
  const secondaryButtonBorderColor = useColorModeValue('whiteAlpha.450', 'whiteAlpha.450')
  const secondaryButtonHover = useColorModeValue('whiteAlpha.320', 'whiteAlpha.320')

  return (
    <Box as="section" w="full" py={{ base: 16, lg: 24 }} backgroundColor={sectionBackground}>
      <CreatorSectionContainer>
        <VStack
          spacing={5}
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="whiteAlpha.300"
          background="linear-gradient(135deg, rgba(0, 45, 42, 0.95), rgba(7, 21, 20, 0.95))"
          px={{ base: 5, lg: 12 }}
          py={{ base: 10, lg: 12 }}
          textAlign={{ base: 'left', lg: 'center' }}
          align={{ base: 'start', lg: 'center' }}
        >
          <Body size="sm" color="whiteAlpha.800" fontWeight={700} textTransform="uppercase" letterSpacing="0.1em">
            {t('Join the Geyser creator community')}
          </Body>

          <H2 size={{ base: '2xl', lg: '5xl' }} bold color="white" lineHeight={1.08}>
            {t('Start the project only you can bring to life')}
          </H2>

          <Body size={{ base: 'md', lg: 'lg' }} color="whiteAlpha.900" maxW="760px">
            {t(
              'Whether you are building culture, tools, education, media, or local impact, Geyser gives creators a place to rally support around what matters.',
            )}
          </Body>

          <HStack spacing={3} flexWrap="wrap">
            <Button
              as={Link}
              to={getPath('launchProjectDetails')}
              size="lg"
              colorScheme="primary1"
              rightIcon={<PiArrowRight />}
              borderRadius="12px"
            >
              {t('Start your project')}
            </Button>
            <Button
              as="a"
              href={successStoriesGuideUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
              borderRadius="12px"
              color="white"
              backgroundColor={secondaryButtonBackground}
              borderColor={secondaryButtonBorderColor}
              _hover={{ backgroundColor: secondaryButtonHover }}
            >
              {t('Browse creator stories')}
            </Button>
          </HStack>
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
