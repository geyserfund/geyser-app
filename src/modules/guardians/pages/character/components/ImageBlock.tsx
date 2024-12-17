import { HStack, Icon, IconButton, IconButtonProps, Image, ImageProps, VStack } from '@chakra-ui/react'
import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi'
import { createUseStyles } from 'react-jss'
import { useNavigate, useParams } from 'react-router'
import { useSwipeable } from 'react-swipeable'

import { Guardian } from '@/modules/guardians/types'
import { H1 } from '@/shared/components/typography'
import { getPath, GuardiansSeriesOneOrnamentSeparatorUrl } from '@/shared/constants'
import { fadeIn, fadeOut, flipInRight, flipOutRight, scaleUp } from '@/shared/styles'
import { useMobileMode } from '@/utils'

import { guardianIndex } from '../../main/components/MobileGuardiansIllustration'
import { CharacterAssets, GuardianCharacter, GuardianCharacterMobile } from '../characterAssets'

const useStyles = createUseStyles({
  ...flipInRight,
  ...flipOutRight,
  ...fadeIn,
  ...fadeOut,
  ...scaleUp,
})

export const ImageBlock = () => {
  const navigate = useNavigate()
  const { characterId } = useParams<{ characterId: string }>()
  const isMobileMode = useMobileMode()

  const classes = useStyles()

  const [currentGuardian, setCurrentGuardian] = useState<Guardian>(characterId as Guardian)
  const [preChange, setPreChange] = useState<Guardian>(characterId as Guardian)

  const guardianImages = isMobileMode ? GuardianCharacterMobile : GuardianCharacter

  const goToNextGuardian = useCallback(() => {
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
  }, [currentGuardian, navigate])

  const goToPreviousGuardian = useCallback(() => {
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
      navigate(getPath('guardiansCharacter', previousGuardian), { replace: true })
    }, 300)
  }, [currentGuardian, navigate])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPreviousGuardian()
      } else if (event.key === 'ArrowRight') {
        goToNextGuardian()
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [goToPreviousGuardian, goToNextGuardian])

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

  const guardianCopy = CharacterAssets[currentGuardian]
  const guardianColor = `guardians.${currentGuardian}.text`

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
        [classes.flipInVerticalRight]: preChange === guardian,
        [classes.flipOutVerticalRight]: preChange !== guardian,
      }),

      maxHeight: { base: '440px', lg: '100%' },
      height: 'auto',
      objectFit: 'cover',
      objectPosition: 'top',
      width: 'auto',
      maxWidth: 'full',
      display: currentGuardian === guardian ? 'block' : 'none',
      src: guardianImages[guardian].character,
      alt: guardian,
    } as ImageProps
  }

  const getRaycastProps = (guardian: Guardian) => {
    return {
      className: classNames({
        [classes.scaleInVerBottom]: currentGuardian === guardian,
      }),

      src: guardianImages[guardian].raycast,
      height: { base: '110%', lg: '103%' },
      width: '70%',
      position: 'absolute',
      alignSelf: 'center',
      maxWidth: { base: '280px', lg: '580px' },
      maxHeight: { base: 'unset', lg: '900px' },
      bottom: 0,
      opacity: preChange !== guardian ? 0 : currentGuardian === guardian ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out',
    } as ImageProps
  }

  return (
    <VStack
      w="full"
      h="full"
      spacing={0}
      justifyContent={{ base: 'flex-start', lg: 'flex-end' }}
      alignItems="center"
      position="relative"
      paddingTop={{ base: '10%', lg: '0' }}
      paddingBottom={{ base: '65px', lg: 0 }}
      {...handlers}
    >
      <VStack
        w="full"
        h="full"
        minHeight="440px"
        spacing={0}
        alignItems="center"
        justifyContent="flex-end"
        position="relative"
      >
        <HStack maxHeight="full" position="relative" justifyContent="center" alignItems="flex-end">
          <Image {...getRaycastProps(Guardian.Knight)} />
          <Image {...getRaycastProps(Guardian.Legend)} />
          <Image {...getRaycastProps(Guardian.Warrior)} />
          <Image {...getRaycastProps(Guardian.King)} />

          <H1
            position="absolute"
            top={'-50px'}
            display={{ base: 'unset', lg: 'none' }}
            fontSize={'48px'}
            lineHeight={'64px'}
            color={guardianColor}
            zIndex={1}
            textTransform={'uppercase'}
            bold
          >
            {guardianCopy.title}
          </H1>

          <HStack
            zIndex={2}
            w="full"
            position="absolute"
            top={'20%'}
            spacing={{ base: '40%', lg: '50%' }}
            justifyContent="center"
          >
            <IconButton
              {...iconButtonPropsMobile}
              aria-label="previous-guardian"
              icon={<Icon as={PiCaretLeft} fontSize={{ base: '24px', lg: '48px' }} />}
              color={guardianColor}
              onClick={goToPreviousGuardian}
            />

            <IconButton
              {...iconButtonPropsMobile}
              aria-label="next-guardian"
              icon={<Icon as={PiCaretRight} fontSize={{ base: '24px', lg: '48px' }} />}
              color={guardianColor}
              onClick={goToNextGuardian}
            />
          </HStack>

          <Image {...getImageProps(Guardian.King)} />

          <Image {...getImageProps(Guardian.Knight)} />

          <Image {...getImageProps(Guardian.Legend)} />

          <Image {...getImageProps(Guardian.Warrior)} />

          <Image
            src={GuardiansSeriesOneOrnamentSeparatorUrl}
            display={{ base: 'block', lg: 'none' }}
            height="90px"
            width="auto"
            objectFit="cover"
            objectPosition="center"
            position="absolute"
            bottom={'-65px'}
          />
        </HStack>
      </VStack>
    </VStack>
  )
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
