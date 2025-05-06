import { HStack, Image, SkeletonCircle, SkeletonText, StackProps, VStack } from '@chakra-ui/react'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import {
  BitcoinLightingPaymentImageUrl,
  MasterCardPaymentImageUrl,
  VisaPaymentImageUrl,
} from '@/shared/constants/platform/url.ts'

import { ContributeButton } from '../../components'
import { ProjectBalanceDisplay } from './components/ProjectBalanceDisplay'

type ContributionSummaryProps = StackProps & {
  isWidget?: boolean
}

const paymentMethods = [BitcoinLightingPaymentImageUrl, VisaPaymentImageUrl, MasterCardPaymentImageUrl]

export const ContributionSummary = ({ isWidget, ...props }: ContributionSummaryProps) => {
  return (
    <CardLayout w="100%" p={6} spacing={6} minHeight="fit-content" flexShrink={0} {...props}>
      <ProjectBalanceDisplay />

      <VStack w="full">
        <HStack w="full">
          <ContributeButton flex="1" isWidget={isWidget} />
        </HStack>
        <HStack>
          {paymentMethods.map((method) => (
            <Image src={method} key={method} maxHeight="14px" />
          ))}
        </HStack>
      </VStack>
    </CardLayout>
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
