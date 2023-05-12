import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import { HTMLChakraProps } from '@chakra-ui/system'
import { createUseStyles } from 'react-jss'
import { useNavigate } from 'react-router'

import geyserBlack from '../../assets/logo-dark.svg'

interface ILogoP extends HTMLChakraProps<'div'> {
  className?: string
  imageClassName?: string
  full?: boolean
}

const useStyles = createUseStyles({
  container: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const LogoBlack = ({
  className,
  imageClassName,
  full,
  ...rest
}: ILogoP) => {
  const classes = useStyles()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <Box
      className={`${classes.container} ${className}`}
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
