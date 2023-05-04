import { Box, BoxProps } from '@chakra-ui/react'

import { colors } from '../../styles'

type Props = BoxProps

export const ItemCard = ({ children, ...props }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: '#FDFDFD',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        border: '2px solid',
        borderColor: colors.bgLightGrey,
        borderRadius: '12px',
        '&:hover': {
          cursor: 'pointer',
          borderColor: colors.gray300,
        },
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
