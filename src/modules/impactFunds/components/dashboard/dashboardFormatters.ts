import { t } from 'i18next'
import { DateTime } from 'luxon'

import { NOT_PROVIDED_PLACEHOLDER } from './dashboardConstants'

type SatsValue = string | number | bigint | null | undefined

export function formatEnumLabel(value?: string | null) {
  if (!value) return NOT_PROVIDED_PLACEHOLDER
  return value
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function formatSats(amount?: SatsValue) {
  const sats = toSatsBigInt(amount)
  if (sats === null) return NOT_PROVIDED_PLACEHOLDER
  return t('{{amount}} sats', { amount: formatBigIntWithCommas(sats) })
}

export function formatSatsCompact(amount?: SatsValue) {
  const sats = toSatsBigInt(amount)
  if (sats === null) return NOT_PROVIDED_PLACEHOLDER
  if (sats === 0n) return t('0 sats')

  const absAmount = sats < 0n ? -sats : sats

  if (absAmount >= 1_000_000_000n) {
    return t('{{amount}}B sats', { amount: formatBigIntDecimal(sats, 1_000_000_000n) })
  }

  if (absAmount >= 1_000_000n) {
    return t('{{amount}}M sats', { amount: formatBigIntDecimal(sats, 1_000_000n) })
  }

  if (absAmount >= 10_000n) {
    return t('{{amount}}K sats', { amount: (sats / 1_000n).toString() })
  }

  return t('{{amount}} sats', { amount: formatBigIntWithCommas(sats) })
}

export function toFiniteNumber(amount?: SatsValue): number | null {
  const sats = toSatsBigInt(amount)
  if (sats === null) return null

  const asNumber = Number(sats)
  return Number.isSafeInteger(asNumber) ? asNumber : null
}

export function toSatsBigInt(amount?: SatsValue): bigint | null {
  if (amount === null || amount === undefined) return null
  if (typeof amount === 'bigint') return amount
  if (typeof amount === 'number') {
    if (!Number.isFinite(amount)) return null
    return BigInt(Math.trunc(amount))
  }

  if (!/^-?\d+$/.test(amount)) return null
  return BigInt(amount)
}

function formatBigIntWithCommas(value: bigint) {
  const sign = value < 0n ? '-' : ''
  const digits = (value < 0n ? -value : value).toString()
  return `${sign}${digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

function formatBigIntDecimal(value: bigint, divisor: bigint) {
  const sign = value < 0n ? '-' : ''
  const absValue = value < 0n ? -value : value
  const whole = absValue / divisor
  const decimal = (absValue % divisor) / (divisor / 10n)
  return `${sign}${whole}.${decimal}`
}

export function formatDate(date?: string | number | Date | null) {
  if (date === null || date === undefined) return NOT_PROVIDED_PLACEHOLDER
  const dt = parseFlexibleDate(date)
  if (!dt || !dt.isValid) return NOT_PROVIDED_PLACEHOLDER
  return dt.toFormat('dd LLL yyyy')
}

/**
 * Parse a date that may arrive as ISO string, millisecond-string, millisecond-number, or Date.
 * Backend uses BigInt scalars serialized as numeric strings for DB timestamps.
 */
function parseFlexibleDate(date: string | number | Date): DateTime | null {
  if (date instanceof Date) {
    const dt = DateTime.fromJSDate(date)
    return dt.isValid ? dt : null
  }

  if (typeof date === 'number') {
    const dt = DateTime.fromMillis(date)
    return dt.isValid ? dt : null
  }

  // String could be ISO, numeric millis, or unrelated text. Try numeric first.
  if (/^-?\d+$/.test(date)) {
    const millis = Number.parseInt(date, 10)
    if (Number.isNaN(millis)) return null
    const dt = DateTime.fromMillis(millis)
    return dt.isValid ? dt : null
  }

  const iso = DateTime.fromISO(date)
  if (iso.isValid) return iso
  const fromString = DateTime.fromMillis(Number(date))
  return fromString.isValid ? fromString : null
}

/**
 * "2h ago", "Just now", "3d ago", "Apr 4" if older than 7 days.
 */
export function formatRelativeTime(date?: string | number | Date | null): string {
  if (date === null || date === undefined) return NOT_PROVIDED_PLACEHOLDER
  const dt = parseFlexibleDate(date)
  if (!dt || !dt.isValid) return NOT_PROVIDED_PLACEHOLDER

  const now = DateTime.now()
  const diffMinutes = now.diff(dt, 'minutes').minutes

  if (diffMinutes < 1) return t('Just now')
  if (diffMinutes < 60) return t('{{count}}m ago', { count: Math.floor(diffMinutes) })

  const diffHours = now.diff(dt, 'hours').hours
  if (diffHours < 24) return t('{{count}}h ago', { count: Math.floor(diffHours) })

  const diffDays = now.diff(dt, 'days').days
  if (diffDays < 7) return t('{{count}}d ago', { count: Math.floor(diffDays) })

  if (dt.year === now.year) return dt.toFormat('LLL d')
  return dt.toFormat('LLL d, yyyy')
}

/**
 * Truncate a UUID for display. e.g. "abcd1234-…-9876"
 */
export function truncateUuid(value?: string | null) {
  if (!value) return NOT_PROVIDED_PLACEHOLDER
  if (value.length <= 12) return value
  return `${value.slice(0, 8)}…${value.slice(-4)}`
}
