import { Box, BoxProps } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<
  {
    gradientColor: string
    enable: boolean
    internalContainerProps?: BoxProps
  } & BoxProps
>

export const GradientBorder: React.FC<Props> = ({
  children,
  gradientColor,
  enable,
  internalContainerProps,
  ...rest
}) => {
  if (!enable) {
    return <>{children}</>
  }

  return (
    <Box w="full" padding={'1px'} borderRadius="9px" background={gradientColor} {...rest}>
      <Box w="full" backgroundColor="utils.pbg" borderRadius="8.5px" {...internalContainerProps}>
        {children}
      </Box>
    </Box>
  )
}
