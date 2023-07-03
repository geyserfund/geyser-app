import { Button, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../components/layouts'
import { H1, H2, H3 } from '../../../components/typography'
import {
  CoinGlobe3DImageUrl,
  CoinLightning3DImageUrl,
  NewbieBag3DImageUrl,
} from '../../../constants'

const CardContents = [
  {
    title: 'Crowdfunding without borders',
    description:
      'Traditional crowdfunding platforms operate in only 30 or so countries. Thanks to Bitcoin, Geyser makes crowdfunding accessible to people all around the world.',
    imageUrl: CoinGlobe3DImageUrl,
  },
  {
    title: 'Let the Sats and rewards flow',
    description:
      'Most project creators on Geyser reach their goals by selling merch related to their ideas, or giving perks and Nostr badges as a reward for supporters. Funders are bullish!',
    imageUrl: NewbieBag3DImageUrl,
    isLeft: true,
  },
  {
    title: 'Bitcoin made super easy',
    description:
      'Getting your project up and running only takes a few minutes. And we make it easy for funders too, so they can fund on-chain, lightning, WebLN and LNURL. All funds go straight to your single wallet.',
    imageUrl: CoinLightning3DImageUrl,
  },
] as AboutPageCardProps[]

export const NewWayOfCrowdFunding = () => {
  const { t } = useTranslation()
  console.log('this is about page')
  return (
    <VStack maxWidth={'764px'} width={'100%'} spacing={50} padding={3}>
      <VStack>
        <H1>{t('Welcome to the new way of crowdfunding')}</H1>
        <H3>
          {t(
            "The crowdfunding game is changing and we're here for it. Learn how we power up creators and reward their funders.",
          )}
        </H3>
      </VStack>
      <VStack spacing={5}>
        {CardContents.map((card) => (
          <AboutPageCard key={card.title} {...card} />
        ))}
      </VStack>
      <Button variant={'primaryGradient'} w={'full'}>
        {t('Launch your project')}
      </Button>
    </VStack>
  )
}

interface AboutPageCardProps {
  title: string
  description: string
  imageUrl: string
  isLeft?: boolean
}

const AboutPageCard = ({
  title,
  description,
  imageUrl,
  isLeft,
}: AboutPageCardProps) => {
  const { t } = useTranslation()
  return (
    <CardLayout
      alignItems={'center'}
      paddingX={{ base: 3, lg: 10 }}
      paddingY={3}
      direction={{ base: 'column-reverse', lg: isLeft ? 'row-reverse' : 'row' }}
    >
      <VStack alignItems={'start'}>
        <H2 textAlign={{ base: 'left', lg: isLeft ? 'right' : 'left' }}>
          {t(title)}
        </H2>
        <H3 textAlign={{ base: 'left', lg: isLeft ? 'right' : 'left' }}>
          {t(description)}
        </H3>
      </VStack>
      <Image width={'auto'} height={'252px'} src={imageUrl} />
    </CardLayout>
  )
}
