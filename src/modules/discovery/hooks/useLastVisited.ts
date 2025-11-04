import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { setLastVisitedMyProjectActivityAtom } from '../state/lastVisitedAtom'

export const useLastVisitedMyProjects = () => {
  const setLastVisistedMyProjects = useSetAtom(setLastVisitedMyProjectActivityAtom)

  useEffect(() => {
    setLastVisistedMyProjects()
  }, [setLastVisistedMyProjects])
}
