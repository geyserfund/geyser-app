import { Image, VStack } from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'

import LogoNameDark from '@/assets/logo-name-dark.svg'
import LogoNameLight from '@/assets/logo-name-light.svg'
import { darkModeColors, lightModeColors } from '@/shared/styles'
import { getLocalStorageItem } from '@/shared/utils/browserStorage.ts'

/** Reads the stored colour mode directly: the splash can render before the Chakra provider resolves it. */
const isStoredDarkMode = () => getLocalStorageItem('chakra-ui-color-mode') === 'dark'

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
      position="fixed"
      top={0}
      left={0}
      height="100vh"
      width="100vw"
      justifyContent="center"
      alignItems="center"
      spacing="20px"
      zIndex={9999}
      backgroundColor={isStoredDarkMode() ? darkModeColors.utils.pageBg : lightModeColors.utils.pageBg}
    >
      <Image
        className={classes.pulsateFwd}
        height="120px"
        maxWidth="90vw"
        src={isStoredDarkMode() ? LogoNameLight : LogoNameDark}
        alt="geyser logo image"
        objectFit="contain"
      />
    </VStack>
  )
}
