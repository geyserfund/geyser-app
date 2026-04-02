import type { IconType } from 'react-icons'
import {
  FaBolt,
  FaCalendarAlt,
  FaCode,
  FaFilm,
  FaHeart,
  FaMicrophone,
  FaPenFancy,
  FaRocket,
  FaVideo,
} from 'react-icons/fa'

export type CreatorCategory = {
  title: string
  description: string
  imageUrl: string
  icon: IconType
  iconColor: string
}

export type CreatorStory = {
  category: string
  title: string
  description: string
  outcomeLabel: string
  imageUrl: string
}

export type CreatorMiniStory = {
  title: string
  subtitle: string
  imageUrl: string
}

export type CreatorPossibility = {
  title: string
  description: string
}

export const creatorHeroImageUrl =
  'https://images.unsplash.com/photo-1722623259595-5ed33e63fddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920'

export const creatorWelcomeVideoUrl = 'https://www.youtube.com/watch?v=D6NwCQ0uLic'

export const creatorCategories: CreatorCategory[] = [
  {
    title: 'Filmmakers',
    description: 'Stories that deserve a wide audience.',
    icon: FaFilm,
    iconColor: '#ff6b6b',
    imageUrl:
      'https://images.unsplash.com/photo-1758788506109-8ed33e99d3a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Content creators',
    description: 'Channels and projects that build loyal communities.',
    icon: FaVideo,
    iconColor: '#00f5dc',
    imageUrl:
      'https://images.unsplash.com/photo-1617899516937-54fb61f7d3d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Podcasters',
    description: 'Long-form conversations with lasting impact.',
    icon: FaMicrophone,
    iconColor: '#ffd93d',
    imageUrl:
      'https://images.unsplash.com/photo-1668606144327-837f2d8eac94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Open source builders',
    description: 'Public infrastructure and tools for everyone.',
    icon: FaCode,
    iconColor: '#6bcb77',
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Startups',
    description: 'Early ideas finding early believers.',
    icon: FaRocket,
    iconColor: '#a78bfa',
    imageUrl:
      'https://images.unsplash.com/photo-1758873268933-e0765262e58d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Writers',
    description: 'Books, essays, research, and journalism.',
    icon: FaPenFancy,
    iconColor: '#f97316',
    imageUrl:
      'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Social causes',
    description: 'Grassroots missions powered by people who care.',
    icon: FaHeart,
    iconColor: '#f472b6',
    imageUrl:
      'https://images.unsplash.com/photo-1595702700955-dbbc28a59da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Event organizers',
    description: 'Meetups and gatherings that grow local momentum.',
    icon: FaCalendarAlt,
    iconColor: '#34d399',
    imageUrl:
      'https://images.unsplash.com/photo-1760992003927-96ac55e57296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    title: 'Bitcoin communities',
    description: 'Builders shaping open financial culture.',
    icon: FaBolt,
    iconColor: '#f59e0b',
    imageUrl:
      'https://images.unsplash.com/photo-1694286067026-a8aa654481f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
]

export const creatorStories: CreatorStory[] = [
  {
    category: 'Collectibles',
    title: 'Bitcoin Trading Cards',
    description: 'A passion project turned cultural phenomenon, with campaign card boxes later valued between $30–40K.',
    outcomeLabel: '$500,000 raised',
    imageUrl:
      'https://images.unsplash.com/photo-1708856034718-2c4107643f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  },
  {
    category: 'Documentary',
    title: "Peru's Bitcoin Revolution",
    description:
      'Julian Figueroa funded a documentary on Bitcoin adoption in Peru through micro-donations and clear milestones.',
    outcomeLabel: 'Fully funded',
    imageUrl:
      'https://images.unsplash.com/photo-1760726394506-855463da8979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  },
  {
    category: 'Community',
    title: 'BTC Isla — El Salvador',
    description:
      'Isabella onboarded merchants, trained students, and built a Bitcoin cafe with support from Bitcoiners worldwide.',
    outcomeLabel: '130+ properties accepting BTC',
    imageUrl:
      'https://images.unsplash.com/photo-1613188611431-858ca5252201?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  },
  {
    category: 'AI + Open Source',
    title: 'Spirit of Satoshi',
    description:
      'Aleks Svetski funded the first open-source Bitcoin AI model using community-driven rewards crowdfunding.',
    outcomeLabel: 'Fully funded via community',
    imageUrl:
      'https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  },
]

export const creatorMiniStories: CreatorMiniStory[] = [
  {
    title: 'Bitcoin Ballers youth football',
    subtitle: 'Nigeria',
    imageUrl:
      'https://images.unsplash.com/photo-1604325500141-ab93e7bf191d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    title: 'Bitcoin For Fairness',
    subtitle: 'Anita Posch',
    imageUrl:
      'https://images.unsplash.com/photo-1694286067026-a8aa654481f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    title: "Apata's Bitcoin education",
    subtitle: 'Lagos',
    imageUrl:
      'https://images.unsplash.com/photo-1595702700955-dbbc28a59da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
]

export const creatorPossibilities: CreatorPossibility[] = [
  {
    title: 'A documentary',
    description: 'Tell the story only you can tell.',
  },
  {
    title: 'A local meetup series',
    description: 'Create recurring spaces for your community.',
  },
  {
    title: 'A podcast',
    description: 'Build long-form trust with your audience.',
  },
  {
    title: 'An education initiative',
    description: 'Help people gain practical skills.',
  },
  {
    title: 'An open-source tool',
    description: 'Build infrastructure in public.',
  },
  {
    title: 'A cultural project',
    description: 'Translate values into art, music, and media.',
  },
  {
    title: 'A community hub',
    description: 'Give your people a place to gather.',
  },
  {
    title: 'A startup experiment',
    description: 'Validate bold ideas with aligned supporters.',
  },
  {
    title: 'A writing project',
    description: 'Publish work with depth and staying power.',
  },
]
