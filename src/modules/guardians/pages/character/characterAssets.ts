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
import { GuardianType } from '@/types'

export const GuardianCharacter = {
  [GuardianType.Warrior]: {
    main: WarriorMainPageDesktop,
    mainGrey: WarriorMainPageGreyDesktop,
    character: WarriorCharacterPageDesktop,
    raycast: WarriorRaycastUrl,
  },
  [GuardianType.Knight]: {
    main: KnightMainPageDesktop,
    mainGrey: KnightMainPageGreyDesktop,
    character: KnightCharacterPageDesktop,
    raycast: KnightRaycastUrl,
  },
  [GuardianType.King]: {
    main: KingMainPageDesktop,
    mainGrey: KingMainPageGreyDesktop,
    character: KingCharacterPageDesktop,
    raycast: KingRaycastUrl,
  },
  [GuardianType.Legend]: {
    main: LegendMainPageDesktop,
    mainGrey: LegendMainPageGreyDesktop,
    character: LegendCharacterPageDesktop,
    raycast: LegendRaycastUrl,
  },
}

export const GuardianCharacterMobile = {
  [GuardianType.Warrior]: {
    main: WarriorMainPageMobile,
    mainGrey: WarriorMainPageGreyMobile,
    character: WarriorCharacterPageMobile,
    raycast: WarriorRaycastUrl,
  },
  [GuardianType.Knight]: {
    main: KnightMainPageMobile,
    mainGrey: KnightMainPageGreyMobile,
    character: KnightCharacterPageMobile,
    raycast: KnightRaycastUrl,
  },
  [GuardianType.King]: {
    main: KingMainPageMobile,
    mainGrey: KingMainPageGreyMobile,
    character: KingCharacterPageMobile,
    raycast: KingRaycastUrl,
  },
  [GuardianType.Legend]: {
    main: LegendMainPageMobile,
    mainGrey: LegendMainPageGreyMobile,
    character: LegendCharacterPageMobile,
    raycast: LegendRaycastUrl,
  },
}

export const GuardianImage = {
  light: {
    [GuardianType.King]: KingLargeLightUrl,
    [GuardianType.Knight]: KnightLargeLightUrl,
    [GuardianType.Warrior]: WarriorLargeLightUrl,
    [GuardianType.Legend]: LegendLargeLightUrl,
  },
  dark: {
    [GuardianType.King]: KingLargeDarkUrl,
    [GuardianType.Knight]: KnightLargeDarkUrl,
    [GuardianType.Warrior]: WarriorLargeDarkUrl,
    [GuardianType.Legend]: LegendLargeDarkUrl,
  },
}

export const GuardianImageMobileMode = {
  light: {
    [GuardianType.King]: KingLargeLightUrl,
    [GuardianType.Knight]: KnightLargeLightUrl,
    [GuardianType.Warrior]: WarriorLargeLightUrl,
    [GuardianType.Legend]: LegendLargeLightUrl,
  },
  dark: {
    [GuardianType.King]: GuardiansMobileDarkKingUrl,
    [GuardianType.Knight]: GuardiansMobileDarkKnightUrl,
    [GuardianType.Warrior]: GuardiansMobileDarkWarriorUrl,
    [GuardianType.Legend]: GuardiansMobileDarkLegendUrl,
  },
}

export type CharacterAssetItem = {
  name: string
  description: string[]
  url: string
}

const ProductionRewardUUIDs = {
  [GuardianType.Warrior]: {
    discount: '8629ad9b-09d4-4ad4-b4eb-f4aecc5b56e9',
    main: '705a51ee-0597-44ec-a4de-510473e9aeef',
  },
  [GuardianType.Knight]: {
    discount: '6bbcc039-d281-4556-af46-2d75d45d0333',
    main: '082dcbb3-1d1f-4114-8f8c-30c75fbf43be',
  },
  [GuardianType.King]: {
    discount: 'cbeac35c-d625-4a64-940e-59e1077dacae',
    main: 'e202f517-cfa7-460d-9ad2-0a31f524f38f',
  },
  [GuardianType.Legend]: {
    discount: 'fc58733a-31f1-4ce9-bad3-a687e29a63f1',
    main: '93e9a072-547d-4b42-9592-fb4f963e5748',
  },
}

const StagingRewardUUIDs = {
  [GuardianType.Warrior]: {
    discount: '0742f25c-786e-4d9a-bdc0-15c7eaeee7bb',
    main: '5e8249f2-f2ea-4b01-b9f7-63eb9339b5ad',
  },
  [GuardianType.Knight]: {
    discount: '3c28cb48-d5c4-431e-879e-60bbbb6c3229',
    main: 'ced732b3-bd71-4fd2-b931-5462b7b44a0b',
  },
  [GuardianType.King]: {
    discount: '422a0fec-313f-4c0d-8247-428e66c0e46e',
    main: 'a9290b99-5f5c-4ad6-bc28-1921cfe7c080',
  },
  [GuardianType.Legend]: {
    discount: 'ca24c681-c88e-4671-a515-de97de039fb0',
    main: 'f7f5e736-849b-4b1a-823d-57dab9dd516f',
  },
}

const DevelopmentRewardUUIDs = {
  [GuardianType.Warrior]: {
    discount: 'c2ef69ea-fd67-4d11-94da-5ad13aac7e58',
    main: '81cf2d32-0d0b-4d57-bff3-6af1a04c6e2f',
  },
  [GuardianType.Knight]: {
    discount: '0432aada-43b6-4f25-9d04-790e215e21f6',
    main: 'c42753dd-cd8f-4533-8c40-041e9d8c9cd0',
  },
  [GuardianType.King]: {
    discount: 'ad8a7eef-a968-4b82-a507-dd3f5af2d6e4',
    main: 'e99371e4-0727-485d-8581-c4680d5ff79b',
  },
  [GuardianType.Legend]: {
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
  image: string
  description: string
  abilities: string[]
  digitalItems: CharacterAssetItem[]
  available?: number
  physicalItems?: CharacterAssetItem[]
  grants?: string[]
  discounts?: string[]
  experiences?: string[]
  rewardUUIDs: RewardUUIDs
}

export const CharacterAssets: {
  [key in GuardianType]: GuardianAsset
} = {
  [GuardianType.Warrior]: {
    title: 'Warrior',
    image: WarriorCharacterPageDesktop,
    description:
      'Bearing scratches from countless battles, the Warrior is a fearless defender of Bitcoin adoption. His light armor and sharp instincts make him swift and strategic, rallying support for ideas in their earliest days. The magical pin he wears shines brightest when he is close to other Bitcoiners and in countries where Bitcoin is legal tender.',
    abilities: ['Fearless Sat Stacker', 'Lightning Resolve'],
    digitalItems: [
      {
        name: 'Warior Nostr Badge',
        description: [
          'This Warrior badge will display next to your Geyser profile forever. It signals your support of Geyser and Bitcoin creators.',
        ],
        url: WarriorNostrCardUrl,
      },
      {
        name: 'Warrior Profile Gem',
        description: ['This Warrior card is a special digital item that is interoperable with Nostr. It’s unlimited.'],
        url: WarriorJewelUrl,
      },
    ],
    grants: ['21% of purchase donated to Geyser Grants'],
    rewardUUIDs: guardianRewardUUIDs[GuardianType.Warrior],
  },
  [GuardianType.Knight]: {
    title: 'Knight',
    image: KnightCharacterPageDesktop,
    description:
      'As he ventures into the no-coiner lands, the Knight’s armor and broadsword protects him from any Fear, Uncertainty and Doubt tthrown at him. His broadsword has mythical powers. It energizes itself near natural energy sources like waterfalls and geysers, and unleashes lightning bolds towards its opponents.',
    abilities: ['FUD SLAYER', 'FED DESTROYER'],
    digitalItems: [
      {
        name: 'Knight Nostr Badge (2,100 only)',
        description: [
          'This Knight Card is a special digital item that is interoperable with Nostr. This card is a limited edition; there will only ever be 2,100.',
        ],
        url: KnightNostrCardUrl,
      },
      {
        name: 'Knight Profile Gem (2,100 only) ',
        description: [
          'This Knight badge will display next to your Geyser profile forever. It signals your support for Geyser and Bitcoin creators.',
        ],
        url: KnightJewelUrl,
      },
    ],
    available: 2100,
    physicalItems: [
      {
        name: 'Knight T-Shirt (2,100 only)',
        description: [
          'A high-quality T-shirt made from 100% organic cotton and limited to the number of Knights. High quality durable print. Designs created by NoGood.',
        ],
        url: KnightTshirtUrl,
      },
      {
        name: 'Knight Trading Card (2,100 only)',
        description: [
          'A holographic Knight card designed and produced by the one and only BTC Trading Cards. The card comes in a simple foil cover. This is one of four Geyser Guardians Series 1 cards that will ever be produced.',
        ],
        url: KnightTradingCardUrl,
      },
      {
        name: 'Guardian Sticker pack',
        description: [
          'A holographic sticker pack featuring all Guardian characters, along with the Geyser and Geyser Guardians logos.',
        ],
        url: GuardiansStickersUrl,
      },
    ],
    discounts: ['25% OPA for the year', '25% Alby Hub for the year'],
    grants: ['21% of purchase donated to Geyser Grants'],
    rewardUUIDs: guardianRewardUUIDs[GuardianType.Knight],
  },
  [GuardianType.King]: {
    title: 'King',
    image: KingCharacterPageDesktop,
    description:
      'The King understands the long road to hyper-bitcoinization. Drinking from his enchanted chalice grants him foresight, allowing him to plan flawless strategies to advance Bitcoin adoption. With his golden crown and wise leadership, he inspires unity among Bitcoiners, guiding them toward a prosperous future.',
    abilities: ['Strategic Bitcoin Conquerer', 'Low-Time Preference Leader'],
    digitalItems: [
      {
        name: 'King Nostr Badge (121 only)',
        description: [
          'This King Card is a special digital item that is interoperable with Nostr. It is a limited edition, with only 121 ever created.',
        ],
        url: KingNostrCardUrl,
      },
      {
        name: 'King Profile Gem (121 only)',
        description: [
          'This King badge will display next to your Geyser profile forever. It signals your support for Geyser and Bitcoin creators.',
        ],
        url: KingJewelUrl,
      },
    ],
    available: 121,
    physicalItems: [
      {
        name: 'King T-Shirt (121 only)',
        description: [
          'A high-quality T-shirt made from 100% organic cotton and limited to the number of Kings. Features a durable, high-quality print that will last for decades. Designs created by NoGood.',
        ],
        url: KingTshirtUrl,
      },
      {
        name: 'King Trading Card (121 only)',
        description: [
          'A holographic collectible King card that comes in simple wrapping. The holographic effect doesn’t render in this image.',
          'This limited edition card, with only 121 produced, is one of four Geyser Guardians Series 1 cards. It’s designed and produced by the one and only BTC Trading Cards.',
        ],
        url: KingTradingCardUrl,
      },
      {
        name: 'The Guardians Zine',
        description: [
          'This Zine tells the full story and vision behind the Guardians. It explores the origins of the characters, their powers, and the hopeful world they are defending.',
          'Finally, it ties everything together with Bitcoin, and the Geyser Manifesto.',
          'The Zine also foreshadows what’s to come in the next Series of Geyser Guardians.',
        ],
        url: GuardiansZineUrl,
      },
      {
        name: 'King Jersey (121 only)',
        description: [
          'The King Jersey is a super high-quality item, made of 100% cotton, fully embroidered for lasting durability.',
          'The design is sharp and stands out with bright turquoise lines on a black jersey. The back features the “Guardian” sign to maintain good OpSec while showcasing you are a guardian of Bitcoin Adoption!',
          'Designed and produced by Hodlers Official.',
        ],
        url: GuardiansBlackJerseyUrl,
      },
      {
        name: 'Guardian Sticker pack',
        description: [
          'A holographic sticker pack featuring all Guardian characters, along with the Geyser and Geyser Guardians logos.',
        ],
        url: GuardiansStickersUrl,
      },
    ],
    grants: ['21% of purchase donated to Geyser Grants'],
    discounts: ['50% OPA for the year', '25% Alby Hub for the year'],
    rewardUUIDs: guardianRewardUUIDs[GuardianType.King],
  },
  [GuardianType.Legend]: {
    title: 'Legend',
    image: LegendCharacterPageDesktop,
    description:
      'Shrouded in mystery, the Legend moves through the shadows, evading even the sharpest scrutiny. His laser-eyed vision cuts through the lies of governments and institutions, uncovering clarity and truth. Those who meet his gaze are forever transformed, ignited with an unshakable desire to pursue a freer, better future.',
    abilities: ['Untraceable OpSec', 'Laser-Eyed Vision'],
    digitalItems: [
      {
        name: 'Legend Nostr Badge (21 only)',
        description: [
          'This Legend Card is a special digital item that is interoperable with Nostr. It is a limited edition, with only 21 ever created.',
        ],
        url: LegendNostrCardUrl,
      },
      {
        name: 'Legend Profile Gem (21 only)',
        description: [
          'This Legend badge will display next to your Geyser profile forever. It signals your support for Geyser and Bitcoin creators.',
        ],
        url: LegendJewelUrl,
      },
    ],
    available: 21,
    physicalItems: [
      {
        name: 'Knight T-Shirt (21 only) ',
        description: [
          'A high-quality T-shirt made from 100% organic cotton and limited to the number of Legends. Features a durable, high-quality print that will last for decades. Designs created by NoGood.',
        ],
        url: LegendTshirtUrl,
      },
      {
        name: 'Knight Trading Card (21 only)',
        description: [
          'A holographic collectible Legend card that comes in simple wrapping. The holographic effect doesn’t render in this image.',
          'This limited edition card, with only 21 produced, is one of four Geyser Guardians Series 1 cards. It’s designed and produced by the one and only BTC Trading Cards.',
        ],
        url: LegendTradingCardUrl,
      },
      {
        name: 'The GuardiansZine',
        description: [
          'This Zine tells the full story and vision behind the Guardians. It explores the origins of the characters, their powers, and the hopeful world they are defending.',
          'Finally, it ties everything together with Bitcoin, and the Geyser Manifesto.',
          'The Zine also foreshadows what’s to come in the next Series of Geyser Guardians.',
        ],
        url: GuardiansZineUrl,
      },
      {
        name: 'Legend Jersey (21 only)',
        description: [
          'The Legend Jersey is a super high-quality item, made of 100% cotton, fully embroidered for lasting durability.',
          'The design is sharp and with an elite feel, with bright turquoise lines on a white jersey. The back features the “Guardian” sign to maintain good OpSec while showcasing you are a guardian of Bitcoin Adoption!',
          'Designed and produced by Hodlers Official.',
        ],
        url: GuardiansWhiteJerseyUrl,
      },
      {
        name: 'BitAxe Gamma with 3D Stand',
        description: ['<WAITING FOR SPECS>'],
        url: MysteryItemMinerLightUrl,
      },
      {
        name: 'Guardian Sticker pack',
        description: [
          'A holographic sticker pack featuring all Guardian characters, along with the Geyser and Geyser Guardians logos.',
        ],
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
    rewardUUIDs: guardianRewardUUIDs[GuardianType.Legend],
  },
}
