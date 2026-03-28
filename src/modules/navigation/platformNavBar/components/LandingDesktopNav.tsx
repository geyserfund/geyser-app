import {
  Badge,
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Portal,
  SimpleGrid,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PiCaretDown } from 'react-icons/pi'
import { Link } from 'react-router'

import { LandingSearchInput } from '@/modules/discovery/pages/landing/components/LandingSearchInput.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'

/** LandingDesktopNav renders the shared desktop platform navigation cluster. */
export const LandingDesktopNav = () => {
  const navButtonRadius = { base: '8px', lg: '10px' }
  const navButtonSize = { base: 'md', lg: 'lg' }
  const navButtonFontSize = { lg: 'sm', xl: 'md' }
  const navButtonPaddingX = { lg: 2, xl: 4 }

  const buttonColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  const menuBorderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
  const menuBackgroundColor = useColorModeValue('white', 'gray.800')
  const menuHoverColor = useColorModeValue('gray.50', 'whiteAlpha.100')
  const mutedColor = useColorModeValue('gray.700', 'gray.300')
  const disabledColor = useColorModeValue('blackAlpha.400', 'whiteAlpha.400')
  const newBadgeTextColor = useColorModeValue('gray.900', 'gray.900')
  const soonBadgeBackgroundColor = useColorModeValue('#d7d7d7', '#a3a3a3')
  const soonBadgeTextColor = useColorModeValue('#555555', '#4a4a4a')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showSearchContent, setShowSearchContent] = useState(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchRevealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  const clearSearchRevealTimeout = useCallback(() => {
    if (searchRevealTimeoutRef.current) {
      clearTimeout(searchRevealTimeoutRef.current)
      searchRevealTimeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isSearchOpen) {
      clearSearchRevealTimeout()
      setShowSearchContent(false)
      return
    }

    clearSearchRevealTimeout()
    searchRevealTimeoutRef.current = setTimeout(() => {
      setShowSearchContent(true)
      searchRevealTimeoutRef.current = null
    }, 140)

    return clearSearchRevealTimeout
  }, [clearSearchRevealTimeout, isSearchOpen])

  const handleMenuOpen = useCallback(() => {
    clearCloseTimeout()
    onOpen()
  }, [clearCloseTimeout, onOpen])

  const handleMenuClose = useCallback(() => {
    clearCloseTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      onClose()
      closeTimeoutRef.current = null
    }, 120)
  }, [clearCloseTimeout, onClose])

  const donateItems = [
    {
      title: t('Fundraisers'),
      description: t('Browse ongoing causes and initiatives.'),
      to: getPath('discoveryFundraisers'),
    },
    {
      title: t('Impact Funds'),
      description: t('Fund a category through curated funds.'),
      to: getPath('discoveryImpactFunds'),
      badge: { label: t('new'), backgroundColor: '#58efd9', textColor: newBadgeTextColor },
    },
    {
      title: t('Campaigns'),
      description: t('Browse time-bound campaigns.'),
      to: getPath('discoveryCampaigns'),
    },
    {
      title: t('Micro-Lending'),
      description: t('Browse loans supporting small businesses.'),
      disabled: true,
      badge: { label: t('soon'), backgroundColor: soonBadgeBackgroundColor, textColor: soonBadgeTextColor },
    },
  ]

  return (
    <HStack flex={1} spacing={0} minWidth={0} justify="center">
      <HStack
        spacing={{ lg: 0.5, xl: 1 }}
        align="center"
        justify="center"
        flexShrink={0}
      >
        <Menu isOpen={isOpen} onClose={onClose} placement="bottom" strategy="fixed">
          <MenuButton
            as={Button}
            variant="ghost"
            size={navButtonSize}
            color={buttonColor}
            borderRadius={navButtonRadius}
            fontSize={navButtonFontSize}
            fontWeight={600}
            rightIcon={<PiCaretDown />}
            paddingX={navButtonPaddingX}
            onMouseEnter={handleMenuOpen}
            onMouseLeave={handleMenuClose}
            onClick={isOpen ? onClose : handleMenuOpen}
          >
            {t('Donate')}
          </MenuButton>
          <Portal>
            <MenuList
              borderRadius="9px"
              overflow="hidden"
              py={5}
              px={8}
              width="fit-content"
              maxWidth="calc(100vw - 32px)"
              borderColor={menuBorderColor}
              backgroundColor={menuBackgroundColor}
              onMouseEnter={handleMenuOpen}
              onMouseLeave={handleMenuClose}
            >
              <SimpleGrid templateColumns="repeat(2, max-content)" columnGap={8} rowGap={3}>
                {donateItems.map((item) => {
                  const content = (
                    <VStack align="stretch" spacing={1.5} width="100%">
                      <HStack align="center" justify="flex-start" spacing={2.5}>
                        <Body
                          fontSize="md"
                          dark={!item.disabled}
                          color={item.disabled ? disabledColor : undefined}
                          fontWeight={400}
                          lineHeight={1.2}
                        >
                          {item.title}
                        </Body>
                        {item.badge ? (
                          <Badge
                            px={2.5}
                            py={0.5}
                            minWidth="54px"
                            textAlign="center"
                            borderRadius="5px"
                            textTransform="lowercase"
                            fontSize="xs"
                            fontWeight={600}
                            backgroundColor={item.badge.backgroundColor}
                            color={item.badge.textColor}
                          >
                            {item.badge.label}
                          </Badge>
                        ) : null}
                      </HStack>
                      <Body
                        fontSize="sm"
                        color={item.disabled ? disabledColor : mutedColor}
                        fontWeight={300}
                        lineHeight={1.4}
                      >
                        {item.description}
                      </Body>
                    </VStack>
                  )

                  if (item.disabled) {
                    return (
                      <Box
                        key={item.title}
                        paddingY={3.5}
                        paddingX={3}
                        backgroundColor="transparent"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="flex-start"
                        cursor="not-allowed"
                        borderRadius="6px"
                      >
                        {content}
                      </Box>
                    )
                  }

                  return (
                    <Box
                      key={item.title}
                      as={Link}
                      to={item.to}
                      paddingY={3.5}
                      paddingX={3}
                      display="flex"
                      alignItems="flex-start"
                      justifyContent="flex-start"
                      backgroundColor="transparent"
                      borderRadius="6px"
                      _hover={{ backgroundColor: menuHoverColor }}
                      _focusVisible={{ backgroundColor: menuHoverColor }}
                      transition="background-color 0.15s ease"
                    >
                      {content}
                    </Box>
                  )
                })}
              </SimpleGrid>
            </MenuList>
          </Portal>
        </Menu>

        <Button
          as={Link}
          to={getPath('discoveryImpactFunds')}
          variant="ghost"
          size={navButtonSize}
          color={buttonColor}
          borderRadius={navButtonRadius}
          fontSize={navButtonFontSize}
          fontWeight={600}
          paddingX={navButtonPaddingX}
        >
          {t('Impact')}
        </Button>

        <Button
          as={Link}
          to={getPath('ambassadorProgram')}
          variant="ghost"
          size={navButtonSize}
          color={buttonColor}
          borderRadius={navButtonRadius}
          fontSize={navButtonFontSize}
          fontWeight={600}
          paddingX={navButtonPaddingX}
        >
          {t('Earn')}
        </Button>

        <Button
          as={Link}
          to={getPath('discoveryNews')}
          variant="ghost"
          size={navButtonSize}
          color={buttonColor}
          borderRadius={navButtonRadius}
          fontSize={navButtonFontSize}
          fontWeight={600}
          paddingX={navButtonPaddingX}
        >
          {t('News')}
        </Button>

        <Box position="relative" width="40px" minWidth="40px" height={{ base: '40px', lg: '44px' }}>
          <Box
            position="absolute"
            left={0}
            top="50%"
            transform="translateY(-50%)"
            width={isSearchOpen ? { lg: '220px', xl: '280px' } : '40px'}
            transformOrigin="left center"
            transition="width 0.42s ease"
            overflow="hidden"
            willChange="width"
            zIndex={3}
            onClick={() => {
              if (!isSearchOpen) {
                setIsSearchOpen(true)
              }
            }}
          >
            <LandingSearchInput
              autoFocus={showSearchContent}
              compact={!isSearchOpen}
              onBlur={() => setIsSearchOpen(false)}
              showContent={showSearchContent}
              width="full"
            />
          </Box>
        </Box>
      </HStack>
    </HStack>
  )
}
