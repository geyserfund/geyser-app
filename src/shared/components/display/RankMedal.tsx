import { Image } from '@chakra-ui/react'

import { BronzeMedalUrl, GoldMedalUrl, SilverMedalUrl } from '@/shared/constants'

import { Body } from '../typography'

type RankMedalProps = {
  rank: number
  /** Box size for the rank medals */
  boxSize?: number | string
  /** Font Size of the rank numbers */
  size?: string
}

export const RankMedal = ({ rank, boxSize, size }: RankMedalProps) => {
  const medalUrl = [GoldMedalUrl, SilverMedalUrl, BronzeMedalUrl]
  const src = medalUrl[rank - 1]
  if (src) {
    return <Image src={src} alt={`Rank ${rank}`} boxSize={boxSize || '20px'} />
  }

  return (
    <Body size={size || 'xs'} bold muted paddingX="6px">
      {rank}
    </Body>
  )
}
