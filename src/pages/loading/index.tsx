import { Image, VStack } from '@chakra-ui/react';

import LogoNameLight from '../../assets/logo-name-brand.svg';

export const LoadingPage = () => (
  <VStack
    height="100vh"
    width="100%"
    color="brand.primary"
    justifyContent="center"
    alignItems="center"
    spacing="20px"
  >
    <Image
      height="75px"
      src={LogoNameLight}
      alt="geyser logo image"
      objectFit="contain"
    />
    {/* <Box maxWidth="285px" width="100%">
				<Progress size="xs" isIndeterminate colorScheme="teal" />
			</Box> */}
  </VStack>
);
