import { RejectionError, WebLNProvider } from 'webln'

import { sha256 } from '../../../utils'

const { webln }: { webln: WebLNProvider } = window as any

const WEBLN_ENABLE_ERROR = 'Failed to enable webln'

const requestWebLNPayment = async (paymentRequest: string) => {
  if (!webln) {
    throw new Error('no provider')
  }

  try {
    await webln.enable()
  } catch (e) {
    throw new Error(WEBLN_ENABLE_ERROR)
  }

  if (!paymentRequest) {
    throw new Error('payment request not found')
  }

  let preimage = ''
  console.log('checking webln ', webln.getInfo())
  console.log('checking webln ', paymentRequest)
  try {
    const res = await webln.sendPayment(paymentRequest)
    console.log('checking res', res)
    preimage = res.preimage
  } catch (e) {
    throw new Error(WEBLN_ENABLE_ERROR)
  }

  const paymentHash = await sha256(preimage)
  return paymentHash
}

export const startWebLNFlow = async ({
  paymentRequest,
  toast,
}: {
  paymentRequest: string
  toast: any
}) => {
  try {
    const paymentHash = await requestWebLNPayment(paymentRequest)

    // Check preimage
    console.log('checking paymentHas', paymentHash)
  } catch (error: any) {
    if (error.message === 'no provider') {
      throw error
    }

    if (error.message === 'wrong preimage') {
      toast({
        title: 'Wrong payment preimage',
        description:
          'The payment preimage returned by the WebLN provider did not match the payment hash.',
        status: 'error',
      })
      return false
    }

    if (
      error.constructor === RejectionError ||
      error.message === 'User rejected'
    ) {
      toast({
        title: 'Requested operation declined',
        description: 'Please use the invoice instead.',
        status: 'info',
      })
      return false
    }

    if (error.message === WEBLN_ENABLE_ERROR) {
      return false
    }

    toast({
      title: 'Oops! Something went wrong with WebLN.',
      description: 'Please copy the invoice manually instead.',
      status: 'error',
    })

    return false
  }
}
