import { useCallback, useState } from 'react'

import { copyTextToClipboard } from '../utils'

export const useAnimatedClipboard = (
  defaultValue?: string,
): [(v?: string) => void, boolean] => {
  const [hasCopied, setCopied] = useState(false)

  const copy = useCallback(
    (value?: string) => {
      const str = typeof value === 'string' ? value : null
      copyTextToClipboard(str || defaultValue || '')
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    },
    [defaultValue],
  )

  return [copy, hasCopied]
}
