import { Badge, Box, HStack, Image, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import LogoDark from '@/assets/logo-dark.svg'
import LogoLight from '@/assets/logo-light.svg'
import { __development__, __staging__, getPath, LogoNameDark, LogoNameLight, LogoOutline } from '@/shared/constants'

const EnvironmentTag = () => {
  if (!(__development__ || __staging__)) {
    return null
  }

  const isDevelopment = __development__
  const desktopLabel = isDevelopment ? t('Development') : t('Staging')
  const mobileLabel = isDevelopment ? 'DEV' : 'STG'

  return (
    <Badge
      colorScheme={isDevelopment ? 'blue' : 'orange'}
      variant="subtle"
      borderRadius="full"
      px={{ base: 2, lg: 3 }}
      py={1}
      fontSize={{ base: '2xs', lg: 'xs' }}
      fontWeight={700}
      lineHeight={1}
      textTransform="uppercase"
      whiteSpace="nowrap"
    >
      <Box as="span" display={{ base: 'none', sm: 'inline' }}>
        {desktopLabel}
      </Box>
      <Box as="span" display={{ base: 'inline', sm: 'none' }}>
        {mobileLabel}
      </Box>
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
            alt="Geyser logo"
          />
        </Box>
        <EnvironmentTag />
      </HStack>
    </Link>
  )
}

export const BrandLogoFull = () => {
  const imageUrl = useColorModeValue(LogoNameDark, LogoNameLight)
  return (
    <Link to={getPath('landingPage')} style={{ height: '100%' }}>
      <HStack h="100%" spacing={{ base: 1, lg: 2 }}>
        <Box h="100%">
          <Image src={imageUrl} alt={'Brand logo image'} height="100%" width="auto" objectFit="contain" />
        </Box>
        <EnvironmentTag />
      </HStack>
    </Link>
  )
}
