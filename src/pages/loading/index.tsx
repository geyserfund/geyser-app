import { Image, VStack } from '@chakra-ui/react'

import { LogoNameBrand } from '../../constants'

export const LoadingPage = () => (
  <VStack
    height="100vh"
    width="100%"
    color="primary.400"
    justifyContent="center"
    alignItems="center"
    spacing="20px"
  >
    <Image
      height="75px"
      src={LogoNameBrand}
      alt="geyser logo image"
      objectFit="contain"
    />
    {/* <Box maxWidth="285px" width="100%">
				<Progress size="xs" isIndeterminate colorScheme="teal" />
			</Box> */}
  </VStack>
)
