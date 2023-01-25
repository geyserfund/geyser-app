import { Box, BoxProps } from '@chakra-ui/react'

interface IProgressBar extends BoxProps {
  value: number
}

export const ProgressBar = ({ value, ...rest }: IProgressBar) => (
  <Box
    display="flex"
    borderRadius="3px"
    height="10px"
    backgroundColor="brand.gray300"
    {...rest}
  >
    <Box
      height={'100%'}
      borderRadius="3px"
      width={`${value}%`}
      backgroundColor="brand.primary"
    ></Box>
  </Box>
)
