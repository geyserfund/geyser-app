import { HStack } from '@chakra-ui/react'
import { useCallback, useEffect } from 'react'

import { colors } from '../../../styles'

const DEFAULT_BACKGROUND = `radial-gradient( at center, ${colors.primary400}, ${colors.bgWhite})`

export const BannerBackground = () => {
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const element = document.getElementById('radial-gradient')

    if (element) {
      if (event.pageY <= 186) {
        const windowWidth = element.clientWidth
        const windowHeight = element.clientHeight
        const mouseXpercentage = Math.round((event.pageX / windowWidth) * 100)
        const mouseYpercentage = Math.round((event.pageY / windowHeight) * 100)

        element.style.background = `radial-gradient( at ${mouseXpercentage}% ${mouseYpercentage}%, ${colors.primary400}, ${colors.bgWhite}`
      }
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  return (
    <HStack
      id="radial-gradient"
      top="0px"
      left="0px"
      height="100%"
      width="100%"
      background={DEFAULT_BACKGROUND}
      transition="background 0.5s ease"
      borderBottom="4px solid"
      borderColor="neutral.100"
    ></HStack>
  )
}
