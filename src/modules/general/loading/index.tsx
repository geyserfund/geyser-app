import { Image, VStack } from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'

import { LogoNameBrand } from '@/shared/constants'
import { neutralColorsDark, neutralColorsLight } from '@/shared/styles'

function useColor(light = neutralColorsLight[0], dark = neutralColorsDark[0]) {
  return window.localStorage.getItem('chakra-ui-color-mode') === 'dark' ? dark : light
}

const useStyles = createUseStyles({
  '@-webkit-keyframes pulsate-fwd ': {
    '0%': {
      '-webkit-transform': 'scale(1)',
      transform: 'scale(1)',
    },
    '50%': {
      '-webkit-transform': 'scale(1.2)',
      transform: 'scale(1.1)',
    },
    '100%': {
      '-webkit-transform': 'scale(1)',
      transform: 'scale(1)',
    },
  },
  '@keyframes pulsate-fwd': {
    '0%': {
      '-webkit-transform': 'scale(1)',
      transform: 'scale(1)',
    },
    '50%': {
      '-webkit-transform': 'scale(1.2)',
      transform: 'scale(1.1)',
    },
    '100%': {
      '-webkit-transform': 'scale(1)',
      transform: 'scale(1)',
    },
  },
  pulsateFwd: {
    '-webkit-animation': '$pulsate-fwd 3s ease-in-out infinite both',
    animation: '$pulsate-fwd 3s ease-in-out infinite both',
  },
})

export const LoadingPage = () => {
  const classes = useStyles()
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
      <Image
        className={classes.pulsateFwd}
        height="75px"
        src={LogoNameBrand}
        alt="geyser logo image"
        objectFit="contain"
      />
    </VStack>
  )
}
