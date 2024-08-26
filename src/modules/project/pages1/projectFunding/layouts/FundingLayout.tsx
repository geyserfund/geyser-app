import { Button, HStack, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PropsWithChildren } from 'react'
import { PiArrowLeft } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { ProjectNavContainer } from '@/modules/navigation/components/topNav'
import { RightSideStickyLayout } from '@/modules/project/components/RightSideStickyLayout'
import { dimensions } from '@/shared/constants'

type FundingLayoutProps = {
  backPath?: string
  containerProps?: StackProps
  /** render component on the right side of the top nav bar */
  topNavBarRightContent?: React.ReactNode
  /** render component on the right side, only on desktop */
  sideContent?: React.ReactNode
  sideContainerProps?: StackProps
  /** render component on the bottom, only on mobile */
  bottomContent?: React.ReactNode
  bottomContainerProps?: StackProps
}

export const FundingLayout = ({
  backPath,
  topNavBarRightContent,
  sideContent,
  containerProps,
  sideContainerProps,
  bottomContent,
  bottomContainerProps,
  children,
}: PropsWithChildren<FundingLayoutProps>) => {
  return (
    <VStack w="full">
      <ProjectNavContainer>
        <HStack>
          {backPath !== undefined && (
            <Button as={Link} to={backPath} size="lg" variant="ghost" colorScheme="neutral1" leftIcon={<PiArrowLeft />}>
              {t('Go back')}
            </Button>
          )}
        </HStack>
        {topNavBarRightContent}
      </ProjectNavContainer>
      <HStack h="full" w="full" alignItems="start" spacing={dimensions.project.rightSideNav.gap}>
        <VStack h="full" maxWidth="full" flex={1} paddingBottom={{ base: 40, lg: 10 }} {...containerProps}>
          {children}
        </VStack>
        {sideContent && <RightSideStickyLayout {...sideContainerProps}>{sideContent}</RightSideStickyLayout>}
      </HStack>
      {bottomContent && (
        <HStack
          w="full"
          position="fixed"
          bottom={0}
          display={{ base: 'flex', lg: 'none' }}
          borderTop="1px solid"
          borderColor="neutral1.6"
          backgroundColor="utils.pbg"
          padding={3}
          paddingBottom={5}
          {...bottomContainerProps}
        >
          {bottomContent}
        </HStack>
      )}
    </VStack>
  )
}
