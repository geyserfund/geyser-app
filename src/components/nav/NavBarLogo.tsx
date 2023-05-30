import { Box, BoxProps } from '@chakra-ui/layout'
import { useBreakpoint } from '@chakra-ui/media-query'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

import { GeyserLogoNameIcon } from '../icons/svg'
import { GeyserLogoIcon } from '../icons/svg/GeyserLogoIcon'

type Props = BoxProps & {
  className?: string
  color?: string
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
  full,
  small,
  color,
  ...rest
}: Props) => {
  const classes = useStyles()

  const isLg = useBreakpoint('lg')

  const useFullOne = (isLg || full) && !small

  return (
    <Box {...rest} className={`${classes.container} ${className}`}>
      <Link to="/">
        {useFullOne ? (
          <GeyserLogoNameIcon
            height="32px"
            width="100%"
            color={color || 'primary.400'}
          />
        ) : (
          <GeyserLogoIcon
            height="32px"
            width="100%"
            color={color || 'primary.400'}
          />
        )}
      </Link>
    </Box>
  )
}
