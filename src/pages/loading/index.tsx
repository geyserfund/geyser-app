import { Image, VStack } from '@chakra-ui/react'

import { LogoNameBrand } from '../../shared/constants'
import { neutralColorsDark, neutralColorsLight } from '../../shared/styles'

function useColor(light = neutralColorsLight[0], dark = neutralColorsDark[0]) {
  return window.localStorage.getItem('chakra-ui-color-mode') === 'dark' ? dark : light
}

export const LoadingPage = () => {
  return (
    <VStack
      height="100vh"
      width="100%"
      color="primary.400"
      justifyContent="center"
      alignItems="center"
      spacing="20px"
      zIndex={9999}
      position="fixed"
      backgroundColor={useColor()}
    >
      <Image height="75px" src={LogoNameBrand} alt="geyser logo image" objectFit="contain" />
      {/* <Box maxWidth="285px" width="100%">
				<Progress size="xs" isIndeterminate colorScheme="teal" />
			</Box> */}
    </VStack>
  )
}
