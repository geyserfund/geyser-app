import { Box, BoxProps } from '@chakra-ui/react'

interface IProgressBar extends BoxProps {
  value?: number
  min?: number
  max?: number
  current?: number
}

export const ProgressBar = ({ value, min = 0, max, current, ...rest }: IProgressBar) => {
  const percentage = max && current ? ((current - min) / (max - min)) * 100 : value

  return (
    <Box display="flex" borderRadius="3px" height="4px" backgroundColor="neutral1.6" {...rest}>
      <Box
        height={'100%'}
        borderRadius={rest.borderRadius || '3px'}
        width={`${percentage}%`}
        backgroundColor="primary1.9"
      ></Box>
    </Box>
  )
}
