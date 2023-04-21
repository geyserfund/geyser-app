import { useEffect, useRef } from 'react'

function logPropDifferences(newProps: any, lastProps: any) {
  const allKeys = new Set<any>(Object.keys(newProps)).add(
    Object.keys(lastProps),
  )
  allKeys.forEach((key) => {
    const newValue = newProps[key]
    const lastValue = lastProps[key]
    if (newValue !== lastValue) {
      console.log('New Value: ', newValue)
      console.log('Last Value: ', lastValue)
    }
  })
}

export function useDebugPropChanges(newProps: any) {
  const lastProps = useRef()
  // Should only run when the component re-mounts
  useEffect(() => {
    console.log('useDebugPropChanges component mounted!')
  }, [])
  if (lastProps.current) {
    logPropDifferences(newProps, lastProps.current)
  }

  lastProps.current = newProps
}
