import { useMediaQuery } from '@chakra-ui/media-query'

export const useBreakPoint = ({ breakPoint }: { breakPoint: string }) => {
  const [isLargerThanBreakPoint] = useMediaQuery(`(min-width: ${breakPoint})`)

  const onBreakPoint = <T,>(base: T, afterBreakPoint: T) => {
    if (isLargerThanBreakPoint) {
      return afterBreakPoint
    }

    return base
  }

  return onBreakPoint
}
