import { Box, Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'

import { CONTENT_PILLARS } from '../constants.ts'

/** "Why subscribe" section with a responsive grid of content-pillar cards. */
export const ContentPillarsGrid = () => {
  const cardBg = useColorModeValue('white', 'neutral1.2')
  const cardBorder = useColorModeValue('neutral1.3', 'neutral1.4')
  const accentBg = useColorModeValue('primary1.100', 'primary1.900')
  const iconColor = useColorModeValue('primary1.700', 'primary1.200')
  const titleColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const bodyColor = useColorModeValue('neutral1.9', 'neutral1.10')

  return (
    <VStack align="stretch" spacing={5}>
      <VStack align="start" spacing={2}>
        <Body size="sm" medium color="primary1.9" textTransform="uppercase" letterSpacing="0.1em">
          {t('Why subscribe')}
        </Body>
        <H3 size={{ base: 'xl', md: '2xl' }} color={titleColor} bold>
          {t('Built for people who care about the work beneath the headlines')}
        </H3>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
        {CONTENT_PILLARS.map((item) => (
          <VStack
            key={item.title}
            align="start"
            spacing={4}
            bg={cardBg}
            border="1px solid"
            borderColor={cardBorder}
            borderRadius="20px"
            p={6}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="56px"
              h="56px"
              borderRadius="16px"
              bg={accentBg}
              color={iconColor}
            >
              <Icon as={item.icon} boxSize={7} />
            </Box>
            <Body size="lg" bold color={titleColor}>
              {item.title}
            </Body>
            <Body size="md" color={bodyColor} lineHeight={1.7}>
              {item.description}
            </Body>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
