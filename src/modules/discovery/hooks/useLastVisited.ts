import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { setLastVisitedFollowedActivityAtom, setLastVisitedMyProjectActivityAtom } from '../state/lastVisitedAtom'

export const useLastVisitedMyProjects = () => {
  const setLastVisistedMyProjects = useSetAtom(setLastVisitedMyProjectActivityAtom)

  useEffect(() => {
    setLastVisistedMyProjects()
  }, [setLastVisistedMyProjects])
}

export const useLastVisistedFollowedProjects = () => {
  const setLastVisitedFollowedProjects = useSetAtom(setLastVisitedFollowedActivityAtom)

  useEffect(() => {
    setLastVisitedFollowedProjects()
  }, [setLastVisitedFollowedProjects])
}
