import { Button, HStack, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router-dom'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { fonts } from '@/shared/styles/fonts.ts'

import { LandingPageSectionTitle } from '../components/LandingPageSectionTitle.tsx'

const ImagesToRender = [
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_1.jpg',
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_2.jpg',
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_3.jpg',
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_4.jpg',
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_5.jpg',
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_6.jpg',
]

const imageProps = [
  { width: '22%' },
  { width: '44%' },
  { width: '22%' },
  { width: '36%' },
  { width: '22%' },
  { width: '30%' },
]

export const JoinTheMovement = () => {
  return (
    <VStack w="full" alignItems="start">
      <LandingPageSectionTitle>{t('Join the movement')}</LandingPageSectionTitle>
      <CardLayout background="neutral1.3" w="full" noborder alignItems="center" spacing={4}>
        <VStack spacing={0}>
          <Body textTransform="uppercase" size="5xl" fontFamily={fonts.cormorant} bold lineHeight={1}>
            {t('Guardians')}
          </Body>
          <Body textTransform="uppercase" size="3xl" fontFamily={fonts.cormorant} bold lineHeight={1}>
            {t('of bitcoin adoption')}
          </Body>
        </VStack>
        <Body size="2xl" maxWidth="600px" textAlign="center" lineHeight={1.1}>
          {t('Limited-edition items made in collaboration with top Bitcoin brands that support Bitcoin creators.')}
        </Body>
        <HStack w="full" justifyContent="space-between" flexWrap="wrap" maxWidth="700px">
          {ImagesToRender.map((image, index) => (
            <Image key={index} {...imageProps[index]} src={image} alt="Guardian" borderRadius="12px" height="full" />
          ))}
        </HStack>
        <Button
          as={Link}
          to={getPath('guardians')}
          size="xl"
          width="full"
          maxWidth="300px"
          variant="solid"
          colorScheme="primary1"
          marginTop={8}
          fontWeight={700}
        >
          {t('Become a Guardian')}
        </Button>
      </CardLayout>
    </VStack>
  )
}
