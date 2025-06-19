import { Box, BoxProps, HStack, Image, ImageProps, VStack } from '@chakra-ui/react'
import classNames from 'classnames'
import { t } from 'i18next'
import { useMemo, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useNavigate } from 'react-router'

import { Body } from '@/shared/components/typography'
import { BodyProps } from '@/shared/components/typography/Body'
import { getPath } from '@/shared/constants'
import {
  GuardiansSeriesOneOrnamentSeparatorUrl,
  GuardiansSeriesOrnamentTransaparentUrl,
} from '@/shared/constants/platform/url'
import { fadeIn, fadeOut, fonts, scaleDown, scaleUp } from '@/shared/styles'
import { GuardianType } from '@/types'

import { GuardianCharacter } from '../../character/characterAssets'

const useStyles = createUseStyles({
  ...fadeIn,
  ...fadeOut,
  ...scaleUp,
  ...scaleDown,
  hidden: {
    opacity: 0,
  },
})

export const DesktopGuardiansIllustration = () => {
  const navigate = useNavigate()

  const classes = useStyles()

  const [currentGuardian, setCurrentGuardian] = useState<GuardianType | null>(null)

  const onMouseOver = (guardian: GuardianType) => {
    setCurrentGuardian(guardian)
  }

  const onMouseLeave = () => {
    setCurrentGuardian(null)
  }

  const guardiansList = useMemo(
    () => [
      {
        guardian: GuardianType.Warrior,
        text: t('Warrior'),
        width: '29%',
        marginLeft: '0',
        zIndex: currentGuardian ? 11 : 1,
      },
      {
        guardian: GuardianType.Knight,
        text: t('Knight'),
        width: '32%',
        marginLeft: '-10%',
        zIndex: currentGuardian ? 12 : 2,
      },
      {
        guardian: GuardianType.King,
        text: t('King'),
        width: '34%',
        marginLeft: '-10%',
        zIndex: currentGuardian ? 11 : 1,
      },
      {
        guardian: GuardianType.Legend,
        text: t('Legend'),
        width: '35%',
        marginLeft: '-10%',
        zIndex: currentGuardian ? 12 : 2,
      },
    ],
    [currentGuardian],
  )

  const getCommonBoxProps = (guardian: GuardianType) =>
    ({
      h: 'full',
      width: 'auto',
      maxHeight: '646px',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      className: `guardian-wrapper-${guardian}`,
      _hover: {
        cursor: 'pointer',
      },
      onMouseOver: () => onMouseOver(guardian),
      onMouseLeave: () => onMouseLeave(),
    } as BoxProps)

  const getCommonImageProps = (guardian: GuardianType): ImageProps => ({
    w: 'full',
    height: 'full',
    zIndex: 1,
    className: currentGuardian ? (guardian === currentGuardian ? '' : classes.fadeOut) : '',
  })

  const getCommonRaycastProps = (guardian: GuardianType) =>
    ({
      position: 'absolute',
      width: '65%',
      height: '110%',
      bottom: 0,
      zIndex: 0,
      className: classNames({
        [classes.scaleInVerBottom]: guardian === currentGuardian,
        [classes.hidden]: guardian !== currentGuardian || !currentGuardian,
      }),
      alt: `Geyser Guardians - ${guardian}`,
    } as ImageProps)

  const getCommonGreyProps = (guardian: GuardianType) => {
    return {
      opacity: 0,
      position: 'absolute',
      height: 'full',
      width: 'full',
      objectFit: 'cover',
      bottom: 0,
      zIndex: 4,
      className: currentGuardian ? (guardian === currentGuardian ? '' : classes.fadeIn) : '',
    } as ImageProps
  }

  const getGuardianTextProps = (guardian: GuardianType) =>
    ({
      position: 'absolute',
      top: '-10%',
      pointerEvents: 'none',
      color: `guardians.${guardian}.text`,
      width: 'full',
      textAlign: 'center',
      fontFamily: fonts.cormorant,
      fontSize: { lg: '40px', xl: '48px', '3xl': '64px' },
      fontWeight: 'bold',
      textTransform: 'uppercase',
      opacity: 0,
      sx: {
        [`.guardian-wrapper-${guardian}:hover &`]: {
          opacity: 1,
          transition: 'opacity 0.3s ease-in-out',
        },
      },
    } as BodyProps)

  const handleClick = (guardian: GuardianType) => {
    navigate(getPath('guardiansCharacter', guardian))
  }

  return (
    <>
      <Box
        height="100%"
        width="100%"
        position="fixed"
        top="0"
        left="0"
        background="overlay.white.3"
        zIndex={10}
        pointerEvents="none"
        backdropFilter="blur(4px)"
        opacity={currentGuardian ? 1 : 0}
        transition="opacity 0.3s ease-in-out"
      />
      <VStack w="full" spacing={0}>
        <HStack w="full" h="full" overflow={'visible'} alignItems={'flex-end'} spacing={0} paddingTop="5%">
          {guardiansList.map((guardian) => {
            return (
              <Box
                key={guardian.guardian}
                {...getCommonBoxProps(guardian.guardian)}
                w={guardian.width}
                h="full"
                zIndex={guardian.zIndex}
                marginLeft={guardian.marginLeft}
                onClick={() => handleClick(guardian.guardian)}
              >
                <Image
                  {...getCommonRaycastProps(guardian.guardian)}
                  src={GuardianCharacter[guardian.guardian].raycast}
                  alt={`${guardian.guardian} guardian raycast image`}
                />
                <Body {...getGuardianTextProps(guardian.guardian)}>{guardian.text}</Body>
                <Image
                  {...getCommonGreyProps(guardian.guardian)}
                  src={GuardianCharacter[guardian.guardian].mainGrey}
                  alt={`${guardian.guardian} guardian main grey image`}
                />
                <Image
                  {...getCommonImageProps(guardian.guardian)}
                  src={GuardianCharacter[guardian.guardian].main}
                  alt={`${guardian.guardian} guardian main image`}
                />
              </Box>
            )
          })}
        </HStack>
        <Box position="relative" zIndex={13} marginTop="-40px">
          <Box
            height="100%"
            width="100%"
            position="absolute"
            left="0"
            top="0"
            background="overlay.white.3"
            zIndex={1}
            pointerEvents="none"
            backdropFilter="blur(4px)"
            opacity={currentGuardian ? 1 : 0}
            transition="opacity 0.3s ease-in-out"
            sx={{
              maskImage: `url(${GuardiansSeriesOrnamentTransaparentUrl})`,
              maskSize: '100% 100%',
              WebkitMaskImage: `url(${GuardiansSeriesOrnamentTransaparentUrl})`,
              WebkitMaskSize: '100% 100%',
            }}
          />
          <Image
            src={GuardiansSeriesOneOrnamentSeparatorUrl}
            alt={'Guardians series one ornament separator image'}
            position="relative"
            width="100%"
            objectFit="cover"
          />
        </Box>
      </VStack>
    </>
  )
}
