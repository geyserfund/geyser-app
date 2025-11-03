import { HStack, StackProps } from '@chakra-ui/react'

import { ProgressBar, ProgressBarProps } from '@/components/ui/ProgressBar.tsx'
import { getAonGoalPercentage } from '@/shared/utils/project/getAonData.ts'
import { ProjectAonGoalForLandingPageFragment } from '@/types/index.ts'

export const AonProgressBar = ({
  aonGoal,
  wrapperProps,
  ...rest
}: {
  aonGoal?: ProjectAonGoalForLandingPageFragment | null
  wrapperProps?: StackProps
} & ProgressBarProps) => {
  const percentage = getAonGoalPercentage(aonGoal)

  if (!aonGoal) {
    return null
  }

  return (
    <HStack
      w="full"
      background="neutral1.2"
      borderRadius="20px"
      border="2px solid"
      borderColor="neutral1.2"
      {...wrapperProps}
    >
      <ProgressBar
        w="full"
        value={percentage}
        height={{ base: '10px', lg: '14px' }}
        borderRadius="20px"
        overflow="hidden"
        trackColor="neutral1.2"
        {...rest}
      />
    </HStack>
  )
}
