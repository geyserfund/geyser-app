import { t } from 'i18next'
import type { IconType } from 'react-icons'
import {
  PiArrowsClockwiseBold,
  PiBriefcaseBold,
  PiPercentBold,
  PiPlantBold,
  PiRecycleBold,
  PiUsersThreeBold,
  PiWalletBold,
} from 'react-icons/pi'

/** Top-of-page trust pillars (Impact Funds–style three-column strip). */
export type MicroLendingTrustPillar = {
  title: string
  description: string
  icon: IconType
}

export const microLendingTrustPillars: MicroLendingTrustPillar[] = [
  {
    title: t('Low to No Interest'),
    description: t('Local businesses get capital for much lower than the local market rate'),
    icon: PiPercentBold,
  },
  {
    title: t('Circular Economy Hubs'),
    description: t(
      'Local circular economy leaders are the trusted contact that hold the borrowers accountable. In return they receive the interest on the loan.',
    ),
    icon: PiRecycleBold,
  },
  {
    title: t('100% of principal returned'),
    description: t('As a lender you get your principal back so you can re-circulate it to another loan'),
    icon: PiArrowsClockwiseBold,
  },
]

/** Interest options for waitlist; values must match Airtable single-select options. */
export const microLendingInterestOptions = ['Borrower', 'Lender', 'Both'] as const
export type MicroLendingInterest = (typeof microLendingInterestOptions)[number]

export type MicroLendingWhyPoint = {
  title: string
  description: string
  icon: IconType
}

export const microLendingWhyGeyserPoints: MicroLendingWhyPoint[] = [
  {
    title: t('Well-Connected to Circular Economies'),
    description: t(
      'Geyser has strong connections to Bitcoin circular economy leaders around the world to coordinate and support local projects.',
    ),
    icon: PiUsersThreeBold,
  },
  {
    title: t('Wide Reach'),
    description: t('As a platform Geyser has a wider reach in the Bitcoin community to attract more lenders.'),
    icon: PiPlantBold,
  },
  {
    title: t('From Crowdfunding to Community Capital'),
    description: t(
      'We are extending Geyser’s crowdfunding roots into broader access to capital. The mission stays the same: to support Bitcoin adoption.',
    ),
    icon: PiArrowsClockwiseBold,
  },
]

/** Three parties for the “Sustainable for all” section (same shape as trust pillars). */
export const microLendingSustainableForAllParties: MicroLendingTrustPillar[] = [
  {
    title: t('Lenders'),
    description: t(
      'Lenders get 100%* of their principal back so they can re-circulate it to another loan. The same satoshis can help many borrowers over time.',
    ),
    icon: PiWalletBold,
  },
  {
    title: t('Borrowers'),
    description: t(
      'Borrowers get access to affordable capital for inventory, equipment, and growth. They are accountable to circular economy leaders on the ground.',
    ),
    icon: PiBriefcaseBold,
  },
  {
    title: t('Circular economy leaders'),
    description: t(
      'Circular economy leaders coordinate verification and adoption while earning sustainable yield from interest on loans they enabled. Interests are kept well below local market rates.',
    ),
    icon: PiUsersThreeBold,
  },
]

export type MicroLendingFaqItem = {
  question: string
  answer: string
}

/** Bottom-of-page FAQ entries for the micro-loans landing page. */
export const microLendingFaqItems: MicroLendingFaqItem[] = [
  {
    question: t('What are micro-loans on Geyser?'),
    answer: t(
      'Micro-loans on Geyser are a planned program to match small loans with community lenders, anchored by local Bitcoin circular economies. The experience is still in discovery: join the waitlist to help shape what we build.',
    ),
  },
  {
    question: t('When can I borrow or lend?'),
    answer: t(
      'We are gathering signups from borrowers, lenders, and community partners first. Timelines and eligibility details will follow as the product is defined, and waitlist subscribers will be the first to hear updates.',
    ),
  },
  {
    question: t('What is a Circular Economy Hub?'),
    answer: t(
      'A hub is a trusted local organization or leader that helps channel repayments, keep borrowers accountable, and earns a share of interest for coordinating adoption in their region.',
    ),
  },
  {
    question: t('Is my principal guaranteed?'),
    answer: t(
      'No loan is without risk. Even with strong accountability from circular economy leaders, borrowers may be unable to repay in full. Only lend what you can afford to lose and read all terms once a program is offered.',
    ),
  },
  {
    question: t('How do micro-loans relate to Geyser crowdfunding?'),
    answer: t(
      'Crowdfunding on Geyser helps launch ideas once. Micro-loans are designed to extend that into repeatable local credit with clearer repayment and visibility, still focused on real-world Bitcoin adoption.',
    ),
  },
  {
    question: t('What interest or fees should I expect?'),
    answer: t(
      'The goal is affordable, below-local-market rates for borrowers and a sustainable model for hubs and lenders. Exact numbers will depend on region, risk, and product details as the program is finalized.',
    ),
  },
  {
    question: t('How do I get updates?'),
    answer: t(
      'Join the waitlist with your email and country. Tell us whether you are interested as a borrower, lender, or both, and we will reach out as milestones approach.',
    ),
  },
]
