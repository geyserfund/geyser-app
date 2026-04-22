import { Link } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  currentLightningToRskSwapIdAtom,
  currentOnChainToRskSwapIdAtom,
  currentSwapIdAtom,
  SwapData,
  swapAtom,
} from '@/modules/project/funding/state/swapAtom.ts'

const REFUND_QR_FILE_NAME = 'refundFile'

export const hasRefundFileEssentials = (refundFile?: SwapData) =>
  Boolean(
    refundFile?.id &&
      refundFile?.privateKey,
  )

export const isRefundDownloadReady = (params: {
  isAllOrNothing?: boolean
  onChainSwapRefundFile?: SwapData
  lightningToRskSwapRefundFile?: SwapData
  onChainToRskSwapRefundFile?: SwapData
}) => {
  const { isAllOrNothing, onChainSwapRefundFile, lightningToRskSwapRefundFile, onChainToRskSwapRefundFile } = params

  if (isAllOrNothing) {
    return (
      hasRefundFileEssentials(lightningToRskSwapRefundFile) &&
      hasRefundFileEssentials(onChainToRskSwapRefundFile)
    )
  }

  return hasRefundFileEssentials(onChainSwapRefundFile)
}

export const useDownloadRefund = (props?: { isAllOrNothing?: boolean }) => {
  const [fileToDownload, setFileToDownload] = useState<{ download: string; content: string } | null>(null)

  // const isMobile = useMobileMode()

  const allRefundFiles = useAtomValue(swapAtom)
  const currentSwapId = useAtomValue(currentSwapIdAtom)
  const currentLightningToRskSwapId = useAtomValue(currentLightningToRskSwapIdAtom)
  const currentOnChainToRskSwapId = useAtomValue(currentOnChainToRskSwapIdAtom)

  const onChainSwapRefundFile = allRefundFiles[currentSwapId]
  const lightningToRskSwapRefundFile = allRefundFiles[currentLightningToRskSwapId]
  const onChainToRskSwapRefundFile = allRefundFiles[currentOnChainToRskSwapId]
  const isReady = isRefundDownloadReady({
    isAllOrNothing: props?.isAllOrNothing,
    onChainSwapRefundFile,
    lightningToRskSwapRefundFile,
    onChainToRskSwapRefundFile,
  })

  const refundFiles = useMemo(
    () =>
      !isReady
        ? null
        : props?.isAllOrNothing
        ? { isAonRefund: true, onChainToRsk: onChainToRskSwapRefundFile, lightningToRsk: lightningToRskSwapRefundFile }
        : onChainSwapRefundFile,
    [isReady, props?.isAllOrNothing, onChainToRskSwapRefundFile, lightningToRskSwapRefundFile, onChainSwapRefundFile],
  )

  const refundFileName = useMemo(() => {
    if (!isReady) return ''

    let projectTitle = ''
    const dateTime = DateTime.now().toFormat('yyyy-MM-dd_HH-mm')

    if (props?.isAllOrNothing) {
      projectTitle = lightningToRskSwapRefundFile?.contributionInfo?.projectTitle?.trim().slice(0, 10) || ''
    } else {
      projectTitle = onChainSwapRefundFile?.contributionInfo?.projectTitle?.trim().slice(0, 10) || ''
    }

    return `${REFUND_QR_FILE_NAME}_for_${projectTitle}_on_${dateTime}.json`
  }, [isReady, props?.isAllOrNothing, lightningToRskSwapRefundFile, onChainSwapRefundFile])

  const getJsonFile = useCallback(() => {
    if (!refundFiles || !refundFileName) return null

    const blob = new Blob([JSON.stringify(refundFiles, null, 2)], { type: 'application/json' })
    const content = URL.createObjectURL(blob)
    return { download: refundFileName, content }
  }, [refundFiles, refundFileName])

  const downloadFile = useCallback(() => {
    const jsonFile = getJsonFile()
    setFileToDownload(jsonFile)
  }, [getJsonFile])

  useEffect(() => {
    downloadFile()
  }, [downloadFile])

  // Cleanup object URL when component unmounts or when a new URL is created
  useEffect(() => {
    return () => {
      if (fileToDownload?.content) {
        URL.revokeObjectURL(fileToDownload.content)
      }
    }
  }, [fileToDownload?.content])

  return {
    fileToDownload,
    isReady,
    buttonProps: {
      as: Link,
      href: fileToDownload?.content,
      download: fileToDownload?.download,
      isExternal: true,
      isDisabled: !isReady || !fileToDownload?.content,
    },
  }
}
