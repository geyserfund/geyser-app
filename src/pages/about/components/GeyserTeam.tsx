import { Avatar, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../components/layouts'
import { Body1, H1, H2, H3 } from '../../../components/typography'
import {
  AuwalProfileUrl,
  MickProfileUrl,
  SajalProfileUrl,
  SteliosProfileUrl,
} from '../../../constants'

const CardContents = [
  {
    name: 'Mick',
    title: 'CEO & Co-founder',
    imageUrl: MickProfileUrl,
  },
  {
    name: 'Stelios',
    title: 'CTO & Co-founder',
    imageUrl: SteliosProfileUrl,
  },
  {
    name: 'Sajal',
    title: 'Frontend Developer',
    imageUrl: SajalProfileUrl,
  },
  {
    name: 'Auwal',
    title: 'UX/UI Designer',
    imageUrl: AuwalProfileUrl,
  },
] as TeamCardProps[]

export const GeyserTeam = () => {
  const { t } = useTranslation()
  return (
    <VStack maxWidth={'764px'} width={'100%'} spacing={50} padding={3}>
      <VStack>
        <H1>{t('The Geyser team')}</H1>
        <H3 color={'neutral.600'}>
          {t(
            'We are a team of mission-driven bitcoiners that want to empower the online creator ecosystem through bitcoin.',
          )}
        </H3>
      </VStack>
      <Wrap spacingX="20px" spacingY="20px" justify="center">
        {CardContents.map((card) => (
          <WrapItem key={card.title} overflow="hidden">
            <TeamCard key={card.title} {...card} />
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  )
}

interface TeamCardProps {
  title: string
  name: string
  imageUrl: string
}

const TeamCard = ({ name, title, imageUrl }: TeamCardProps) => {
  const { t } = useTranslation()
  return (
    <CardLayout
      alignItems={'center'}
      padding={5}
      direction={'column'}
      width={230}
    >
      <Avatar size={'xl'} src={imageUrl}></Avatar>
      <H2>{t(name)}</H2>
      <Body1>{t(title)}</Body1>
    </CardLayout>
  )
}
