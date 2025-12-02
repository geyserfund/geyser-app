import { HStack, Icon, SkeletonCircle, SkeletonText, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiLockSimpleFill } from 'react-icons/pi'

import { projectOwnerAtom } from '@/modules/project/state/projectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body } from '@/shared/components/typography/Body.tsx'
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

export const ContributionSummary = ({ isWidget, ...props }: ContributionSummaryProps) => {
  const projectOwner = useAtomValue(projectOwnerAtom)

  const isVerified = Boolean(projectOwner?.user?.complianceDetails?.verifiedDetails?.identity?.verified)
  const paymentMethods = [BitcoinLightingPaymentImageUrl]

  if (isVerified) {
    paymentMethods.push(VisaPaymentImageUrl)
    paymentMethods.push(MasterCardPaymentImageUrl)
  }

  return (
    <CardLayout w="100%" p={6} spacing={6} minHeight="fit-content" flexShrink={0} {...props}>
      <ProjectBalanceDisplay />

      <VStack w="full">
        <ContributeButton w="full" isWidget={isWidget} paymentMethods={paymentMethods} />
        <HStack spacing={1} alignItems="center">
          <Icon as={PiLockSimpleFill} fontSize="16px" color="primary1.9" />
          <Body size="sm" light textAlign="center">
            {paymentMethods.length > 1 ? t('Secure Bitcoin & Credit Card payments') : t('Secure Bitcoin payments')}
          </Body>
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
