import { Box, BoxProps } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'

interface ILoader extends BoxProps {
  size?: string
}

const Loader = ({ size, ...rest }: ILoader) => (
  <Box
    height="80%"
    display="flex"
    justifyContent="center"
    alignItems="center"
    {...rest}
  >
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="neutral.200"
      color="primary.400"
      size={size ? size : 'xl'}
    />
  </Box>
)

export default Loader
