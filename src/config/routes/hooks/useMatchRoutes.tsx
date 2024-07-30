import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { matchRoutes, useLocation } from 'react-router-dom'

import { platformRoutes } from '../routes'
import { matchRoutesAtom } from '../state/routesAtom'

/**
 * Keeps track of which defined route the user is currently on
 * - Invoke at the highest level component in terms of route heirarchy
 * - Use currentRouteAtom to determine the current route the user is on
 */
export const useMatchRoutes = () => {
  const location = useLocation()

  const matchRoutesData = matchRoutes(platformRoutes, location)

  const setMatchRoutes = useSetAtom(matchRoutesAtom)

  useEffect(() => {
    if (matchRoutesData) {
      setMatchRoutes(matchRoutesData)
    }
  }, [matchRoutesData, setMatchRoutes])
}
