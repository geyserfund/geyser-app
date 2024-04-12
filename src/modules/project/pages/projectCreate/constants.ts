import {
  ArtworkImageUrl,
  BookImageUrl,
  CollectibleImageUrl,
  CourseImageUrl,
  DigitalContentImageUrl,
  ExperienceImageUrl,
  GameImageUrl,
  GiftImageUrl,
  MembershipImageUrl,
  MerchImageUrl,
  NostrBadgeImageUrl,
  PhysicalProductImageUrl,
  RaffleImageUrl,
  ServiceImageUrl,
  ShoutoutImageUrl,
  SponsorshipImageUrl,
  TicketImageUrl,
} from '../../../../constants/platform/url'
import { RewardCategory as RewardCategoryType } from './types'

export enum RewardCategory {
  Membership = 'Membership',
  Gift = 'Gift',
  Ticket = 'Ticket',
  NostrBadge = 'Nostr Badge',
  Collectible = 'Collectible',
  Book = 'Book',
  Course = 'Course',
  Game = 'Game',
  Merch = 'Merch',
  Raffle = 'Raffle',
  Sponsorship = 'Sponsorship',
  Service = 'Service',
  Shoutout = 'Shoutout',
  DigitalContent = 'Digital Content',
  Artwork = 'Artwork',
  PhysicalProduct = 'Physical Product',
  Experience = 'Experience',
}

export const rewardTemplates: {
  title: string
  category: RewardCategoryType
  description: string
  image: string
}[] = [
  {
    title: 'Membership',
    category: RewardCategory.Membership,
    description: 'Allow your users to be part of your membership club',
    image: MembershipImageUrl,
  },
  {
    title: 'Gift',
    category: RewardCategory.Gift,
    description: 'Give your contributors a gift',
    image: GiftImageUrl,
  },
  {
    title: 'Ticket',
    category: RewardCategory.Ticket,
    description: 'Offer a ticket to an event or experience',
    image: TicketImageUrl,
  },
  {
    title: 'Nostr Badge',
    category: RewardCategory.NostrBadge,
    description: 'Award a unique nostr badge',
    image: NostrBadgeImageUrl,
  },
  {
    title: 'Collectible',
    category: RewardCategory.Collectible,
    description: 'Offer a unique collectible item',
    image: CollectibleImageUrl,
  },
  {
    title: 'Book',
    category: RewardCategory.Book,
    description: 'Reward with a special edition book',
    image: BookImageUrl,
  },
  {
    title: 'Course',
    category: RewardCategory.Course,
    description: 'Provide access to an exclusive course',
    image: CourseImageUrl,
  },
  {
    title: 'Game',
    category: RewardCategory.Game,
    description: 'Grant a new game or in-game items',
    image: GameImageUrl,
  },
  {
    title: 'Merch',
    category: RewardCategory.Merch,
    description: 'Send out exclusive merchandise',
    image: MerchImageUrl,
  },
  {
    title: 'Raffle',
    category: RewardCategory.Raffle,
    description: 'Enter contributors into a raffle draw',
    image: RaffleImageUrl,
  },
  {
    title: 'Sponsorship',
    category: RewardCategory.Sponsorship,
    description: 'Provide sponsorship opportunities',
    image: SponsorshipImageUrl,
  },
  {
    title: 'Service',
    category: RewardCategory.Service,
    description: 'Offer a service from your portfolio',
    image: ServiceImageUrl,
  },
  {
    title: 'Shoutout',
    category: RewardCategory.Shoutout,
    description: 'Give a public thank you or mention',
    image: ShoutoutImageUrl,
  },
  {
    title: 'Digital Content',
    category: RewardCategory.DigitalContent,
    description: 'Distribute exclusive digital content',
    image: DigitalContentImageUrl,
  },
  {
    title: 'Artwork',
    category: RewardCategory.Artwork,
    description: 'Share original artwork or prints',
    image: ArtworkImageUrl,
  },
  {
    title: 'Physical Product',
    category: RewardCategory.PhysicalProduct,
    description: 'Send a physical product to your supporters',
    image: PhysicalProductImageUrl,
  },
  {
    title: 'Experience',
    category: RewardCategory.Experience,
    description: 'Create an unforgettable experience',
    image: ExperienceImageUrl,
  },
]
