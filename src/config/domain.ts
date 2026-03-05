import { __production__, API_SERVICE_ENDPOINT } from '../shared/constants'
import { GEYSER_TOR_ONION_ADDRESS, GEYSER_TOR_ONION_DOMAIN } from '../shared/constants/config/domain'

const getHostName = () => {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.location.hostname
}

export const getAppEndPoint = (hostName = getHostName()) => {
  if (hostName === GEYSER_TOR_ONION_DOMAIN) {
    return GEYSER_TOR_ONION_ADDRESS
  }

  return API_SERVICE_ENDPOINT
}

export const getAuthEndPoint = (hostName = getHostName()) => {
  if (__production__) {
    if (hostName === GEYSER_TOR_ONION_DOMAIN) {
      return `${GEYSER_TOR_ONION_ADDRESS}/auth`
    }

    return import.meta.env.VITE_APP_AUTH_SERVICE_ENDPOINT
  }

  return `${API_SERVICE_ENDPOINT}/auth`
}
