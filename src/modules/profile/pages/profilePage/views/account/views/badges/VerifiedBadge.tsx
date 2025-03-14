import { Icon, IconProps, Tooltip } from '@chakra-ui/react'
import { PiSealCheckFill } from 'react-icons/pi'

import { UserForProfilePageFragment } from '@/types/index.ts'

type VerifiedBadgeProps = {
  user: Pick<UserForProfilePageFragment, 'complianceDetails'>
} & IconProps

export const VerifiedBadge = ({ user, ...props }: VerifiedBadgeProps) => {
  if (user.complianceDetails?.verifiedDetails?.identity?.verified) {
    return (
      <Tooltip label="This user has verified their identity with Geyser.">
        <Icon as={PiSealCheckFill} color="primary1.9" {...props} />
      </Tooltip>
    )
  }

  return null
}
