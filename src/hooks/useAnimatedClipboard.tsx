import { useCallback, useState } from 'react'

export const useAnimatedClipboard = (
  defaultValue?: string,
): [(v?: string) => void, boolean] => {
  const [hasCopied, setCopied] = useState(false)

  const copy = useCallback(
    (value?: string) => {
      const str = typeof value === 'string' ? value : null
      navigator.clipboard.writeText(str || defaultValue || '')
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    },
    [defaultValue],
  )

  return [copy, hasCopied]
}
