import { Box, BoxProps, HStack, Image, StackProps, useColorModeValue, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { FlowingGifBackground } from '@/modules/discovery/pages/hallOfFame/components/FlowingGifBackground'
import { Body } from '@/shared/components/typography'
import { BodyProps } from '@/shared/components/typography/Body'
import {
  GuardiansDesktopBackgroundDarkModeUrl,
  GuardiansDesktopBackgroundLightModeUrl,
} from '@/shared/constants/platform/url'
import { fonts } from '@/shared/styles'
import { toPx } from '@/utils'

import { GuardiansGradients } from '../style'
import { Guardian } from '../types'
export const DesktopGuardiansIllustration = () => {
  const image = useColorModeValue(GuardiansDesktopBackgroundLightModeUrl, GuardiansDesktopBackgroundDarkModeUrl)

  const gradient = useColorModeValue(GuardiansGradients.light, GuardiansGradients.dark)

  const imageRef = useRef<HTMLImageElement>(null)

  const [uiPosition, setUiPosition] = useState(0)

  const [gradientHeight, setGradientHeight] = useState(0)

  const updateUIPosition = () => {
    if (imageRef.current) {
      const imageRect = imageRef.current.getBoundingClientRect()
      const imageHeight = imageRect.height
      // Assuming 'x' is at 50% of the image height. Adjust this value as needed.
      const xPosition = imageRect.top + imageHeight * 0.5

      setGradientHeight(imageHeight * 0.5)

      setUiPosition(xPosition)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      updateUIPosition()
    }, 100)
    window.addEventListener('resize', updateUIPosition)
    return () => {
      window.removeEventListener('resize', updateUIPosition)
    }
  }, [])

  const textSize = { lg: '40px', xl: '60px' }

  const getCommonBoxProps = (guardian: Guardian) =>
    ({
      w: 'full',
      h: 'full',
      position: 'absolute',
      top: 0,
      left: 0,
      background: gradient[guardian].dim,
      _hover: { background: gradient[guardian].bright, cursor: 'pointer', filter: 'blur(5px)' },
    } as BoxProps)

  const commonVStackProps: StackProps = {
    position: 'relative',
    justifyContent: 'center',
    height: toPx(gradientHeight),
    className: 'guardian-wrapper',
  }

  const commonBodyProps: BodyProps = {
    size: textSize,
    opacity: 0,
    paddingTop: '10%',
    pointerEvents: 'none',
    sx: {
      '.guardian-wrapper:hover &': {
        opacity: 1,
        transition: 'opacity 0.3s ease-in-out',
      },
    },
  }

  const commonFlowingGifProps: BoxProps = {
    opacity: 0,
    pointerEvents: 'none',
    sx: {
      '.guardian-wrapper:hover &': {
        opacity: 0.5,
        transition: 'opacity 0.3s ease-in-out',
      },
    },
  }

  return (
    <>
      <Image
        ref={imageRef}
        zIndex={1}
        position="absolute"
        bottom={-20}
        left={0}
        src={image}
        alt="Guardians"
        pointerEvents="none"
      />
      <HStack w="full" position="absolute" top={uiPosition} left={0} spacing={0} fontFamily={fonts.mazius}>
        <VStack {...commonVStackProps} flex={32}>
          <Box {...getCommonBoxProps(Guardian.Warrior)} />
          <FlowingGifBackground {...commonFlowingGifProps} />
          <Body {...commonBodyProps} color="guardians.warrior.text">
            {'? ? ?'}
          </Body>
        </VStack>
        <VStack {...commonVStackProps} flex={36}>
          <Box {...getCommonBoxProps(Guardian.Knight)} />
          <FlowingGifBackground {...commonFlowingGifProps} />
          <Body {...commonBodyProps} color="guardians.knight.text">
            {'? ? ?'}
          </Body>
        </VStack>
        <VStack {...commonVStackProps} flex={31}>
          <Box {...getCommonBoxProps(Guardian.King)} />
          <FlowingGifBackground {...commonFlowingGifProps} />
          <Body {...commonBodyProps} color="guardians.king.text">
            {'? ? ?'}
          </Body>
        </VStack>
        <VStack {...commonVStackProps} flex={33}>
          <Box {...getCommonBoxProps(Guardian.Legend)} />
          <FlowingGifBackground {...commonFlowingGifProps} />
          <Body {...commonBodyProps} color="guardians.legend.text">
            {'? ? ?'}
          </Body>
        </VStack>
      </HStack>
    </>
  )
}
