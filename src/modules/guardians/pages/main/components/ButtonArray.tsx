import { Button, HStack, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'

import { fonts } from '@/shared/styles/fonts.ts'

/** Helper function to scroll element into view */
const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const BUTTONS = [
  { elementId: 'guardians-badge', label: 'Nostr Badges' },
  { elementId: 'guardians-card', label: 'Collectible Cards' },
  { elementId: 'guardians-jersey', label: 'Jerseys' },
  { elementId: 'guardians-tshirt', label: 'T-Shirts' },
  { elementId: 'guardians-bitaxe', label: 'BitAxe' },
] as const

/** Displays the in-page merch category shortcuts for the Guardians rewards grid. */
export const ButtonArray = () => {
  const buttonBg = useColorModeValue('white', 'gray.800')
  const buttonBorderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')
  const buttonHoverBg = useColorModeValue('gray.50', 'gray.700')

  return (
    <HStack spacing={3} justify="center" w="full" flexWrap="wrap">
      {BUTTONS.map((button) => (
        <Button
          key={button.elementId}
          size={{ base: 'sm', lg: 'md' }}
          onClick={() => scrollToElement(button.elementId)}
          bg={buttonBg}
          border="1px solid"
          borderColor={buttonBorderColor}
          borderRadius="full"
          paddingX={5}
          fontFamily={fonts.cormorant}
          textTransform="uppercase"
          color="neutral1.12"
          fontWeight={700}
          _hover={{ bg: buttonHoverBg, transform: 'translateY(-1px)' }}
          transition="all 0.2s ease"
        >
          {t(button.label)}
        </Button>
      ))}
    </HStack>
  )
}
