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
    if (!element) {
      throw new Error('Element is not defined')
    }

    // Warm-up passes only need to trigger image/font decode, so render them cheaply; only the
    // final, returned capture needs full resolution.
    const warmupOptions = { cacheBust: true }
    const captureOptions = { cacheBust: true, pixelRatio: 2 }

    // Wait for fonts so the banner's text renders in the capture (Safari/WebKit decodes them lazily).
    if (document?.fonts?.ready) {
      try {
        await document.fonts.ready
      } catch {
        // ignore: fall through and capture anyway
      }
    }

    // WebKit/iOS Safari can return a blank image on the first toPng pass (remote image/fonts not yet
    // decoded). Warm up the render path with best-effort discarded passes (a transient failure here
    // must not abort the export), then capture.
    try {
      await toPng(element, warmupOptions)
      await toPng(element, warmupOptions)
    } catch {
      // ignore: warm-up passes are best-effort decode triggers
    }

    return toPng(element, captureOptions)
  }, [])

  const getBlob = async (element: HTMLElement | null) => {
    const dataUrl = await getDataUrl(element)

    const base64Response = await fetch(dataUrl)

    return base64Response.blob()
  }

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
        const clipboardItem = new ClipboardItem({
          'image/png': getBlob(element).then((result) => {
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

  const getObjectUrl = async ({ element, onError = () => {} }: { element: HTMLElement | null; onError?: Function }) => {
    try {
      const blob = await getBlob(element)
      return URL.createObjectURL(blob)
    } catch (error) {
      onError()
    }
  }

  return { handleGenerateAndCopy, copying, getObjectUrl, getDataUrl }
}
