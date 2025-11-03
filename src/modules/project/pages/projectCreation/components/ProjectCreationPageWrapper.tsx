import { Button, ButtonProps, Fade, Icon, IconButton, StackProps, useBreakpointValue } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PropsWithChildren, useId } from 'react'
import { PiArrowLeft, PiArrowRight, PiEye, PiListBullets } from 'react-icons/pi'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { H1 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'

type ProjectCreationPageWrapperProps = PropsWithChildren<{
  title: string
  continueButtonProps?: { label?: string } & ButtonProps
  backButtonProps?: { label?: string } & ButtonProps
  removeBottomContainer?: boolean
  buttonContainerProps?: StackProps
  hideContinueButton?: boolean
  hideBackButton?: boolean
}> &
  StackProps

export const ProjectCreationPageWrapper = ({
  children,
  title,
  continueButtonProps,
  backButtonProps,
  removeBottomContainer,
  buttonContainerProps,
  hideContinueButton = false,
  hideBackButton = false,
  ...rest
}: ProjectCreationPageWrapperProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { project } = useProjectAtom()

  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()

  const id = useId()

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
        <HStack spacing={2}>
          {isMobile && (
            <IconButton
              aria-label="creation-menu"
              variant="ghost"
              as={Link}
              size="sm"
              to={getPath('launchProject', params.projectId || '')}
              icon={<Icon as={PiListBullets} fontSize={28} />}
            />
          )}
          <Fade in={true}>
            <H1 fontSize="2xl" medium id={id}>
              {title}
            </H1>
          </Fade>
        </HStack>

        <HStack>
          {project?.id && project.name && (
            <Button
              as={Link}
              to={getPath('projectDraft', project?.name)}
              variant="ghost"
              leftIcon={<Icon as={PiEye} />}
            >
              {t('View preview')}
            </Button>
          )}
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
        bg="utils.bg"
        alignItems="flex-end"
        flex={1}
        {...buttonContainerProps}
      >
        {!hideBackButton && (
          <Button
            width="200px"
            size="lg"
            variant="soft"
            colorScheme="neutral1"
            onClick={() => navigate(-1)}
            leftIcon={<Icon as={PiArrowLeft} />}
            {...backButtonProps}
          >
            {backButtonProps?.label || t('Back')}
          </Button>
        )}
        {!hideContinueButton && (
          <Button
            width="200px"
            size="lg"
            variant="soft"
            colorScheme="primary1"
            rightIcon={<Icon as={PiArrowRight} />}
            {...continueButtonProps}
          >
            {continueButtonProps?.label || t('Continue')}
          </Button>
        )}
      </HStack>
    </VStack>
  )
}
