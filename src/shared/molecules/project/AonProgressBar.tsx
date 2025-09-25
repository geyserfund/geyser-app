import { HStack, StackProps } from '@chakra-ui/react'

import { ProgressBar, ProgressBarProps } from '@/components/ui/ProgressBar.tsx'
import { getAonGoalPercentage } from '@/shared/utils/project/getAonData.ts'
import { Project } from '@/types/index.ts'

export const AonProgressBar = ({
  project,
  wrapperProps,
  ...rest
}: {
  project: Pick<Project, 'aonGoalInSats' | 'balance'>
  wrapperProps?: StackProps
} & ProgressBarProps) => {
  const percentage = getAonGoalPercentage(project)
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
