import { HStack, SkeletonCircle, SkeletonText, StackProps, VStack } from '@chakra-ui/react'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { ProjectMatchingPublicBadge } from '@/modules/project/matching/components/ProjectMatchingPublicBadge.tsx'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import {
  BitcoinLightingPaymentImageUrl,
  MasterCardPaymentImageUrl,
  VisaPaymentImageUrl,
} from '@/shared/constants/platform/url.ts'
import { ProjectPaymentMethodsHint } from '@/shared/molecules/project/ProjectPaymentMethodsHint.tsx'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'

import { ContributeButton } from '../../components'
import { ProjectBalanceDisplay } from './components/ProjectBalanceDisplay'

type ContributionSummaryProps = StackProps & {
  isWidget?: boolean
}

export const ContributionSummary = ({ isWidget, ...props }: ContributionSummaryProps) => {
  const { isAon, project } = useProjectAtom()

  const paymentMethods = [BitcoinLightingPaymentImageUrl]

  if (!isAon) {
    paymentMethods.push(VisaPaymentImageUrl)
    paymentMethods.push(MasterCardPaymentImageUrl)
  }

  const { isFundingDisabled } = useProjectToolkit(project)

  return (
    <VStack
      w="100%"
      spacing={0}
      minHeight="fit-content"
      flexShrink={0}
      backgroundColor="utils.pbg"
      border="0.5px solid"
      borderColor="neutral1.6"
      borderRadius="card"
      boxShadow="card"
      overflow="hidden"
      {...props}
    >
      {project.activeMatching && (
        <ProjectMatchingPublicBadge matching={project.activeMatching} showTooltip variant="summaryBanner" />
      )}

      <VStack w="full" spacing={5} px={6} pt={5} pb={5}>
        <ProjectBalanceDisplay />

        {!isFundingDisabled() && (
          <VStack w="full" spacing={4}>
            <ContributeButton w="full" isWidget={isWidget} paymentMethods={paymentMethods} />
            <ProjectPaymentMethodsHint justifyContent="center" />
          </VStack>
        )}
      </VStack>
    </VStack>
  )
}

export const ContributionSummarySkeleton = (props: StackProps) => {
  return (
    <VStack w="100%" {...props}>
      <HStack w="100%" padding={3} justifyContent="start">
        <SkeletonCircle height="116px" width="116px" />
        <VStack flex="1" spacing={'20px'} width="100%" px={2}>
          <SkeletonLayout height="40px" width="180px" />
          <SkeletonText noOfLines={2} w="100%" />
        </VStack>
      </HStack>

      <VStack w="full" spacing="10px" pb={3} px={3}>
        <SkeletonLayout height="40px" width="100%" />
        <SkeletonLayout height="40px" width="100%" />
      </VStack>
    </VStack>
  )
}
