/* eslint-disable no-async-promise-executor */
import { toPng } from 'html-to-image'
import { useCallback, useState } from 'react'

/**
 * Hook for coverting components to image and copying them to clipboard
 * @returns {Object} - Object containing the function to generate and copy image and a boolean indicating if the image is being copied
 */
export const useCreateAndCopyImage = () => {
  const [copying, setCopying] = useState(false)

  const getDataUrl = useCallback(async (element: any) => {
    if (element) {
      const dataUrl = await toPng(element)
      return dataUrl
    }

    throw new Error('Element is not defined')
  }, [])

  /** Async function, Always invoke asynchronously for safari's sake */
  const handleGenerateAndCopy = useCallback(
    async ({
      element,
      onSuccess,
      onError,
    }: {
      element: HTMLElement | null
      onSuccess: Function
      onError: Function
    }) => {
      setCopying(true)
      try {
        const getBlob = async () => {
          const dataUrl = await getDataUrl(element)

          const base64Response = await fetch(dataUrl)

          return base64Response.blob()
        }

        const clipboardItem = new ClipboardItem({
          'image/png': getBlob().then((result) => {
            if (!result) {
              return new Promise(async (resolve) => {
                resolve('')
              })
            }

            return new Promise(async (resolve) => {
              resolve(result)
            })
          }),
        })

        await navigator.clipboard.write([clipboardItem])
        onSuccess()
      } catch (error) {
        onError()
      }

      setCopying(false)
    },
    [getDataUrl],
  )

  return { handleGenerateAndCopy, copying }
}
