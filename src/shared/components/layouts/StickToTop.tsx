import { Box, BoxProps } from '@chakra-ui/react'
import { throttle } from 'lodash'
import { useEffect, useRef } from 'react'

import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { useListenerState } from '@/shared/hooks'

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
  const [wrapperElement, setWrapperElement] = useListenerState<HTMLElement | null>(null)
  const palceholderId = `${id}-placeholder`

  useEffect(() => {
    if (disable) {
      setStick(false)
      return
    }

    if (wrapperId) {
      const wrapperElement = document.getElementById(wrapperId)
      setWrapperElement(wrapperElement)
    }

    const scrollElement = scrollContainerId ? document.getElementById(scrollContainerId) : window
    scrollElement?.addEventListener('scroll', handleScroll)

    return () => {
      scrollElement?.removeEventListener('scroll', handleScroll)
    }
  }, [scrollContainerId, disable, id, palceholderId])

  const handleScroll = useRef(
    throttle(function (this: HTMLElement) {
      const currentElement = document.getElementById(stick.current ? palceholderId : id)

      if (currentElement) {
        const rect = currentElement.getBoundingClientRect()
        const scrollValue = rect.top - offset

        if (scrollValue <= bias) {
          setStick(true)
        } else if (scrollValue > bias + buffer) {
          setStick(false)
        }
      }
    }, 16),
  ).current // 60fps throttle

  const onStick = stick.current ? _onStick || { width: wrapperElement.current?.clientWidth } : {}

  return (
    <>
      <Box
        id={id}
        ref={containerRef}
        backgroundColor="utils.pbg"
        position={stick.current ? 'fixed' : 'static'}
        top={`${offset}px`}
        zIndex={10}
        {...rest}
        {...onStick}
      >
        {children}
      </Box>
      {stick.current && <Box id={palceholderId} height={`${containerRef.current?.offsetHeight}px`} />}
    </>
  )
}
