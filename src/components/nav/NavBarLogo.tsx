import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import { HTMLChakraProps, useColorMode } from '@chakra-ui/system'
import { createUseStyles } from 'react-jss'
import { useNavigate } from 'react-router'

import LogoSmall from '../../assets/logo-brand.svg'
import LogoDark from '../../assets/logo-dark.svg'
import LogoName from '../../assets/logo-name-brand.svg'

type Props = HTMLChakraProps<'div'> & {
  className?: string
  imageClassName?: string
  full?: boolean
  small?: boolean
}

const useStyles = createUseStyles({
  container: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const NavBarLogo = ({
  className,
  imageClassName,
  full,
  small,
  ...rest
}: Props) => {
  const classes = useStyles()
  const { colorMode } = useColorMode()
  const navigate = useNavigate()
  const [isLargerThan720] = useMediaQuery('(min-width: 900px)')

  const useFullOne = (isLargerThan720 || full) && !small

  const imageToUse =
    colorMode === 'light'
      ? useFullOne
        ? LogoName
        : LogoSmall
      : useFullOne
      ? LogoName
      : LogoDark

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
        height="32px"
        src={imageToUse}
        alt="geyser logo image"
        objectFit="contain"
      />
    </Box>
  )
}
