import { Box, HStack, Icon, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'

import { CONTENT_PILLARS } from '../constants.ts'

/** "What you get" section listing the newsletter's content pillars. */
export const WhatYouGetSection = () => {
  const panelBg = useColorModeValue('neutral1.1', 'neutral1.2')
  const panelBorder = useColorModeValue('neutral1.3', 'neutral1.4')
  const accentBg = useColorModeValue('primary1.50', 'primary1.900')
  const accentBorder = useColorModeValue('primary1.200', 'primary1.700')
  const iconBg = useColorModeValue('primary1.100', 'primary1.900')
  const iconColor = useColorModeValue('primary1.700', 'primary1.200')
  const titleColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const bodyColor = useColorModeValue('neutral1.9', 'neutral1.10')

  return (
    <VStack
      align="stretch"
      spacing={5}
      bg={panelBg}
      border="1px solid"
      borderColor={panelBorder}
      borderRadius="24px"
      p={{ base: 5, md: 6 }}
    >
      <VStack align="start" spacing={2}>
        <Body size="sm" medium color="primary1.9" textTransform="uppercase" letterSpacing="0.1em">
          {t('What you get')}
        </Body>
        <H3 size={{ base: 'lg', md: 'xl' }} color={titleColor} bold>
          {t('A cleaner read on what matters in Bitcoin')}
        </H3>
        <Body size="md" color={bodyColor} lineHeight={1.7}>
          {t(
            'We filter for signal: on-the-ground adoption, communities building momentum, and new projects worth paying attention to.',
          )}
        </Body>
      </VStack>

      <VStack spacing={3} align="stretch">
        {CONTENT_PILLARS.map((item) => (
          <HStack
            key={item.title}
            align="start"
            spacing={4}
            bg={accentBg}
            border="1px solid"
            borderColor={accentBorder}
            borderRadius="18px"
            p={4}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="44px"
              h="44px"
              borderRadius="full"
              bg={iconBg}
              color={iconColor}
              flexShrink={0}
            >
              <Icon as={item.icon} boxSize={5} />
            </Box>

            <VStack align="start" spacing={1}>
              <Body bold color={titleColor}>
                {item.title}
              </Body>
              <Body size="sm" color={bodyColor} lineHeight={1.6}>
                {item.description}
              </Body>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </VStack>
  )
}
