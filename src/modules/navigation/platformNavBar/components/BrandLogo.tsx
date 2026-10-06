import { Badge, Box, HStack, Image } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { GeyserMark, GeyserWordmark } from '@/shared/components/display/GeyserLogo.tsx'
import { __development__, __staging__, getPath, LogoOutline } from '@/shared/constants'

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
  return (
    <Link to={getPath('landingPage')} style={{ height: '100%' }}>
      <HStack h="100%" spacing={{ base: 1, lg: 2 }}>
        <Box h="100%">
          {showOutline ? (
            <Image src={LogoOutline} height="100%" width="auto" objectFit="contain" alt={t('Geyser logo')} />
          ) : (
            <GeyserMark />
          )}
        </Box>
        <EnvironmentTag />
      </HStack>
    </Link>
  )
}

export const BrandLogoFull = () => {
  return (
    <Link to={getPath('landingPage')} style={{ height: '100%' }}>
      <HStack h="100%" spacing={0}>
        <Box h={{ base: '34px', lg: '40px' }}>
          <GeyserWordmark />
        </Box>
        <Box marginLeft={1} alignSelf="flex-start">
          <EnvironmentTag compact />
        </Box>
      </HStack>
    </Link>
  )
}
