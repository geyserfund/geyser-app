import { Box, BoxProps } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<
  {
    gradientColor: string
    enable: boolean
  } & BoxProps
>

export const GradientBorder: React.FC<Props> = ({ children, gradientColor, enable, ...rest }) => {
  if (!enable) {
    return <>{children}</>
  }

  return (
    <Box w="full" padding={'1px'} borderRadius="8px" background={gradientColor} {...rest}>
      <Box w="full" backgroundColor="utils.pbg" borderRadius="8px" {...rest}>
        {children}
      </Box>
    </Box>
  )
}
