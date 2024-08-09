import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

import { historyRouteSetAtom } from '../state/historyRouteAtom'
/**
 * Keeps track of the history of the routes the user has visited
 * - Invoke at the highest level component in terms of route heirarchy
 * - Use historyRouteAtom to determine the history of the routes the user has visited
 */
export const useHistoryRoutes = () => {
  const location = useLocation()
  const setHistoryRoute = useSetAtom(historyRouteSetAtom)
  useEffect(() => {
    setHistoryRoute(location.pathname)
  }, [location.pathname, setHistoryRoute])
}
