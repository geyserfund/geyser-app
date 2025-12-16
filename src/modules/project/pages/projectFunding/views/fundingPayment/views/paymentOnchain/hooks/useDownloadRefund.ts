import { Link } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  currentLightningToRskSwapIdAtom,
  currentOnChainToRskSwapIdAtom,
  currentSwapIdAtom,
  swapAtom,
} from '@/modules/project/funding/state/swapAtom.ts'

const REFUND_QR_FILE_NAME = 'refundFile'

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

  const refundFiles = useMemo(
    () =>
      props?.isAllOrNothing
        ? { isAonRefund: true, onChainToRsk: onChainToRskSwapRefundFile, lightningToRsk: lightningToRskSwapRefundFile }
        : onChainSwapRefundFile,
    [props?.isAllOrNothing, onChainToRskSwapRefundFile, lightningToRskSwapRefundFile, onChainSwapRefundFile],
  )

  const refundFileName = useMemo(() => {
    let projectTitle = ''
    const dateTime = DateTime.now().toFormat('yyyy-MM-dd_HH-mm-ss')

    if (props?.isAllOrNothing) {
      projectTitle = lightningToRskSwapRefundFile?.contributionInfo?.projectTitle?.trim().slice(0, 10) || ''
    } else {
      projectTitle = onChainSwapRefundFile?.contributionInfo?.projectTitle?.trim().slice(0, 10) || ''
    }

    return `${REFUND_QR_FILE_NAME}_for_${projectTitle}_on_${dateTime}.json`
  }, [props?.isAllOrNothing, lightningToRskSwapRefundFile, onChainSwapRefundFile])

  const getJsonFile = useCallback(() => {
    const fileName = `${refundFileName}.json`
    const content = `data:application/json;charset=utf-8,${encodeURI(JSON.stringify(refundFiles))}`
    return { download: fileName, content }
  }, [refundFiles, refundFileName])

  const downloadFile = useCallback(async () => {
    const jsonFile = getJsonFile()
    setFileToDownload(jsonFile)
  }, [getJsonFile])

  useEffect(() => {
    downloadFile()
  }, [downloadFile])

  return {
    fileToDownload,
    buttonProps: {
      as: Link,
      href: fileToDownload?.content,
      download: fileToDownload?.download,
      isExternal: true,
    },
  }
}
