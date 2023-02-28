import { Box, BoxProps } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

import { dimensions } from '../../constants'
import { useListenerState } from '../../hooks'

interface StickToTopProps extends BoxProps {
  id: string
  scrollContainerId?: string
  wrapperId?: string
  offset?: number
  disable?: boolean
  _onStick?: BoxProps
}

export const StickToTop = ({
  id,
  scrollContainerId,
  wrapperId,
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

    if (scrollContainerId) {
      scrollTop = this.scrollTop
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
      if (
        currentElement.offsetTop -
          currentElement.scrollTop +
          currentElement.clientTop -
          scrollTop <=
        offset
      ) {
        setStick(true)
      } else {
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
        backgroundColor="brand.bgWhite"
        position={stick.current ? 'fixed' : 'static'}
        top={`${offset}px`}
        zIndex={10}
        {...rest}
        {...onStick}
      >
        {children}
      </Box>
      {stick.current && (
        <Box id={palceholderId} height={containerRef.current?.offsetHeight} />
      )}
    </>
  )
}
