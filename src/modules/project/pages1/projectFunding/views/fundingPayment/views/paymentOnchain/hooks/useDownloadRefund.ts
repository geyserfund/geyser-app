import { useSetAtom } from 'jotai'
import QRCode from 'qrcode'
import { useTranslation } from 'react-i18next'

import { useRefundFileValue } from '@/modules/project/funding/state'
import { useNotification } from '@/utils'

import { onChainRefundDownloadedAtom } from '../states/onChainStatus.ts'
import { download, downloadJson, isIos } from '../utils/download'

const REFUND_QR_FILE_NAME = 'refundFile'

export const useDownloadRefund = () => {
  const refundFile = useRefundFileValue()
  const toast = useNotification()
  const { t } = useTranslation()

  const setRefundFileDownloaded = useSetAtom(onChainRefundDownloadedAtom)

  const downloadRefundQr = () => {
    QRCode.toDataURL(JSON.stringify(refundFile), { width: 400 })
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
  }

  const downloadRefundJson = () => {
    downloadJson(REFUND_QR_FILE_NAME, refundFile)
    setRefundFileDownloaded(true)
  }

  return {
    downloadRefundQr,
    downloadRefundJson,
  }
}
