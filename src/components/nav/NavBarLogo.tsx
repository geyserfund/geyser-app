import { Box, BoxProps } from '@chakra-ui/layout'
import { useBreakpoint } from '@chakra-ui/media-query'
import { Link } from 'react-router-dom'

import { GeyserLogoNameIcon } from '../icons/svg'
import { GeyserLogoIcon } from '../icons/svg/GeyserLogoIcon'

type Props = BoxProps & {
  className?: string
  color?: string
  full?: boolean
  small?: boolean
}

export const NavBarLogo = ({
  className,
  full,
  small,
  color,
  ...rest
}: Props) => {
  const isLg = useBreakpoint('lg')

  const useFullOne = (isLg || full) && !small

  return (
    <Box {...rest} className={className} _hover={{ cursor: 'pointer' }}>
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
