import { useCustomTheme } from '@/utils'

export const useColorByIndex = () => {
  const { colors } = useCustomTheme()

  const getColorByIndex = (index: number) => {
    const colorsToRender = [
      colors.amber[9],
      colors.sky[9],
      colors.violet[9],
      colors.lime[9],
      colors.orange[9],
      colors.crimson[9],
      colors.tomato[9],
      colors.indigo[9],
    ]
    const colorIndex = index % colorsToRender.length
    return colorsToRender[colorIndex]
  }

  return getColorByIndex
}
