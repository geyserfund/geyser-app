import { Button, HStack, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
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
} & BodyProps

export const ProfileText = ({ guardian, size = 'md', children, ...rest }: ProfileTextProps) => {
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
        <Body
          textTransform={'capitalize'}
          background={backgroundColor}
          {...(backgroundColor && { backgroundClip: 'text', textFillColor: 'transparent' })}
          fontSize={size === 'sm' ? '14px' : size === 'md' ? '16px' : '20px'}
          bold
          {...rest}
        >
          {children || text}
        </Body>
        {guardianJewel && (
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
        )}
      </HStack>

      <Modal title={t('Geyser Guardian')} {...guardianModal} bodyProps={{ as: VStack, backgroundColor: 'utils.pbg' }}>
        <Image src={guardianAsset} height="400px" width="auto" objectFit="cover" />
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
