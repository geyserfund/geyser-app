import { HStack, Image } from '@chakra-ui/react'
import { useMemo } from 'react'

import { KingJewelUrl, KnightJewelUrl, LegendJewelUrl, WarriorJewelUrl } from '@/shared/constants'
import { GuardianType } from '@/types'

import { Body } from '../typography'
import { BodyProps } from '../typography/Body'
import { guardianGradient } from './ProfileAvatar'

type ProfileTextProps = {
  guardian?: GuardianType | null
  size?: 'sm' | 'md' | 'lg'
} & BodyProps

export const ProfileText = ({ guardian, size = 'md', children, ...rest }: ProfileTextProps) => {
  const backgroundColor = useMemo(() => {
    if (guardian) {
      return guardianGradient[guardian]
    }

    return undefined
  }, [guardian])

  const guardianJewel = guardian ? guardianJewels[guardian] : undefined

  return (
    <HStack spacing={1}>
      <Body
        textTransform={'capitalize'}
        {...rest}
        background={backgroundColor}
        {...(backgroundColor && { backgroundClip: 'text', textFillColor: 'transparent' })}
        fontSize={size === 'sm' ? '14px' : size === 'md' ? '16px' : '20px'}
        bold
      >
        {children || guardian}
      </Body>
      {guardianJewel && (
        <Image
          src={guardianJewel}
          alt={`${guardian}-jewel`}
          width={size === 'sm' ? '20px' : size === 'md' ? '24px' : '28px'}
        />
      )}
    </HStack>
  )
}

const guardianJewels = {
  [GuardianType.Warrior]: WarriorJewelUrl,
  [GuardianType.Knight]: KnightJewelUrl,
  [GuardianType.King]: KingJewelUrl,
  [GuardianType.Legend]: LegendJewelUrl,
}
