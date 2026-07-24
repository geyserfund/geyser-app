import { Box, Button, HStack, Image, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

type LabifBannerProps = {
  learnMoreTo: string
  applicationTo: string
  committedAmount: string
}

const LABIF_MAP_IMAGE_URL = '/images/impact-funds/labif-latin-america-map.png'

/** Promotional banner for the Latin America Bitcoin Impact Fund. */
export const LabifBanner = ({ learnMoreTo, applicationTo, committedAmount }: LabifBannerProps): JSX.Element => {
  const surfaceBg = useColorModeValue('utils.pbg', 'neutral1.3')
  const borderColor = useColorModeValue('neutral1.10', 'neutral1.6')
  const primaryText = useColorModeValue('neutral1.12', 'neutral1.12')
  const secondaryText = useColorModeValue('neutral1.11', 'neutral1.10')
  const metricBg = useColorModeValue('neutral1.12', 'neutral1.2')
  const metricText = useColorModeValue('white', 'neutral1.12')

  return (
    <Box
      position="relative"
      w="full"
      minH={{ base: '380px', md: '215px', lg: '225px' }}
      overflow="hidden"
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="card"
      bg={surfaceBg}
      px={{ base: 5, md: 8, lg: 10 }}
      py={{ base: 6, md: 5, lg: 6 }}
      display="flex"
      flexDirection="column"
    >
      <Image
        src={LABIF_MAP_IMAGE_URL}
        alt={t('Colorful map of Latin America')}
        position="absolute"
        left="auto"
        right={{ base: 0, md: '28%', lg: '28%' }}
        bottom={{ base: 0, md: 0, lg: 0 }}
        zIndex={0}
        w={{ base: '100%', md: 'auto', lg: 'auto' }}
        h={{ base: '100%', md: '100%', lg: '100%' }}
        objectFit={{ base: 'contain', md: 'fill', lg: 'fill' }}
        objectPosition={{ base: 'right bottom', md: 'right bottom', lg: 'right bottom' }}
        opacity={{ base: 0.16, md: 0.72, lg: 0.78 }}
        pointerEvents="none"
      />

      <VStack
        position="relative"
        zIndex={1}
        align="start"
        justify="space-between"
        h="auto"
        spacing={{ base: 5, md: 4 }}
        w={{ base: 'full', md: '56%', lg: '56%' }}
        ml={0}
        order={1}
      >
        <VStack align="start" spacing={{ base: 5, lg: 3 }} maxW="full">
          <H2
            size={{ base: '3xl', lg: '3xl' }}
            lineHeight={{ base: 1.04, lg: 1.05 }}
            letterSpacing="-0.04em"
            bold
            color={primaryText}
            whiteSpace={{ base: 'normal', md: 'nowrap' }}
            sx={{ textWrap: 'balance' }}
          >
            {t('LABIF{{separator}} Strengthening Bitcoin across Latin America', { separator: ':' })}
          </H2>

          <Body
            size={{ base: 'md', lg: 'lg' }}
            lineHeight={1.55}
            color={secondaryText}
            whiteSpace="normal"
            overflowWrap="anywhere"
            sx={{ textWrap: 'pretty' }}
          >
            {t(
              'The Latin America Bitcoin Impact Fund (LABIF) funds high-impact Bitcoin projects across Latin America.',
            )}
          </Body>
        </VStack>
      </VStack>

      <HStack
        position={{ base: 'relative', md: 'absolute' }}
        left={{ base: 'auto', md: 8, lg: 10 }}
        bottom={{ base: 'auto', md: 6, lg: 7 }}
        order={{ base: 3, md: 'initial' }}
        align={{ base: 'stretch', sm: 'center' }}
        spacing={3}
        flexWrap="wrap"
        w={{ base: 'full', md: '56%', lg: '56%' }}
        mt={{ base: 6, md: 0 }}
      >
        <Button
          as={Link}
          to={learnMoreTo}
          variant="outline"
          borderColor={primaryText}
          color={primaryText}
          bg="transparent"
          h="48px"
          borderRadius="innerCard"
          _hover={{ bg: 'transparent', opacity: 0.8 }}
          flex={{ base: 1, md: 'initial' }}
          w="auto"
        >
          {t('Learn more')}
        </Button>
        <Button
          as={Link}
          to={applicationTo}
          variant="solid"
          colorScheme="amber"
          h="48px"
          borderRadius="innerCard"
          flex={{ base: 1, md: 'initial' }}
          w="auto"
        >
          {t('Apply for funding')}
        </Button>
        <Body
          size="sm"
          bold
          color={secondaryText}
          order={{ base: 3, md: 'initial' }}
          w={{ base: 'full', md: 'auto' }}
          maxW={{ base: 'full', md: '180px' }}
        >
          {t('Applications open to LATAM projects')}
        </Body>
      </HStack>

      <VStack
        order={{ base: 2, md: 'initial' }}
        position={{ base: 'relative', md: 'absolute' }}
        right={{ base: 'auto', md: 5, lg: 8 }}
        top={{ base: 'auto', md: '50%' }}
        transform={{ base: 'none', md: 'translateY(-50%)' }}
        mt={{ base: 6, md: 0 }}
        align="start"
        spacing={2}
        bg={metricBg}
        color={metricText}
        borderRadius="innerCard"
        justify="center"
        px={{ base: 4, md: 5 }}
        py={{ base: 4, md: 5 }}
        w={{ base: 'full', sm: 'full', md: '280px' }}
        minH={{ base: 'auto', md: '150px' }}
        zIndex={2}
      >
        <Body size="xs" bold color="inherit" textTransform="uppercase" letterSpacing="0.06em">
          {t('LABIF')}
        </Body>
        <Body
          size={{ base: '40px', lg: '48px' }}
          lineHeight={{ base: '46px', lg: '54px' }}
          bold
          color="inherit"
          whiteSpace="nowrap"
        >
          {committedAmount}
        </Body>
        <Body size="md" bold color="inherit" whiteSpace="nowrap">
          {t('Committed')}
        </Body>
      </VStack>
    </Box>
  )
}
