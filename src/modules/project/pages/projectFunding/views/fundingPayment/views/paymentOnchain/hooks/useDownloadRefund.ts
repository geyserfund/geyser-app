import { useAtomValue, useSetAtom } from 'jotai'
import QRCode from 'qrcode'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  currentLightningToRskSwapIdAtom,
  currentOnChainToRskSwapIdAtom,
  currentSwapIdAtom,
  swapAtom,
} from '@/modules/project/funding/state/swapAtom.ts'
import {
  // useMobileMode,
  useNotification,
} from '@/utils'

import { onChainRefundDownloadedAtom } from '../states/onChainStatus.ts'
import { download, downloadJson, isIos } from '../utils/download'

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

  const toast = useNotification()
  const { t } = useTranslation()

  const setRefundFileDownloaded = useSetAtom(onChainRefundDownloadedAtom)

  // const getQrCodeFile = useCallback(async () => {
  //   const qrCode = await QRCode.toDataURL(JSON.stringify(refundFiles), { width: 800 })
  //   const fileName = `${REFUND_QR_FILE_NAME}.png`
  //   return { download: fileName, content: qrCode }
  // }, [refundFiles])

  const getJsonFile = useCallback(() => {
    const fileName = `${REFUND_QR_FILE_NAME}.json`
    const content = `data:application/json;charset=utf-8,${encodeURI(JSON.stringify(refundFiles))}`
    return { download: fileName, content }
  }, [refundFiles])

  const downloadRefundQr = useCallback(() => {
    QRCode.toDataURL(JSON.stringify(refundFiles), { width: 800 })
      .then((url: string) => {
        if (isIos) {
          // Compatibility with third party iOS browsers
          const newTab = window.open()
          if (newTab) {
            newTab.document.body.innerHTML = `
                <!DOCTYPE html>
                <body>
                    <img src="${url}">
                    <h1>${t('Long press and select "Save to Photos" to download refund file')}</h1>
                </body>`
          }
        } else {
          download(`${REFUND_QR_FILE_NAME}.png`, url)
        }

        setRefundFileDownloaded(true)
      })
      .catch((err: Error) => {
        toast.error({
          title: 'Failed to download qr',
          description: 'Failed to download qr',
        })
      })
  }, [refundFiles, t, setRefundFileDownloaded, toast])

  const downloadRefundJson = useCallback(() => {
    downloadJson(REFUND_QR_FILE_NAME, refundFiles)
    setRefundFileDownloaded(true)
  }, [refundFiles, setRefundFileDownloaded])

  const downloadFile = useCallback(async () => {
    // Test this in staging, if it works, remove  if all together.
    // if (isMobile) {
    //   const qrCodeFile = await getQrCodeFile()
    //   setFileToDownload(qrCodeFile)
    // } else {
    const jsonFile = getJsonFile()
    setFileToDownload(jsonFile)
    // }
  }, [getJsonFile])

  useEffect(() => {
    downloadFile()
  }, [downloadFile])

  return {
    downloadRefundQr,
    downloadRefundJson,
    fileToDownload,
  }
}
