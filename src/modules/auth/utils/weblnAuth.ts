import type { WebLNProvider } from 'webln'

type LNURLResponse =
  | {
      status: 'OK'
      data?: unknown
    }
  | { status: 'ERROR'; reason: string }

export type WebLNAuthProvider = WebLNProvider & {
  lnurl: (lnurl: string) => Promise<LNURLResponse>
}

export const WEBLN_ENABLE_ERROR = 'Failed to enable webln'

export const getWebLNAuthProvider = (): WebLNAuthProvider | undefined => {
  return (window as typeof window & { webln?: WebLNAuthProvider }).webln
}

export const requestWebLNUrlAuth = async (paymentRequest: string): Promise<boolean> => {
  const webln = getWebLNAuthProvider()

  if (!webln) {
    return false
  }

  try {
    await webln.enable()
  } catch (e) {
    throw new Error(WEBLN_ENABLE_ERROR)
  }

  if (!paymentRequest) {
    throw new Error('payment request not found')
  }

  try {
    const res = await webln.lnurl(paymentRequest)
    if (res.status !== 'OK') {
      throw new Error(WEBLN_ENABLE_ERROR)
    }
  } catch (e) {
    throw new Error(WEBLN_ENABLE_ERROR)
  }

  return true
}
