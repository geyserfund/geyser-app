import { Avatar, Button, GridItem, SimpleGrid, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../components/layouts'
import { Body1, H1, H2, H3 } from '../../../components/typography'
import {
  AuwalProfileUrl,
  FranProfileUrl,
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
    name: 'Fran',
    title: 'Frontend Developer',
    imageUrl: FranProfileUrl,
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
        <H3>
          {t(
            'We are a team of mission-driven bitcoiners that want to empower the online creator ecosystem through bitcoin.',
          )}
        </H3>
      </VStack>
      <SimpleGrid
        columns={3}
        spacingX="20px"
        spacingY="20px"
        justifyContent="center"
      >
        {CardContents.map((card) => (
          <GridItem
            key={card.title}
            colSpan={{ base: 3, lg: 1 }}
            overflow="hidden"
          >
            <TeamCard key={card.title} {...card} />
          </GridItem>
        ))}
      </SimpleGrid>
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
      maxWidth={345}
      width={'100%'}
    >
      <Avatar size={'xl'} src={imageUrl}></Avatar>
      <H2>{t(name)}</H2>
      <Body1>{t(title)}</Body1>
    </CardLayout>
  )
}
