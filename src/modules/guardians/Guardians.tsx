import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link, Outlet } from 'react-router-dom'

import { H1 } from '@/shared/components/typography'
import { dimensions, getPath } from '@/shared/constants'
import { fonts } from '@/shared/styles'
import { toPx } from '@/utils'

import { useIsGuardianCharacterPage } from '../navigation/platformNavBar/platformNavBarAtom'

export const Guardians = () => {
  const isGuardianCharacterPage = useIsGuardianCharacterPage()
  return (
    <VStack
      w="full"
      maxWidth={dimensions.guardians.maxWidth}
      spacing={4}
      fontFamily={fonts.mazius}
      fontStyle="normal"
      h={{
        base: `calc(100vh - ${toPx(dimensions.topNavBar.mobile.height)})`,
        lg: `calc(100vh - ${toPx(dimensions.topNavBar.desktop.height)})`,
      }}
      backgroundColor={'guardians.background'}
      overflow="hidden"
      position="relative"
      // paddingTop={{ base: dimensions.topNavBar.mobile.height, lg: dimensions.topNavBar.desktop.height }}
    >
      <VStack
        zIndex={10}
        pt={{ base: toPx(dimensions.topNavBar.mobile.height), lg: 6, xl: 4 }}
        spacing={{ base: 0, lg: 6 }}
        position="fixed"
        top={0}
      >
        <H1
          as={Link}
          to={getPath('guardians')}
          fontSize={{ base: '32px', md: '48px', lg: '56px', xl: '72px' }}
          fontWeight={{ base: 'bold', lg: 'normal' }}
          color={isGuardianCharacterPage ? 'neutral1.9' : 'utils.text'}
        >
          {t('GEYSER GUARDIANS')}
        </H1>
      </VStack>
      <Outlet />
    </VStack>
  )
}
