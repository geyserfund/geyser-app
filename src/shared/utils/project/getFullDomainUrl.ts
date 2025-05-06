import { __development__, __staging__ } from '@/shared/constants/index.ts'

export const getFullDomainUrl = (path: string) => {
  if (__development__) {
    return `http://dev.geyser.fund${path}`
  }

  if (__staging__) {
    return `https://staging.geyser.fund${path}`
  }

  return `https://geyser.fund${path}`
}
