import { getAppEndPoint } from '../../../../../../config/domain'

export const getUSD = (sats: number, bitcoinQuote?: number) => {
  if (!bitcoinQuote) return 'NAN'
  if (!sats) return '0'
  const total = sats / bitcoinQuote
  if (total > 1) {
    return `$${total.toFixed(2)}`
  }

  return '< $1'
}

export type GetDownloadUrlProps = {
  projectId: number
  from?: number
  to?: number
}

export const getDownloadUrl = ({ projectId, from, to }: GetDownloadUrlProps) => {
  const appEndpoint = getAppEndPoint()

  let url = `${appEndpoint}/export/payments/${projectId}`

  if (from && to) {
    url += `?from=${from}&to=${to}`
  }

  return url
}
