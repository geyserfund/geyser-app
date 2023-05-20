import { Box, BoxProps } from '@chakra-ui/react'

type Props = BoxProps

export const ItemCard = ({ children, ...props }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: 'neutral.50',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        border: '2px solid',
        borderColor: 'neutral.100',
        borderRadius: '12px',
        '&:hover': {
          cursor: 'pointer',
          borderColor: 'neutral.400',
        },
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
