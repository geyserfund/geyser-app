import { Button, Collapse, HStack, Image, ListItem, UnorderedList, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
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
import { useMobileMode } from '@/utils/index.ts'

import { FormContinueButton } from '../components/FormContinueButton.tsx'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout.tsx'
import { useCheckPrelaunchSteps } from '../hooks/useCheckPrelaunchSteps.tsx'
import { useLocationMandatoryRedirect } from '../hooks/useLocationMandatoryRedirect.tsx'
import { isReadyForLaunchAtom } from '../states/nodeStatusAtom.ts'
import { ProjectCreateCompletionPage } from './ProjectCreateCompletionPage.tsx'

export enum ProjectCreationStrategy {
  GEYSER_LAUNCHPAD = 'geyser_launchpad',
  LAUNCH_NOW = 'launch_now',
}

export const PROJECT_LAUNCH_PAYMENT_PROJECT_NAME = 'launch'

export const ProjectCreateStrategy = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useLocationMandatoryRedirect()
  useCheckPrelaunchSteps()

  const { project, loading } = useProjectAtom()

  const setReadyForLaunch = useSetAtom(isReadyForLaunchAtom)

  const [strategy, setStrategy] = useState<ProjectCreationStrategy>(ProjectCreationStrategy.GEYSER_LAUNCHPAD)
  const [strategySelected, setStrategySelected] = useState<boolean>(false)

  const handleBack = () => {
    setReadyForLaunch(false)
    navigate(-1)
  }

  const handleNext = () => {
    if (strategy === ProjectCreationStrategy.GEYSER_LAUNCHPAD) {
      setStrategySelected(true)
      return
    }

    navigate(getPath('fundingLaunchPayment', PROJECT_LAUNCH_PAYMENT_PROJECT_NAME), {
      state: {
        launchProjectId: project?.id,
      },
    })
  }

  const isLaunchPad = strategy === ProjectCreationStrategy.GEYSER_LAUNCHPAD
  const isLaunchNow = strategy === ProjectCreationStrategy.LAUNCH_NOW

  if (loading) {
    return null
  }

  if (project.paidLaunch || strategySelected) {
    return <ProjectCreateCompletionPage strategy={strategy} setStrategySelected={setStrategySelected} />
  }

  return (
    <ProjectCreateLayout
      title={
        <TitleWithProgressBar
          title={t('Launch your project')}
          subtitle={t('Choose your launch strategy')}
          hideSteps
          index={5}
          length={5}
        />
      }
      continueButton={<FormContinueButton flexGrow={1} onClick={handleNext} />}
      onBackClick={handleBack}
      maxW={dimensions.maxWidth}
    >
      <HStack w="full" alignItems="stretch" flexDirection={{ base: 'column', lg: 'row' }} spacing={{ base: 4, lg: 6 }}>
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isLaunchPad}
          onClick={() => setStrategy(ProjectCreationStrategy.GEYSER_LAUNCHPAD)}
          image={LaunchPadIllustrationUrl}
          title={t('Geyser Launch Challenge')}
          subtitle={t('Raise $210 in 7 days with your community.')}
          body={`${t(
            "Your project's future depends on this critical first step - meet the goal to keep your vision alive. It’s your chance to build early momentum and launch with a boom.",
          )}  🚀`}
          points={[
            t('Featured in Launchpad & discovery emails'),
            t('Build momentum quickly with early supporters'),
            `${t('If you don’t reach $210 in your first week, your project will close (you can start over)')}`,
          ]}
          pointIndexToWarn={2}
        />
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isLaunchNow}
          onClick={() => setStrategy(ProjectCreationStrategy.LAUNCH_NOW)}
          image={LaunchNowIllustrationUrl}
          title={t('Go Live Now')}
          subtitle={t('Skip the challenge. Launch instantly for $21.')}
          body={t(
            "This small fee is a sign of commitment. It shows that you're serious about your project and ready to share it with the world. That means you don't need to worry about reaching $210 in 7 days",
          )}
          points={[
            t('Featured in ‘Recently launched’ in Discovery page'),
            t('No pressure to raise a lot right away, go by your plan.'),
          ]}
        />
      </HStack>
    </ProjectCreateLayout>
  )
}

type ProjectCreateStrategyCardProps = {
  image: string
  title: string
  subtitle: string
  body: string
  points: string[]
  isSelected?: boolean
  pointIndexToWarn?: number
} & CardLayoutProps

export const ProjectCreateStrategyCard = ({
  image,
  title,
  subtitle,
  body,
  points,
  isSelected,
  pointIndexToWarn,
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
      overflow={'hidden'}
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
          <Body size="sm" light>
            {body}
          </Body>
          <UnorderedList alignItems="flex-start" spacing={0}>
            {points.map((point, index) => (
              <ListItem key={point}>
                <Body
                  size="sm"
                  light
                  color={pointIndexToWarn === index ? 'warning.11' : 'inherit'}
                  fontWeight={pointIndexToWarn === index ? 'bold' : 'normal'}
                >
                  {point}
                </Body>
              </ListItem>
            ))}
          </UnorderedList>
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
