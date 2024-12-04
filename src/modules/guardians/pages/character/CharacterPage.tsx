import {
  Divider,
  HStack,
  Icon,
  IconButton,
  IconButtonProps,
  Image,
  ImageProps,
  ListItem,
  Stack,
  UnorderedList,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { PiCaretLeft, PiCaretRight, PiDotOutline } from 'react-icons/pi'
import { createUseStyles } from 'react-jss'
import Tilt, { ReactParallaxTiltProps } from 'react-parallax-tilt'
import { useNavigate, useParams } from 'react-router'
import { useSwipeable } from 'react-swipeable'

import { Body, H1, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { fadeIn, fadeOut, flipInRight, flipOutRight, fonts } from '@/shared/styles'
import { useMobileMode } from '@/utils'

import { SubscribeGuardians } from '../../components/SubscribeGuardians'
import { Guardian } from '../../types'
import { guardianIndex } from '../main/components/MobileGuardiansIllustration'
import { CharacterPageCopies, GuardianImage, GuardianImageMobileMode } from './characterAssets'

const useStyles = createUseStyles({
  ...flipInRight,
  ...flipOutRight,
  ...fadeIn,
  ...fadeOut,
})

export const CharacterPage = () => {
  const navigate = useNavigate()
  const { characterId } = useParams<{ characterId: string }>()
  const isMobileMode = useMobileMode()

  const classes = useStyles()

  const [currentGuardian, setCurrentGuardian] = useState<Guardian>(characterId as Guardian)
  const [preChange, setPreChange] = useState<Guardian>(characterId as Guardian)

  const guardianImagesDesktop = useColorModeValue(GuardianImage.light, GuardianImage.dark)
  const guardianImagesMobile = useColorModeValue(GuardianImageMobileMode.light, GuardianImageMobileMode.dark)
  const guardianImages = isMobileMode ? guardianImagesMobile : guardianImagesDesktop

  const goToNextGuardian = () => {
    const currentIndex = guardianIndex.findIndex((guardians) => guardians.includes(currentGuardian))
    const nextIndex = currentIndex + 1
    let nextGuardian = guardianIndex[0] as Guardian
    const nextIndexGuardian = guardianIndex[nextIndex]
    if (nextIndexGuardian) {
      nextGuardian = nextIndexGuardian
    }

    // setLastGuardian(currentGuardian)
    setPreChange(nextGuardian)
    setTimeout(() => {
      setCurrentGuardian(nextGuardian)
      navigate(getPath('guardiansCharacter', nextGuardian), { replace: true })
    }, 300)
  }

  const goToPreviousGuardian = () => {
    const currentIndex = guardianIndex.findIndex((guardians) => guardians.includes(currentGuardian))
    const previousIndex = currentIndex - 1
    let previousGuardian = guardianIndex[guardianIndex.length - 1] as Guardian
    const previousIndexGuardian = guardianIndex[previousIndex]
    if (previousIndexGuardian) {
      previousGuardian = previousIndexGuardian
    }

    // setLastGuardian(currentGuardian)
    setPreChange(previousGuardian)
    setTimeout(() => {
      setCurrentGuardian(previousGuardian)
    }, 300)
  }

  useEffect(() => {
    if (characterId) {
      if (Object.values(Guardian).includes(characterId as Guardian)) {
        setCurrentGuardian(characterId as Guardian)
        setPreChange(characterId as Guardian)
      } else {
        navigate(getPath('guardians'))
      }
    }
  }, [characterId, navigate])

  const handlers = useSwipeable({
    onSwipedRight() {
      goToPreviousGuardian()
    },
    onSwipedLeft() {
      goToNextGuardian()
    },
  })

  const getImageProps = (guardian: Guardian) => {
    return {
      className: classNames({
        // [classes.fadeIn]: secondChange === guardian,
        // [classes.fadeOut]: preChange !== guardian,
        [classes.flipInVerticalRight]: preChange === guardian,
        [classes.flipOutVerticalRight]: preChange !== guardian,
      }),

      height: { base: '440px', lg: '100%' },
      objectFit: 'cover',
      objectPosition: 'top',
      width: 'full',
      position: { base: 'absolute', lg: 'unset' },
      top: { base: '0px', lg: 'unset' },
      display: currentGuardian === guardian ? 'block' : 'none',
      src: guardianImages[guardian],
      alt: guardian,
    } as ImageProps
  }

  const guardianCopy = CharacterPageCopies[currentGuardian]
  const guardianColor = `guardians.${currentGuardian}.text`

  const renderImages = () => {
    return (
      <VStack
        w="full"
        h="full"
        spacing={0}
        justifyContent="flex-end"
        alignItems="center"
        position="relative"
        overflow="hidden"
      >
        <Image {...getImageProps(Guardian.King)} />

        <Image {...getImageProps(Guardian.Knight)} />

        <Image {...getImageProps(Guardian.Legend)} />

        <Image {...getImageProps(Guardian.Warrior)} />
      </VStack>
    )
  }

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      h="full"
      spacing={0}
      paddingTop={{ base: '0px', lg: '3%' }}
    >
      <VStack
        w="full"
        h="full"
        flex={1}
        spacing={0}
        justifyContent={{ base: 'flex-start', lg: 'flex-end' }}
        alignItems="center"
        position="relative"
        zIndex={11}
        backgroundColor={'guardians.background'}
        {...handlers}
      >
        {isMobileMode ? renderImages() : <Tilt {...tiltProps}>{renderImages()}</Tilt>}

        <HStack
          display={{ base: 'flex', lg: 'none' }}
          zIndex={2}
          w="full"
          position="absolute"
          bottom={0}
          spacing={'24px'}
          justifyContent="center"
        >
          <IconButton
            {...iconButtonPropsMobile}
            aria-label="previous-guardian"
            icon={<PiCaretLeft />}
            color={guardianColor}
            onClick={goToPreviousGuardian}
          />
          <H1 size="28px" lineHeight={'64px'} color={guardianColor}>
            {guardianCopy.title}
          </H1>
          <IconButton
            {...iconButtonPropsMobile}
            aria-label="next-guardian"
            icon={<PiCaretRight />}
            color={guardianColor}
            onClick={goToNextGuardian}
          />
        </HStack>

        <HStack
          display={{ base: 'none', lg: 'flex' }}
          zIndex={2}
          w="full"
          position="absolute"
          bottom={'64px'}
          spacing={'72px'}
          justifyContent="center"
        >
          <IconButton
            {...iconButtonProps}
            aria-label="previous-guardian"
            icon={<PiCaretLeft />}
            onClick={goToPreviousGuardian}
          />
          <IconButton
            {...iconButtonProps}
            aria-label="next-guardian"
            icon={<PiCaretRight />}
            onClick={goToNextGuardian}
          />
        </HStack>
      </VStack>
      <VStack w="full" h="full" flex={1} spacing={0} overflowY="auto" paddingBottom={12} px={{ base: 3, lg: 6 }}>
        <motion.div
          layout
          style={{
            maxWidth: '760px',
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: fonts.mazius,
            gap: isMobileMode ? '16px' : '32px',
          }}
          transition={{ type: 'spring', stiffness: 900, damping: 40 }}
        >
          <VStack w="full" alignItems="flex-start">
            <VStack spacing={0} w="full" alignItems="flex-start">
              <H1 size="64px" lineHeight={'64px'} color={guardianColor} display={{ base: 'none', lg: 'flex' }}>
                {guardianCopy.title}
              </H1>
              <Body size={{ base: 'md', lg: '2xl' }}>{guardianCopy.description}</Body>
            </VStack>

            <Divider borderColor={'neutral1.3'} borderTopWidth="2px" />
            <Stack w="full" direction={{ base: 'column', lg: 'row' }} spacing={{ base: 0, lg: 2 }}>
              {guardianCopy.abilities.map((ability, index) => {
                return (
                  <>
                    <Body color={guardianColor} textTransform={{ base: 'uppercase', lg: 'unset' }}>
                      {ability}
                    </Body>
                    {index !== guardianCopy.abilities.length - 1 && !isMobileMode && (
                      <Icon as={PiDotOutline} color={guardianColor} />
                    )}
                  </>
                )
              })}
            </Stack>
          </VStack>
          <VStack w="full" alignItems="flex-start">
            <H2 size={{ base: '32px', lg: '24px' }} dark bold>
              {t('Digital Items')}
            </H2>
            <UnorderedList fontSize={{ base: 'md', lg: '2xl' }}>
              {guardianCopy.digitalItems.map((item) => {
                return <ListItem key={item}>{item}</ListItem>
              })}
            </UnorderedList>
          </VStack>
          {guardianCopy.physicalItems && (
            <VStack w="full" alignItems="flex-start">
              <H2 size={{ base: '32px', lg: '24px' }} dark bold>
                {t('Physical Items')}
              </H2>
              <HStack height={{ base: '50px', lg: '115px' }} overflow="hidden">
                {guardianCopy.physicalItems.map((item) => {
                  return <Image src={item} key={item} height="full" width="auto" />
                })}
              </HStack>
            </VStack>
          )}
          {guardianCopy.discounts && (
            <VStack w="full" alignItems="flex-start">
              <H2 size={{ base: '32px', lg: '24px' }} dark bold>
                {t('Discounts')}
              </H2>
              <Body size={{ base: 'md', lg: '2xl' }}>{guardianCopy.discounts}</Body>
            </VStack>
          )}
          <HStack w="full" alignItems="center">
            <H2 size={{ base: '32px', lg: '24px' }} dark bold>
              {t('Available')}:
            </H2>
            <Body size={{ base: '32px', lg: '24px' }} bold color={guardianColor}>
              {guardianCopy.available || '∞'}
            </Body>
          </HStack>
          <SubscribeGuardians />
        </motion.div>
      </VStack>
    </Stack>
  )
}

const tiltProps: ReactParallaxTiltProps = {
  tiltMaxAngleX: 10,
  tiltMaxAngleY: 5,
  style: { height: '100%', width: '100%' },
}

const iconButtonProps: IconButtonProps = {
  height: { base: '32px', lg: '56px', xl: '64px' },
  width: { base: '32px', lg: '56px', xl: '64px' },
  variant: 'outline',
  colorScheme: 'neutral1',
  borderRadius: 'full',
  'aria-label': 'guardian-switch',
}

const iconButtonPropsMobile: IconButtonProps = {
  fontSize: '24px',
  variant: 'ghost',
  colorScheme: 'neutral1',
  borderRadius: 'full',
  'aria-label': 'guardian-switch',
  _hover: {},
  _active: {},
  _focus: {},
}
