import { t } from 'i18next'

import {
  GuardianPartnerBitcoinNewsUrl,
  GuardianPartnerBitcoinTradingCardsUrl,
  GuardianPartnerDJPUrl,
  GuardianPartnerHodlersUrl,
  GuardianPartnerInitialCapitalUrl,
  GuardianPartnerNoGoodUrl,
  GuardianPartnerRhinoUrl,
  GuardianPartnerSoloSatoshiUrl,
  GuardianPartnerWalletofSatoshiUrl,
} from '@/shared/constants/platform/url'
import { GuardianType } from '@/types/index.ts'

export const PartnerUrls = [
  { image: GuardianPartnerNoGoodUrl, link: 'https://www.nogood.studio/' },
  { image: GuardianPartnerBitcoinTradingCardsUrl, link: 'https://btc-tc.com/' },
  { image: GuardianPartnerHodlersUrl, link: 'https://hodlersofficial.com/' },
  { image: GuardianPartnerSoloSatoshiUrl, link: 'https://www.solosatoshi.com/' },

  { image: GuardianPartnerWalletofSatoshiUrl, link: 'https://www.walletofsatoshi.com/' },
  { image: GuardianPartnerInitialCapitalUrl, link: 'https://www.initialcapital.com/' },
  { image: GuardianPartnerRhinoUrl, link: 'https://rhinobitcoin.com/' },

  { image: GuardianPartnerDJPUrl, link: 'https://djp.pl/' },
  { image: GuardianPartnerBitcoinNewsUrl, link: 'https://bitcoinnews.com/' },
]

export const InvestorData = [
  {
    name: 'Brad Mills',
    image: 'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/investors/investor1-brad.png',
    link: 'https://x.com/bradmillscan',
  },
  {
    name: 'Phaedrus',
    image: 'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/investors/investor2-phaedrus.png',
    link: 'https://damus.io/npub1u65jmzmvyppx779m4pgsenw88h63y2q55wavr42n4h46ceaf9vnsznp0lk',
  },
  {
    name: 'Nout',
    image: 'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/investors/investor3-Nout.png',
    link: 'https://primal.net/p/nprofile1qqsdaw38re28weaadk8wca0weetptke30gpmql69jy6tq0njxcq9v4gcj2dvw',
  },
  {
    name: 'Hivemind Ventures',
    image: 'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/investors/investor4-hivemind.png',
    link: 'https://hivemind.vc/',
  },
  {
    name: 'Lightning Ventures',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/investors/investor5-lightningventures.png',
    link: 'https://ltng.ventures/',
  },
  {
    name: 'Coreteq',
    image: 'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/investors/investor6-coreteq.png',
    link: 'https://coreteq.ventures/',
  },
]

export const enum GuardianRewardType {
  Card = 'card',
  Tshirt = 'tshirt',
  Jersey = 'jersey',
  Bitaxe = 'bitaxe',
}

export type RewardDetails = {
  rewardType: GuardianRewardType
  title: string
  partners: { name: string; image: string; link: string }[]
}

export const GuardianRewardDetails: RewardDetails[] = [
  {
    rewardType: GuardianRewardType.Card,
    title: t('Guardian collectible cards'),
    partners: [
      {
        name: 'NoGood',
        image: GuardianPartnerNoGoodUrl,
        link: 'https://www.nogood.studio/',
      },
      {
        name: 'Bitcoin Trading Cards',
        image: GuardianPartnerBitcoinTradingCardsUrl,
        link: 'https://btc-tc.com/',
      },
    ],
  },
  {
    rewardType: GuardianRewardType.Jersey,
    title: t('Guardian jerseys'),
    partners: [
      {
        name: 'Hodlers',
        image: GuardianPartnerHodlersUrl,
        link: 'https://hodlersofficial.com/',
      },
    ],
  },
  {
    rewardType: GuardianRewardType.Tshirt,
    title: t('Guardian t-shirts'),
    partners: [
      {
        name: 'NoGood',
        image: GuardianPartnerNoGoodUrl,
        link: 'https://www.nogood.studio/',
      },
    ],
  },
  {
    rewardType: GuardianRewardType.Bitaxe,
    title: t('Guardian bitaxes'),
    partners: [
      {
        name: 'NoGood',
        image: GuardianPartnerNoGoodUrl,
        link: 'https://www.nogood.studio/',
      },
      {
        name: 'Solo Satoshi',
        image: GuardianPartnerSoloSatoshiUrl,
        link: 'https://www.solosatoshi.com/',
      },
    ],
  },
]

export type RewardMap = {
  guardian: GuardianType
  type: GuardianRewardType
  rewardUUID: string
  image?: string
}

export const guardianRewardsMap: RewardMap[] = [
  {
    guardian: GuardianType.Knight,
    type: GuardianRewardType.Card,
    rewardUUID: '73351183-097e-4a10-accf-fed1247394cb',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/f-Knight%20Front.png',
  },
  {
    guardian: GuardianType.King,
    type: GuardianRewardType.Card,
    rewardUUID: '39110286-acb4-4b90-b5e0-a49c59ddc035',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/f-King-Front.png',
  },
  {
    guardian: GuardianType.Legend,
    type: GuardianRewardType.Card,
    rewardUUID: '8b652cd4-f373-43ef-9569-5e04235ba76e',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/f-Legend%20Front.png',
  },
  {
    guardian: GuardianType.Knight,
    type: GuardianRewardType.Tshirt,
    rewardUUID: 'b3037458-225f-41f7-9d5e-8560640a1804',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/f-knight-shirt.png',
  },
  {
    guardian: GuardianType.King,
    type: GuardianRewardType.Tshirt,
    rewardUUID: 'cbb7a229-15b1-496d-be57-61f7d8f0f31a',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/f-King-shirt.png',
  },
  {
    guardian: GuardianType.Legend,
    type: GuardianRewardType.Tshirt,
    rewardUUID: '798d8202-89f9-45dc-89c3-fc25991d08d0',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/f-legend-shirt.png',
  },
  {
    guardian: GuardianType.King,
    type: GuardianRewardType.Jersey,
    rewardUUID: 'abd5e0a0-9237-4d63-84aa-c9babe6ac1bd',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/F-King-Gersey.png',
  },
  {
    guardian: GuardianType.Legend,
    type: GuardianRewardType.Jersey,
    rewardUUID: '9a90e1fa-66c0-4ead-89c7-469cfad425a0',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/F-legend-Gersey.png',
  },
  {
    guardian: GuardianType.Legend,
    type: GuardianRewardType.Bitaxe,
    rewardUUID: '35f5f84d-4b36-4910-a9f2-00f57e28c1d5',
    image: 'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/Bitaxe-High.png',
  },
]
