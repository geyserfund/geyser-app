import { Box, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

import { CreationLayoutCard } from '../components/CreationLayoutCard.tsx'
import { CampaignIllurationURL, FundraiserIllurationURL } from '../utils/urls.ts'

type FundingStyle = {
  title: string
  subtitle: string
  description: string
  image: string
}

const fundingStyles: FundingStyle[] = [
  {
    title: t('Campaigns: all or nothing'),
    subtitle: t('Get funded only if you reach your goal. If not, contributions return to your backers.'),
    description: '',
    image: CampaignIllurationURL,
  },
  {
    title: t('Fundraisers: keep it all'),
    subtitle: t('Receive contributions instantly, with no minimum target required.'),
    description: '',
    image: FundraiserIllurationURL,
  },
]

/** Choose your funding style section */
export const FundingStyleSection = () => {
  return (
    <CreationLayoutCard>
      <VStack maxW={dimensions.creation.start.maxWidth} alignItems="flex-start">
        <Body size="sm" muted bold>
          {t('HOW GEYSER WORKS')}
        </Body>

        <H2 size="2xl" bold>
          {t('Choose your funding style')}
        </H2>

        <Body size="md">
          {t(
            "Every project is unique. That's why Geyser lets you decide how to raise. Both funding styles have a 5% fee per contribution and an upfront launch fee.",
          )}
        </Body>
      </VStack>

      <SimpleGrid columns={[1, 2]} spacing={16} width="100%" maxW={dimensions.creation.start.maxWidth}>
        {fundingStyles.map((style) => (
          <CardLayout key={style.title} spacing={0}>
            <Box height="160px" width="auto" borderRadius="md" overflow="hidden" objectFit={'contain'}>
              <Image src={style.image} alt={style.title} width="100%" height="100%" objectFit="cover" />
            </Box>

            <VStack w="full" spacing={0} alignItems="flex-start">
              <H3 size="lg" bold>
                {style.title}
              </H3>

              <Body size="md">{style.subtitle}</Body>
            </VStack>
          </CardLayout>
        ))}
      </SimpleGrid>
    </CreationLayoutCard>
  )
}
