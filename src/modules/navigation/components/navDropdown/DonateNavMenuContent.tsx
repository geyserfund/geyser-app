import { Box, Button, HStack, Icon, Link as ChakraLink, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRight, PiCaretRight } from 'react-icons/pi'
import { Link as RouterLink } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'

import { getDonateNavMenu } from './navDropdownItems.ts'

type DonateNavMenuContentProps = {
  compact?: boolean
  onNavigate?: () => void
}

/** Donate mega-menu: Circular Grants, Support Geyser, and legacy crowdfunding. */
export const DonateNavMenuContent = ({ compact = false, onNavigate }: DonateNavMenuContentProps) => {
  const menu = getDonateNavMenu(t)
  const mutedColor = 'neutralAlpha.11'
  const cardBackground = useColorModeValue('utils.pageBg', 'neutral1.2')
  const cardHoverBackground = useColorModeValue('utils.pbg', 'neutral1.3')
  const dividerColor = useColorModeValue('neutral1.5', 'neutral1.6')
  const columnSpacing = compact ? 4 : 5
  const regionGridColumns = compact ? '1fr' : { base: '1fr', md: 'repeat(3, minmax(0, 1fr))' }
  const layoutColumns = compact ? '1fr' : { base: '1fr', lg: 'minmax(0, 1.2fr) 1px minmax(0, 0.95fr)' }
  const regionItems = menu.circularGrants.regions
  const lastRegionIndex = regionItems.length - 1

  return (
    <VStack align="stretch" spacing={compact ? 4 : 5} width="100%">
      <Box
        display="grid"
        gridTemplateColumns={layoutColumns}
        columnGap={compact ? 0 : { base: 0, lg: 6 }}
        rowGap={compact ? 5 : { base: 5, lg: 0 }}
        alignItems="stretch"
      >
        <VStack align="stretch" spacing={columnSpacing} minW={0}>
          <Box
            display="grid"
            gridTemplateColumns={compact ? '1fr' : '1fr auto'}
            gridTemplateAreas={compact ? `"title" "description" "action"` : `"title title" "description action"`}
            columnGap={3}
            rowGap={compact ? 3 : 2}
            alignItems="center"
          >
            <HStack gridArea="title" spacing={2.5} align="center" minW={0}>
              <Icon as={menu.circularGrants.icon} boxSize={7} color="primary1.11" flexShrink={0} />
              <H3 size={compact ? 'lg' : 'xl'} bold>
                {menu.circularGrants.title}
              </H3>
            </HStack>
            <Body gridArea="description" size={compact ? 'sm' : 'md'} color={mutedColor} lineHeight={1.5}>
              {menu.circularGrants.description}
            </Body>
            <Button
              gridArea="action"
              justifySelf={compact ? 'start' : 'end'}
              as={RouterLink}
              to={menu.circularGrants.ctaTo}
              onClick={onNavigate}
              size={compact ? 'md' : 'lg'}
              variant="solid"
              colorScheme="primary1"
              fontWeight={600}
              borderRadius="10px"
              rightIcon={<Icon as={PiArrowRight} />}
            >
              {menu.circularGrants.ctaLabel}
            </Button>
          </Box>

          <VStack align="stretch" spacing={3} pt={2} borderTop="1px solid" borderColor={dividerColor}>
            <Body size="xs" color={mutedColor} fontWeight={600}>
              {menu.circularGrants.regionsLabel}
            </Body>
            <Box display="grid" gridTemplateColumns={regionGridColumns} alignItems="center" minW={0} width="100%">
              {regionItems.map((region, index) => {
                const isFirstRegion = index === 0
                const isLastRegion = index === lastRegionIndex

                return (
                  <ChakraLink
                    key={region.title}
                    as={RouterLink}
                    to={region.to}
                    onClick={onNavigate}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    minW={0}
                    overflow="hidden"
                    paddingY={1}
                    paddingLeft={compact ? 0 : { base: 0, md: isFirstRegion ? 0 : 3 }}
                    paddingRight={compact ? 0 : { base: 0, md: isLastRegion ? 0 : 3 }}
                    borderColor={dividerColor}
                    borderLeftWidth={compact ? 0 : { base: 0, md: isFirstRegion ? 0 : '1px' }}
                    borderBottomWidth={compact ? (isLastRegion ? 0 : '1px') : { base: isLastRegion ? 0 : '1px', md: 0 }}
                    _hover={{ textDecoration: 'none', opacity: 0.75 }}
                  >
                    <Icon as={region.icon} boxSize={7} color="primary1.11" flexShrink={0} />
                    <VStack align="flex-start" spacing={0} minW={0} flex={1} overflow="hidden">
                      <Body size="xs" fontWeight={700} color="utils.text" lineHeight={1.2} whiteSpace="nowrap">
                        {region.title}
                      </Body>
                      <HStack spacing={1} color={mutedColor} align="center" flexWrap="nowrap" minW={0}>
                        <Body size="xs" color={mutedColor} lineHeight={1.2} whiteSpace="nowrap">
                          {region.description}
                        </Body>
                        <Icon as={PiArrowRight} boxSize={3} flexShrink={0} />
                      </HStack>
                    </VStack>
                  </ChakraLink>
                )
              })}
            </Box>
          </VStack>
        </VStack>

        <Box height="1px" backgroundColor={dividerColor} display={{ base: 'block', lg: compact ? 'block' : 'none' }} />
        <Box backgroundColor={dividerColor} display={{ base: 'none', lg: compact ? 'none' : 'block' }} />

        <VStack align="stretch" spacing={columnSpacing} minW={0}>
          <Box
            display="grid"
            gridTemplateColumns={compact ? '1fr' : '1fr auto'}
            gridTemplateAreas={compact ? `"title" "description" "action"` : `"title title" "description action"`}
            columnGap={3}
            rowGap={compact ? 3 : 2}
            alignItems="center"
          >
            <HStack gridArea="title" spacing={2.5} align="center" minW={0}>
              <Icon as={menu.supportGeyser.icon} boxSize={7} color="primary1.11" flexShrink={0} />
              <H3 size={compact ? 'lg' : 'xl'} bold>
                {menu.supportGeyser.title}
              </H3>
            </HStack>
            <Body gridArea="description" size={compact ? 'sm' : 'md'} color={mutedColor} lineHeight={1.5}>
              {menu.supportGeyser.description}
            </Body>
            <Button
              gridArea="action"
              justifySelf={compact ? 'start' : 'end'}
              as={RouterLink}
              to={menu.supportGeyser.ctaTo}
              onClick={onNavigate}
              size={compact ? 'md' : 'lg'}
              variant="outline"
              colorScheme="neutral1"
              bg="utils.pbg"
              color="utils.text"
              fontWeight={600}
              borderRadius="10px"
              rightIcon={<Icon as={PiArrowRight} />}
            >
              {menu.supportGeyser.ctaLabel}
            </Button>
          </Box>

          <VStack align="stretch" spacing={1}>
            {menu.supportGeyser.links.map((link) => (
              <ChakraLink
                key={link.title}
                as={RouterLink}
                to={link.to}
                onClick={onNavigate}
                display="flex"
                alignItems="center"
                gap={2.5}
                paddingX={2}
                paddingY={2}
                borderRadius="10px"
                _hover={{ backgroundColor: cardBackground, textDecoration: 'none' }}
              >
                <Icon as={link.icon} boxSize={4} color="utils.text" flexShrink={0} />
                <VStack align="flex-start" spacing={0.5} flex={1} minW={0}>
                  <Body size="xs" fontWeight={600} color="utils.text" lineHeight={1.2}>
                    {link.title}
                  </Body>
                  <Body size="xs" color={mutedColor} lineHeight={1.3}>
                    {link.description}
                  </Body>
                </VStack>
                <Icon as={PiCaretRight} boxSize={3} color={mutedColor} flexShrink={0} />
              </ChakraLink>
            ))}
          </VStack>
        </VStack>
      </Box>

      <ChakraLink
        as={RouterLink}
        to={menu.legacy.to}
        onClick={onNavigate}
        display="flex"
        flexDirection={compact ? 'column' : 'row'}
        alignItems={compact ? 'flex-start' : 'center'}
        justifyContent="space-between"
        gap={3}
        width="100%"
        paddingX={4}
        paddingY={3}
        borderRadius="14px"
        backgroundColor={cardBackground}
        _hover={{ backgroundColor: cardHoverBackground, textDecoration: 'none' }}
      >
        <HStack align="flex-start" spacing={3} minW={0}>
          <Icon as={menu.legacy.icon} boxSize={5} color="utils.text" mt={0.5} flexShrink={0} />
          <VStack align="flex-start" spacing={0.5} minW={0}>
            <Body size="xs" fontWeight={600} color="utils.text" lineHeight={1.3}>
              {menu.legacy.title}
            </Body>
            <Body size="xs" color={mutedColor} lineHeight={1.3}>
              {menu.legacy.description}
            </Body>
          </VStack>
        </HStack>
        <HStack spacing={1} color="utils.text" flexShrink={0} alignSelf={compact ? 'flex-end' : 'center'}>
          <Body size="xs" fontWeight={600} color="utils.text">
            {menu.legacy.ctaLabel}
          </Body>
          <Icon as={PiArrowRight} boxSize={3} />
        </HStack>
      </ChakraLink>
    </VStack>
  )
}
