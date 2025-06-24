import { Button, ButtonProps, Icon } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PropsWithChildren } from 'react'
import { PiArrowLeft, PiArrowRight, PiEye } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { H1 } from '@/shared/components/typography/Heading.tsx'

type ProjectCreationLayoutProps = PropsWithChildren<{
  title: string
  continueButtonProps?: ButtonProps
  backButtonProps?: ButtonProps
}>

export const ProjectCreationLayout = ({
  children,
  title,
  continueButtonProps,
  backButtonProps,
}: ProjectCreationLayoutProps) => {
  const navigate = useNavigate()
  return (
    <VStack flex={1} gap={8} paddingBottom={20} position="relative">
      <HStack w="full" justifyContent="space-between">
        <H1 fontSize="2xl" medium>
          {title}
        </H1>
        <HStack>
          <Button variant="ghost" leftIcon={<Icon as={PiEye} />}>
            {t('View preview')}
          </Button>
        </HStack>
      </HStack>
      {children}
      <HStack w="full" justifyContent="space-between" paddingTop={8}>
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
