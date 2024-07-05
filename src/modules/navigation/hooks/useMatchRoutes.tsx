import { useEffect } from 'react'
import { matchRoutes, useLocation } from 'react-router-dom'

import { platformRoutes, useSetMatchRoutes } from '@/config'

export const useMatchRoutes = () => {
  const location = useLocation()

  const matchRoutesData = matchRoutes(platformRoutes, location)
  const setMatchRoutes = useSetMatchRoutes()

  useEffect(() => {
    if (matchRoutesData) {
      setMatchRoutes(matchRoutesData)
    }
  }, [matchRoutesData, setMatchRoutes])
}
