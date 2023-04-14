import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

import { Badge } from '../../types'
import { BADGES_QUERY } from '../queries/badges'

type ResponseData = {
  badges: Badge[]
}

export const useBadges = () => {
  const { data, error, loading, refetch } = useQuery<ResponseData>(BADGES_QUERY)

  const badges = useMemo(() => {
    if (!data) {
      return {}
    }

    const map: any = {}

    for (const badge of data.badges) {
      const [type, subtype] = badge.uniqueName.split('_')

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
