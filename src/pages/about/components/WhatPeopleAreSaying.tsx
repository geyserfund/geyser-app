import { Avatar, Stack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../components/layouts'
import { Body1, H1, H3 } from '../../../components/typography'
import { bradUrl, joeNakamotoUrl, paulIIIUrl } from '../../../constants'
import { LaunchYourProjectButton } from './LaunchYourProjectButton'

const CardContent = [
  {
    name: 'Brad Mills',
    userName: 'bradmillscan',
    description:
      'This is a game changer for crowdfunding.\n No longer do you need to run a lightning node to launch a sovereign crowdfunding campaign. Way to go @metamick14 & @steliosats 💪',
    imageUrl: bradUrl,
  },
  {
    name: 'Joe Nakamoto',
    userName: 'joeNakamoto',
    description:
      'You can go from a poor content creator with no crowdfunding page to a slightly less poor creator with a way of receiving sats from around the world the world in like 6 clicks. it’s bloody cool 🤙',
    imageUrl: joeNakamotoUrl,
  },
  {
    name: 'Paul The III',
    userName: 'MapABitcoin',
    description: 'I love Geyserfund! Made the donation process so easy',
    imageUrl: paulIIIUrl,
  },
] as PeopleSayingCardProps[]

export const WhatPeopleAreSaying = () => {
  const { t } = useTranslation()
  console.log('this is about page')
  return (
    <VStack paddingX={3} spacing={7}>
      <H1>{t('What people are saying')}</H1>
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={4}>
        {CardContent.map((card) => (
          <PeopleSayingCard key={card.userName} {...card} />
        ))}
      </Stack>
      <LaunchYourProjectButton variant={'primaryGradient'} w={300} />
    </VStack>
  )
}

interface PeopleSayingCardProps {
  name: string
  userName: string
  description: string
  imageUrl: string
}

const PeopleSayingCard = ({
  name,
  userName,
  description,
  imageUrl,
}: PeopleSayingCardProps) => {
  return (
    <CardLayout padding={5} spacing={2} maxWidth={350} alignItems={'center'}>
      <Avatar size={'xl'} src={imageUrl} />
      <H3>{name}</H3>
      <Body1>{`@${userName}`}</Body1>
      <Body1 alignSelf={'start'}>{description}</Body1>
    </CardLayout>
  )
}
