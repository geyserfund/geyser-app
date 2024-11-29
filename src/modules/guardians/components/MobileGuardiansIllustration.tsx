import { Box, HStack, IconButton, Image, useColorModeValue, VStack } from '@chakra-ui/react'
import classNames from 'classnames'
import { useState } from 'react'
import { PiCaretLeft } from 'react-icons/pi'
import { PiCaretRight } from 'react-icons/pi'
import { createUseStyles } from 'react-jss'
import { useSwipeable } from 'react-swipeable'

import { Body } from '@/shared/components/typography'
import {
  GuardiansMobileDarkKingUrl,
  GuardiansMobileDarkKnightUrl,
  GuardiansMobileDarkLegendUrl,
  GuardiansMobileDarkWarriorUrl,
  GuardiansMobileLightKingUrl,
  GuardiansMobileLightKnightUrl,
  GuardiansMobileLightLegendUrl,
  GuardiansMobileLightWarriorUrl,
} from '@/shared/constants/platform/url'
import {
  fadeIn,
  fadeIn20Percent,
  fadeOut,
  fadeOut20Percent,
  SlideInFrontLeft,
  SlideInFrontRight,
  SlideOutBackLeft,
  SlideOutBackRight,
} from '@/shared/styles/animations'

import { Guardian } from '../types'

const images = {
  light: {
    [Guardian.Warrior]: GuardiansMobileLightWarriorUrl,
    [Guardian.Knight]: GuardiansMobileLightKnightUrl,
    [Guardian.King]: GuardiansMobileLightKingUrl,
    [Guardian.Legend]: GuardiansMobileLightLegendUrl,
  },
  dark: {
    [Guardian.Warrior]: GuardiansMobileDarkWarriorUrl,
    [Guardian.Knight]: GuardiansMobileDarkKnightUrl,
    [Guardian.King]: GuardiansMobileDarkKingUrl,
    [Guardian.Legend]: GuardiansMobileDarkLegendUrl,
  },
}

const guardianIndex = [Guardian.Warrior, Guardian.Knight, Guardian.King, Guardian.Legend]

const useStyles = createUseStyles({
  ...SlideInFrontLeft,
  ...SlideOutBackLeft,
  ...SlideOutBackRight,
  ...SlideInFrontRight,
  ...fadeOut,
  ...fadeIn,
  ...fadeOut20Percent,
  ...fadeIn20Percent,
  higherZIndex: {
    zIndex: 1,
  },
})

export const MobileGuardiansIllustration = () => {
  const image = useColorModeValue(images.light, images.dark)

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
  const previousGuardianImage = image[previousGuardian]
  const currentGuardianImage = image[currentGuardian]

  return (
    <VStack w="full" flex={1} position="relative" overflow="hidden" justifyContent="flex-end" {...handlers}>
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
      >
        <Image h="full" w="full" objectFit="cover" objectPosition="top" src={currentGuardianImage} />
      </Box>
      <HStack zIndex="1" paddingBottom="5vh">
        <IconButton
          variant="ghost"
          size="xl"
          icon={<PiCaretLeft fontSize="24px" />}
          color={`guardians.${currentGuardian}.text`}
          onClick={goToNextGuardian}
          aria-label="Previous Guardian"
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
          {'? ? ?'}
        </Body>
        <IconButton
          variant="ghost"
          size="xl"
          icon={<PiCaretRight fontSize="24px" />}
          color={`guardians.${currentGuardian}.text`}
          onClick={goToPreviousGuardian}
          aria-label="Next Guardian"
          _hover={{}}
          _focus={{}}
          _active={{}}
        />
      </HStack>
    </VStack>
  )
}
