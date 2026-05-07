import { DateTime } from 'luxon'

import { commaFormatted } from '@/utils'

import { NOT_PROVIDED_PLACEHOLDER } from './dashboardConstants'

const satsNumberFormatter = new Intl.NumberFormat()

export function formatEnumLabel(value?: string | null) {
  if (!value) return NOT_PROVIDED_PLACEHOLDER
  return value
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function formatSats(amount?: number | null) {
  if (amount === null || amount === undefined) return NOT_PROVIDED_PLACEHOLDER
  return `${satsNumberFormatter.format(amount)} sats`
}

export function formatSatsCompact(amount?: number | null) {
  if (amount === null || amount === undefined) return NOT_PROVIDED_PLACEHOLDER
  if (amount === 0) return '0 sats'

  const absAmount = Math.abs(amount)

  if (absAmount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(1)}B sats`
  }

  if (absAmount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M sats`
  }

  if (absAmount >= 10_000) {
    return `${(amount / 1_000).toFixed(0)}K sats`
  }

  return `${commaFormatted(amount)} sats`
}

export function formatDate(date?: string | number | Date | null) {
  if (!date) return NOT_PROVIDED_PLACEHOLDER
  const dt = parseFlexibleDate(date)
  if (!dt) return NOT_PROVIDED_PLACEHOLDER
  return dt.toFormat('dd LLL yyyy')
}

/**
 * Parse a date that may arrive as ISO string, millisecond-string, millisecond-number, or Date.
 * Backend uses BigInt scalars serialized as numeric strings for DB timestamps.
 */
function parseFlexibleDate(date: string | number | Date): DateTime | null {
  if (date instanceof Date) {
    return DateTime.fromJSDate(date)
  }

  if (typeof date === 'number') {
    return DateTime.fromMillis(date)
  }

  // String — could be ISO, numeric millis, or a UUID-like noise. Try numeric first.
  if (/^-?\d+$/.test(date)) {
    return DateTime.fromMillis(parseInt(date, 10))
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
  if (!date) return NOT_PROVIDED_PLACEHOLDER
  const dt = parseFlexibleDate(date)
  if (!dt) return NOT_PROVIDED_PLACEHOLDER

  const now = DateTime.now()
  const diffMinutes = now.diff(dt, 'minutes').minutes

  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes < 60) return `${Math.floor(diffMinutes)}m ago`

  const diffHours = now.diff(dt, 'hours').hours
  if (diffHours < 24) return `${Math.floor(diffHours)}h ago`

  const diffDays = now.diff(dt, 'days').days
  if (diffDays < 7) return `${Math.floor(diffDays)}d ago`

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
