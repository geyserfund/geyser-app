import { useEffect, useRef, useState } from 'react'

export function useDebounce<TType>(value: TType, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<TType>(value)

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay], // Only re-call effect if value or delay changes
  )

  return debouncedValue
}

export function useThrottle<TType>(value: TType, delay: number) {
  // State and setters for throttled value
  const [throttledValue, setThrottledValue] = useState<TType>(value)
  const isFirstCall = useRef(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(
    () => {
      // Set value immediately on first call
      if (isFirstCall.current) {
        setThrottledValue(value)
        isFirstCall.current = false
        return
      }

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Set timeout to update throttled value after delay
      timeoutRef.current = setTimeout(() => {
        setThrottledValue(value)
        isFirstCall.current = true // Reset for next immediate update
        timeoutRef.current = null
      }, delay)

      // Cleanup function
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
      }
    },
    [value, delay], // Only re-call effect if value or delay changes
  )

  return throttledValue
}
