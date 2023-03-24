import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

import { Badge } from '../../types'
import { BADGES_QUERY } from '../queries/badges'

type ResponseData = {
  badges: Badge[]
}

const BADGE_CATEGORY_MAP: Record<
  string,
  Record<string, Array<string> | Array<Badge | null>>
> = {
  'Contributor badges': {
    'Contribution amount': [
      '26103ef368856e9c284b16ad616dc0a84718aed7c38500ba5a9088217cd738e2',
      'aeb475af7b938f940047b05f9a94fd22b50fce97d1d7c6d94deabac82db8f27f',
      '2c971d59c6071f846b52397c191ef31a28078b5d520fc35b808dd2554eafe51c',
    ],
    'Project contributions': [
      'e06998068ce7fd1ef70d24bf3134556ced00f3d7ae444fc6f706c04b6a7bad5a',
      'ef69fa6568afd51baecab0490682911c9fb5da42d5a4855711cc490ddb2f7c15',
      '314da5d8eeda8bb46da57940ca669b6b03e8eb75484d4405eff21186a8a53e36',
    ],
  },
  'Creator badges': {
    'General creator badges': [
      '5a8dd614277eeea544079c75276c29ffe66ccd604e78aa5b35450cbaf33c79ac',
      'd9ecd1a4c3688761a7019d20008733c6d0db88dfe08c17506265f13adadddd45',
    ],
    Grants: [
      '2aa52f2b91e55617953376e3b814cfaab4a6e7f3641045031234616cc01f2da1',
      'd3da8c656b7c0baf832988934c406986b00fafc64f9b928e4b1f60e922948c63',
    ],
  },
  'Community badges': {
    '': [
      'b029e87822fab4b2a9eafc8c72884d763def2e864b29f69fa9e9b325bab70490',
      '2730e83c1967ffdbc09d63e7b18fa0a370338191c0276de28e4ba98f4eaa936b',
    ],
  },
}

export const useBadges = () => {
  const { data, error, loading, refetch } = useQuery<ResponseData>(BADGES_QUERY)

  const badges = useMemo(() => {
    if (!data) {
      return {}
    }

    console.log(data.badges)

    const map: any = {}
    for (const category in BADGE_CATEGORY_MAP) {
      if (BADGE_CATEGORY_MAP[category]) {
        map[category] = {}
        for (const subcategory in BADGE_CATEGORY_MAP[category]) {
          if (BADGE_CATEGORY_MAP[category][subcategory]) {
            map[category][subcategory] = BADGE_CATEGORY_MAP[category][
              subcategory
            ].map((id) => data.badges.find((b) => b.id === id) || null)
          }
        }
      }
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
