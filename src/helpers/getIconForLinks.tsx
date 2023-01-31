/* eslint-disable complexity */
import { IconType } from 'react-icons'
import {
  BsBehance,
  BsDiscord,
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsGlobe,
  BsInstagram,
  BsLinkedin,
  BsMastodon,
  BsMedium,
  BsPinterest,
  BsSkype,
  BsSlack,
  BsSnapchat,
  BsTelegram,
  BsTwitch,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs'
import { FaTiktok } from 'react-icons/fa'

import { AmbossIcon } from '../components/icons'
import { Maybe } from '../types'

export const getIconForLink = (value: Maybe<string>) => {
  if (!value) {
    return BsGlobe
  }

  if (value?.toLowerCase().includes('twitter')) {
    return BsTwitter
  }

  if (value?.toLowerCase().includes('linkedin')) {
    return BsLinkedin
  }

  if (value?.toLowerCase().includes('medium')) {
    return BsMedium
  }

  if (value?.toLowerCase().includes('linkedin')) {
    return BsMedium
  }

  if (value?.toLowerCase().includes('facebook')) {
    return BsFacebook
  }

  if (value?.toLowerCase().includes('facebook')) {
    return BsFacebook
  }

  if (value?.toLowerCase().includes('reddit')) {
    return BsFacebook
  }

  if (value?.toLowerCase().includes('slack')) {
    return BsSlack
  }

  if (value?.toLowerCase().includes('skype')) {
    return BsSkype
  }

  if (value?.toLowerCase().includes('pinterest')) {
    return BsPinterest
  }

  if (value?.toLowerCase().includes('github')) {
    return BsGithub
  }

  if (value?.toLowerCase().includes('discord')) {
    return BsDiscord
  }

  if (value?.toLowerCase().includes('instagram')) {
    return BsInstagram
  }

  if (value?.toLowerCase().includes('youtube')) {
    return BsYoutube
  }

  if (value?.toLowerCase().includes('behance')) {
    return BsBehance
  }

  if (value?.toLowerCase().includes('mastodon')) {
    return BsMastodon
  }

  if (value?.toLowerCase().includes('t.me')) {
    return BsTelegram
  }

  if (value?.toLowerCase().includes('twitch')) {
    return BsTwitch
  }

  if (value?.toLowerCase().includes('tiktok')) {
    return FaTiktok
  }

  if (value?.toLowerCase().includes('dribble')) {
    return BsDribbble
  }

  if (value?.toLowerCase().includes('snapchat')) {
    return BsSnapchat
  }

  if (value?.toLowerCase().includes('amboss')) {
    return AmbossIcon as IconType
  }

  return BsGlobe
}
