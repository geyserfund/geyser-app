import {
  type ButtonProps,
  type StackProps,
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  SimpleGrid,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { type ReactNode, useCallback, useEffect, useRef } from 'react'
import { PiArrowUpRightBold } from 'react-icons/pi'
import type { IconType } from 'react-icons'
import { Link as RouterLink } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'

export type NavDropdownMenuItemBadgeTone = 'new' | 'soon'

export type NavDropdownMenuItem = {
  title: string
  description?: string
  to?: string
  href?: string
  disabled?: boolean
  emphasis?: 'default' | 'cta'
  leadingIcon?: IconType
  badge?: {
    label: string
    tone: NavDropdownMenuItemBadgeTone
  }
}

type NavDropdownMenuProps = {
  label: string
  items: NavDropdownMenuItem[]
  mode: 'desktop' | 'mobile'
  isActive?: boolean
  triggerIcon: ReactNode
  triggerProps?: ButtonProps
  menuProps?: StackProps
}

/** Shared dropdown menu used by platform desktop nav and discovery mobile nav. */
export const NavDropdownMenu = ({
  label,
  items,
  mode,
  isActive,
  triggerIcon,
  triggerProps,
  menuProps,
}: NavDropdownMenuProps) => {
  const menuBorderColor = useColorModeValue('neutral1.5', 'neutral1.6')
  const menuBackgroundColor = useColorModeValue('white', 'neutral1.3')
  const menuHoverColor = useColorModeValue('gray.50', 'neutral1.2')
  const mutedColor = useColorModeValue('gray.700', 'neutral1.10')
  const disabledColor = useColorModeValue('blackAlpha.400', 'neutral1.8')
  const newBadgeTextColor = 'gray.900'
  const newBadgeBackgroundColor = useColorModeValue('primary1.4', 'primary1.5')
  const soonBadgeBackgroundColor = useColorModeValue('neutral1.4', 'neutral1.5')
  const soonBadgeTextColor = useColorModeValue('neutral1.10', 'neutral1.11')
  const ctaBackgroundColor = useColorModeValue('primary1.1', 'primary1.3')
  const ctaHoverBackgroundColor = useColorModeValue('primary1.2', 'primary1.4')
  const ctaBorderColor = useColorModeValue('primary1.6', 'primary1.7')
  const ctaTitleColor = 'primary1.11'
  const ctaDescriptionColor = 'primary1.10'
  const { isOpen, onOpen, onClose } = useDisclosure()
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isDesktop = mode === 'desktop'

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

    if (!isDesktop) {
      onClose()
      return
    }

    closeTimeoutRef.current = setTimeout(() => {
      onClose()
      closeTimeoutRef.current = null
    }, 120)
  }, [clearCloseTimeout, isDesktop, onClose])

  const handleItemSelect = useCallback(() => {
    clearCloseTimeout()
    onClose()
  }, [clearCloseTimeout, onClose])

  useEffect(() => {
    return () => {
      clearCloseTimeout()
    }
  }, [clearCloseTimeout])

  const badgeColor = (tone: NavDropdownMenuItemBadgeTone) => {
    if (tone === 'new') {
      return {
        backgroundColor: newBadgeBackgroundColor,
        color: newBadgeTextColor,
      }
    }

    return {
      backgroundColor: soonBadgeBackgroundColor,
      color: soonBadgeTextColor,
    }
  }

  const getItemContent = (item: NavDropdownMenuItem) => {
    const isCta = item.emphasis === 'cta'
    const titleColor = item.disabled ? disabledColor : isCta ? ctaTitleColor : 'utils.text'
    const descriptionColor = item.disabled ? disabledColor : isCta ? ctaDescriptionColor : mutedColor

    return (
      <VStack align="stretch" spacing={isDesktop ? 1.5 : 1} width="100%">
        <HStack align="center" justify="flex-start" spacing={2.5}>
          {item.leadingIcon ? <Icon as={item.leadingIcon} boxSize={isDesktop ? 4 : 3.5} color={titleColor} /> : null}
          <Body
            size={isDesktop ? 'md' : 'sm'}
            dark={!item.disabled}
            color={titleColor}
            fontWeight={isCta ? 600 : 400}
            lineHeight={1.2}
          >
            {item.title}
          </Body>
          {item.badge ? (
            <Badge
              px={isDesktop ? 2.5 : 2}
              py={0.5}
              minWidth={isDesktop ? '54px' : undefined}
              textAlign="center"
              borderRadius="5px"
              textTransform="lowercase"
              fontSize="xs"
              fontWeight={600}
              backgroundColor={badgeColor(item.badge.tone).backgroundColor}
              color={badgeColor(item.badge.tone).color}
            >
              {item.badge.label}
            </Badge>
          ) : null}
          {item.href ? (
            <Icon
              as={PiArrowUpRightBold}
              boxSize={isDesktop ? 3.5 : 3}
              color={titleColor}
            />
          ) : null}
        </HStack>
        {item.description ? (
          <Body
            size={isDesktop ? 'sm' : undefined}
            fontSize={isDesktop ? undefined : 'xs'}
            color={descriptionColor}
            opacity={isCta ? 0.92 : 1}
            fontWeight={300}
            lineHeight={1.4}
          >
            {item.description}
          </Body>
        ) : null}
      </VStack>
    )
  }

  const getDesktopItemElement = (item: NavDropdownMenuItem) => {
    const isCta = item.emphasis === 'cta'
    const ctaStyles = isCta
      ? {
          backgroundColor: ctaBackgroundColor,
          borderWidth: '1px',
          borderColor: ctaBorderColor,
          _hover: { backgroundColor: ctaHoverBackgroundColor },
          _focusVisible: { backgroundColor: ctaHoverBackgroundColor },
        }
      : {
          backgroundColor: 'transparent',
          _hover: { backgroundColor: menuHoverColor },
          _focusVisible: { backgroundColor: menuHoverColor },
        }

    if (item.disabled) {
      return (
        <Box
          key={item.title}
          paddingY={3.5}
          paddingX={3}
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          cursor="not-allowed"
          borderRadius="6px"
          backgroundColor="transparent"
        >
          {getItemContent(item)}
        </Box>
      )
    }

    if (item.href) {
      return (
        <MenuItem
          key={item.title}
          as={ChakraLink}
          href={item.href}
          isExternal={true}
          rel="noopener noreferrer"
          alignItems="flex-start"
          borderRadius="6px"
          paddingX={3}
          paddingY={3.5}
          height="auto"
          whiteSpace="normal"
          transition="background-color 0.15s ease"
          onClick={handleItemSelect}
          {...ctaStyles}
        >
          {getItemContent(item)}
        </MenuItem>
      )
    }

    return (
      <MenuItem
        key={item.title}
        as={RouterLink}
        to={item.to}
        alignItems="flex-start"
        borderRadius="6px"
        paddingX={3}
        paddingY={3.5}
        height="auto"
        whiteSpace="normal"
        transition="background-color 0.15s ease"
        onClick={handleItemSelect}
        {...ctaStyles}
      >
        {getItemContent(item)}
      </MenuItem>
    )
  }

  const getMobileItemElement = (item: NavDropdownMenuItem) => {
    const isCta = item.emphasis === 'cta'
    const ctaStyles = isCta
      ? {
          backgroundColor: ctaBackgroundColor,
          borderWidth: '1px',
          borderColor: ctaBorderColor,
          _hover: { backgroundColor: ctaHoverBackgroundColor },
          _active: { backgroundColor: ctaHoverBackgroundColor },
          _focusVisible: { backgroundColor: ctaHoverBackgroundColor },
        }
      : {
          backgroundColor: 'transparent',
          _hover: { backgroundColor: menuHoverColor },
          _active: { backgroundColor: menuHoverColor },
          _focusVisible: { backgroundColor: menuHoverColor },
        }

    if (item.disabled) {
      return (
        <Box
          key={item.title}
          paddingX={3}
          paddingY={3}
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          cursor="not-allowed"
          borderRadius="8px"
        >
          {getItemContent(item)}
        </Box>
      )
    }

    if (item.href) {
      return (
        <MenuItem
          key={item.title}
          as={ChakraLink}
          href={item.href}
          isExternal={true}
          rel="noopener noreferrer"
          alignItems="flex-start"
          borderRadius="8px"
          paddingX={3}
          paddingY={3}
          height="auto"
          whiteSpace="normal"
          onClick={handleItemSelect}
          {...ctaStyles}
        >
          {getItemContent(item)}
        </MenuItem>
      )
    }

    return (
      <MenuItem
        key={item.title}
        as={RouterLink}
        to={item.to}
        alignItems="flex-start"
        borderRadius="8px"
        paddingX={3}
        paddingY={3}
        height="auto"
        whiteSpace="normal"
        onClick={handleItemSelect}
        {...ctaStyles}
      >
        {getItemContent(item)}
      </MenuItem>
    )
  }

  return (
    <Menu isOpen={isOpen} onClose={handleMenuClose} placement={isDesktop ? 'bottom' : 'top-start'} strategy="fixed">
      <MenuButton
        as={Button}
        rightIcon={triggerIcon}
        onMouseEnter={isDesktop ? handleMenuOpen : undefined}
        onMouseLeave={isDesktop ? handleMenuClose : undefined}
        onClick={isOpen ? handleMenuClose : handleMenuOpen}
        isActive={isActive}
        {...triggerProps}
      >
        {label}
      </MenuButton>
      <Portal>
        <MenuList
          borderRadius={isDesktop ? '9px' : '12px'}
          overflow="hidden"
          py={isDesktop ? 5 : 2.5}
          px={isDesktop ? 8 : 2.5}
          width={isDesktop ? 'fit-content' : undefined}
          minWidth={isDesktop ? undefined : '260px'}
          maxWidth={isDesktop ? 'calc(100vw - 32px)' : undefined}
          borderColor={menuBorderColor}
          backgroundColor={menuBackgroundColor}
          marginBottom={isDesktop ? undefined : 2}
          onMouseEnter={isDesktop ? handleMenuOpen : undefined}
          onMouseLeave={isDesktop ? handleMenuClose : undefined}
          {...menuProps}
        >
          {isDesktop ? (
            <SimpleGrid templateColumns="repeat(2, max-content)" columnGap={8} rowGap={3}>
              {items.map(getDesktopItemElement)}
            </SimpleGrid>
          ) : (
            <VStack align="stretch" spacing={0}>
              {items.map(getMobileItemElement)}
            </VStack>
          )}
        </MenuList>
      </Portal>
    </Menu>
  )
}
