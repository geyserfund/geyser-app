import { Box, HStack, SkeletonCircle, SkeletonText, StackProps, VStack } from '@chakra-ui/react'

import { CardLayout, SkeletonLayout } from '../../../../../../../../shared/components/layouts'
import { ContributeButton } from '../../components'
import { ProjectBalanceDisplay } from './components/ProjectBalanceDisplay'
import { useState } from 'react'
import { Body } from '@/shared/components/typography'
import { ProjectState } from '@/modules/project/state/projectAtom'
import { encodeLNURL } from '@/utils/lnUrl'
import { getAppEndPoint } from '@/config/domain'
import { QRCodeComponent } from '@/modules/project/pages1/projectFunding/views/fundingPayment/components/QRCodeComponent'

export const ContributionSummary = (props: StackProps & { project: ProjectState }) => {
  const [isLive, setIsLive] = useState(false)
  const endPoint = getAppEndPoint();
  const lnurlPayUrl = `lnurl:${encodeLNURL(`${endPoint}/lnurl/pay?projectId=${props.project.id}`)}`

  return (
    <CardLayout w="100%" p={6} spacing={6} position="relative" {...props}>
      <HStack position="absolute" top={2} right={2} cursor="pointer" onClick={() => setIsLive(!isLive)}>
        {isLive && (
          <Box w="8px" h="8px" borderRadius="full" bg="green.400" 
            animation="pulse 2s cubic-bezier(.4,0,.6,1) infinite"
            sx={{
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.5 }
              }
            }}
          />
        )}
        <Body size="sm" color={isLive ? "green.400" : "gray.500"}>
          {isLive ? 'Live' : 'Go live'}
        </Body>
      </HStack>

      {isLive ? (
        <VStack w="full" spacing={4} marginTop={4}>
          <QRCodeComponent value={lnurlPayUrl} onClick={() => {}} isColored={false} />
          <Body size="sm" color="gray.500">Scan to contribute</Body>
        </VStack>
      ) : (
        <>
          <ProjectBalanceDisplay />
          <HStack w="full">
            <ContributeButton flex="1" />
          </HStack>
        </>
      )}
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
