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
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { type ReactNode, useCallback, useEffect, useRef } from 'react'
import type { IconType } from 'react-icons'
import { PiArrowUpRightBold } from 'react-icons/pi'
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
  card?: boolean
  indent?: boolean
  leadingIcon?: IconType
  trailingIcon?: IconType
  badge?: {
    label: string
    tone: NavDropdownMenuItemBadgeTone
  }
}

export type NavDropdownMenuSection = {
  layout?: 'stack' | 'cards'
  title?: string
  items: NavDropdownMenuItem[]
}

type NavDropdownMenuProps = {
  label: string
  items?: NavDropdownMenuItem[]
  sections?: NavDropdownMenuSection[]
  renderContent?: (helpers: { onNavigate: () => void }) => ReactNode
  mode: 'desktop' | 'mobile'
  isActive?: boolean
  triggerIcon: ReactNode
  triggerProps?: ButtonProps
  menuProps?: StackProps
}

const CardItemContent = ({
  item,
  isDesktop,
  titleColor,
  descriptionColor,
}: {
  item: NavDropdownMenuItem
  isDesktop: boolean
  titleColor: string
  descriptionColor: string
}) => (
  <VStack align="flex-start" spacing={2} width="100%">
    {item.leadingIcon ? <Icon as={item.leadingIcon} boxSize={7} color="primary1.9" /> : null}
    <Body size={isDesktop ? 'md' : 'sm'} dark={!item.disabled} color={titleColor} fontWeight={600} lineHeight={1.2}>
      {item.title}
    </Body>
    {item.description ? (
      <Body
        size={isDesktop ? 'sm' : undefined}
        fontSize={isDesktop ? undefined : 'xs'}
        color={descriptionColor}
        fontWeight={300}
        lineHeight={1.4}
        whiteSpace="normal"
      >
        {item.description}
      </Body>
    ) : null}
  </VStack>
)

/** Shared dropdown menu used by platform desktop nav and discovery mobile nav. */
export const NavDropdownMenu = ({
  label,
  items,
  sections,
  renderContent,
  mode,
  isActive,
  triggerIcon,
  triggerProps,
  menuProps,
}: NavDropdownMenuProps) => {
  const menuBorderColor = useColorModeValue('neutral1.5', 'neutral1.6')
  const menuBackgroundColor = useColorModeValue('white', 'neutral1.3')
  const menuHoverColor = useColorModeValue('gray.50', 'neutral1.2')
  const cardBackgroundColor = useColorModeValue('gray.50', 'neutral1.2')
  const disabledColor = useColorModeValue('blackAlpha.400', 'neutral1.8')
  const newBadgeTextColor = 'gray.900'
  const newBadgeBackgroundColor = useColorModeValue('primary1.4', 'primary1.5')
  const soonBadgeBackgroundColor = useColorModeValue('neutral1.4', 'neutral1.5')
  const soonBadgeTextColor = useColorModeValue('neutral1.10', 'neutral1.11')
  const ctaBorderColor = useColorModeValue('primary1.6', 'primary1.7')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isDesktop = mode === 'desktop'
  const menuSections = sections ?? [{ items: items ?? [] }]

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
    const hasDescription = Boolean(item.description)
    const titleColor = item.disabled ? disabledColor : 'black'
    const descriptionColor = titleColor

    if (item.card) {
      return (
        <CardItemContent
          item={item}
          isDesktop={isDesktop}
          titleColor={titleColor}
          descriptionColor={descriptionColor}
        />
      )
    }

    return (
      <VStack
        align="stretch"
        justify={hasDescription ? 'flex-start' : 'center'}
        spacing={isDesktop ? 1.5 : 1}
        width="100%"
      >
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
          {item.trailingIcon ? <Icon as={item.trailingIcon} boxSize={isDesktop ? 4 : 3.5} color={titleColor} /> : null}
          {item.href ? <Icon as={PiArrowUpRightBold} boxSize={isDesktop ? 3.5 : 3} color={titleColor} /> : null}
        </HStack>
        {item.description ? (
          <Body
            size={isDesktop ? 'sm' : undefined}
            fontSize={isDesktop ? undefined : 'xs'}
            color={descriptionColor}
            fontWeight={300}
            lineHeight={1.4}
            whiteSpace="normal"
            width="100%"
          >
            {item.description}
          </Body>
        ) : null}
      </VStack>
    )
  }

  const getDesktopItemElement = (item: NavDropdownMenuItem) => {
    const isCta = item.emphasis === 'cta'
    const hasDescription = Boolean(item.description)
    const ctaStyles = isCta
      ? {
          backgroundColor: 'transparent',
          borderWidth: '1px',
          borderColor: ctaBorderColor,
          _hover: { backgroundColor: 'transparent' },
          _focusVisible: { backgroundColor: 'transparent' },
        }
      : {
          backgroundColor: 'transparent',
          _hover: { backgroundColor: menuHoverColor },
          _focusVisible: { backgroundColor: menuHoverColor },
        }
    const cardStyles = item.card
      ? {
          backgroundColor: cardBackgroundColor,
          borderWidth: '1px',
          borderColor: menuBorderColor,
          minWidth: '180px',
          height: '100%',
          _hover: { backgroundColor: menuHoverColor, borderColor: 'primary1.6' },
          _focusVisible: { backgroundColor: menuHoverColor, borderColor: 'primary1.6' },
        }
      : {}

    if (item.disabled) {
      return (
        <Box
          key={item.title}
          paddingY={3.5}
          paddingX={item.indent ? 7 : 3}
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
          alignItems={hasDescription ? 'flex-start' : 'center'}
          borderRadius="6px"
          paddingX={item.card ? 4 : item.indent ? 7 : 3}
          paddingY={item.card ? 4 : 3.5}
          height="auto"
          width={item.card ? 'auto' : '100%'}
          whiteSpace="normal"
          overflow="visible"
          transition="background-color 0.15s ease"
          onClick={handleItemSelect}
          {...ctaStyles}
          {...cardStyles}
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
        alignItems={hasDescription ? 'flex-start' : 'center'}
        borderRadius="6px"
        paddingX={item.card ? 4 : item.indent ? 7 : 3}
        paddingY={item.card ? 4 : 3.5}
        height="auto"
        width={item.card ? 'auto' : '100%'}
        whiteSpace="normal"
        overflow="visible"
        transition="background-color 0.15s ease"
        onClick={handleItemSelect}
        {...ctaStyles}
        {...cardStyles}
      >
        {getItemContent(item)}
      </MenuItem>
    )
  }

  const getMobileItemElement = (item: NavDropdownMenuItem) => {
    const isCta = item.emphasis === 'cta'
    const hasDescription = Boolean(item.description)
    const ctaStyles = isCta
      ? {
          backgroundColor: 'transparent',
          borderWidth: '1px',
          borderColor: ctaBorderColor,
          _hover: { backgroundColor: 'transparent' },
          _active: { backgroundColor: 'transparent' },
          _focusVisible: { backgroundColor: 'transparent' },
        }
      : {
          backgroundColor: 'transparent',
          _hover: { backgroundColor: menuHoverColor },
          _active: { backgroundColor: menuHoverColor },
          _focusVisible: { backgroundColor: menuHoverColor },
        }
    const cardStyles = item.card
      ? {
          backgroundColor: cardBackgroundColor,
          borderWidth: '1px',
          borderColor: menuBorderColor,
          _hover: { backgroundColor: menuHoverColor, borderColor: 'primary1.6' },
          _active: { backgroundColor: menuHoverColor, borderColor: 'primary1.6' },
          _focusVisible: { backgroundColor: menuHoverColor, borderColor: 'primary1.6' },
        }
      : {}

    if (item.disabled) {
      return (
        <Box
          key={item.title}
          paddingX={item.indent ? 7 : 3}
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
          alignItems={hasDescription ? 'flex-start' : 'center'}
          borderRadius="8px"
          paddingX={item.card ? 4 : 3}
          paddingY={item.card ? 4 : 3}
          height="auto"
          whiteSpace="normal"
          onClick={handleItemSelect}
          {...ctaStyles}
          {...cardStyles}
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
        alignItems={hasDescription ? 'flex-start' : 'center'}
        borderRadius="8px"
        paddingX={item.card ? 4 : item.indent ? 7 : 3}
        paddingY={item.card ? 4 : 3}
        height="auto"
        whiteSpace="normal"
        onClick={handleItemSelect}
        {...ctaStyles}
        {...cardStyles}
      >
        {getItemContent(item)}
      </MenuItem>
    )
  }

  return (
    <Menu
      isOpen={isOpen}
      onClose={handleMenuClose}
      placement={isDesktop ? 'bottom-start' : 'top-start'}
      strategy="fixed"
      gutter={8}
      flip={!isDesktop}
      preventOverflow={true}
      closeOnSelect={!renderContent}
    >
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
          borderRadius={isDesktop ? '16px' : '12px'}
          overflow="visible"
          py={isDesktop ? 5 : 2.5}
          px={isDesktop ? 6 : 2.5}
          width={isDesktop ? 'auto' : undefined}
          minWidth={isDesktop ? (renderContent ? '720px' : '240px') : '260px'}
          maxWidth={isDesktop ? (renderContent ? 'min(980px, calc(100vw - 32px))' : '280px') : undefined}
          borderColor={menuBorderColor}
          backgroundColor={menuBackgroundColor}
          marginBottom={isDesktop ? undefined : 2}
          onMouseEnter={isDesktop ? handleMenuOpen : undefined}
          onMouseLeave={isDesktop ? handleMenuClose : undefined}
          {...menuProps}
        >
          {renderContent ? (
            renderContent({ onNavigate: handleItemSelect })
          ) : isDesktop ? (
            <HStack align="stretch" spacing={6} width="100%">
              {menuSections.map((section, index) => (
                <VStack
                  key={section.title ?? `section-${index}`}
                  align="stretch"
                  spacing={1}
                  width={section.layout === 'cards' ? 'auto' : '100%'}
                  minWidth={section.layout === 'cards' ? '0' : undefined}
                  flex={section.layout === 'cards' ? 1 : undefined}
                >
                  {section.title ? (
                    <Body
                      as="h2"
                      size="xs"
                      dark
                      fontWeight={700}
                      letterSpacing="0.08em"
                      textTransform="uppercase"
                      paddingX={3}
                      paddingBottom={1}
                    >
                      {section.title}
                    </Body>
                  ) : null}
                  {section.layout === 'cards' ? (
                    <Box display="grid" gridTemplateColumns="repeat(3, minmax(160px, 1fr))" gap={3} height="100%">
                      {section.items.map(getDesktopItemElement)}
                    </Box>
                  ) : (
                    section.items.map(getDesktopItemElement)
                  )}
                </VStack>
              ))}
            </HStack>
          ) : (
            <VStack align="stretch" spacing={0}>
              {menuSections.map((section, index) => (
                <VStack
                  key={section.title ?? `section-${index}`}
                  align="stretch"
                  spacing={0}
                  borderTop={index > 0 ? '1px solid' : undefined}
                  borderColor={index > 0 ? menuBorderColor : undefined}
                  paddingTop={index > 0 ? 2 : 0}
                  marginTop={index > 0 ? 2 : 0}
                >
                  {section.title ? (
                    <Body
                      as="h2"
                      size="xs"
                      dark
                      fontWeight={700}
                      letterSpacing="0.08em"
                      textTransform="uppercase"
                      paddingX={3}
                      paddingY={2}
                    >
                      {section.title}
                    </Body>
                  ) : null}
                  {section.layout === 'cards' ? (
                    <Box display="flex" flexDirection="column" gap={2}>
                      {section.items.map(getMobileItemElement)}
                    </Box>
                  ) : (
                    section.items.map(getMobileItemElement)
                  )}
                </VStack>
              ))}
            </VStack>
          )}
        </MenuList>
      </Portal>
    </Menu>
  )
}
