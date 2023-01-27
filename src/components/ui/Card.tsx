import { Box, BoxProps } from '@chakra-ui/layout'

export type ICard = BoxProps

export const Card = ({ className, children, overflow, ...rest }: ICard) => {
  return (
    <Box
      className={className}
      borderRadius="4px"
      boxShadow="0px 3px 12px rgba(0, 0, 0, 0.1)"
      overflow={overflow ? overflow : 'hidden'}
      {...rest}
    >
      {children}
    </Box>
  )
}
