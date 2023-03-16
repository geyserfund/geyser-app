import { Box, BoxProps, Image, Link, Text } from '@chakra-ui/react'

import { Maybe, Sponsor } from '../../../types'

interface Props {
  sponsors?: Array<Maybe<Sponsor>>
  titleProps?: BoxProps
}

export const SponsorList = ({
  sponsors = [],
  titleProps,
  ...props
}: Props & BoxProps) => {
  return sponsors.length ? (
    <Box display="flex" alignItems="center" mt={6} {...props}>
      <Box {...titleProps}>
        <Text color="brand.neutral600" fontSize="11px" mr={2} fontWeight="700">
          SPONSORS
        </Text>
      </Box>
      <Box display="flex" flexWrap="wrap">
        {sponsors.map((item) =>
          item && item.image ? (
            <Box key={item.id} mr={3}>
              <Link as={'div'} href={item.url || '#'}>
                <Image src={item.image} alt="sponsor logo" height="30px" />
              </Link>
            </Box>
          ) : null,
        )}
      </Box>
    </Box>
  ) : null
}
