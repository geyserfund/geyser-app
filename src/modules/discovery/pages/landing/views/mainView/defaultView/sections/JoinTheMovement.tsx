import { Box, Button, HStack, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { fonts } from '@/shared/styles/fonts.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'

import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

const ImagesToRender = [
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_1.jpg',
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_2.jpg',
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_3.jpg',
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_4.jpg',
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_5.jpg',
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_6.jpg',
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_7.jpeg',
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_8.webp',
  'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_9.jpeg',
]

const imageProps = [
  { width: '220px' },
  { width: '400px' },
  { width: '250px' },
  { width: '350px' },
  { width: '250px' },
  { width: '300px' },
  { width: '220px' },
  { width: '350px' },
  { width: '400px' },
]

export const JoinTheMovement = () => {
  return (
    <ProjectRowLayout title={t('Guardians of Bitcoin Adoption')} width="100%">
      <VStack w="full" alignItems="start">
        <CardLayout
          background="neutral1.3"
          w="full"
          noborder
          alignItems="center"
          spacing={8}
          padding={0}
          paddingY={standardPadding}
        >
          <Body size="2xl" maxWidth="600px" textAlign="center" lineHeight={1.1} fontFamily={fonts.cormorant} bold>
            {t('Join the movement and get limited-edition items in collaboration with top Bitcoin brands.')}
          </Body>
          <Box w="full" overflow="hidden" position="relative" height="600px">
            <HStack
              spacing={8}
              animation="scroll 30s linear infinite"
              width="max-content"
              height="full"
              alignItems="center"
              sx={{
                '@keyframes scroll': {
                  '0%': {
                    transform: 'translateX(0)',
                  },
                  '100%': {
                    transform: 'translateX(-50%)',
                  },
                },
              }}
            >
              {/* First set of images */}
              {ImagesToRender.map((image, index) => (
                <Box
                  key={`first-${index}`}
                  {...imageProps[index]}
                  maxHeight="100%"
                  maxWidth="400px"
                  flexShrink={0}
                  position="relative"
                >
                  <Image src={image} alt="Guardian" borderRadius="12px" width="100%" height="100%" objectFit="cover" />
                </Box>
              ))}
              {/* Duplicate set for seamless loop */}
              {ImagesToRender.map((image, index) => (
                <Box
                  key={`second-${index}`}
                  {...imageProps[index]}
                  maxHeight="100%"
                  maxWidth="400px"
                  flexShrink={0}
                  position="relative"
                >
                  <Image src={image} alt="Guardian" borderRadius="12px" width="100%" height="100%" objectFit="cover" />
                </Box>
              ))}
            </HStack>
          </Box>
          <Button
            as={Link}
            to={getPath('guardians')}
            size="xl"
            width="full"
            maxWidth="300px"
            variant="solid"
            colorScheme="primary1"
            fontWeight={700}
          >
            {t('Become a Guardian')}
          </Button>
        </CardLayout>
      </VStack>
    </ProjectRowLayout>
  )
}
