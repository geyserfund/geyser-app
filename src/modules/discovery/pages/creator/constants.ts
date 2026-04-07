import type { IconType } from 'react-icons'
import {
  PiCode,
  PiFilmSlate,
  PiGraduationCap,
  PiHandshake,
  PiHeart,
  PiMegaphoneSimple,
  PiPalette,
  PiRocket,
  PiUsers,
} from 'react-icons/pi'

export type CreatorShowcaseProject = {
  subcategory: string
  projectName: string
  creatorName: string
  description: string
  imageUrl: string
  projectUrl: string
  creatorUrl?: string
  testimonial?: string
}

export type CreatorShowcaseCategory = {
  id: string
  name: string
  description: string
  icon: IconType
  color: string
  projects: CreatorShowcaseProject[]
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
  'https://storage.googleapis.com/geyser-projects-media/app/creatorPage/customer-self-service-1680x1120-1.webp'

const CREATOR_IMAGE_BASE = 'https://storage.googleapis.com/geyser-projects-media/app/creatorPage'

export const creatorShowcaseCategories: CreatorShowcaseCategory[] = [
  {
    id: 'educators',
    name: 'Educators',
    description: 'Creators turning knowledge into understanding, from courses and journalism to books and shows.',
    icon: PiGraduationCap,
    color: 'blue.8',
    projects: [
      {
        subcategory: 'Courses & Workshops',
        projectName: 'Mi Primer Bitcoin',
        creatorName: 'Mi Primer Bitcoin',
        description: 'Non-profit on a mission to educate 100,000 students about Bitcoin.',
        imageUrl: `${CREATOR_IMAGE_BASE}/MiPrimerBitcoin.png`,
        projectUrl: 'https://geyser.fund/project/miprimerbitcoin',
      },
      {
        subcategory: 'Journalism',
        projectName: 'The Rage',
        creatorName: 'L0la L33tz',
        description: 'An independent publication covering financial surveillance. Privacy is not a crime.',
        imageUrl: `${CREATOR_IMAGE_BASE}/TheRage.png`,
        projectUrl: 'https://geyser.fund/project/therage',
        creatorUrl: 'https://geyser.fund/user/12416',
      },
      {
        subcategory: 'Books',
        projectName: 'Bushido of Bitcoin',
        creatorName: 'Alex Svetski',
        description: 'Founder of Bushido of Bitcoin and The Spirit of Satoshi.',
        imageUrl: `${CREATOR_IMAGE_BASE}/BushidoOfBitcoin.png`,
        projectUrl: 'https://geyser.fund/project/bushidoofbitcoin',
      },
      {
        subcategory: 'Podcasts',
        projectName: 'Efrat Fenigson',
        creatorName: 'Efrat Fenigson',
        description: 'Podcaster, independent journalist, Twitter Spaces host & marketer.',
        imageUrl: `${CREATOR_IMAGE_BASE}/EfratFenigson.png`,
        projectUrl: 'https://geyser.fund/project/efenigson?hero=geyserpromotion',
      },
    ],
  },
  {
    id: 'community-leaders',
    name: 'Community Leaders',
    description: 'Organizers building local momentum through meetups, hubs, and circular economies.',
    icon: PiUsers,
    color: 'jade.8',
    projects: [
      {
        subcategory: 'Circular Economies',
        projectName: 'BTC Isla',
        creatorName: 'Isabella',
        description: 'Building a living Bitcoin circular economy on the ground.',
        imageUrl: `${CREATOR_IMAGE_BASE}/Isabella.png`,
        projectUrl: 'https://geyser.fund/project/btcisla?hero=geyserpromotion',
      },
      {
        subcategory: 'Community Hubs',
        projectName: 'Bitcoin House Bali',
        creatorName: 'Diana',
        description: 'Created the first Bitcoin center in Bali.',
        imageUrl: `${CREATOR_IMAGE_BASE}/BitcoinHouse.png`,
        projectUrl: 'https://geyser.fund/project/bitcoinhousebali',
        creatorUrl: 'https://geyser.fund/user/10763',
      },
      {
        subcategory: 'Events',
        projectName: 'Nostr Booth at BTC Prague',
        creatorName: 'Derek Ross',
        description: 'Organized a Nostr presence at one of Europe\u2019s biggest Bitcoin conferences.',
        imageUrl: `${CREATOR_IMAGE_BASE}/DerekRoss.png`,
        projectUrl: 'https://geyser.fund/project/nostrboothbtcprague?hero=geyserpromotion',
        creatorUrl: 'https://geyser.fund/user/2973',
      },
    ],
  },
  {
    id: 'cause-organizers',
    name: 'Cause Organizers',
    description: 'Missions that rally supporters around urgent relief, legal defense, and public good.',
    icon: PiHeart,
    color: 'pink.8',
    projects: [
      {
        subcategory: 'Direct Aid & Disaster Response',
        projectName: 'Emergency Recovery Fund for Aceh Flood Victims',
        creatorName: 'Pengepul\u26a1Satoshi',
        description: 'Rapid relief for flood victims in Indonesia, powered by Bitcoin.',
        imageUrl: `${CREATOR_IMAGE_BASE}/BitcoinIndonesia.png`,
        projectUrl: 'https://geyser.fund/project/fundforacehfloodvictims',
        creatorUrl: 'https://geyser.fund/user/7214',
      },
      {
        subcategory: 'Legal Defense Funds',
        projectName: 'Free Roman Storm',
        creatorName: 'Free Pertsev & Storm',
        description: 'Global legal defense for privacy and open-source rights.',
        imageUrl: `${CREATOR_IMAGE_BASE}/LegalDefense.png`,
        projectUrl: 'https://geyser.fund/project/freeromanstorm?hero=geyserpromotion',
        creatorUrl: 'https://geyser.fund/user/19504',
      },
      {
        subcategory: 'Advocacy Campaigns',
        projectName: 'Orange Pilling the US Congress',
        creatorName: 'Orange Pill App',
        description: 'An advocacy campaign that raised 25M sats to educate lawmakers.',
        imageUrl: `${CREATOR_IMAGE_BASE}/OrangePillApp.png`,
        projectUrl: 'https://geyser.fund/project/orangepillappsaifedean?hero=geyserpromotion',
        creatorUrl: 'https://geyser.fund/user/659',
      },
      {
        subcategory: 'Health & Medical Support',
        projectName: 'Beat Cancer with Becca',
        creatorName: 'bitcoinSailing',
        description: 'A community-backed fundraiser to help Becca fight cancer.',
        imageUrl: `${CREATOR_IMAGE_BASE}/bitcoinSailing.png`,
        projectUrl: 'https://geyser.fund/project/beatcancerwithbecca',
        creatorUrl: 'https://geyser.fund/user/13391',
      },
    ],
  },
  {
    id: 'creatives',
    name: 'Creatives',
    description: 'Films, art, music, and stories funded by people who want culture with conviction.',
    icon: PiPalette,
    color: 'orange.8',
    projects: [
      {
        subcategory: 'Filmmakers',
        projectName: 'Dirty Coin',
        creatorName: 'Halana Mediavilla',
        description: 'The documentary about Bitcoin mining.',
        imageUrl: `${CREATOR_IMAGE_BASE}/DirtyCoin.png`,
        projectUrl: 'https://geyser.fund/project/dirtycointhecontroversybehindbitcoinmining',
        creatorUrl: 'https://geyser.fund/user/913',
      },
      {
        subcategory: 'Content Creators',
        projectName: "Peru's Bitcoin Revolution",
        creatorName: 'Julian Figueroa',
        description: 'Raised 0.27 BTC to film a documentary following Bitcoin adoption across Peru.',
        imageUrl: `${CREATOR_IMAGE_BASE}/JulianFigueroa.png`,
        projectUrl: 'https://geyser.fund/project/kineticperu?hero=geyserpromotion',
        creatorUrl: 'https://geyser.fund/user/654',
        testimonial:
          'One reason I loved Geyser is that it stretched my imagination and creativity in terms of figuring out how to give something to the donors that would make it worth their while to help fund a documentary that was ultimately going to be free to watch.',
      },
      {
        subcategory: 'Musicians',
        projectName: 'TIP_NZ MUSIC',
        creatorName: 'TIP_NZ',
        description: 'Independent music funded directly by fans.',
        imageUrl: `${CREATOR_IMAGE_BASE}/TipNz.png`,
        projectUrl: 'https://geyser.fund/project/tipnzmusic',
        creatorUrl: 'https://geyser.fund/user/2269',
      },
      {
        subcategory: 'Artists',
        projectName: 'Bitcoin: The Art of Revolution',
        creatorName: 'StreetCyber.Art',
        description: 'Art that captures the spirit of the Bitcoin movement.',
        imageUrl: `${CREATOR_IMAGE_BASE}/cyberstreetArt.png`,
        projectUrl: 'https://geyser.fund/project/bitcointheartofrevolution',
      },
      {
        subcategory: 'Comic Books',
        projectName: 'Ratel',
        creatorName: 'Ratel',
        description: 'The first Bitcoiner superhero comic.',
        imageUrl: `${CREATOR_IMAGE_BASE}/Ratel.png`,
        projectUrl: 'https://geyser.fund/project/ratel?hero=geyserpromotion',
      },
      {
        subcategory: 'Illustrators & Writers',
        projectName: 'The NoGood Book',
        creatorName: 'NoGood',
        description: 'An art book that raised 10M satoshis.',
        imageUrl: `${CREATOR_IMAGE_BASE}/NoGood.png`,
        projectUrl: 'https://geyser.fund/project/nogoodartbook?hero=geyserpromotion',
        creatorUrl: 'https://geyser.fund/user/3118',
      },
    ],
  },
  {
    id: 'makers',
    name: 'Makers',
    description: 'Hardware, games, tools, and independent products backed by early supporters.',
    icon: PiRocket,
    color: 'violet.8',
    projects: [
      {
        subcategory: 'Hardware Builders',
        projectName: 'Seedhammer II',
        creatorName: 'SeedHammer',
        description: 'Next-generation seed backup hardware launched on Geyser.',
        imageUrl: `${CREATOR_IMAGE_BASE}/SeedHammer.png`,
        projectUrl: 'https://geyser.fund/project/seedhammerii',
        creatorUrl: 'https://geyser.fund/user/10645',
      },
      {
        subcategory: 'Bitaxe Builders',
        projectName: 'WallAxe',
        creatorName: 'omgitsgio',
        description: 'A wall-plugged Bitaxe \u2014 decentralize mining, stick it everywhere.',
        imageUrl: `${CREATOR_IMAGE_BASE}/wallaxe.png`,
        projectUrl: 'https://geyser.fund/project/wallaxe?hero=metamick',
        creatorUrl: 'https://geyser.fund/user/21199',
      },
      {
        subcategory: 'Game Developers',
        projectName: 'Hero of Bitcoin \u2014 The Game',
        creatorName: 'Hero of \u20bfitcoin',
        description: 'A Bitcoin-themed game built by and for the community.',
        imageUrl: `${CREATOR_IMAGE_BASE}/HeroOfBitcoin.png`,
        projectUrl: 'https://geyser.fund/project/heroofbitcoin?hero=geyserpromotion',
        creatorUrl: 'https://geyser.fund/user/697',
      },
    ],
  },
  {
    id: 'open-source-builders',
    name: 'Open-Source Builders',
    description: 'Public software and infrastructure created in the open and sustained by communities.',
    icon: PiCode,
    color: 'grass.8',
    projects: [
      {
        subcategory: 'Protocol Builders',
        projectName: 'RGB Protocol Development',
        creatorName: 'LNP/BP Standards Association',
        description: 'Raising funds for the development of the RGB protocol.',
        imageUrl: `${CREATOR_IMAGE_BASE}/RGB.png`,
        projectUrl: 'https://geyser.fund/project/rgb?hero=geyserpromotion',
        creatorUrl: 'https://geyser.fund/user/1652',
      },
      {
        subcategory: 'Indie Developers',
        projectName: 'Noderunners Radio',
        creatorName: 'Noderunners Radio',
        description: 'Community-supported independent development and broadcasting.',
        imageUrl: `${CREATOR_IMAGE_BASE}/Noderunners.png`,
        projectUrl: 'https://geyser.fund/project/noderunnersradio?hero=geyserpromotion',
        creatorUrl: 'https://geyser.fund/user/2468',
      },
      {
        subcategory: 'Nostr Developers',
        projectName: 'GitCitadel',
        creatorName: 'GitCitadel',
        description: 'Building open-source tooling on the Nostr protocol.',
        imageUrl: `${CREATOR_IMAGE_BASE}/GitCitadel.png`,
        projectUrl: 'https://geyser.fund/project/gitcitadel?hero=geyserpromotion',
        creatorUrl: 'https://geyser.fund/user/13323',
      },
    ],
  },
]

export const creatorStories: CreatorStory[] = [
  {
    category: 'Collectibles',
    tag: 'Collectibles',
    accentColor: 'amber.10',
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
    accentColor: 'orange.9',
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
    accentColor: 'jade.8',
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
    accentColor: 'violet.8',
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
    title: 'Run education programs',
    description: 'Launch courses, workshops, and practical learning paths.',
    icon: PiGraduationCap,
    iconColor: 'blue.8',
    surfaceColor: 'blueAlpha.3',
    borderColor: 'blueAlpha.6',
  },
  {
    title: 'Build community hubs',
    description: 'Organize meetups, local circles, and recurring gatherings.',
    icon: PiUsers,
    iconColor: 'jade.8',
    surfaceColor: 'jadeAlpha.3',
    borderColor: 'jadeAlpha.6',
  },
  {
    title: 'Launch cause-driven campaigns',
    description: 'Fund legal defense, relief, and high-impact public missions.',
    icon: PiHeart,
    iconColor: 'pink.8',
    surfaceColor: 'pinkAlpha.3',
    borderColor: 'pinkAlpha.6',
  },
  {
    title: 'Create culture and media',
    description: 'Produce films, art, music, and stories with community backing.',
    icon: PiFilmSlate,
    iconColor: 'orange.8',
    surfaceColor: 'orangeAlpha.3',
    borderColor: 'orangeAlpha.6',
  },
  {
    title: 'Ship products and tools',
    description: 'Launch hardware, apps, and experiments with early supporters.',
    icon: PiRocket,
    iconColor: 'violet.8',
    surfaceColor: 'violetAlpha.3',
    borderColor: 'violetAlpha.6',
  },
  {
    title: 'Build open-source infrastructure',
    description: 'Develop and sustain public tools, protocols, and libraries.',
    icon: PiCode,
    iconColor: 'grass.8',
    surfaceColor: 'grassAlpha.3',
    borderColor: 'grassAlpha.6',
  },
]

export const creatorCommunityPillars: CreatorCommunityPillar[] = [
  {
    title: 'Exposure to the Bitcoiner community',
    body: 'Get discovered by mission-aligned Bitcoiners ready to back, share, and champion your campaign.',
    icon: PiUsers,
    accentColor: 'geyser.9',
  },
  {
    title: "Promotion through Geyser's network",
    body: 'Strong campaigns are amplified across Geyser channels, partner media, and trusted ecosystem voices.',
    icon: PiMegaphoneSimple,
    accentColor: 'violet.8',
  },
  {
    title: 'Hands-on support for your launch',
    body: 'From campaign framing to launch execution, Geyser helps you build momentum and run a stronger fundraiser.',
    icon: PiHandshake,
    accentColor: 'green.9',
  },
]

export const creatorCommunityTestimonials: CreatorCommunityTestimonial[] = [
  {
    quote:
      'I launched thinking a small circle of friends might show up. Within two weeks, 200 people from 14 countries were backing the project.',
    author: 'Maria S.',
    role: 'Filmmaker, Brazil',
    accentColor: 'geyser.9',
  },
  {
    quote:
      'People shared the project, posted about it, and brought others in. The community momentum kept the campaign alive.',
    author: 'Kofi A.',
    role: 'Open Source Developer, Ghana',
    accentColor: 'violet.8',
  },
  {
    quote:
      "On day one we had a dozen backers. That was enough to keep building, and now we've reached hundreds of learners.",
    author: 'Isabella M.',
    role: 'Community Educator, El Salvador',
    accentColor: 'green.9',
  },
]

export const creatorFinalCtaTrustPoints = ['Creator tools', 'Incentives aligned', 'Bitcoin-native payments']
