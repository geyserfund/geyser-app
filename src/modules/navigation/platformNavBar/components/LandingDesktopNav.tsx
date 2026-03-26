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
import { useCallback, useRef } from 'react'
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
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

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
    <HStack flex={1} spacing={0} minWidth={0} align="flex-end">
      <HStack
        spacing={{ lg: 0.5, xl: 1 }}
        flexShrink={0}
        minWidth={{ lg: 'auto', xl: '390px' }}
        paddingLeft={{ lg: '180px', xl: 3 }}
        align="flex-end"
      >
        <Menu isOpen={isOpen} onClose={onClose} placement="bottom-start" strategy="fixed">
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
              p={5}
              minWidth="805px"
              borderColor={menuBorderColor}
              backgroundColor={menuBackgroundColor}
              onMouseEnter={handleMenuOpen}
              onMouseLeave={handleMenuClose}
            >
              <SimpleGrid columns={2} columnGap={8} rowGap={3}>
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
                        paddingX={4}
                        paddingY={3.5}
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
                      paddingX={4}
                      paddingY={3.5}
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
      </HStack>

      <HStack flex={1} justify="center" minWidth={0} align="flex-end">
        <LandingSearchInput width={{ lg: '150px', xl: '420px' }} />
      </HStack>
    </HStack>
  )
}
