import { Badge, Box, HStack, Image, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import LogoDark from '@/assets/logo-dark.svg'
import LogoLight from '@/assets/logo-light.svg'
import { __development__, __staging__, getPath, LogoNameDark, LogoNameLight, LogoOutline } from '@/shared/constants'

const EnvironmentTag = ({ compact = false }: { compact?: boolean }) => {
  if (!(__development__ || __staging__)) {
    return null
  }

  const isDevelopment = __development__
  const label = isDevelopment ? 'DEV' : 'STG'

  return (
    <Badge
      colorScheme={isDevelopment ? 'blue' : 'orange'}
      variant="subtle"
      borderRadius="full"
      px={compact ? { base: 1.5, lg: 1.5 } : { base: 2, lg: 3 }}
      py={compact ? 0.5 : 1}
      fontSize={compact ? '3xs' : { base: '2xs', lg: 'xs' }}
      fontWeight={700}
      lineHeight={1}
      textTransform="uppercase"
      whiteSpace="nowrap"
    >
      {label}
    </Badge>
  )
}

export const BrandLogo = ({ showOutline = false }: { showOutline?: boolean }) => {
  const imagesrc = useColorModeValue(LogoDark, LogoLight)

  return (
    <Link to={getPath('landingPage')} style={{ height: '100%' }}>
      <HStack h="100%" spacing={{ base: 1, lg: 2 }}>
        <Box h="100%">
          <Image
            src={showOutline ? LogoOutline : imagesrc}
            height="100%"
            width="auto"
            objectFit="contain"
            alt={t('Geyser logo')}
          />
        </Box>
        <EnvironmentTag />
      </HStack>
    </Link>
  )
}

export const BrandLogoFull = ({ forceLightLogo = false }: { forceLightLogo?: boolean }) => {
  const themedImageUrl = useColorModeValue(LogoNameDark, LogoNameLight)
  const imageUrl = forceLightLogo ? LogoNameLight : themedImageUrl

  return (
    <Link to={getPath('landingPage')} style={{ height: '100%' }}>
      <HStack h="100%" spacing={0}>
        <Box h={{ base: '34px', lg: '40px' }}>
          <Image src={imageUrl} alt={t('Geyser logo')} height="100%" width="auto" objectFit="contain" />
        </Box>
        <Box marginLeft={{ base: -2.5, lg: -3.5 }} marginTop={{ base: -3, lg: -4 }} alignSelf="flex-start">
          <EnvironmentTag compact />
        </Box>
      </HStack>
    </Link>
  )
}
