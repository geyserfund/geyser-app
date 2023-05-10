import { RefObject, useEffect, useMemo, useState } from 'react'

export function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false)

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => entry && setIntersecting(entry.isIntersecting),
        {
          threshold: 0.1,
        },
      ),
    [],
  )

  useEffect(() => {
    if (!ref.current) {
      return
    }

    observer.observe(ref.current)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isIntersecting
}
