import { Button, Collapse, HStack, Image, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import TitleWithProgressBar from '@/components/molecules/TitleWithProgressBar.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/config/routerPaths.ts'
import { dimensions, LaunchNowIllustrationUrl, LaunchPadIllustrationUrl } from '@/shared/constants/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { useProjectPreLaunchMutation } from '@/types/index.ts'
import { useMobileMode, useNotification } from '@/utils/index.ts'

import { FormContinueButton } from '../components/FormContinueButton.tsx'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout.tsx'
import { useLocationMandatoryRedirect } from '../hooks/useLocationMandatoryRedirect.tsx'

enum ProjectCreationStrategy {
  GEYSER_LAUNCHPAD = 'geyser_launchpad',
  LAUNCH_NOW = 'launch_now',
  SAVE_AS_DRAFT = 'save_as_draft',
}

export const PROJECT_LAUNCH_PAYMENT_PROJECT_NAME = 'launch'

export const ProjectCreateStrategy = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const toast = useNotification()
  useLocationMandatoryRedirect()

  const { project } = useProjectAtom()

  const [strategy, setStrategy] = useState<ProjectCreationStrategy>(ProjectCreationStrategy.GEYSER_LAUNCHPAD)

  const [projectPreLaunch, { loading: isProjectPreLaunchLoading }] = useProjectPreLaunchMutation({
    variables: {
      input: {
        projectId: project?.id,
      },
    },
    onCompleted() {
      navigate(getPath('projectLaunchPreLaunch', project?.name))
    },
    onError(error) {
      toast.error({
        title: t('Failed to pre-launch project'),
        description: error.message,
      })
    },
  })

  const handleNext = () => {
    if (strategy === ProjectCreationStrategy.SAVE_AS_DRAFT) {
      navigate(`${getPath('projectLaunchDraft', project.name)}`)
      return
    }

    if (strategy === ProjectCreationStrategy.GEYSER_LAUNCHPAD) {
      projectPreLaunch()
      return
    }

    navigate(getPath('fundingLaunchPayment', PROJECT_LAUNCH_PAYMENT_PROJECT_NAME), {
      state: {
        launchProjectId: project?.id,
      },
    })
  }

  const handleBack = () => {
    if (!project) {
      return navigate(-1)
    }

    navigate(getPath('launchProjectRewards', project?.id))
  }

  const isLaunchPad = strategy === ProjectCreationStrategy.GEYSER_LAUNCHPAD
  const isLaunchNow = strategy === ProjectCreationStrategy.LAUNCH_NOW
  const isSaveAsDraft = strategy === ProjectCreationStrategy.SAVE_AS_DRAFT

  return (
    <ProjectCreateLayout
      title={
        <TitleWithProgressBar title={t('Launch strategy')} subtitle={t('Choose how to launch')} index={5} length={5} />
      }
      continueButton={<FormContinueButton flexGrow={1} onClick={handleNext} isLoading={isProjectPreLaunchLoading} />}
      onBackClick={handleBack}
      maxW={dimensions.maxWidth}
      height="100%"
    >
      <VStack w="full" spacing={{ base: 4, lg: 6 }}>
        <HStack w="full" flexDirection={{ base: 'column', lg: 'row' }} spacing={{ base: 4, lg: 6 }}>
          <ProjectCreateStrategyCard
            isSelected={isLaunchPad}
            onClick={() => setStrategy(ProjectCreationStrategy.GEYSER_LAUNCHPAD)}
            image={LaunchPadIllustrationUrl}
            title={t('Geyser Launchpad')}
            subtitle={t('Test your idea and launch for free by gaining 21 followers within 30 days')}
            why={t(
              "Launchpad is your sandbox to explore your idea publicly before going live. Get early feedback, rally support, and validate your project's potential. It's your chance to build early momentum and launch with a boom. 🚀",
            )}
            howItWorks={t(
              "You'll need to gather 21 followers within 30 days, the first is always yourself, so you only need just 20 more. Once you reach the goal, you can officially launch and start receiving contributions from around the world.",
            )}
          />
          <ProjectCreateStrategyCard
            isSelected={isLaunchNow}
            onClick={() => setStrategy(ProjectCreationStrategy.LAUNCH_NOW)}
            image={LaunchNowIllustrationUrl}
            title={t('Launch Now')}
            subtitle={t('Pay $21 to go live and start receiving contributions right away')}
            why={t(
              "This small fee is a sign of commitment. It shows that you're serious about your project and ready to share it with the world. That means you can begin receiving support from contributors immediately.",
            )}
            howItWorks={t(
              'Pay $21 in Bitcoin or Fiat to launch your project. It helps us keep Geyser sustainable. Additionally, project gets mentioned in our newsletter with over 2k subscribers to help you get started.',
            )}
          />
        </HStack>
        <CardLayout
          w="full"
          hover
          spacing={0}
          padding={4}
          borderColor={isSaveAsDraft ? 'primary1.9' : 'neutral1.6'}
          outline={isSaveAsDraft ? '2px solid' : 'none'}
          outlineColor={isSaveAsDraft ? 'primary1.9' : 'transparent'}
          onClick={() => setStrategy(ProjectCreationStrategy.SAVE_AS_DRAFT)}
          _hover={{
            borderColor: isSaveAsDraft ? 'primary1.9' : 'neutral1.9',
            cursor: 'pointer',
          }}
        >
          <Body size="xl" bold>
            {t('Save Project as Draft')}
          </Body>
          <Body size="md" light>
            {t('Decide later how to launch, and keep your project in draft')}
          </Body>
        </CardLayout>
      </VStack>
    </ProjectCreateLayout>
  )
}

type ProjectCreateStrategyCardProps = {
  image: string
  title: string
  subtitle: string
  why: string
  howItWorks: string
  isSelected?: boolean
} & CardLayoutProps

export const ProjectCreateStrategyCard = ({
  image,
  title,
  subtitle,
  why,
  howItWorks,
  isSelected,
  ...props
}: ProjectCreateStrategyCardProps) => {
  const { isOpen, onToggle } = useDisclosure()
  const isMobile = useMobileMode()

  return (
    <CardLayout
      width={isMobile ? 'full' : 'auto'}
      hover
      {...props}
      spacing={4}
      borderColor={isSelected ? 'primary1.9' : 'neutral1.6'}
      outline={isSelected ? '2px solid' : 'none'}
      outlineColor={isSelected ? 'primary1.9' : 'transparent'}
      _hover={{
        borderColor: isSelected ? 'primary1.9' : 'neutral1.9',
        cursor: 'pointer',
      }}
      padding={4}
    >
      <HStack width="full" justifyContent="center">
        <Image width="auto" height="300px" src={image} alt={title} boxSize={32} />
      </HStack>
      <Feedback variant={FeedBackVariant.SUCCESS} noIcon>
        <VStack w="full" alignItems="flex-start" spacing={0}>
          <Body size="xl" bold>
            {title}
          </Body>
          <Body size="md" light medium>
            {subtitle}
          </Body>
        </VStack>
      </Feedback>
      <Collapse in={isMobile ? isOpen : true} animateOpacity>
        <VStack w="full" alignItems="flex-start" spacing={4}>
          <VStack w="full" alignItems="flex-start" spacing={0}>
            <Body size="md" bold>
              {t('Why?')}
            </Body>
            <Body size="sm" light>
              {why}
            </Body>
          </VStack>
          <VStack w="full" alignItems="flex-start" spacing={0}>
            <Body size="md" bold>
              {t('How it works?')}
            </Body>
            <Body size="sm" light>
              {howItWorks}
            </Body>
          </VStack>
        </VStack>
      </Collapse>
      {isMobile && (
        <HStack w="full" justifyContent="flex-end">
          <Button variant="link" size="sm" onClick={onToggle}>
            {isOpen ? t('Show Less') : t('Learn More')}
          </Button>
        </HStack>
      )}
    </CardLayout>
  )
}
