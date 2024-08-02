import { Button, HStack, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PropsWithChildren } from 'react'
import { PiArrowLeft } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { RightSideStickyLayout } from '@/modules/project/components/RightSideStickyLayout'
import { ProjectNavContainer } from '@/modules/project/navigation/ProjectNavContainer'

type FundingLayoutProps = {
  backPath?: string
  topNavBarRightContent?: React.ReactNode
  /** render component on the right side, only on desktop */
  sideContent?: React.ReactNode
  containerProps?: StackProps
  sideContainerProps?: StackProps
  noMobileSideContent?: boolean
}

export const FundingLayout = ({
  backPath,
  topNavBarRightContent,
  sideContent,
  containerProps,
  sideContainerProps,
  children,
  noMobileSideContent,
}: PropsWithChildren<FundingLayoutProps>) => {
  return (
    <VStack w="full">
      <ProjectNavContainer>
        <HStack>
          {backPath && (
            <Button
              as={Link}
              to={backPath}
              size={{ base: 'md', lg: 'lg' }}
              variant="ghost"
              colorScheme="neutral1"
              leftIcon={<PiArrowLeft />}
            >
              {t('Go back')}
            </Button>
          )}
        </HStack>
        {topNavBarRightContent}
      </ProjectNavContainer>
      <HStack w="full" alignItems="start" spacing={4}>
        <VStack flex={1} marginBottom={20} {...containerProps}>
          {children}
        </VStack>
        {sideContent && <RightSideStickyLayout {...sideContainerProps}>{sideContent}</RightSideStickyLayout>}
      </HStack>
    </VStack>
  )
}
