import { Box, useColorMode, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'

/** Candidate primary greens being compared on the landing page. */
const PRIMARY_COLOR_OPTIONS = [
  '#223829',
  '#26483E',
  '#2E6158',
  '#315B4A',
  '#365B52',
  '#3E6554',
  '#4C684A',
  '#5A6B45',
] as const

const LIGHT_MODE_ONLY_VARIABLES = ['--chakra-colors-primary1-11', '--chakra-colors-utils-heading']
const ALL_MODE_VARIABLES = ['--chakra-colors-primary1-9', '--chakra-colors-utils-primarySolid', '--geyser-hero-field']
const HOVER_VARIABLES = ['--chakra-colors-primary1-10', '--chakra-colors-utils-primarySolidHover']

/** Darkens a #rrggbb colour by the given fraction, for hover and pressed states. */
const darken = (hex: string, amount: number) => {
  const channels = [1, 3, 5].map((start) => Math.round(parseInt(hex.slice(start, start + 2), 16) * (1 - amount)))
  return `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
}

/**
 * TEMPORARY design try-out: a floating swatch picker that overrides the primary colour on the landing page.
 * It rewrites theme CSS variables on the root element while mounted and restores them on unmount.
 */
export const PrimaryColorTrial = () => {
  const { colorMode } = useColorMode()
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  useEffect(() => {
    const rootStyle = document.documentElement.style
    const variables = [...ALL_MODE_VARIABLES, ...HOVER_VARIABLES, ...LIGHT_MODE_ONLY_VARIABLES]

    variables.forEach((variable) => rootStyle.removeProperty(variable))

    if (selectedColor) {
      ALL_MODE_VARIABLES.forEach((variable) => rootStyle.setProperty(variable, selectedColor))
      HOVER_VARIABLES.forEach((variable) => rootStyle.setProperty(variable, darken(selectedColor, 0.18)))

      if (colorMode === 'light') {
        LIGHT_MODE_ONLY_VARIABLES.forEach((variable) => rootStyle.setProperty(variable, selectedColor))
      }
    }

    return () => variables.forEach((variable) => rootStyle.removeProperty(variable))
  }, [colorMode, selectedColor])

  const isCustomColor = Boolean(
    selectedColor && !PRIMARY_COLOR_OPTIONS.some((option) => option.toLowerCase() === selectedColor.toLowerCase()),
  )

  return (
    <VStack
      role="group"
      aria-label={t('Try a primary colour')}
      position="fixed"
      right={3}
      top="50%"
      transform="translateY(-50%)"
      zIndex={20}
      spacing={2}
      padding={2}
      bg="utils.pbg"
      border="0.5px solid"
      borderColor="neutral1.6"
      borderRadius="full"
      boxShadow="card"
    >
      {PRIMARY_COLOR_OPTIONS.map((color) => {
        const isSelected = selectedColor?.toLowerCase() === color.toLowerCase()

        return (
          <Box
            key={color}
            as="button"
            type="button"
            aria-label={color}
            aria-pressed={isSelected}
            title={color}
            boxSize={7}
            borderRadius="full"
            background={color}
            border="2px solid"
            borderColor="utils.pbg"
            outline={isSelected ? '2px solid' : 'none'}
            outlineColor="utils.text"
            cursor="pointer"
            transition="transform 0.15s cubic-bezier(0.2, 0, 0, 1)"
            _hover={{ transform: 'scale(1.1)' }}
            _focusVisible={{ outline: '2px solid', outlineColor: 'utils.text' }}
            onClick={() => setSelectedColor(isSelected ? null : color)}
          />
        )
      })}

      {/* Open option: the native colour dialog, which also accepts a typed hex value. */}
      <Box
        as="label"
        title={t('Choose any colour')}
        position="relative"
        boxSize={7}
        borderRadius="full"
        background={
          isCustomColor && selectedColor
            ? selectedColor
            : 'conic-gradient(#d98a3d, #b9644a, #26483e, #2e6158, #9daf91, #d98a3d)'
        }
        border="2px solid"
        borderColor="utils.pbg"
        outline={isCustomColor ? '2px solid' : 'none'}
        outlineColor="utils.text"
        cursor="pointer"
        overflow="hidden"
        transition="transform 0.15s cubic-bezier(0.2, 0, 0, 1)"
        _hover={{ transform: 'scale(1.1)' }}
        _focusWithin={{ outline: '2px solid', outlineColor: 'utils.text' }}
      >
        <Box
          as="input"
          type="color"
          aria-label={t('Choose any colour')}
          value={selectedColor ?? PRIMARY_COLOR_OPTIONS[1]}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setSelectedColor(event.target.value)}
          position="absolute"
          inset={0}
          width="100%"
          height="100%"
          opacity={0}
          cursor="pointer"
        />
      </Box>
    </VStack>
  )
}
