import { __production__, __staging__ } from '@/shared/constants'
import {
  GuardiansBlackJerseyUrl,
  GuardiansMobileDarkKingUrl,
  GuardiansMobileDarkKnightUrl,
  GuardiansMobileDarkLegendUrl,
  GuardiansMobileDarkWarriorUrl,
  GuardiansStickersUrl,
  GuardiansWhiteJerseyUrl,
  GuardiansZineUrl,
  KingCharacterPageDesktop,
  KingCharacterPageMobile,
  KingJewelUrl,
  KingLargeDarkUrl,
  KingLargeLightUrl,
  KingMainPageDesktop,
  KingMainPageGreyDesktop,
  KingMainPageGreyMobile,
  KingMainPageMobile,
  KingNostrCardUrl,
  KingRaycastUrl,
  KingTradingCardUrl,
  KingTshirtUrl,
  KnightCharacterPageDesktop,
  KnightCharacterPageMobile,
  KnightJewelUrl,
  KnightLargeDarkUrl,
  KnightLargeLightUrl,
  KnightMainPageDesktop,
  KnightMainPageGreyDesktop,
  KnightMainPageGreyMobile,
  KnightMainPageMobile,
  KnightNostrCardUrl,
  KnightRaycastUrl,
  KnightTradingCardUrl,
  KnightTshirtUrl,
  LegendCharacterPageDesktop,
  LegendCharacterPageMobile,
  LegendJewelUrl,
  LegendLargeDarkUrl,
  LegendLargeLightUrl,
  LegendMainPageDesktop,
  LegendMainPageGreyDesktop,
  LegendMainPageGreyMobile,
  LegendMainPageMobile,
  LegendNostrCardUrl,
  LegendRaycastUrl,
  LegendTradingCardUrl,
  LegendTshirtUrl,
  MysteryItemMinerLightUrl,
  WarriorCharacterPageDesktop,
  WarriorCharacterPageMobile,
  WarriorJewelUrl,
  WarriorLargeDarkUrl,
  WarriorLargeLightUrl,
  WarriorMainPageDesktop,
  WarriorMainPageGreyDesktop,
  WarriorMainPageGreyMobile,
  WarriorMainPageMobile,
  WarriorNostrCardUrl,
  WarriorRaycastUrl,
} from '@/shared/constants/platform/url'

import { Guardian } from '../../types'

export const GuardianCharacter = {
  [Guardian.Warrior]: {
    main: WarriorMainPageDesktop,
    mainGrey: WarriorMainPageGreyDesktop,
    character: WarriorCharacterPageDesktop,
    raycast: WarriorRaycastUrl,
  },
  [Guardian.Knight]: {
    main: KnightMainPageDesktop,
    mainGrey: KnightMainPageGreyDesktop,
    character: KnightCharacterPageDesktop,
    raycast: KnightRaycastUrl,
  },
  [Guardian.King]: {
    main: KingMainPageDesktop,
    mainGrey: KingMainPageGreyDesktop,
    character: KingCharacterPageDesktop,
    raycast: KingRaycastUrl,
  },
  [Guardian.Legend]: {
    main: LegendMainPageDesktop,
    mainGrey: LegendMainPageGreyDesktop,
    character: LegendCharacterPageDesktop,
    raycast: LegendRaycastUrl,
  },
}

export const GuardianCharacterMobile = {
  [Guardian.Warrior]: {
    main: WarriorMainPageMobile,
    mainGrey: WarriorMainPageGreyMobile,
    character: WarriorCharacterPageMobile,
    raycast: WarriorRaycastUrl,
  },
  [Guardian.Knight]: {
    main: KnightMainPageMobile,
    mainGrey: KnightMainPageGreyMobile,
    character: KnightCharacterPageMobile,
    raycast: KnightRaycastUrl,
  },
  [Guardian.King]: {
    main: KingMainPageMobile,
    mainGrey: KingMainPageGreyMobile,
    character: KingCharacterPageMobile,
    raycast: KingRaycastUrl,
  },
  [Guardian.Legend]: {
    main: LegendMainPageMobile,
    mainGrey: LegendMainPageGreyMobile,
    character: LegendCharacterPageMobile,
    raycast: LegendRaycastUrl,
  },
}

export const GuardianImage = {
  light: {
    [Guardian.King]: KingLargeLightUrl,
    [Guardian.Knight]: KnightLargeLightUrl,
    [Guardian.Warrior]: WarriorLargeLightUrl,
    [Guardian.Legend]: LegendLargeLightUrl,
  },
  dark: {
    [Guardian.King]: KingLargeDarkUrl,
    [Guardian.Knight]: KnightLargeDarkUrl,
    [Guardian.Warrior]: WarriorLargeDarkUrl,
    [Guardian.Legend]: LegendLargeDarkUrl,
  },
}

export const GuardianImageMobileMode = {
  light: {
    [Guardian.King]: KingLargeLightUrl,
    [Guardian.Knight]: KnightLargeLightUrl,
    [Guardian.Warrior]: WarriorLargeLightUrl,
    [Guardian.Legend]: LegendLargeLightUrl,
  },
  dark: {
    [Guardian.King]: GuardiansMobileDarkKingUrl,
    [Guardian.Knight]: GuardiansMobileDarkKnightUrl,
    [Guardian.Warrior]: GuardiansMobileDarkWarriorUrl,
    [Guardian.Legend]: GuardiansMobileDarkLegendUrl,
  },
}

type Items = {
  name: string
  url: string
}

const ProductionRewardUUIDs = {
  [Guardian.Warrior]: {
    discount: '8629ad9b-09d4-4ad4-b4eb-f4aecc5b56e9',
    main: '705a51ee-0597-44ec-a4de-510473e9aeef',
  },
  [Guardian.Knight]: {
    discount: '6bbcc039-d281-4556-af46-2d75d45d0333',
    main: '082dcbb3-1d1f-4114-8f8c-30c75fbf43be',
  },
  [Guardian.King]: {
    discount: 'cbeac35c-d625-4a64-940e-59e1077dacae',
    main: 'e202f517-cfa7-460d-9ad2-0a31f524f38f',
  },
  [Guardian.Legend]: {
    discount: 'fc58733a-31f1-4ce9-bad3-a687e29a63f1',
    main: '93e9a072-547d-4b42-9592-fb4f963e5748',
  },
}

const StagingRewardUUIDs = {
  [Guardian.Warrior]: {
    discount: '0742f25c-786e-4d9a-bdc0-15c7eaeee7bb',
    main: '5e8249f2-f2ea-4b01-b9f7-63eb9339b5ad',
  },
  [Guardian.Knight]: {
    discount: '3c28cb48-d5c4-431e-879e-60bbbb6c3229',
    main: 'ced732b3-bd71-4fd2-b931-5462b7b44a0b',
  },
  [Guardian.King]: {
    discount: '422a0fec-313f-4c0d-8247-428e66c0e46e',
    main: 'a9290b99-5f5c-4ad6-bc28-1921cfe7c080',
  },
  [Guardian.Legend]: {
    discount: 'ca24c681-c88e-4671-a515-de97de039fb0',
    main: 'f7f5e736-849b-4b1a-823d-57dab9dd516f',
  },
}

const DevelopmentRewardUUIDs = {
  [Guardian.Warrior]: {
    discount: 'c2ef69ea-fd67-4d11-94da-5ad13aac7e58',
    main: '81cf2d32-0d0b-4d57-bff3-6af1a04c6e2f',
  },
  [Guardian.Knight]: {
    discount: '0432aada-43b6-4f25-9d04-790e215e21f6',
    main: 'c42753dd-cd8f-4533-8c40-041e9d8c9cd0',
  },
  [Guardian.King]: {
    discount: 'ad8a7eef-a968-4b82-a507-dd3f5af2d6e4',
    main: 'e99371e4-0727-485d-8581-c4680d5ff79b',
  },
  [Guardian.Legend]: {
    discount: 'f8e9c3ee-e9b9-4fff-b327-871a7aa18738',
    main: '0ba76480-249c-4800-b5f4-7115bfb9e27e',
  },
}

export const guardianRewardUUIDs = __production__
  ? ProductionRewardUUIDs
  : __staging__
  ? StagingRewardUUIDs
  : DevelopmentRewardUUIDs

export type RewardUUIDs = {
  discount: string
  main: string
}

export type GuardianAsset = {
  title: string
  description: string
  abilities: string[]
  digitalItems: Items[]
  available?: number
  physicalItems?: Items[]
  grants?: string[]
  discounts?: string[]
  experiences?: string[]
  rewardUUIDs: RewardUUIDs
}

export const CharacterAssets: {
  [key in Guardian]: GuardianAsset
} = {
  [Guardian.Warrior]: {
    title: 'Warrior',
    description:
      'Bearing scratches from countless battles, the Warrior is a fearless defender of Bitcoin adoption. His light armor and sharp instincts make him swift and strategic, rallying support for ideas in their earliest days. The magical pin he wears shines brightest when he is close to other Bitcoiners and in countries where Bitcoin is legal tender.',
    abilities: ['Fearless Sat Stacker', 'Lightning Resolve'],
    digitalItems: [
      {
        name: 'Nostr Badge',
        url: WarriorNostrCardUrl,
      },
      {
        name: 'Warrior Gem',
        url: WarriorJewelUrl,
      },
    ],
    grants: ['21% of purchase donated to Geyser Grants'],
    rewardUUIDs: guardianRewardUUIDs[Guardian.Warrior],
  },
  [Guardian.Knight]: {
    title: 'Knight',
    description:
      'As he ventures into the no-coiner lands, the Knight’s armour and broadsword protects him from any Fear, Uncertainty and Doubt thrown at him.',
    abilities: ['FUD SLAYER', 'FED DESTROYER'],
    digitalItems: [
      {
        name: 'Nostr Badge',
        url: KnightNostrCardUrl,
      },
      {
        name: 'Knight Gem',
        url: KnightJewelUrl,
      },
    ],
    available: 2100,
    physicalItems: [
      {
        name: 'T-Shirt',
        url: KnightTshirtUrl,
      },
      {
        name: 'Trading Card',
        url: KnightTradingCardUrl,
      },
      {
        name: 'Stickers',
        url: GuardiansStickersUrl,
      },
    ],
    discounts: ['25% OPA for the year', '25% Alby Hub for the year'],
    grants: ['21% of purchase donated to Geyser Grants'],
    rewardUUIDs: guardianRewardUUIDs[Guardian.Knight],
  },
  [Guardian.King]: {
    title: 'King',
    description:
      'It’s a long road to hyper-bitcoinisation, and the King knows it. His experience is his strength in planning for the best strategies to push Bitcoin adoption forward.',
    abilities: ['Strategic Bitcoin Conquerer', 'Circular Economies Enabler'],
    digitalItems: [
      {
        name: 'Nostr Badge',
        url: KingNostrCardUrl,
      },
      {
        name: 'King Gem',
        url: KingJewelUrl,
      },
    ],
    available: 121,
    physicalItems: [
      {
        name: 'T-Shirt',
        url: KingTshirtUrl,
      },
      {
        name: 'Trading Card',
        url: KingTradingCardUrl,
      },
      {
        name: 'Zine',
        url: GuardiansZineUrl,
      },
      {
        name: 'Jersey',
        url: GuardiansBlackJerseyUrl,
      },
      {
        name: 'Stickers',
        url: GuardiansStickersUrl,
      },
    ],
    grants: ['21% of purchase donated to Geyser Grants'],
    discounts: ['50% OPA for the year', '25% Alby Hub for the year'],
    rewardUUIDs: guardianRewardUUIDs[Guardian.King],
  },
  [Guardian.Legend]: {
    title: 'Legend',
    description:
      'Little is known about the Legends. Their OpSec has kept them clear of curious three-letter agencies. Yet, tales of the Legends are as old as Bitcoin itself, and their influence on adoption continuous to be felt.',
    abilities: ['Untraceable OpSec', 'Laser-Eyed Vision'],
    digitalItems: [
      {
        name: 'Nostr Badge',
        url: LegendNostrCardUrl,
      },
      {
        name: 'Legend Gem',
        url: LegendJewelUrl,
      },
    ],
    available: 21,
    physicalItems: [
      {
        name: 'T-Shirt',
        url: LegendTshirtUrl,
      },
      {
        name: 'Trading Card',
        url: LegendTradingCardUrl,
      },
      {
        name: 'Zine',
        url: GuardiansZineUrl,
      },
      {
        name: 'Jersey',
        url: GuardiansWhiteJerseyUrl,
      },
      {
        name: 'BitAxe',
        url: MysteryItemMinerLightUrl,
      },
      {
        name: 'Stickers',
        url: GuardiansStickersUrl,
      },
    ],
    discounts: [
      '50% OPA for the year',
      '50% Alby Hub for the year',
      '20% off Bitcoin 2025, Plan B El Salvador conferences',
      '10% off BTC Prague conference',
    ],
    experiences: ['Call with one Geyser creator of your choice'],
    grants: ['21% of purchase donated to Geyser Grants'],
    rewardUUIDs: guardianRewardUUIDs[Guardian.Legend],
  },
}
