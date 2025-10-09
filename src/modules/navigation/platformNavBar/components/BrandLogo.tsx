import { Box, Image, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router'

import LogoDark from '@/assets/logo-dark.svg'
import LogoLight from '@/assets/logo-light.svg'
import { getPath, LogoNameDark, LogoNameLight, LogoOutline } from '@/shared/constants'

export const BrandLogo = ({ showOutline = false }: { showOutline?: boolean }) => {
  const imagesrc = useColorModeValue(LogoDark, LogoLight)

  return (
    <Link to={getPath('landingPage')} style={{ height: '100%' }}>
      <Box h="100%">
        <Image src={showOutline ? LogoOutline : imagesrc} height="100%" width="auto" objectFit="contain" />
      </Box>
    </Link>
  )
}

export const BrandLogoFull = () => {
  const imageUrl = useColorModeValue(LogoNameDark, LogoNameLight)
  return (
    <Link to={getPath('landingPage')} style={{ height: '100%' }}>
      <Box h="100%">
        <Image src={imageUrl} alt={'Brand logo image'} height="100%" width="auto" objectFit="contain" />
      </Box>
    </Link>
  )
}
