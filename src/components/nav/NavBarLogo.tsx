import { Image } from '@chakra-ui/image'
import { Box, BoxProps } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import { useColorMode } from '@chakra-ui/system'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

import LogoSmall from '../../assets/logo-brand.svg'
import LogoDark from '../../assets/logo-dark.svg'
import LogoName from '../../assets/logo-name-brand.svg'

type Props = BoxProps & {
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

  return (
    <Box {...rest}>
      <Link to="/" className={`${classes.container} ${className}`}>
        <Image
          className={imageClassName}
          height="32px"
          src={imageToUse}
          alt="geyser logo image"
          objectFit="contain"
        />
      </Link>
    </Box>
  )
}
