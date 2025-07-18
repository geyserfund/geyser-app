import { Stack, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { Head } from '@/config/Head'
import {
  dimensions,
  getPath,
  KingSeoImageUrl,
  KnightSeoImageUrl,
  LegendSeoImageUrl,
  WarriorSeoImageUrl,
} from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { fonts } from '@/shared/styles'
import { GuardianType } from '@/types'
import { toPx, useMobileMode } from '@/utils'

import { MediaCarouselForItemsModal } from '../../../../shared/molecules/MediaCarouselForItems'
import { Copyright } from '../main/components/Copyright'
import { GuardianUsers } from '../main/components/GuardianUsers'
import { CharacterAssetItem, CharacterAssets } from './characterAssets'
import { GuardiansPrice } from './components/GuardiansPrice'
import { ImageBlock } from './components/ImageBlock'
import { PartnerList } from './components/PartnerList'
import { PerkWithImageList } from './components/PerkWithImageList'
import { PerkWithList } from './components/PerkWithList'
import { TitleBlock } from './components/TitleBlock'

export const CharacterPage = () => {
  const navigate = useNavigate()

  const itemsModal = useModal<{ currentIndex: number }>()

  const { characterId } = useParams<{ characterId: string }>()

  const isMobileMode = useMobileMode()

  const [currentGuardian, setCurrentGuardian] = useState<GuardianType>(characterId?.toUpperCase() as GuardianType)

  useEffect(() => {
    if (characterId) {
      if (Object.values(GuardianType).includes(characterId.toUpperCase() as GuardianType)) {
        setCurrentGuardian(characterId.toUpperCase() as GuardianType)
      } else {
        navigate(getPath('guardians'))
      }
    }
  }, [characterId, navigate])

  const guardianAsset = CharacterAssets[currentGuardian]

  const physicalItemLinks = guardianAsset?.physicalItems?.map((item) => item.url) || []
  const digitalItemLinks = guardianAsset?.digitalItems?.map((item) => item.url) || []

  const physicalItemData =
    guardianAsset?.physicalItems?.map((item) => ({
      name: item.name,
      description: item.description,
    })) || []

  const digitalItemData =
    guardianAsset?.digitalItems?.map((item) => ({
      name: item.name,
      description: item.description,
    })) || []

  const totalLinks = [...physicalItemLinks, ...digitalItemLinks]
  const totalItems = [...physicalItemData, ...digitalItemData]

  const handleClick = (item: CharacterAssetItem) => {
    const currentIndex = totalItems.findIndex((i) => i.name === item.name)
    itemsModal.onOpen({ currentIndex })
  }

  const imageUrl = seoImageUrl[currentGuardian]

  return (
    <>
      <Head
        title={t(`Geyser Guardians - ${guardianAsset.title}`)}
        description={t(guardianAsset.description)}
        image={imageUrl}
        type="article"
      />
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        w="full"
        h="full"
        spacing={0}
        paddingTop={{ base: '80px', lg: '3%' }}
        height={{ base: '100%', lg: `calc(100vh - ${toPx(dimensions.topNavBar.desktop.height)})` }}
      >
        <VStack flex={1}>
          <ImageBlock disableArrowKeys={itemsModal.isOpen} />
        </VStack>
        <VStack
          w="full"
          h="full"
          alignItems="flex-start"
          flex={1}
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
            <GuardiansPrice currentGuardian={currentGuardian} />
            <PerkWithImageList
              title={t('Physical Items')}
              items={guardianAsset.physicalItems}
              extraText={t('Deliveries will begin in Q1 2025.')}
              onClick={handleClick}
            />
            <PerkWithImageList title={t('Digital Items')} items={guardianAsset.digitalItems} onClick={handleClick} />
            <PerkWithList title={t('Powers')} items={guardianAsset.powers} />
            <PerkWithList title={t('Discounts')} items={guardianAsset.discounts} />
            <PerkWithList title={t('Experiences')} items={guardianAsset.experiences} />

            <GuardianUsers
              guardian={currentGuardian}
              size="sm"
              titleProps={{ fontSize: '32px', color: 'utils.text', fontWeight: 700 }}
            />
            <PartnerList />
            <Copyright />
          </motion.div>
        </VStack>
        {itemsModal.isOpen && (
          <MediaCarouselForItemsModal
            altText={'Guardian items image'}
            imageLinkList={totalLinks}
            dataList={totalItems}
            {...itemsModal}
            bottomContent={<GuardiansPrice currentGuardian={currentGuardian} showOnlyButton />}
          />
        )}
      </Stack>
    </>
  )
}

const seoImageUrl = {
  [GuardianType.King]: KingSeoImageUrl,
  [GuardianType.Warrior]: WarriorSeoImageUrl,
  [GuardianType.Knight]: KnightSeoImageUrl,
  [GuardianType.Legend]: LegendSeoImageUrl,
}
