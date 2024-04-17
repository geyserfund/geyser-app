import QRCode from 'qrcode'

import { useNotification } from '../../../../../../../../../../../utils'
import { useRefundFileValue } from '../../../../../../../../../funding/state'
import { download, downloadJson, isIos } from '../utils/download'

const REFUND_QR_FILE_NAME = 'refundFile'

export const useDownloadRefund = () => {
  const refundFile = useRefundFileValue()
  const { toast } = useNotification()

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
                    <h1>${'ios_image_download'}</h1>
                </body>`
          }
        } else {
          download(`${REFUND_QR_FILE_NAME}.png`, url)
        }
      })
      .catch((err: Error) => {
        toast({
          title: 'Failed to download qr',
          description: 'Failed to download qr',
          status: 'error',
        })
      })
  }

  const downloadRefundJson = () => downloadJson(REFUND_QR_FILE_NAME, refundFile)

  return {
    downloadRefundQr,
    downloadRefundJson,
  }
}
