import { Divider, Stack, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { dimensions, getPath } from '@/shared/constants'
import { fonts } from '@/shared/styles'
import { toPx, useMobileMode } from '@/utils'

import { Guardian } from '../../types'
import { CharacterAssets } from './characterAssets'
import { GuardiansPrice } from './components/GuardiansPrice'
import { ImageBlock } from './components/ImageBlock'
import { PerkWithImageList } from './components/PerkWithImageList'
import { PerkWithList } from './components/PerkWithList'
import { TitleBlock } from './components/TitleBlock'

export const CharacterPage = () => {
  const navigate = useNavigate()
  const { characterId } = useParams<{ characterId: string }>()
  const isMobileMode = useMobileMode()

  const [currentGuardian, setCurrentGuardian] = useState<Guardian>(characterId as Guardian)

  useEffect(() => {
    if (characterId) {
      if (Object.values(Guardian).includes(characterId as Guardian)) {
        setCurrentGuardian(characterId as Guardian)
      } else {
        navigate(getPath('guardians'))
      }
    }
  }, [characterId, navigate])

  const guardianAsset = CharacterAssets[currentGuardian]

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      h="full"
      spacing={0}
      paddingTop={{ base: '80px', lg: '3%' }}
      height={{ base: '100%', lg: `calc(100vh - ${toPx(dimensions.topNavBar.desktop.height)})` }}
    >
      <VStack flex={{ lg: 2, '2xl': 3, '3xl': 1 }}>
        <ImageBlock />
      </VStack>
      <VStack
        w="full"
        h="full"
        flex={{ lg: 1, '2xl': 2, '3xl': 1 }}
        spacing={0}
        overflowY="auto"
        paddingBottom={12}
        px={{ base: 3, lg: 6 }}
      >
        <motion.div
          layout
          style={{
            maxWidth: '760px',
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: fonts.cormorant,
            gap: isMobileMode ? '16px' : '32px',
          }}
          transition={{ type: 'spring', stiffness: 900, damping: 40 }}
        >
          <TitleBlock currentGuardian={currentGuardian} />
          <PerkWithImageList title={t('Digital Items')} items={guardianAsset.digitalItems} />
          <PerkWithImageList title={t('Physical Items')} items={guardianAsset.physicalItems} />

          <PerkWithList title={t('Discounts')} items={guardianAsset.discounts} />
          <PerkWithList title={t('Experiences')} items={guardianAsset.experiences} />
          <PerkWithList title={t('Grants')} items={guardianAsset.grants} />

          <Divider borderColor={'neutral1.6'} />

          <GuardiansPrice currentGuardian={currentGuardian} />

          <Divider borderColor={'neutral1.6'} />
        </motion.div>
      </VStack>
    </Stack>
  )
}
