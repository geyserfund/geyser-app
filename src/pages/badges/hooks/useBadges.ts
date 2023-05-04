import { useMemo } from 'react'

import { Badge, useBadgesQuery } from '../../../types'

export const useBadges = () => {
  const { data, error, loading, refetch } = useBadgesQuery()

  const badges = useMemo(() => {
    if (!data) {
      return {}
    }

    const map: any = {}

    for (const badge of data.badges) {
      const [type, subtype] = badge.uniqueName.split('_')

      if (!type || !subtype) {
        continue
      }

      if (!map[type]) {
        map[type] = { [subtype]: [badge] }
        continue
      }

      if (!map[type][subtype]) {
        map[type][subtype] = [badge]
        continue
      }

      map[type][subtype].push(badge)
    }

    return map as Record<string, Record<string, Array<Badge>>>
  }, [data])

  return {
    badges,
    error,
    loading,
    refetch,
  }
}
