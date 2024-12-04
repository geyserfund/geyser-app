import { Box, BoxProps, HStack, Image, StackProps, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { FlowingGifBackground } from '@/modules/discovery/pages/hallOfFame/components/FlowingGifBackground'
import { Body } from '@/shared/components/typography'
import { BodyProps } from '@/shared/components/typography/Body'
import { dimensions, getPath } from '@/shared/constants'
import {
  GuardiansDesktopBackgroundDarkModeUrl,
  GuardiansDesktopBackgroundLightModeUrl,
} from '@/shared/constants/platform/url'
import { fonts } from '@/shared/styles'
import { toPx } from '@/utils'

import { GuardiansGradients } from '../../../style'
import { Guardian } from '../../../types'
export const DesktopGuardiansIllustration = () => {
  const navigate = useNavigate()

  const image = useColorModeValue(GuardiansDesktopBackgroundLightModeUrl, GuardiansDesktopBackgroundDarkModeUrl)

  const gradient = useColorModeValue(GuardiansGradients.light, GuardiansGradients.dark)

  const { colorMode } = useColorMode()

  const isLightMode = colorMode === 'light'

  const imageRef = useRef<HTMLImageElement>(null)

  const [uiPosition, setUiPosition] = useState(0)

  const [gradientHeight, setGradientHeight] = useState(0)

  const updateUIPosition = () => {
    if (imageRef.current) {
      const imageRect = imageRef.current.getBoundingClientRect()
      const imageHeight = imageRect.height

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
        opacity: 0.5,
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
        bottom={-10}
        left={0}
        src={image}
        alt="Guardians"
        pointerEvents="none"
      />
      <Body fontSize={'xl'} textAlign={'center'} position="absolute" bottom={3} w="full">
        {t('< Choose your character >')}
      </Body>
      <HStack
        w="full"
        position="absolute"
        top={{
          base: toPx(uiPosition - dimensions.topNavBar.mobile.height),
          lg: toPx(uiPosition - dimensions.topNavBar.desktop.height),
        }}
        left={0}
        spacing={0}
        fontFamily={fonts.mazius}
      >
        <VStack
          {...commonVStackProps}
          flex={32}
          onClick={() => navigate(getPath('guardiansCharacter', Guardian.Warrior))}
        >
          <Box {...getCommonBoxProps(Guardian.Warrior)} />
          {isLightMode && <FlowingGifBackground {...commonFlowingGifProps} />}
          <Body {...commonBodyProps} color="guardians.warrior.text">
            {t('Warrior')}
          </Body>
        </VStack>
        <VStack
          {...commonVStackProps}
          flex={36}
          onClick={() => navigate(getPath('guardiansCharacter', Guardian.Knight))}
        >
          <Box {...getCommonBoxProps(Guardian.Knight)} />
          {isLightMode && <FlowingGifBackground {...commonFlowingGifProps} />}
          <Body {...commonBodyProps} color="guardians.knight.text">
            {t('Knight')}
          </Body>
        </VStack>
        <VStack {...commonVStackProps} flex={31} onClick={() => navigate(getPath('guardiansCharacter', Guardian.King))}>
          <Box {...getCommonBoxProps(Guardian.King)} />
          {isLightMode && <FlowingGifBackground {...commonFlowingGifProps} />}
          <Body {...commonBodyProps} color="guardians.king.text">
            {t('King')}
          </Body>
        </VStack>
        <VStack
          {...commonVStackProps}
          flex={33}
          onClick={() => navigate(getPath('guardiansCharacter', Guardian.Legend))}
        >
          <Box {...getCommonBoxProps(Guardian.Legend)} />
          {isLightMode && <FlowingGifBackground {...commonFlowingGifProps} />}
          <Body {...commonBodyProps} color="guardians.legend.text">
            {t('Legend')}
          </Body>
        </VStack>
      </HStack>
    </>
  )
}
