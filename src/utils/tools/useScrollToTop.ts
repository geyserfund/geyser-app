import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

import { ID } from '@/shared/constants/components/id.ts'

import { useMobileMode } from '../info'

export const useScrollToTop = () => {
  const location = useLocation()
  const isMobile = useMobileMode()
  const previousPathRef = useRef<string>()

  useEffect(() => {
    const previousPath = previousPathRef.current
    const isCurrentShopsPath = location.pathname.startsWith('/products')
    const isPreviousShopsPath = previousPath?.startsWith('/products')

    // Preserve scroll when switching between Shops category routes.
    if (isCurrentShopsPath && isPreviousShopsPath) {
      previousPathRef.current = location.pathname
      return
    }

    if (isMobile) {
      window.scrollTo(0, 0)
    } else {
      const element = document.getElementById(ID.root)
      if (element) {
        element.scrollTo(0, 0)
      }
    }

    previousPathRef.current = location.pathname
  }, [location.pathname, isMobile])
}
