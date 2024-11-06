import { Box, HTMLChakraProps, Image } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import geyserBlack from '../../assets/logo-dark.svg'

interface ILogoP extends HTMLChakraProps<'div'> {
  imageClassName?: string
  full?: boolean
}

export const LogoBlack = ({ imageClassName, full, ...rest }: ILogoP) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <Box
      _hover={{
        cursor: 'pointer',
      }}
      {...rest}
      onClick={handleClick}
    >
      <Image className={imageClassName} height="40px" src={geyserBlack} alt="geyser logo image" objectFit="contain" />
    </Box>
  )
}
