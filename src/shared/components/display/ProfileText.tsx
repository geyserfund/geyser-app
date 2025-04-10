import { Button, HStack, Image, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { Trans } from 'react-i18next'
import Tilt from 'react-parallax-tilt'
import { Link } from 'react-router-dom'

import {
  getPath,
  KingJewelUrl,
  KingNostrCardUrl,
  KnightJewelUrl,
  KnightNostrCardUrl,
  LegendJewelUrl,
  LegendNostrCardUrl,
  WarriorJewelUrl,
  WarriorNostrCardUrl,
} from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { GradientBorder } from '@/shared/molecules/GradientBorder'
import { GuardiansButtonBackgroundGradient, GuardiansButtonBackgroundGradientBright } from '@/shared/styles/custom'
import { GuardianType } from '@/types'

import { Modal } from '../layouts'
import { Body } from '../typography'
import { BodyProps } from '../typography/Body'
import { guardianGradient } from './ProfileAvatar'

type ProfileTextProps = {
  guardian?: GuardianType | null
  size?: 'sm' | 'md' | 'lg'
  name?: string
} & BodyProps

export const ProfileText = ({ guardian, size = 'md', name, children, ...rest }: ProfileTextProps) => {
  const guardianModal = useModal()

  const backgroundColor = useMemo(() => {
    if (guardian) {
      return guardianGradient[guardian]
    }

    return undefined
  }, [guardian])

  const text = useMemo(() => {
    if (guardian) {
      return guardianText[guardian]
    }

    return undefined
  }, [guardian])

  const guardianJewel = guardian ? guardianJewels[guardian] : undefined

  const guardianAsset = guardian ? guardianNostrCards[guardian] : undefined

  return (
    <>
      <HStack spacing={1} alignItems={'center'}>
        {children && (
          <Body
            textTransform={'capitalize'}
            background={backgroundColor}
            {...(backgroundColor && { backgroundClip: 'text', textFillColor: 'transparent' })}
            fontSize={size || '20px'}
            bold
            {...rest}
          >
            {children}
          </Body>
        )}
        {guardianJewel && (
          <Tooltip label={`${children ? children : name} is a ${guardian}`} placement="top">
            <Image
              src={guardianJewel}
              alt={`${guardian}-jewel`}
              width={size === 'sm' ? '20px' : size === 'md' ? '24px' : '28px'}
              _hover={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                guardianModal.onOpen()
              }}
            />
          </Tooltip>
        )}
      </HStack>

      <Modal title={`${text} Nostr Card`} {...guardianModal} bodyProps={{ as: VStack, backgroundColor: 'utils.pbg' }}>
        <Body>
          <Trans
            i18nKey={
              '<0>{{user}}</0> has chosen to become a Geyser Guardian to support our platform and help push Bitcoin adoption.'
            }
            values={{ user: children }}
          >
            <Body as="span" medium>
              {'{{user}}'}
            </Body>
            {` has chosen to become a Geyser Guardian to support our platform and help push Bitcoin adoption.`}
          </Trans>
        </Body>
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
          <Image src={guardianAsset} height="400px" width="auto" objectFit="cover" />
        </Tilt>
        <GradientBorder enable gradientColor={GuardiansButtonBackgroundGradientBright}>
          <Button
            w="full"
            size="lg"
            variant="outline"
            borderWidth="0px"
            as={Link}
            to={getPath('guardians')}
            background={GuardiansButtonBackgroundGradient}
            _hover={{}}
            _active={{}}
            _focus={{}}
          >
            {t('Explore Guardians')}
          </Button>
        </GradientBorder>
      </Modal>
    </>
  )
}

const guardianNostrCards = {
  [GuardianType.Warrior]: WarriorNostrCardUrl,
  [GuardianType.Knight]: KnightNostrCardUrl,
  [GuardianType.King]: KingNostrCardUrl,
  [GuardianType.Legend]: LegendNostrCardUrl,
}

const guardianJewels = {
  [GuardianType.Warrior]: WarriorJewelUrl,
  [GuardianType.Knight]: KnightJewelUrl,
  [GuardianType.King]: KingJewelUrl,
  [GuardianType.Legend]: LegendJewelUrl,
}

const guardianText = {
  [GuardianType.Warrior]: 'Warrior',
  [GuardianType.Knight]: 'Knight',
  [GuardianType.King]: 'King',
  [GuardianType.Legend]: 'Legend',
}
