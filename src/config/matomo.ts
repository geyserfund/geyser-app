declare global {
  interface Window {
    _mtm: any
  }
}

const MATOMO_SOURCE_URL = 'https://cdn.matomo.cloud/geyserfund.matomo.cloud/container_4y56XOci.js'

export const configMatomo = () => {
  const _mtm = window._mtm || []
  window._mtm = _mtm
  _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' })
  const d = document
  const g = d.createElement('script')
  const s = d.getElementsByTagName('script')[0]
  g.async = true
  g.src = MATOMO_SOURCE_URL
  if (s?.parentNode) {
    s.parentNode.insertBefore(g, s)
  }
}
