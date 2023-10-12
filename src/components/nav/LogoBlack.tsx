import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import { HTMLChakraProps } from '@chakra-ui/system'
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
      <Image
        className={imageClassName}
        height="40px"
        src={geyserBlack}
        alt="geyser logo image"
        objectFit="contain"
      />
    </Box>
  )
}
