import {
  Box,
  BoxProps,
  HStack,
  Image,
  StackProps,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
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
import { toPx, useMobileMode } from '@/utils'

import { GuardiansGradients } from '../../../style'
import { Guardian } from '../../../types'
export const DesktopGuardiansIllustration = () => {
  const navigate = useNavigate()

  const value = useBreakpointValue({ lg: '50%', xl: '40%' })

  const image = useColorModeValue(GuardiansDesktopBackgroundLightModeUrl, GuardiansDesktopBackgroundDarkModeUrl)

  const gradient = useColorModeValue(GuardiansGradients.light, GuardiansGradients.dark)

  const isMobileMode = useMobileMode()
  const { colorMode } = useColorMode()

  const isLightMode = colorMode === 'light'

  const imageRef = useRef<HTMLImageElement>(null)

  const [uiPosition, setUiPosition] = useState('')

  const [gradientHeight, setGradientHeight] = useState('50vh')

  const updateUIPosition = () => {
    if (imageRef.current) {
      const imageRect = imageRef.current.getBoundingClientRect()
      const imageHeight = imageRect.height

      const xPosition = imageRect.top + imageHeight * 0.5

      const uiPositionCalculated = isMobileMode
        ? xPosition - dimensions.topNavBar.mobile.height
        : xPosition - dimensions.topNavBar.desktop.height

      setGradientHeight(toPx(imageHeight * 0.5))
      setUiPosition(toPx(uiPositionCalculated))
    } else {
      setTimeout(() => {
        updateUIPosition()
      }, 100)
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
    height: gradientHeight,
    background: 'guardians.background',
    className: 'guardian-wrapper',
  }

  const commonBodyProps: BodyProps = {
    size: textSize,
    opacity: 0,
    position: 'absolute',
    bottom: uiPosition ? '30%' : { lg: '20%', xl: '10%', '3xl': '20%' },
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
      <Body fontSize={'xl'} textAlign={'center'} position="absolute" bottom={3} w="full" zIndex={1}>
        {t('< Choose your character >')}
      </Body>
      <HStack w="full" position="absolute" top={uiPosition || value} left={0} spacing={0} fontFamily={fonts.mazius}>
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
