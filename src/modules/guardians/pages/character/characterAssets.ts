import {
  GuardiansMobileDarkKingUrl,
  GuardiansMobileDarkKnightUrl,
  GuardiansMobileDarkLegendUrl,
  GuardiansMobileDarkWarriorUrl,
  KingLargeDarkUrl,
  KingLargeLightUrl,
  KnightLargeDarkUrl,
  KnightLargeLightUrl,
  LegendLargeDarkUrl,
  LegendLargeLightUrl,
  MysteryItemBlocksUrl,
  MysteryItemBookUrl,
  MysteryItemCardsUrl,
  MysteryItemJerseyUrl,
  MysteryItemMinerUrl,
  MysteryItemTshirtUrl,
  WarriorLargeDarkUrl,
  WarriorLargeLightUrl,
} from '@/shared/constants/platform/url'

import { Guardian } from '../../types'

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

export const CharacterPageCopies: {
  [key in Guardian]: {
    title: string
    description: string
    abilities: string[]
    digitalItems: string[]
    available?: number
    physicalItems?: string[]
    discounts?: string
  }
} = {
  [Guardian.Warrior]: {
    title: 'WARRIOR',
    description:
      'Equiped with a light armour, the Warrior’s an agile defender of Bitcoin adoption. His bravery takes him to support ideas in their earliest days.',
    abilities: ['Fearless Sat Stacker', 'A bit of a psychopath'],
    digitalItems: ['Warrior badge', 'Nostr card'],
  },
  [Guardian.Knight]: {
    title: 'KNIGHT',
    description:
      'As he ventures into the no-coiner lands, the Knight’s armour and broadsword protects him from any Fear, Uncertainty and Doubt thrown at him.',
    abilities: ['FUD SLAYER', 'A bit of a psychopath'],
    digitalItems: ['Knight badge', 'Nostr card'],
    available: 2100,
    physicalItems: [MysteryItemCardsUrl, MysteryItemTshirtUrl, MysteryItemBlocksUrl],
  },
  [Guardian.King]: {
    title: 'KING',
    description:
      'It’s a long road to hyper-bitcoinisation, and the King knows it. His experience is his strength in planning for the best strategies to push Bitcoin adoption forward.',
    abilities: ['Strategic Bitcoin Conquerer', 'Low-Time Preference Leader'],
    digitalItems: ['King badge', 'Nostr card'],
    available: 210,
    physicalItems: [
      MysteryItemCardsUrl,
      MysteryItemTshirtUrl,
      MysteryItemBlocksUrl,
      MysteryItemBookUrl,
      MysteryItemJerseyUrl,
    ],
    discounts: 'Discounts on tools and conferences, to be announced.',
  },
  [Guardian.Legend]: {
    title: 'LEGEND',
    description:
      'Little is known about the Legends. Their OpSec has kept them clear of curious three-letter agencies. Yet, tales of the Legends are as old as Bitcoin itself, and their influence on adoption continuous to be felt.',
    abilities: ['Untraceable OpSec', 'Bitcoin Maximalist'],
    digitalItems: ['Legend badge', 'Nostr card'],
    available: 21,
    physicalItems: [
      MysteryItemCardsUrl,
      MysteryItemTshirtUrl,
      MysteryItemBlocksUrl,
      MysteryItemBookUrl,
      MysteryItemJerseyUrl,
      MysteryItemMinerUrl,
    ],
    discounts: 'Discounts on tools and conferences, to be announced.',
  },
}
