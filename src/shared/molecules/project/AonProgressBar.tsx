import { HStack, StackProps } from '@chakra-ui/react'

import { ProgressBar, ProgressBarProps } from '@/components/ui/ProgressBar.tsx'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'
import type { ProjectForLandingPageFragment } from '@/types/index.ts'

export const AonProgressBar = ({
  project,
  percentage,
  wrapperProps,
  ...rest
}: {
  project:
    | Pick<ProjectForLandingPageFragment, 'aonGoal' | 'balance' | 'balanceUsdCent' | 'fundingStrategy' | 'status'>
    | { fundingSummary: Pick<ProjectForLandingPageFragment['fundingSummary'], 'percentageFunded'> }
  percentage?: number | null
  wrapperProps?: StackProps
} & ProgressBarProps) => {
  const hasFundingSummary = 'fundingSummary' in project
  const projectForToolkit = hasFundingSummary
    ? ({ balance: 0, balanceUsdCent: 0, fundingStrategy: null, status: null, aonGoal: null } as Pick<
        ProjectForLandingPageFragment,
        'aonGoal' | 'balance' | 'balanceUsdCent' | 'fundingStrategy' | 'status'
      >)
    : project
  const { getAonGoalPercentage } = useProjectToolkit(projectForToolkit)
  const calculatedPercentage = hasFundingSummary ? project.fundingSummary.percentageFunded : getAonGoalPercentage()

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
        value={percentage ?? calculatedPercentage}
        height={{ base: '10px', lg: '14px' }}
        borderRadius="20px"
        overflow="hidden"
        trackColor="neutral1.2"
        {...rest}
      />
    </HStack>
  )
}
