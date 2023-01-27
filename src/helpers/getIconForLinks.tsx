import {
  BsDiscord,
  BsFacebook,
  BsGithub,
  BsGlobe,
  BsLinkedin,
  BsMedium,
  BsPinterest,
  BsSkype,
  BsSlack,
  BsTwitter,
} from 'react-icons/bs'

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

  if (value?.toLowerCase().includes('slack')) {
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

  return BsGlobe
}
