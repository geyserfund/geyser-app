import { Button, ButtonProps, HStack, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PropsWithChildren } from 'react'
import { PiArrowLeft } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { RightSideStickyLayout } from '@/modules/project/components/RightSideStickyLayout'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

type FundingLayoutProps = {
  showBack?: boolean
  containerProps?: StackProps
  /** render component on the right side of the top nav bar */
  topNavBarRightContent?: React.ReactNode
  /** render component on the right side, only on desktop */
  sideContent?: React.ReactNode
  sideContainerProps?: StackProps
  /** render component on the bottom, only on mobile */
  bottomContent?: React.ReactNode
  bottomContainerProps?: StackProps
  /** render component on the top, only on desktop */
  backButtonProps?: ButtonProps
}

export const FundingLayout = ({
  showBack = true,
  topNavBarRightContent,
  sideContent,
  containerProps,
  sideContainerProps,
  bottomContent,
  bottomContainerProps,
  backButtonProps,
  children,
}: PropsWithChildren<FundingLayoutProps>) => {
  const navigate = useNavigate()
  return (
    <VStack w="full">
      <TopNavContainerBar>
        <HStack>
          {showBack && (
            <Button
              onClick={() => navigate(-1)}
              size="lg"
              variant="ghost"
              colorScheme="neutral1"
              leftIcon={<PiArrowLeft />}
              {...backButtonProps}
            >
              {t('Go back')}
            </Button>
          )}
        </HStack>
        {topNavBarRightContent}
      </TopNavContainerBar>
      <HStack h="full" w="full" alignItems="start" spacing={dimensions.project.rightSideNav.gap}>
        <VStack h="full" maxWidth="full" flex={1} paddingBottom={{ base: 72, lg: 10 }} {...containerProps}>
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
          paddingBottom={6}
          zIndex={3}
          {...bottomContainerProps}
        >
          {bottomContent}
        </HStack>
      )}
    </VStack>
  )
}
