import { HStack, StackProps } from '@chakra-ui/react'

import { ProgressBar, ProgressBarProps } from '@/components/ui/ProgressBar.tsx'
import { ProjectForLandingPageFragment } from '@/types/index.ts'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit'

export const AonProgressBar = ({
  project,
  wrapperProps,
  ...rest
}: {
  project: ProjectForLandingPageFragment
  wrapperProps?: StackProps
} & ProgressBarProps) => {
  const { getAonGoalPercentage } = useProjectToolkit(project)
  const percentage = getAonGoalPercentage()

  if (!project) {
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
