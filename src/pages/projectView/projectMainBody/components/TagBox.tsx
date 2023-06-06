import { Box, BoxProps } from '@chakra-ui/react'

import { Body2 } from '../../../../components/typography'

type TagBoxProps = BoxProps

export const TagBox = ({ children, ...rest }: TagBoxProps) => {
  return (
    <Box
      borderRadius="4px"
      padding="2px 5px"
      backgroundColor="neutral.100"
      {...rest}
    >
      <Body2 color="neutral.600" semiBold>
        {children}
      </Body2>
    </Box>
  )
}
