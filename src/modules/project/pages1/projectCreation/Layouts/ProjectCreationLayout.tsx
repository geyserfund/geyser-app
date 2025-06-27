import { Button, ButtonProps, Icon, StackProps } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PropsWithChildren } from 'react'
import { PiArrowLeft, PiArrowRight, PiEye } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { H1 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

type ProjectCreationLayoutProps = PropsWithChildren<{
  title: string
  continueButtonProps?: ButtonProps
  backButtonProps?: ButtonProps
  removeBottomContainer?: boolean
  buttonContainerProps?: StackProps
}> &
  StackProps

export const ProjectCreationLayout = ({
  children,
  title,
  continueButtonProps,
  backButtonProps,
  removeBottomContainer,
  buttonContainerProps,
  ...rest
}: ProjectCreationLayoutProps) => {
  const navigate = useNavigate()
  return (
    <VStack
      flex={1}
      gap={8}
      position="relative"
      maxWidth={{ base: '100%', lg: '652px' }}
      minHeight={{
        base: `calc(100vh - ${dimensions.topNavBar.mobile.height}px)`,
        lg: `calc(100vh - ${dimensions.topNavBar.desktop.height}px)`,
      }}
      {...rest}
    >
      <HStack w="full" justifyContent="space-between">
        <VStack>
          <H1 fontSize="2xl" medium>
            {title}
          </H1>
        </VStack>

        <HStack>
          <Button variant="ghost" leftIcon={<Icon as={PiEye} />}>
            {t('View preview')}
          </Button>
        </HStack>
      </HStack>
      {children}
      <HStack
        w="full"
        justifyContent="space-between"
        paddingTop={4}
        paddingBottom={20}
        display={removeBottomContainer ? 'none' : 'flex'}
        //  paddingY={8} zIndex={1} position="sticky" bottom={0}
        bg="white"
        alignItems="flex-end"
        flex={1}
        {...buttonContainerProps}
      >
        <Button
          width="200px"
          size="lg"
          variant="soft"
          colorScheme="neutral1"
          onClick={() => navigate(-1)}
          leftIcon={<Icon as={PiArrowLeft} />}
          {...backButtonProps}
        >
          {t('Back')}
        </Button>
        <Button
          width="200px"
          size="lg"
          variant="soft"
          colorScheme="primary1"
          rightIcon={<Icon as={PiArrowRight} />}
          {...continueButtonProps}
        >
          {t('Continue')}
        </Button>
      </HStack>
    </VStack>
  )
}
