/* eslint-disable complexity */
import { IconType } from 'react-icons'
import {
  PiBehanceLogo,
  PiDiscordLogo,
  PiDribbbleLogo,
  PiFacebookLogo,
  PiGithubLogo,
  PiGlobeLight,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiMastodonLogo,
  PiMediumLogo,
  PiPinterestLogo,
  PiRedditLogo,
  PiSkypeLogo,
  PiSlackLogo,
  PiSnapchatLogo,
  PiTelegramLogo,
  PiTiktokLogo,
  PiTwitchLogo,
  PiXLogo,
  PiYoutubeLogo,
} from 'react-icons/pi'

import { AmbossIcon } from '../components/icons'
import { WavlakeIcon } from '../components/icons/svg'
import { Maybe } from '../types'

export const getIconForLink = (value: Maybe<string>) => {
  if (!value) {
    return PiGlobeLight
  }

  if (value?.toLowerCase().includes('twitter')) {
    return PiXLogo
  }

  if (value?.toLowerCase().includes('linkedin')) {
    return PiLinkedinLogo
  }

  if (value?.toLowerCase().includes('medium')) {
    return PiMediumLogo
  }

  if (value?.toLowerCase().includes('facebook')) {
    return PiFacebookLogo
  }

  if (value?.toLowerCase().includes('reddit')) {
    return PiRedditLogo
  }

  if (value?.toLowerCase().includes('slack')) {
    return PiSlackLogo
  }

  if (value?.toLowerCase().includes('skype')) {
    return PiSkypeLogo
  }

  if (value?.toLowerCase().includes('pinterest')) {
    return PiPinterestLogo
  }

  if (value?.toLowerCase().includes('github')) {
    return PiGithubLogo
  }

  if (value?.toLowerCase().includes('discord')) {
    return PiDiscordLogo
  }

  if (value?.toLowerCase().includes('instagram')) {
    return PiInstagramLogo
  }

  if (value?.toLowerCase().includes('youtube') || value?.toLowerCase().includes('youtu.be')) {
    return PiYoutubeLogo
  }

  if (value?.toLowerCase().includes('behance')) {
    return PiBehanceLogo
  }

  if (value?.toLowerCase().includes('mastodon')) {
    return PiMastodonLogo
  }

  if (value?.toLowerCase().includes('t.me')) {
    return PiTelegramLogo
  }

  if (value?.toLowerCase().includes('twitch')) {
    return PiTwitchLogo
  }

  if (value?.toLowerCase().includes('tiktok')) {
    return PiTiktokLogo
  }

  if (value?.toLowerCase().includes('dribble')) {
    return PiDribbbleLogo
  }

  if (value?.toLowerCase().includes('snapchat')) {
    return PiSnapchatLogo
  }

  if (value?.toLowerCase().includes('amboss')) {
    return AmbossIcon as IconType
  }

  if (value?.toLowerCase().includes('wavlake')) {
    return WavlakeIcon as IconType
  }

  return PiGlobeLight
}
