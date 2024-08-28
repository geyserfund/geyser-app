import { AnonymousAvatarBaseUrl, anonymousOrbBaseUrl } from '../../shared/constants'

export const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

export const getRandomOrb = (id: number) => {
  const number = (id % 48) + 51
  return `${anonymousOrbBaseUrl}${number}.png`
}

export const getRandomAvatar = (id: number) => {
  const number = (id % 24) + 1
  return `${AnonymousAvatarBaseUrl}${number}.png`
}
