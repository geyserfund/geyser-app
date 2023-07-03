import { Button, GridItem, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../components/layouts'
import { Body1, H1, H2, H3 } from '../../../components/typography'
import {
  BitcoinPouch3DImageUrl,
  CoinGlobe3DImageUrl,
  CoinLightning3DImageUrl,
  CoinPercentage3DImageUrl,
  Gift3DImageUrl,
  Key3DImageUrl,
  Lightning3DImageUrl,
  Search3DImageUrl,
  TextMessage3DImageUrl,
} from '../../../constants'

const CardContents = [
  {
    title: 'Lightning fast',
    description:
      "Funding a project is easy and doesn't require users to log in or add their credit card information",
    imageUrl: Lightning3DImageUrl,
  },
  {
    title: 'Keep control',
    description:
      'Funds are exchanged peer-to-peer and go straight into your wallet. Geyser doesn’t custody and cannot freeze funds.',
    imageUrl: Key3DImageUrl,
  },
  {
    title: 'Super low fees',
    description:
      'If you run your own node, Geyser is free to use. Otherwise, we charge a 2% fee on transactions (5% lower than other crowdfunding platforms out there).',
    imageUrl: CoinPercentage3DImageUrl,
  },
  {
    title: 'Ongoing grants',
    description: 'Over 100 projects have earned funds through our grants',
    imageUrl: BitcoinPouch3DImageUrl,
  },
  {
    title: 'Be found easily',
    description:
      'Through the use of #tags it’s easy to be discovered on Geyser’s landing page and activity feed',
    imageUrl: Search3DImageUrl,
  },
  {
    title: 'Engage your community',
    description:
      'Keep your supporters up-to-date with Entries on Geyser where you can share your progress through text, images, and videos',
    imageUrl: TextMessage3DImageUrl,
  },
  {
    title: 'Truly borderless',
    description: 'Send and receive funds from anyone, anywhere',
    imageUrl: CoinGlobe3DImageUrl,
  },
  {
    title: 'Sell your merch',
    description:
      'Sell merch, perks, and rewards related to your project, giving your funders even more reasons to let the sats flow',
    imageUrl: Gift3DImageUrl,
  },
  {
    title: 'Easy-to-use Bitcoin',
    description:
      'Strip away the complexity by receiving bitcoin from different sources (on-chain, lightning, WebLN, LNURL) straight to your wallet.',
    imageUrl: CoinLightning3DImageUrl,
  },
] as AboutPageSquaresProps[]

export const BuildByCreators = () => {
  const { t } = useTranslation()
  return (
    <VStack width={'auto'} spacing={50} paddingX={3}>
      <VStack>
        <H1>{t('Built by creators, for creators')}</H1>
        <H3>
          {t(
            'Supercharge your fundraising efforts with our tools, features and support',
          )}
        </H3>
      </VStack>
      <SimpleGrid columns={3} spacingX="20px" spacingY="20px">
        {CardContents.map((card) => (
          <GridItem
            key={card.title}
            colSpan={{ base: 3, lg: 1 }}
            overflow="hidden"
          >
            <AboutPageSquares key={card.title} {...card} />
          </GridItem>
        ))}
      </SimpleGrid>

      <Button variant={'primaryGradient'} w={300}>
        {t('Launch your project')}
      </Button>
    </VStack>
  )
}

interface AboutPageSquaresProps {
  title: string
  description: string
  imageUrl: string
}

const AboutPageSquares = ({
  title,
  description,
  imageUrl,
}: AboutPageSquaresProps) => {
  const { t } = useTranslation()
  return (
    <CardLayout
      alignItems={'center'}
      padding={4}
      direction={'column'}
      height={310}
      maxWidth={350}
    >
      <Image width={'auto'} height={'120px'} src={imageUrl} />
      <VStack>
        <H2>{t(title)}</H2>
        <Body1>{t(description)}</Body1>
      </VStack>
    </CardLayout>
  )
}
