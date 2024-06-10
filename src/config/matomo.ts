declare global {
  interface Window {
    _mtm: any
    _paq: any
  }
}

const MATOMO_SOURCE_URL = 'https://cdn.matomo.cloud/geyserfund.matomo.cloud/container_4y56XOci.js'

export const configMatomo = () => {
  const _mtm = window._mtm || []
  window._mtm = _mtm
  const _paq = window._paq || []
  window._paq = _paq
  _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' })
  _paq.push(['setCookieDomain', '*.geyser.fund'])
  _paq.push(['setDomains', ['*.geyser.fund']])
  const d = document
  const g = d.createElement('script')
  const s = d.getElementsByTagName('script')[0]
  g.async = true
  g.src = MATOMO_SOURCE_URL
  if (s?.parentNode) {
    s.parentNode.insertBefore(g, s)
  }
}
