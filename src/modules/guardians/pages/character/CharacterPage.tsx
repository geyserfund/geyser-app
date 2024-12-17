import { Stack, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useNavigate, useParams } from 'react-router'

import { AppTheme } from '@/context'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { dimensions, getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { MediaCarousel } from '@/shared/molecules/MediaCarousel'
import { fonts } from '@/shared/styles'
import { toPx, useMobileMode } from '@/utils'

import { Guardian } from '../../types'
import { CharacterAssetItem, CharacterAssets } from './characterAssets'
import { GuardiansPrice } from './components/GuardiansPrice'
import { ImageBlock } from './components/ImageBlock'
import { PartnerList } from './components/PartnerList'
import { PerkWithImageList } from './components/PerkWithImageList'
import { PerkWithList } from './components/PerkWithList'
import { TitleBlock } from './components/TitleBlock'

const useStyles = createUseStyles((theme: AppTheme) => ({
  currentClass: {
    fontFamily: fonts.cormorant,
    color: theme.colors.neutral1[9],
    fontSize: '20px',
    fontWeight: 500,
  },
  totalClass: {
    fontFamily: fonts.cormorant,
    color: theme.colors.neutral1[9],
    fontSize: '20px',
    fontWeight: 500,
  },
  ofClass: {
    fontFamily: fonts.cormorant,
    color: theme.colors.neutral1[9],
    fontSize: '20px',
    fontWeight: 500,
  },
}))

export const CharacterPage = () => {
  const navigate = useNavigate()

  const classes = useStyles()

  const itemsModal = useModal()

  const { characterId } = useParams<{ characterId: string }>()

  const isMobileMode = useMobileMode()

  const [currentIndex, setCurrentIndex] = useState<number>(0)

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

  const totalItems = [...physicalItemData, ...digitalItemData]

  const handleClick = (item: CharacterAssetItem) => {
    const currentIndex = totalItems.findIndex((i) => i.name === item.name)
    setCurrentIndex(currentIndex)
    itemsModal.onOpen()
  }

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      h="full"
      spacing={0}
      paddingTop={{ base: '80px', lg: '3%' }}
      height={{ base: '100%', lg: `calc(100vh - ${toPx(dimensions.topNavBar.desktop.height)})` }}
    >
      <VStack flex={1}>
        <ImageBlock />
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
          <PerkWithList title={t('Discounts')} items={guardianAsset.discounts} />
          <PerkWithList title={t('Experiences')} items={guardianAsset.experiences} />
          <PerkWithList title={t('Grants')} items={guardianAsset.grants} />
          <PartnerList />
        </motion.div>
      </VStack>
      {itemsModal.isOpen && (
        <Modal {...itemsModal} size="lg" noClose isCentered={false}>
          <MediaCarousel
            links={[...physicalItemLinks, ...digitalItemLinks]}
            onSlideChange={(index) => setCurrentIndex(index)}
            wrapperProps={{
              backgroundColor: 'transparent',
              paddingBottom: '40px',
              height: { base: '400px', lg: '800px' },
            }}
            initialSlide={currentIndex}
            swiperProps={{
              pagination: {
                type: 'fraction',
                renderFraction(currentClass, totalClass) {
                  return (
                    '<span class="' +
                    classes.currentClass +
                    '"></span>' +
                    '<span class="' +
                    classes.ofClass +
                    '"></span>' +
                    '<span class="' +
                    classes.totalClass +
                    '"></span>'
                  )
                },
                formatFractionCurrent: (current) => `${current} of  `,
                formatFractionTotal: (total) => total,
                currentClass: classes.currentClass,
                totalClass: classes.totalClass,
              },
            }}
          />
          <VStack w="full" fontFamily={fonts.cormorant} alignItems="flex-start">
            <Body size="xl" bold>
              {totalItems[currentIndex]?.name}
            </Body>
            {totalItems[currentIndex]?.description.map((item, index) => (
              <Body medium key={index}>
                {item}
              </Body>
            ))}
          </VStack>
        </Modal>
      )}
    </Stack>
  )
}
