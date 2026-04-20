import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

import { ID } from '@/shared/constants/components/id.ts'

import { useMobileMode } from '../info'

const SHOPS_PATH_PREFIX = '/products'

export const useScrollToTop = () => {
  const location = useLocation()
  const isMobile = useMobileMode()
  const previousPathRef = useRef<string>()

  useEffect(() => {
    const previousPath = previousPathRef.current
    const isCurrentShopsPath = location.pathname.startsWith(SHOPS_PATH_PREFIX)
    const isPreviousShopsPath = previousPath?.startsWith(SHOPS_PATH_PREFIX)

    // Preserve scroll when switching between Shops category routes.
    if (isCurrentShopsPath && isPreviousShopsPath) {
      previousPathRef.current = location.pathname
      return
    }

    if (isMobile) {
      window.scrollTo(0, 0)
    } else {
      document.getElementById(ID.root)?.scrollTo(0, 0)
    }

    previousPathRef.current = location.pathname
  }, [location.pathname, isMobile])
}
