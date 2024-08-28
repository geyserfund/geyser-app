import { Box, Image, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import LogoDark from '@/assets/logo-dark.svg'
import LogoLight from '@/assets/logo-light.svg'
import { getPath, LogoNameDark, LogoNameLight } from '@/shared/constants'

export const BrandLogo = () => {
  const imagesrc = useColorModeValue(LogoDark, LogoLight)

  return (
    <Link to={getPath('landingPage')} style={{ height: '100%' }}>
      <Box h="100%">
        <Image src={imagesrc} height="100%" width="auto" objectFit="contain" />
      </Box>
    </Link>
  )
}

export const BrandLogoFull = () => {
  const imageUrl = useColorModeValue(LogoNameDark, LogoNameLight)
  return (
    <Link to={getPath('landingPage')} style={{ height: '100%' }}>
      <Box h="100%">
        <Image src={imageUrl} height="100%" width="auto" objectFit="contain" />
      </Box>
    </Link>
  )
}
