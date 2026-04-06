import type { IconType } from 'react-icons'
import {
  FaBolt,
  FaBuilding,
  FaBullhorn,
  FaCalendarAlt,
  FaCode,
  FaFilm,
  FaFlask,
  FaGraduationCap,
  FaHandsHelping,
  FaHeart,
  FaMicrophone,
  FaPalette,
  FaPenFancy,
  FaRocket,
  FaUsers,
  FaVideo,
} from 'react-icons/fa'

export type CreatorCategorySize = 'large' | 'medium' | 'small'

export type CreatorCategory = {
  title: string
  description: string
  imageUrl: string
  icon: IconType
  iconColor: string
  size: CreatorCategorySize
}

export type CreatorStory = {
  category: string
  title: string
  description: string
  outcomeLabel: string
  imageUrl: string
  linkUrl: string
  accentColor: string
  tag: string
}

export type CreatorMiniStory = {
  title: string
  subtitle?: string
  imageUrl: string
  linkUrl: string
}

export type CreatorPossibility = {
  title: string
  description: string
  icon: IconType
  iconColor: string
  surfaceColor: string
  borderColor: string
}

export type CreatorCommunityPillar = {
  title: string
  body: string
  icon: IconType
  accentColor: string
}

export type CreatorCommunityTestimonial = {
  quote: string
  author: string
  role: string
  accentColor: string
}

export const creatorHeroImageUrl =
  'https://images.unsplash.com/photo-1722623259595-5ed33e63fddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920'

export const creatorWelcomeVideoUrl = 'https://www.youtube.com/watch?v=D6NwCQ0uLic'

export const creatorCommunityMainImageUrl =
  'https://images.unsplash.com/photo-1760992003927-96ac55e57296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400'

export const creatorCategories: CreatorCategory[] = [
  {
    title: 'Filmmakers',
    description: 'Stories that deserve a wide audience.',
    icon: FaFilm,
    iconColor: '#ff6b6b',
    size: 'large',
    imageUrl:
      'https://images.unsplash.com/photo-1758788506109-8ed33e99d3a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Content creators',
    description: 'Channels and projects that build loyal communities.',
    icon: FaVideo,
    iconColor: '#00f5dc',
    size: 'large',
    imageUrl:
      'https://images.unsplash.com/photo-1617899516937-54fb61f7d3d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Podcasters',
    description: 'Long-form conversations with lasting impact.',
    icon: FaMicrophone,
    iconColor: '#ffd93d',
    size: 'medium',
    imageUrl:
      'https://images.unsplash.com/photo-1668606144327-837f2d8eac94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Open source builders',
    description: 'Public infrastructure and tools for everyone.',
    icon: FaCode,
    iconColor: '#6bcb77',
    size: 'medium',
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Startups',
    description: 'Early ideas finding early believers.',
    icon: FaRocket,
    iconColor: '#a78bfa',
    size: 'small',
    imageUrl:
      'https://images.unsplash.com/photo-1758873268933-e0765262e58d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Writers',
    description: 'Books, essays, research, and journalism.',
    icon: FaPenFancy,
    iconColor: '#f97316',
    size: 'small',
    imageUrl:
      'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Social causes',
    description: 'Grassroots missions powered by people who care.',
    icon: FaHeart,
    iconColor: '#f472b6',
    size: 'medium',
    imageUrl:
      'https://images.unsplash.com/photo-1595702700955-dbbc28a59da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Event organizers',
    description: 'Meetups and gatherings that grow local momentum.',
    icon: FaCalendarAlt,
    iconColor: '#34d399',
    size: 'small',
    imageUrl:
      'https://images.unsplash.com/photo-1760992003927-96ac55e57296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Bitcoin communities',
    description: 'Builders shaping open financial culture.',
    icon: FaBolt,
    iconColor: '#f59e0b',
    size: 'medium',
    imageUrl:
      'https://images.unsplash.com/photo-1694286067026-a8aa654481f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
]

export const creatorStories: CreatorStory[] = [
  {
    category: 'Collectibles',
    tag: 'Collectibles',
    accentColor: '#f59e0b',
    title: 'BTC Trading Cards',
    description:
      'BTC Trading Cards turned Bitcoin education into collectible culture, launching Series 1 exclusively on Geyser and rallying a global collector community.',
    outcomeLabel: '275M sats raised',
    imageUrl:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/44471b19-74ca-4cad-a480-582a09f8ae2e_IMG_7978/image_large.webp',
    linkUrl: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/btc-trading-cards',
  },
  {
    category: 'Documentary',
    tag: 'Documentary',
    accentColor: '#f97316',
    title: "Peru's Bitcoin Revolution",
    description:
      "Julian's documentary follows MOTIV across the Andes and Amazon, showing real Bitcoin impact and drawing worldwide backers behind the mission.",
    outcomeLabel: '$10K+ raised',
    imageUrl:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/7d122691-6f37-4f59-93dd-c717ba5bdf95_image/image_large.webp',
    linkUrl: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/perus-bitcoin-revolution',
  },
  {
    category: 'Community',
    tag: 'Community',
    accentColor: '#34d399',
    title: "BTC Isla by Satoshi's Legacy",
    description:
      'BTC Isla turns weekly proof-of-work into visible adoption, onboarding merchants and training locals to build a living Bitcoin circular economy.',
    outcomeLabel: '130+ properties onboarded',
    imageUrl:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/b480ba10-44f1-4484-b42a-cad42380d4d1_IMG_8067/image_large.webp',
    linkUrl: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/btc-isla',
  },
  {
    category: 'Hardware',
    tag: 'Hardware',
    accentColor: '#a78bfa',
    title: 'Bitcoinize',
    description:
      'Bitcoinize built a dedicated Lightning POS and used Geyser momentum to ship devices worldwide, helping circular economies accept Bitcoin with ease.',
    outcomeLabel: 'Over $100K raised',
    imageUrl:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/354102d2-c111-4c01-84dc-7f9285b583c4_bitcoinize-machine-scaled/image_large.webp',
    linkUrl: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/bitcoinize',
  },
]

export const creatorMiniStories: CreatorMiniStory[] = [
  {
    title: 'Noderunners Bitcoin Blitz',
    subtitle: 'Lightning arcade where backers became part of the game.',
    imageUrl:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/cd246c8f-9321-444a-a601-bb1f891e7f42_preview-character-select/image_large.webp',
    linkUrl: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/noderunners-bitcoin-blitz',
  },
  {
    title: 'Free Roman Storm',
    subtitle: 'Global legal defense for privacy and open-source rights.',
    imageUrl:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/dc1a9478-65dd-46e1-9307-ee91de8019a3_Screenshot2025-06-03at14.46.28/image_large.webp',
    linkUrl: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/free-roman-storm',
  },
  {
    title: 'WallAxe',
    subtitle: 'Portable Bitaxe kits making hashpower more accessible.',
    imageUrl:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/92262059-025a-4b30-bf51-56dc786d6ed7_Firefly_GeminiFlash_astylisedanimeversionofthisdevicethesameasthedrawingwhichwillbeusedas872718/image_large.webp',
    linkUrl: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/wallaxe',
  },
]

export const creatorPossibilities: CreatorPossibility[] = [
  {
    title: 'A documentary',
    description: 'Tell the story only you can tell.',
    icon: FaFilm,
    iconColor: '#ff6b6b',
    surfaceColor: 'rgba(255, 107, 107, 0.08)',
    borderColor: 'rgba(255, 107, 107, 0.25)',
  },
  {
    title: 'A local meetup series',
    description: 'Create recurring spaces for your community.',
    icon: FaUsers,
    iconColor: '#34d399',
    surfaceColor: 'rgba(52, 211, 153, 0.08)',
    borderColor: 'rgba(52, 211, 153, 0.25)',
  },
  {
    title: 'A podcast',
    description: 'Build long-form trust with your audience.',
    icon: FaMicrophone,
    iconColor: '#ffd93d',
    surfaceColor: 'rgba(255, 217, 61, 0.08)',
    borderColor: 'rgba(255, 217, 61, 0.25)',
  },
  {
    title: 'An education initiative',
    description: 'Help people gain practical skills.',
    icon: FaGraduationCap,
    iconColor: '#60a5fa',
    surfaceColor: 'rgba(96, 165, 250, 0.08)',
    borderColor: 'rgba(96, 165, 250, 0.25)',
  },
  {
    title: 'An open-source tool',
    description: 'Build infrastructure in public.',
    icon: FaCode,
    iconColor: '#00f5dc',
    surfaceColor: 'rgba(0, 245, 220, 0.08)',
    borderColor: 'rgba(0, 245, 220, 0.25)',
  },
  {
    title: 'A cultural project',
    description: 'Translate values into art, music, and media.',
    icon: FaPalette,
    iconColor: '#f472b6',
    surfaceColor: 'rgba(244, 114, 182, 0.08)',
    borderColor: 'rgba(244, 114, 182, 0.25)',
  },
  {
    title: 'A community hub',
    description: 'Give your people a place to gather.',
    icon: FaBuilding,
    iconColor: '#a78bfa',
    surfaceColor: 'rgba(167, 139, 250, 0.08)',
    borderColor: 'rgba(167, 139, 250, 0.25)',
  },
  {
    title: 'A startup experiment',
    description: 'Validate bold ideas with aligned supporters.',
    icon: FaFlask,
    iconColor: '#f59e0b',
    surfaceColor: 'rgba(245, 158, 11, 0.08)',
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  {
    title: 'A writing project',
    description: 'Publish work with depth and staying power.',
    icon: FaPenFancy,
    iconColor: '#fb923c',
    surfaceColor: 'rgba(251, 146, 60, 0.08)',
    borderColor: 'rgba(251, 146, 60, 0.25)',
  },
]

export const creatorCommunityPillars: CreatorCommunityPillar[] = [
  {
    title: 'Exposure to the Bitcoiner community',
    body: 'Get discovered by mission-aligned Bitcoiners ready to back, share, and champion your campaign.',
    icon: FaUsers,
    accentColor: '#00f5dc',
  },
  {
    title: "Promotion through Geyser's network",
    body: 'Strong campaigns are amplified across Geyser channels, partner media, and trusted ecosystem voices.',
    icon: FaBullhorn,
    accentColor: '#a78bfa',
  },
  {
    title: 'Hands-on support for your launch',
    body: 'From campaign framing to launch execution, Geyser helps you build momentum and run a stronger fundraiser.',
    icon: FaHandsHelping,
    accentColor: '#34d399',
  },
]

export const creatorCommunityTestimonials: CreatorCommunityTestimonial[] = [
  {
    quote:
      'I launched thinking a small circle of friends might show up. Within two weeks, 200 people from 14 countries were backing the project.',
    author: 'Maria S.',
    role: 'Filmmaker, Brazil',
    accentColor: '#00f5dc',
  },
  {
    quote:
      'People shared the project, posted about it, and brought others in. The community momentum kept the campaign alive.',
    author: 'Kofi A.',
    role: 'Open Source Developer, Ghana',
    accentColor: '#a78bfa',
  },
  {
    quote:
      "On day one we had a dozen backers. That was enough to keep building, and now we've reached hundreds of learners.",
    author: 'Isabella M.',
    role: 'Community Educator, El Salvador',
    accentColor: '#34d399',
  },
]

export const creatorFinalCtaTrustPoints = ['Creator tools', 'Incentives aligned', 'Bitcoin-native payments']
