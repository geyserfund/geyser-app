import { Box, BoxProps, Image, Text } from '@chakra-ui/react'

interface Props {
  sponsors?: Array<string>
  titleProps?: BoxProps
}

export const SponsorList = ({
  sponsors = [],
  titleProps,
  ...props
}: Props & BoxProps) => {
  return (
    <Box display="flex" alignItems="center" mt={6} {...props}>
      <Box {...titleProps}>
        <Text color="brand.neutral600" fontSize="11px" mr={2} fontWeight="700">
          SPONSORS
        </Text>
      </Box>
      <Box display="flex">
        {sponsors.map((item) => (
          <Box key={item} mr={3}>
            <Image src={item} alt="logo" height="30px" />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
