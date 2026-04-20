import { Box, Button, HStack, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PiCaretDown } from 'react-icons/pi'
import { Link } from 'react-router'

import { LandingSearchInput } from '@/modules/discovery/pages/landing/components/LandingSearchInput.tsx'
import {
  getDonateNavDropdownItems,
  getFundraiseNavDropdownItems,
} from '@/modules/navigation/components/navDropdown/navDropdownItems.ts'
import { NavDropdownMenu } from '@/modules/navigation/components/navDropdown/NavDropdownMenu.tsx'
import { getPath } from '@/shared/constants/index.ts'

/** LandingDesktopNav renders the shared desktop platform navigation cluster. */
export const LandingDesktopNav = ({ transparentMode = false }: { transparentMode?: boolean }) => {
  const navButtonRadius = { base: '8px', lg: '10px' }
  const navButtonSize = { base: 'md', lg: 'lg' }
  const navButtonFontSize = { lg: 'sm', xl: 'md' }
  const navButtonPaddingX = { lg: 2, xl: 4 }

  const defaultButtonColor = useColorModeValue('black', 'white')
  const buttonColor = transparentMode ? 'white' : defaultButtonColor
  const defaultButtonHoverBackground = useColorModeValue('blackAlpha.50', 'neutral1.3')
  const buttonHoverBackground = transparentMode ? 'whiteAlpha.200' : defaultButtonHoverBackground
  const defaultButtonActiveBackground = useColorModeValue('blackAlpha.100', 'neutral1.2')
  const buttonActiveBackground = transparentMode ? 'whiteAlpha.300' : defaultButtonActiveBackground
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showSearchContent, setShowSearchContent] = useState(false)
  const searchRevealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  useEffect(() => {
    return () => {
      clearSearchRevealTimeout()
    }
  }, [clearSearchRevealTimeout])

  const donateItems = getDonateNavDropdownItems(t)
  const fundraiseItems = getFundraiseNavDropdownItems(t)

  return (
    <HStack flex={1} spacing={0} minWidth={0} justify="center">
      <HStack spacing={{ lg: 0.5, xl: 1 }} align="center" justify="center" flexShrink={0}>
        <NavDropdownMenu
          label={t('Donate')}
          items={donateItems}
          mode="desktop"
          triggerIcon={<PiCaretDown />}
          triggerProps={{
            variant: 'ghost',
            size: navButtonSize,
            color: buttonColor,
            borderRadius: navButtonRadius,
            fontSize: navButtonFontSize,
            fontWeight: 600,
            paddingX: navButtonPaddingX,
            _hover: { backgroundColor: buttonHoverBackground },
            _active: { backgroundColor: buttonActiveBackground },
            _expanded: { backgroundColor: buttonHoverBackground },
          }}
        />

        <NavDropdownMenu
          label={t('Fundraise')}
          items={fundraiseItems}
          mode="desktop"
          triggerIcon={<PiCaretDown />}
          triggerProps={{
            variant: 'ghost',
            size: navButtonSize,
            color: buttonColor,
            borderRadius: navButtonRadius,
            fontSize: navButtonFontSize,
            fontWeight: 600,
            paddingX: navButtonPaddingX,
            _hover: { backgroundColor: buttonHoverBackground },
            _active: { backgroundColor: buttonActiveBackground },
            _expanded: { backgroundColor: buttonHoverBackground },
          }}
        />

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
          _hover={{ backgroundColor: buttonHoverBackground }}
          _active={{ backgroundColor: buttonActiveBackground }}
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
          _hover={{ backgroundColor: buttonHoverBackground }}
          _active={{ backgroundColor: buttonActiveBackground }}
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
              transparentMode={transparentMode}
              width="full"
            />
          </Box>
        </Box>
      </HStack>
    </HStack>
  )
}
