import { Box, HStack, Icon, IconProps, Tooltip } from '@chakra-ui/react'
import { PiSealCheckFill } from 'react-icons/pi'

import { lightModeColors } from '@/shared/styles/colors.ts'
import { UserForProfilePageFragment } from '@/types/index.ts'

type VerifiedBadgeProps = {
  user: Pick<UserForProfilePageFragment, 'complianceDetails'>
} & IconProps

export const VerifiedBadge = ({ user, ...props }: VerifiedBadgeProps) => {
  if (user.complianceDetails?.verifiedDetails?.identity?.verified) {
    return (
      <Tooltip label="This user has verified their identity with Geyser." placement="top">
        <HStack position="relative" alignItems="center" justifyContent="center">
          <Box position="absolute" w="50%" h="50%" bg={lightModeColors.utils.text} borderRadius="full" color="" />
          <Icon as={PiSealCheckFill} color="primary1.9" {...props} zIndex={1} />
        </HStack>
      </Tooltip>
    )
  }

  return null
}
