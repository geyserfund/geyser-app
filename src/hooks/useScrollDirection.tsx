import { useEffect, useState } from 'react'

import { useListenerState } from './useListenerState'

interface UseScrollDirectionProps {
  elementId?: string
  loading?: boolean
  initialValue?: boolean
  mobileView?: string
  direction?: string
}

export const useScrollDirection = ({ elementId, loading, initialValue, mobileView }: UseScrollDirectionProps) => {
  const [prevValue, setPrevValue] = useListenerState(0)
  const [value, setValue] = useListenerState(0)

  const [isScrollingUp, setIsScrollingUp] = useState(initialValue || false)
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    if (loading) {
      return
    }

    if (elementId) {
      const element = document.getElementById(elementId)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, mobileView, elementId])

  async function handleScroll(this: HTMLElement) {
    let scrollTop = 0

    if (elementId) {
      scrollTop = this.scrollTop
    } else {
      scrollTop = document.scrollingElement?.scrollTop || 0
    }

    setScrollTop(scrollTop)
    if (prevValue.current > value.current && value.current > scrollTop) {
      setIsScrollingUp(true)
    } else if (scrollTop > 0) {
      setIsScrollingUp(false)
    }

    setPrevValue(value.current)
    setValue(scrollTop)
  }

  return { isScrollingUp, scrollTop }
}
