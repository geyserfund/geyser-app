import { Box, BoxProps } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

import { dimensions } from '../../constants'
import { useListenerState } from '../../hooks'

interface StickToTopProps extends BoxProps {
  id: string
  scrollContainerId?: string // leave empty if mobile view, else the ID of the container that is scrolling
  wrapperId?: string // Immediate wrapper of the component, required, for container width after position is updated
  offset?: number // position of the element from the top
  bias?: number // Triggers move to position before this many pixels.
  buffer?: number // Prevents toggle back to position until the difference in scroll exceeds this number
  disable?: boolean
  _onStick?: BoxProps
}

export const BUFFER_PIXELS = 5

export const StickToTop = ({
  id,
  scrollContainerId,
  wrapperId,
  bias = 0,
  buffer = 0,
  offset = dimensions.topNavBar.desktop.height,
  disable,
  children,
  _onStick,
  ...rest
}: StickToTopProps) => {
  const [stick, setStick] = useListenerState(false)
  const containerRef = useRef<any>(null)
  const [wrapperElement, setWrapperElement] =
    useListenerState<HTMLElement | null>(null)

  useEffect(() => {
    if (disable) {
      return
    }

    if (wrapperId) {
      const wrapperElement = document.getElementById(wrapperId)
      setWrapperElement(wrapperElement)
    }

    if (scrollContainerId) {
      const element = document.getElementById(scrollContainerId)
      if (element) {
        element.addEventListener('scroll', handleScroll)
      }

      return () => {
        if (element) {
          element.removeEventListener('scroll', handleScroll)
        }
      }
    }

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [scrollContainerId, disable])

  async function handleScroll(this: HTMLElement) {
    let scrollTop = 0

    console.log('handing scroll')

    if (scrollContainerId) {
      scrollTop = this.scrollTop
      console.log('if scrollContainerId', scrollTop)
    } else {
      scrollTop = document.scrollingElement?.scrollTop || 0
    }

    let currentElement

    if (stick.current) {
      currentElement = document.getElementById(palceholderId)
    } else {
      currentElement = document.getElementById(id)
    }

    if (currentElement) {
      const scrollValue =
        currentElement.offsetTop -
        currentElement.scrollTop +
        currentElement.clientTop -
        scrollTop
      if (scrollValue <= offset + bias) {
        setStick(true)
      } else if (scrollValue > offset + bias + buffer) {
        setStick(false)
      }
    }
  }

  const onStick = stick.current
    ? _onStick || { width: wrapperElement.current?.clientWidth }
    : {}

  const palceholderId = `${id}-placeholder`
  return (
    <>
      <Box
        id={id}
        ref={containerRef}
        backgroundColor="neutral.0"
        position={stick.current ? 'fixed' : 'static'}
        top={`${offset}px`}
        zIndex={10}
        {...rest}
        {...onStick}
      >
        {children}
      </Box>
      {stick.current && (
        <Box
          id={palceholderId}
          height={`${containerRef.current?.offsetHeight}px`}
        />
      )}
    </>
  )
}
