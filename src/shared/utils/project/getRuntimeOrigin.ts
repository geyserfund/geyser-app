import { getFullDomainUrl } from './getFullDomainUrl.ts'

export const getRuntimeOrigin = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  return getFullDomainUrl('')
}
