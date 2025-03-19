import { Box, HStack, Icon, IconProps, Tooltip } from '@chakra-ui/react'
import { PiSealCheckFill } from 'react-icons/pi'

import { lightModeColors } from '@/shared/styles/colors.ts'
import { UserForProfilePageFragment } from '@/types/index.ts'

type UserVerifiedBadgeProps = {
  user: Pick<UserForProfilePageFragment, 'complianceDetails'>
} & IconProps

export const UserVerifiedBadge = ({ user, ...props }: UserVerifiedBadgeProps) => {
  if (user.complianceDetails?.verifiedDetails?.identity?.verified) {
    return (
      <Tooltip label="This user has verified their identity with Geyser." placement="top">
        <VerifiedBadge {...props} />
      </Tooltip>
    )
  }

  return null
}

export const VerifiedBadge = ({ ...props }: IconProps) => {
  return (
    <HStack position="relative" alignItems="center" justifyContent="center">
      <Box position="absolute" w="50%" h="50%" bg={lightModeColors.utils.text} borderRadius="full" color="" />
      <Icon as={PiSealCheckFill} color="primary1.9" {...props} zIndex={1} />
    </HStack>
  )
}
