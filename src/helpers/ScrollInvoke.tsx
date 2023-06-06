import { useEffect } from 'react'

import { useListenerState } from '../hooks'

interface ScrollInvokeProps {
  elementId?: string
  onScrollEnd: () => Promise<void>
  isLoading?: React.MutableRefObject<boolean>
  noMoreItems?: React.MutableRefObject<boolean>
}

const ThresholdHeightBeforeScrollEnd = 300

export const ScrollInvoke = ({
  elementId,
  onScrollEnd,
  isLoading,
  noMoreItems,
}: ScrollInvokeProps) => {
  const [loading, setLoading] = useListenerState(false)
  const [prevValue, setPrevValue] = useListenerState(false)

  useEffect(() => {
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
  }, [elementId])

  async function handleScroll(this: HTMLElement) {
    if (
      (isLoading && isLoading.current) ||
      (noMoreItems && noMoreItems.current) ||
      loading.current
    ) {
      return
    }

    setLoading(true)

    let scrollHeight = 0
    let scrollTop = 0
    let clientHeight = 0

    if (elementId) {
      scrollHeight = this.scrollHeight
      scrollTop = this.scrollTop
      clientHeight = this.clientHeight
    } else {
      scrollHeight = document.scrollingElement?.scrollHeight || 0
      scrollTop = document.scrollingElement?.scrollTop || 0
      clientHeight = document.scrollingElement?.clientHeight || 0
    }

    const isInView =
      scrollHeight - scrollTop - clientHeight <= ThresholdHeightBeforeScrollEnd
    if (isInView && prevValue.current !== isInView) {
      await onScrollEnd()
    }

    setPrevValue(isInView)
    setLoading(false)
  }

  return null
}
