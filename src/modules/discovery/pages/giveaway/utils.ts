import { BigIntScalar } from './types'

export const GIVEAWAY_GRADIENT_LIGHT = 'linear-gradient(135deg, #10B981 0%, #6D28D9 55%, #F59E0B 100%)'
export const GIVEAWAY_GRADIENT_DARK =
  'linear-gradient(135deg, rgba(16,185,129,0.45) 0%, rgba(109,40,217,0.5) 55%, rgba(245,158,11,0.4) 100%)'
export const GIVEAWAY_NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")"

export const toBigInt = (value?: BigIntScalar | bigint | null) => {
  if (value === null || value === undefined) {
    return 0n
  }

  try {
    return BigInt(value)
  } catch {
    return 0n
  }
}

export const formatSats = (value?: BigIntScalar | bigint | null) => {
  const sats = toBigInt(value)
  return `${sats.toLocaleString('en-US')} sats`
}

export const formatSignedSatsDistance = (value?: BigIntScalar | bigint | null) => {
  return formatSats(value)
}

export const formatDateTimeWithTimezone = (date: string, timezone: string) => {
  const dateTime = new Date(date)

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: timezone,
  }).format(dateTime)
}

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}
