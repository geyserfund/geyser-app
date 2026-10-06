import { useColorModeValue } from '@chakra-ui/react'

import { brandColors } from '@/shared/styles/brandPalette.ts'
import { useCustomTheme } from '@/utils'

/** Returns the brand series colour for a chart series index: forest first, then neutral and the brand accents (fills/strokes only). */
export const useColorByIndex = () => {
  const { colors } = useCustomTheme()
  /** Sage sits too close to the dark-mode forest, so dark mode uses a deeper forest step instead. */
  const softGreen = useColorModeValue(brandColors.sage, colors.primary1[7])

  const getColorByIndex = (index: number) => {
    const colorsToRender = [
      colors.primary1[9],
      brandColors.burntOchre,
      colors.neutral1[11],
      brandColors.clayTerracotta,
      softGreen,
      colors.neutral1[8],
    ]
    const colorIndex = index % colorsToRender.length
    return colorsToRender[colorIndex]
  }

  return getColorByIndex
}
