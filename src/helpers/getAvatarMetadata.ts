import { BreezLogoUrl, FountainLogoUrl } from '../constants'
import { IFunder } from '../interfaces'
import { Funder } from '../types/generated/graphql'
import { getRandomOrb } from '../utils'

export const getAvatarMetadata = ({
  funder,
  source,
}: {
  funder: IFunder | Funder
  source?: string
}) => {
  if (!funder.user) {
    if (source === 'Breez') {
      return {
        appName: source,
        image: BreezLogoUrl,
        link: 'https://breez.technology/',
      }
    }

    return {
      image: getRandomOrb(funder.id),
    }
  }

  if (source) {
    if (source === 'Fountain') {
      const username = funder.user.username.replace('@', '')
      return {
        username,
        appName: 'Fountain.fm',
        image: FountainLogoUrl,
        link: `https://fountain.fm/${username}`,
      }
    }
  }

  return {
    username: funder.user.username,
    image: funder.user.imageUrl || getRandomOrb(funder.id),
    link: `/profile/${funder.user.id}`,
  }
}
