import { HStack, Image, Tooltip } from '@chakra-ui/react'
import { useMemo } from 'react'

import { guardianJewels } from '@/shared/constants/assets/guardianAssets.tsx'
import { useModal } from '@/shared/hooks'
import { GuardianType } from '@/types'

import { Body } from '../typography'
import { BodyProps } from '../typography/Body'
import { GuardianCardModal } from './GuardianCardModal.tsx'
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

  const guardianJewel = guardian ? guardianJewels[guardian] : undefined

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

      <GuardianCardModal guardianType={guardian} userName={`${children ? children : name}`} {...guardianModal} />
    </>
  )
}
