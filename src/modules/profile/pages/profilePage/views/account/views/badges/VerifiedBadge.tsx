import { Box, HStack, Icon, IconProps, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'
import { PiSealCheckFill } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { lightModeColors } from '@/shared/styles/colors.ts'
import { UserForProfilePageFragment } from '@/types/index.ts'
import { useMobileMode } from '@/utils/index.ts'

type UserVerifiedBadgeProps = {
  user: Pick<UserForProfilePageFragment, 'complianceDetails'>
} & IconProps

export const UserVerifiedBadge = ({ user, ...props }: UserVerifiedBadgeProps) => {
  const isMobile = useMobileMode()
  if (user.complianceDetails?.verifiedDetails?.identity?.verified) {
    return (
      <Popover trigger={isMobile ? 'click' : 'hover'} placement="top">
        <PopoverTrigger>
          <VerifiedBadge {...props} />
        </PopoverTrigger>
        <PopoverContent paddingX={1} paddingY={0.5} background="neutral1.12">
          <Body color="neutral1.1" size="sm" medium>
            This user has verified their identity with Geyser.
          </Body>
        </PopoverContent>
      </Popover>
    )
  }

  return null
}

export const VerifiedBadge = React.forwardRef<HTMLDivElement, IconProps>(({ ...props }, ref) => {
  return (
    <HStack position="relative" alignItems="center" justifyContent="center" ref={ref}>
      <Box position="absolute" w="50%" h="50%" bg={lightModeColors.utils.text} borderRadius="full" color="" />
      <Icon as={PiSealCheckFill} color="primary1.9" {...props} zIndex={1} />
    </HStack>
  )
})

VerifiedBadge.displayName = 'VerifiedBadge'
