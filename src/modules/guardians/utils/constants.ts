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
  Badge = 'badge',
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
    rewardType: GuardianRewardType.Badge,
    title: t('Nostr Badges'),
    partners: [
      {
        name: 'NoGood',
        image: GuardianPartnerNoGoodUrl,
        link: 'https://www.nogood.studio/',
      },
    ],
  },
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
    guardian: GuardianType.Warrior,
    type: GuardianRewardType.Badge,
    rewardUUID: '8629ad9b-09d4-4ad4-b4eb-f4aecc5b56e9',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/warrior-badge.png',
  },
  {
    guardian: GuardianType.Knight,
    type: GuardianRewardType.Badge,
    rewardUUID: '3076da79-eedf-45aa-bae0-ad2be9ccf76a',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/knight-badge.png',
  },
  {
    guardian: GuardianType.King,
    type: GuardianRewardType.Badge,
    rewardUUID: 'fbba13b6-ba5d-42f7-823e-16fd55035203',
    image: 'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/king-badge.png',
  },
  {
    guardian: GuardianType.Legend,
    type: GuardianRewardType.Badge,
    rewardUUID: '6bd4995d-cbca-4b64-bf7e-884c57789c88',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/legend-badge.png',
  },
  {
    guardian: GuardianType.Knight,
    type: GuardianRewardType.Card,
    rewardUUID: '8733add7-e317-47da-9a1f-4a4571b02cbc',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/Knight-Front.png',
  },
  {
    guardian: GuardianType.King,
    type: GuardianRewardType.Card,
    rewardUUID: 'dcbe3267-005d-48b1-bc66-186f16edb2cd',
    image: 'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/King-Front.png',
  },
  {
    guardian: GuardianType.Legend,
    type: GuardianRewardType.Card,
    rewardUUID: '2d218665-ba07-4e1d-93ef-51ce36775ce5',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/Legend-Front.png',
  },
  {
    guardian: GuardianType.Knight,
    type: GuardianRewardType.Tshirt,
    rewardUUID: 'f62599a7-ec6d-4722-a395-c7ef2291ff6c',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/f-knight-shirt.png',
  },
  {
    guardian: GuardianType.King,
    type: GuardianRewardType.Tshirt,
    rewardUUID: '80e172e9-fb9d-4f7e-b4f9-3dc8f9cfde83',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/f-King-shirt.png',
  },
  {
    guardian: GuardianType.Legend,
    type: GuardianRewardType.Tshirt,
    rewardUUID: '1d8db465-9942-4ecf-9500-8cdfce3d0499',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/f-legend-shirt.png',
  },
  {
    guardian: GuardianType.King,
    type: GuardianRewardType.Jersey,
    rewardUUID: 'b8c8c94d-627d-4fe4-9533-b7c631d33f51',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/F-King-Gersey.png',
  },
  {
    guardian: GuardianType.Legend,
    type: GuardianRewardType.Jersey,
    rewardUUID: 'e0945bb2-59d4-4802-9278-570aa25ceb0d',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/F-legend-Gersey.png',
  },
  {
    guardian: GuardianType.Legend,
    type: GuardianRewardType.Bitaxe,
    rewardUUID: '824e2f42-4f21-47a3-9b80-57652406faea',
    image: 'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/items/individual/Bitaxe-High.png',
  },
]
