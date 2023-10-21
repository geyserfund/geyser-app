import { __production__, API_SERVICE_ENDPOINT } from '../constants'
import {
  GEYSER_TOR_ONION_ADDRESS,
  GEYSER_TOR_ONION_DOMAIN,
} from '../constants/config/domain'

export const getAppEndPoint = () => {
  if (window.location.hostname === GEYSER_TOR_ONION_DOMAIN) {
    return GEYSER_TOR_ONION_ADDRESS
  }

  return API_SERVICE_ENDPOINT
}

export const getAuthEndPoint = () => {
  if (__production__) {
    if (window.location.hostname === GEYSER_TOR_ONION_DOMAIN) {
      return `${GEYSER_TOR_ONION_ADDRESS}/auth`
    }

    return import.meta.env.VITE_APP_AUTH_SERVICE_ENDPOINT
  }

  return `${API_SERVICE_ENDPOINT}/auth`
}
