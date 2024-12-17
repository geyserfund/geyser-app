import { Avatar, AvatarProps, BoxProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { useMemo } from 'react'

import { GuardianType } from '@/types'

import { DefaultImage } from './DefaultImage'

type ProfileAvatarProps = {
  guardian?: GuardianType | null
  wrapperProps?: BoxProps
} & AvatarProps

export const ProfileAvatar = ({ guardian, wrapperProps, ...props }: ProfileAvatarProps) => {
  const backgroundColor = useMemo(() => {
    if (guardian) {
      return guardianGradient[guardian]
    }

    return 'neutral1.4'
  }, [guardian])

  return (
    <Box borderRadius="50%" padding="2px" background={backgroundColor} {...wrapperProps}>
      <Avatar borderRadius="50%" icon={<DefaultImage grey borderRadius="50%" {...props} />} {...props} />
    </Box>
  )
}

export const guardianGradient = {
  [GuardianType.Warrior]: 'linear-gradient(to bottom left, #E592A3, #E54666)',
  [GuardianType.Knight]: 'linear-gradient(to bottom left, #AA99EC, #6E56CF)',
  [GuardianType.King]: 'linear-gradient(to bottom left, #FFDC00, #9E6C00)',
  [GuardianType.Legend]: 'linear-gradient(to bottom left, #12A594, #83CDC1)',
}
