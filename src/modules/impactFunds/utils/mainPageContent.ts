import { t } from 'i18next'
import type { IconType } from 'react-icons'
import { PiHandshakeBold, PiMapPinBold, PiRecycleBold } from 'react-icons/pi'

/** Trust pillar items for the Impact Funds landing hero strip. */
export type ImpactFundsTrustPillar = {
  title: string
  description: string
  icon: IconType
}

export const impactFundsTrustPillars: readonly ImpactFundsTrustPillar[] = [
  {
    title: t('Local first'),
    description: t(
      'Local businesses are the backbone of any strong economy. The Fund provides financial support to people that are kickstarting or growing their local business.',
    ),
    icon: PiMapPinBold,
  },
  {
    title: t('Trusted network'),
    description: t(
      'Trustless money for a healthier trust-based society. Bitcoin enables new human connections and trust networks. The Fund leverages those networks to fund local projects.',
    ),
    icon: PiHandshakeBold,
  },
  {
    title: t('Circular economy'),
    description: t(
      'Spend it, use it, circulate it. The new global Bitcoin economy is built one Bitcoin transaction at a time. Start local to grow global.',
    ),
    icon: PiRecycleBold,
  },
] as const

/** How-it-works steps (aligned with Impact Funds flow; copy can diverge from ImpactFlowStrip). */
export type ImpactFundsHowStep = {
  title: string
  description: string
}

export const impactFundsHowItWorksSteps: readonly ImpactFundsHowStep[] = [
  {
    title: t('Donate'),
    description: t(
      'Grow the pool of capital. Select a region and/or category and make a one time or recurring donation to the fund.',
    ),
  },
  {
    title: t('Funds Distribution'),
    description: t(
      "Funds are periodically distributed to support local initiatives that promote Bitcoin's adoption, awareness and circulation.",
    ),
  },
  {
    title: t('Receive Impact Report'),
    description: t('Receive periodic impact reports on how funds were distributed, and the impact they had.'),
  },
] as const

export type ImpactFundsCommunityLeader = {
  name: string
  role: string
  imageUrl?: string
}

/** Fallback community leader profiles when API does not expose a directory (`imageUrl` optional for avatars). */
export const impactFundsCommunityLeadersFallback: readonly ImpactFundsCommunityLeader[] = [
  {
    name: t('Pupusas G'),
    role: t('San Salvador, El Salvador'),
    imageUrl: '/images/impact-funds/trust-network/pupusasg.png',
  },
  {
    name: t('Evelyn'),
    role: t('Berlín, El Salvador'),
    imageUrl: '/images/impact-funds/trust-network/bitcoin-berlin.png',
  },
  {
    name: t('Martin'),
    role: t('BTC Kakuma, Kenya'),
    imageUrl: '/images/impact-funds/trust-network/martin.png',
  },
  {
    name: t('Kondwani'),
    role: t('Bitcoin Study Hubs, Malawi'),
    imageUrl: '/images/impact-funds/trust-network/kondwani.png',
  },
] as const

export type ImpactFundsSuccessStory = {
  title: string
  description: string
  /** Public URL for the story (e.g. Geyser guide); when set, the card links out. */
  href?: string
  /** Hero image under `public/`; omit to show a placeholder tile. */
  imageUrl?: string
}

export const impactFundsSuccessStoriesFallback: readonly ImpactFundsSuccessStory[] = [
  {
    title: t('WallAxe: Stick it everywhere'),
    description: t(
      'This project emerged from the Bitcoin crowdfunding workshops enabled by the Impact Fund, pairing a simple “stick it everywhere” idea with grassroots momentum.',
    ),
    imageUrl: '/images/impact-funds/success-stories/wallaxe.png',
    href: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/wallaxe',
  },
  {
    title: t('Berlin Walls Fest: Raising Bitcoin awareness in El Salvador through murals'),
    description: t(
      'Berlin Walls Fest emerged from local crowdfunding workshops, showing how grassroots storytelling can turn an idea into a fully funded reality.',
    ),
    imageUrl: '/images/impact-funds/success-stories/berlin-wall-fest.png',
    href: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/berlin-walls-fest',
  },
] as const
