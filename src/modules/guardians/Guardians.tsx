import { Box, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import { addProjectHeroAtom } from '@/modules/project/pages1/projectView/state/heroAtom'
import { Body, H1 } from '@/shared/components/typography'
import {
  dimensions,
  getPath,
  GuardiansSeriesOneBackground4kUrl,
  GuardiansSeriesOneBackgroundFullHDUrl,
  GuardiansSeriesOneBackgroundMobileUrl,
  GuardiansSeriesOneBackgroundTabUrl,
} from '@/shared/constants'
import { fonts } from '@/shared/styles'
import { toPx } from '@/utils'

import { useIsGuardianCharacterPage } from '../navigation/platformNavBar/platformNavBarAtom'
import { useGuardianProjectRewards } from './hooks/useGuardianProjectRewards'
const GEYSER_GUARDIANS_PROJECT_NAME = 'geyserguardians'

export const Guardians = () => {
  const isGuardianCharacterPage = useIsGuardianCharacterPage()

  const [searchParams] = useSearchParams()

  const addHeroId = useSetAtom(addProjectHeroAtom)
  const heroId = searchParams.get('hero')

  useEffect(() => {
    if (heroId) {
      addHeroId({
        projectName: GEYSER_GUARDIANS_PROJECT_NAME,
        heroId,
      })
    }
  }, [heroId, addHeroId])

  useGuardianProjectRewards()

  return (
    <HStack w="full" justify="center" backgroundColor="guardians.background">
      <Box
        background={{
          base: `url(${GuardiansSeriesOneBackgroundMobileUrl})`,
          md: `url(${GuardiansSeriesOneBackgroundTabUrl})`,
          lg: `url(${GuardiansSeriesOneBackgroundFullHDUrl})`,
          '5xl': `url(${GuardiansSeriesOneBackground4kUrl})`,
        }}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
      />
      <VStack
        w="full"
        maxWidth={dimensions.guardians.maxWidth}
        spacing={4}
        fontFamily={fonts.cormorant}
        fontStyle="normal"
        position="relative"
      >
        <VStack
          zIndex={{ base: 1, lg: 10 }}
          pt={{ base: toPx(dimensions.topNavBar.mobile.height), lg: 6, xl: 4 }}
          spacing={0}
          position="absolute"
          top={{
            base: `-${toPx(dimensions.topNavBar.mobile.height)}`,
            lg: `-${toPx(dimensions.topNavBar.desktop.height)}`,
          }}
        >
          <H1
            as={Link}
            to={getPath('guardians')}
            fontSize={{ base: '32px', md: '48px', lg: '56px', xl: '72px' }}
            color={isGuardianCharacterPage ? 'neutral1.9' : 'utils.text'}
            textAlign="center"
            bold
          >
            {t('GEYSER GUARDIANS')}
          </H1>
          <Body
            fontSize={{ base: '16px', md: '20px', lg: '24px', xl: '28px' }}
            marginTop={{ base: '-8px', md: '-12px', lg: '-16px', xl: '-20px' }}
            color={isGuardianCharacterPage ? 'utils.text' : ' neutral1.9'}
            bold
          >
            {t('Series 1')}
          </Body>
        </VStack>
        <Outlet />
      </VStack>
    </HStack>
  )
}
