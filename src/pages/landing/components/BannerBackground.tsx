import { HStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { colors } from '../../../styles'

const DEFAULT_BACKGROUND = `radial-gradient( at center, ${colors.primary400}, ${colors.bgWhite})`

export const BannerBackground = () => {
  const componentRef = useRef<HTMLDivElement>(null)
  const [background, setBackground] = useState(DEFAULT_BACKGROUND)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log('whatr is going on')
    const windowWidth = componentRef.current?.clientWidth || 0
    const windowHeight = componentRef.current?.clientHeight || 0
    const mouseXpercentage = Math.round((event.pageX / windowWidth) * 100)
    const mouseYpercentage = Math.round((event.pageY / windowHeight) * 100)

    setBackground(
      'radial-gradient(at ' +
        mouseXpercentage +
        '% ' +
        mouseYpercentage +
        '%, #6BE7CE, #ffffff)',
    )
  }

  useEffect(() => {
    const
  }, [])

  return (
    <HStack
      ref={componentRef}
      id="radial-gradient"
      top="0px"
      left="0px"
      height="100%"
      width="100%"
      background={background}
      onMouseMoveCapture={handleMouseMove}
    ></HStack>
  )
}
