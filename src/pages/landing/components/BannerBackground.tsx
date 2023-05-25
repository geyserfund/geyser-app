import { HStack } from '@chakra-ui/react'
import { useCallback, useEffect } from 'react'

import { useCustomTheme } from '../../../utils'

export const BannerBackground = () => {
  const theme = useCustomTheme()

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const element = document.getElementById('radial-gradient')

      if (element) {
        if (event.pageY <= 186) {
          const windowWidth = element.clientWidth
          const windowHeight = element.clientHeight
          const mouseXpercentage = Math.round((event.pageX / windowWidth) * 100)
          const mouseYpercentage = Math.round(
            (event.pageY / windowHeight) * 100,
          )

          element.style.background = `radial-gradient( at ${mouseXpercentage}% ${mouseYpercentage}%, ${theme.primary[400]}, ${theme.neutral[0]}`
        }
      }
    },
    [theme],
  )

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  useEffect(() => {
    const element = document.getElementById('radial-gradient')
    if (element) {
      element.style.background = `radial-gradient( at center, ${theme.primary[400]}, ${theme.neutral[0]})`
    }
  }, [theme])

  return (
    <HStack
      id="radial-gradient"
      top="0px"
      left="0px"
      height="100%"
      width="100%"
      transition="background 0.5s ease"
      borderBottom="4px solid"
      borderColor="neutral.100"
    />
  )
}
