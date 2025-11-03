import { useEffect } from 'react'
import { useLocation } from 'react-router'

import { ID } from '@/shared/constants/components/id.ts'

import { useMobileMode } from '../info'

export const useScrollToTop = () => {
  const location = useLocation()
  const isMobile = useMobileMode()

  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0)
    } else {
      const element = document.getElementById(ID.root)
      if (element) {
        element.scrollTo(0, 0)
      }
    }
  }, [location.pathname, isMobile])
}
