import { useEffect } from 'react'

import { useListenerState } from './useListenerState'

export const useBeforeClose = () => {
  const [isFormDirty, setIsFormDirty] = useListenerState(false)
  const handleEvent = (event: BeforeUnloadEvent) => {
    if (isFormDirty.current) {
      event.preventDefault()
      event.returnValue = 'are you there'
      return event
    }

    return event
  }

  useEffect(() => {
    addEventListener('beforeunload', handleEvent)
    return () => {
      removeEventListener('beforeunload', handleEvent)
    }
  }, [])

  return { setIsFormDirty }
}
