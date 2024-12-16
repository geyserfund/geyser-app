import { Box, HStack, IconButton, Image, VStack } from '@chakra-ui/react'
import classNames from 'classnames'
import { useState } from 'react'
import { PiCaretLeft } from 'react-icons/pi'
import { PiCaretRight } from 'react-icons/pi'
import { createUseStyles } from 'react-jss'
import { useNavigate } from 'react-router'
import { useSwipeable } from 'react-swipeable'

import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import {
  GuardiansSeriesOneOrnamentSeparatorUrl,
  KingMainPageGreyMobile,
  KingMainPageMobile,
  KingRaycastUrl,
  KnightMainPageGreyMobile,
  KnightMainPageMobile,
  KnightRaycastUrl,
  LegendMainPageGreyMobile,
  LegendMainPageMobile,
  LegendRaycastUrl,
  WarriorMainPageGreyMobile,
  WarriorMainPageMobile,
  WarriorRaycastUrl,
} from '@/shared/constants/platform/url'
import {
  fadeIn,
  fadeIn20Percent,
  fadeOut,
  fadeOut20Percent,
  scaleUp,
  SlideInFrontLeft,
  SlideInFrontRight,
  SlideOutBackLeft,
  SlideOutBackRight,
} from '@/shared/styles/animations'

import { Guardian } from '../../../types'

const image = {
  [Guardian.Warrior]: WarriorMainPageMobile,
  [Guardian.Knight]: KnightMainPageMobile,
  [Guardian.King]: KingMainPageMobile,
  [Guardian.Legend]: LegendMainPageMobile,
}

const imageGrey = {
  [Guardian.Warrior]: WarriorMainPageGreyMobile,
  [Guardian.Knight]: KnightMainPageGreyMobile,
  [Guardian.King]: KingMainPageGreyMobile,
  [Guardian.Legend]: LegendMainPageGreyMobile,
}

const imageRaycast = {
  [Guardian.Warrior]: WarriorRaycastUrl,
  [Guardian.Knight]: KnightRaycastUrl,
  [Guardian.King]: KingRaycastUrl,
  [Guardian.Legend]: LegendRaycastUrl,
}

export const guardianIndex = [Guardian.Warrior, Guardian.Knight, Guardian.King, Guardian.Legend]

const useStyles = createUseStyles({
  ...SlideInFrontLeft,
  ...SlideOutBackLeft,
  ...SlideOutBackRight,
  ...SlideInFrontRight,
  ...fadeOut,
  ...fadeIn,
  ...fadeOut20Percent,
  ...fadeIn20Percent,
  ...scaleUp,
  higherZIndex: {
    zIndex: 2,
  },
})

export const MobileGuardiansIllustration = () => {
  const navigate = useNavigate()

  const classes = useStyles()

  const handlers = useSwipeable({
    onSwipedRight() {
      goToPreviousGuardian()
    },
    onSwipedLeft() {
      goToNextGuardian()
    },
  })

  const [preChange, setPreChange] = useState<Guardian>(Guardian.Warrior)
  const [secondChange, setSecondChange] = useState<Guardian>(Guardian.Warrior)

  const [currentGuardian, setCurrentGuardian] = useState<Guardian>(Guardian.Warrior)
  const [lastGuardian, setLastGuardian] = useState<Guardian | null>(null)

  const goToNextGuardian = () => {
    const currentIndex = guardianIndex.findIndex((guardians) => guardians.includes(currentGuardian))
    const nextIndex = currentIndex + 1
    let nextGuardian = guardianIndex[0] as Guardian
    const nextIndexGuardian = guardianIndex[nextIndex]
    if (nextIndexGuardian) {
      nextGuardian = nextIndexGuardian
    }

    setLastGuardian(currentGuardian)
    setPreChange(nextGuardian)
    setTimeout(() => {
      setSecondChange(nextGuardian)
      setTimeout(() => {
        setCurrentGuardian(nextGuardian)
      }, 300)
    }, 150)
  }

  const goToPreviousGuardian = () => {
    const currentIndex = guardianIndex.findIndex((guardians) => guardians.includes(currentGuardian))
    const previousIndex = currentIndex - 1
    let previousGuardian = guardianIndex[guardianIndex.length - 1] as Guardian
    const previousIndexGuardian = guardianIndex[previousIndex]
    if (previousIndexGuardian) {
      previousGuardian = previousIndexGuardian
    }

    setLastGuardian(currentGuardian)
    setPreChange(previousGuardian)
    setTimeout(() => {
      setSecondChange(previousGuardian)
      setTimeout(() => {
        setCurrentGuardian(previousGuardian)
      }, 300)
    }, 150)
  }

  const nextGuardianIndex = (guardianIndex.findIndex((guardians) => guardians.includes(currentGuardian)) + 1) % 4
  const previousGuardianIndex = (guardianIndex.findIndex((guardians) => guardians.includes(currentGuardian)) - 1) % 4
  const finalPreviousGuardianIndex = previousGuardianIndex < 0 ? guardianIndex.length - 1 : previousGuardianIndex

  const nextGuardian = guardianIndex[nextGuardianIndex] as Guardian
  const previousGuardian = guardianIndex[finalPreviousGuardianIndex] as Guardian

  const nextGuardianImage = image[nextGuardian]
  const nextGuardianImageGrey = imageGrey[nextGuardian]

  const previousGuardianImage = image[previousGuardian]
  const previousGuardianImageGrey = imageGrey[previousGuardian]

  const currentGuardianImage = image[currentGuardian]
  const currentGuardianImageGrey = imageGrey[currentGuardian]
  const currentGuardianImageRaycast = imageRaycast[currentGuardian]

  return (
    <VStack w="full" padding={0} spacing={0}>
      <HStack zIndex="2">
        <IconButton
          variant="ghost"
          size="xl"
          icon={<PiCaretLeft fontSize="24px" />}
          color={`guardians.${currentGuardian}.text`}
          aria-label="Previous Guardian"
          onClick={goToPreviousGuardian}
          _hover={{}}
          _focus={{}}
          _active={{}}
        />
        <Body
          className={classNames({
            [classes.fadeOut]: preChange !== currentGuardian,
            [classes.fadeIn]: preChange === currentGuardian,
          })}
          size="3xl"
          bold
          color={`guardians.${currentGuardian}.text`}
          textTransform="uppercase"
        >
          {currentGuardian}
        </Body>
        <IconButton
          variant="ghost"
          size="xl"
          icon={<PiCaretRight fontSize="24px" />}
          color={`guardians.${currentGuardian}.text`}
          onClick={goToNextGuardian}
          aria-label="Next Guardian"
          _hover={{}}
          _focus={{}}
          _active={{}}
        />
      </HStack>
      <VStack
        w="full"
        minHeight="60vh"
        position="relative"
        // justifyContent="flex-end"
        {...handlers}
        onClick={() => navigate(getPath('guardiansCharacter', currentGuardian))}
        _hover={{ cursor: 'pointer' }}
      >
        <Box
          className={classNames({
            [classes.slideInFrontRight]: secondChange === previousGuardian,
            [classes.higherZIndex]: secondChange === previousGuardian,
            [classes.fadeOut20Percent]: preChange !== currentGuardian && preChange !== previousGuardian,
            [classes.fadeIn]: preChange === currentGuardian && lastGuardian !== previousGuardian,
          })}
          w="100%"
          height="90%"
          position="absolute"
          bottom={-1}
          zIndex={1}
          opacity={1}
          transition="opacity 0.2s ease-in-out"
          right={'48%'}
        >
          <Image h="full" w="full" objectFit="cover" objectPosition="top" src={previousGuardianImageGrey} />
        </Box>
        <Box
          className={classNames({
            [classes.slideInFrontRight]: secondChange === previousGuardian,
            [classes.higherZIndex]: secondChange === previousGuardian,
            [classes.fadeOut20Percent]: preChange !== currentGuardian && preChange !== previousGuardian,
            [classes.fadeIn20Percent]: preChange === currentGuardian && lastGuardian !== previousGuardian,
          })}
          w="100%"
          height="90%"
          position="absolute"
          bottom={-1}
          opacity={0.3}
          right={'48%'}
        >
          <Image h="full" w="full" objectFit="cover" objectPosition="top" src={previousGuardianImage} />
        </Box>

        <Box
          className={classNames({
            [classes.slideInFrontLeft]: secondChange === nextGuardian,
            [classes.higherZIndex]: secondChange === nextGuardian,
            [classes.fadeOut20Percent]: preChange !== currentGuardian && preChange !== nextGuardian,
            [classes.fadeIn]: preChange === currentGuardian && lastGuardian !== nextGuardian,
          })}
          w="100%"
          height="90%"
          position="absolute"
          bottom={-1}
          zIndex={1}
          opacity={1}
          transition="opacity 0.2s ease-in-out"
          left={'48%'}
        >
          <Image h="full" w="full" objectFit="cover" objectPosition="top" src={nextGuardianImageGrey} />
        </Box>
        <Box
          className={classNames({
            [classes.slideInFrontLeft]: secondChange === nextGuardian,
            [classes.higherZIndex]: secondChange === nextGuardian,
            [classes.fadeOut20Percent]: preChange !== currentGuardian && preChange !== nextGuardian,
            [classes.fadeIn20Percent]: preChange === currentGuardian && lastGuardian !== nextGuardian,
          })}
          w="100%"
          height="90%"
          position="absolute"
          bottom={-1}
          opacity={0.3}
          left={'48%'}
        >
          <Image h="full" w="full" objectFit="cover" objectPosition="top" src={nextGuardianImage} />
        </Box>

        <Box
          className={classNames({
            [classes.slideOutBackLeft]: preChange === nextGuardian,
            [classes.slideOutBackRight]: preChange === previousGuardian,
          })}
          w="100%"
          height="90%"
          position="absolute"
          bottom={-1}
          zIndex={1}
        >
          <Image h="full" w="full" objectFit="cover" objectPosition="top" src={currentGuardianImageGrey} />
        </Box>
        <Box
          className={classNames({
            [classes.scaleInVerBottom]: preChange === currentGuardian,
            [classes.fadeOut]: preChange !== currentGuardian,
          })}
          w="70%"
          height="110%"
          position="absolute"
          bottom={-1}
          zIndex={1}
          pointerEvents="none"
        >
          <Image h="full" w="full" objectFit="cover" objectPosition="top" src={currentGuardianImageRaycast} />
        </Box>

        <Box
          className={classNames({
            [classes.slideOutBackLeft]: preChange === nextGuardian,
            [classes.slideOutBackRight]: preChange === previousGuardian,
          })}
          w="100%"
          height="90%"
          position="absolute"
          bottom={-1}
          zIndex={1}
        >
          <Image h="full" w="full" objectFit="cover" objectPosition="top" src={currentGuardianImage} />
        </Box>
      </VStack>
      <Image
        src={GuardiansSeriesOneOrnamentSeparatorUrl}
        position="relative"
        zIndex={3}
        height="100px"
        objectFit="cover"
        marginTop="-30px"
      />
    </VStack>
  )
}
