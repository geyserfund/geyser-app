import { toPng } from 'html-to-image'
import { useCallback, useState } from 'react'

const TRANSPARENT_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

type ImageExportOptions = {
  fallbackFilter?: (node: HTMLElement) => boolean
}

/**
 * Hook for coverting components to image and copying them to clipboard
 * @returns {Object} - Object containing the function to generate and copy image and a boolean indicating if the image is being copied
 */
export const useCreateAndCopyImage = () => {
  const [copying, setCopying] = useState(false)

  const getDataUrl = useCallback(async (element: HTMLElement | null, exportOptions: ImageExportOptions = {}) => {
    if (!element) {
      throw new Error('Element is not defined')
    }

    const options = {
      cacheBust: true,
      imagePlaceholder: TRANSPARENT_IMAGE,
      pixelRatio: 2,
      skipFonts: true,
    }

    try {
      return await toPng(element, options)
    } catch (error) {
      if (!exportOptions.fallbackFilter) throw error
      return toPng(element, { ...options, filter: exportOptions.fallbackFilter })
    }
  }, [])

  const getBlob = useCallback(
    async (element: HTMLElement | null, exportOptions?: ImageExportOptions) => {
      const dataUrl = await getDataUrl(element, exportOptions)

      const base64Response = await fetch(dataUrl)

      return base64Response.blob()
    },
    [getDataUrl],
  )

  /** Async function, Always invoke asynchronously for safari's sake */
  const handleGenerateAndCopy = useCallback(
    async ({
      element,
      onSuccess,
      onError,
      exportOptions,
    }: {
      element: HTMLElement | null
      onSuccess: () => void
      onError: () => void
      exportOptions?: ImageExportOptions
    }) => {
      setCopying(true)
      try {
        const clipboardItem = new ClipboardItem({
          'image/png': getBlob(element, exportOptions),
        })

        await navigator.clipboard.write([clipboardItem])
        onSuccess()
      } catch (error) {
        onError()
      }

      setCopying(false)
    },
    [getBlob],
  )

  const getObjectUrl = useCallback(
    async ({
      element,
      onError = () => {},
      exportOptions,
    }: {
      element: HTMLElement | null
      onError?: () => void
      exportOptions?: ImageExportOptions
    }) => {
      try {
        const blob = await getBlob(element, exportOptions)
        return URL.createObjectURL(blob)
      } catch {
        onError()
      }
    },
    [getBlob],
  )

  return { handleGenerateAndCopy, copying, getObjectUrl, getDataUrl }
}
