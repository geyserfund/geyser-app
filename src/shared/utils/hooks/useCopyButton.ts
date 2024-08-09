import { useCallback, useState } from 'react'

import { copyTextToClipboard } from '@/utils'

export const useCopyToClipboard = (content: string) => {
  const [hasCopied, setHadCopied] = useState(false)

  const onCopy = useCallback(() => {
    copyTextToClipboard(content)
    setHadCopied(true)
    setTimeout(() => {
      setHadCopied(false)
    }, 500)
  }, [content])
  return { onCopy, hasCopied }
}
