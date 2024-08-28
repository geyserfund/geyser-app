import { useEffect } from 'react'

export const useUnsavedAlert = (isDirty: boolean) => {
  useEffect(() => {
    function onBeforeUnload(e: any) {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
        return
      }

      delete e.returnValue
    }

    addEventListener('beforeunload', onBeforeUnload)

    return () => removeEventListener('beforeunload', onBeforeUnload)
  }, [isDirty])

  return isDirty
}
