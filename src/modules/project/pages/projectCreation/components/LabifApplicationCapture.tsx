import { useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'

import { labifApplicationAtom } from '@/shared/state/labifApplicationAtom.ts'

const LABIF_APPLICATION_PARAM = 'labifApplication'

/** Records whether this creation session was started from a LABIF application. */
export const LabifApplicationCapture = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const setLabifApplication = useSetAtom(labifApplicationAtom)
  const initialLabifApplication = useRef(searchParams.get(LABIF_APPLICATION_PARAM) === '1')

  useEffect(() => {
    setLabifApplication(initialLabifApplication.current)

    if (!initialLabifApplication.current) {
      return
    }

    setSearchParams(
      (prev) => {
        prev.delete(LABIF_APPLICATION_PARAM)
        return prev
      },
      { replace: true },
    )
  }, [setLabifApplication, setSearchParams])

  return null
}
