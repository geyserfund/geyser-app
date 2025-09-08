import { Button, Collapse, HStack, ListItem, UnorderedList, useDisclosure, VStack } from '@chakra-ui/react'
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
import { dimensions } from '@/shared/constants/index.ts'
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

export enum ProjectLaunchStrategy {
  STARTER_LAUNCH = 'STARTER_LAUNCH',
  GROWTH_LAUNCH = 'GROWTH_LAUNCH',
  PRO_LAUNCH = 'PRO_LAUNCH',
}

export const PROJECT_LAUNCH_PAYMENT_PROJECT_NAME = 'launch'

export const ProjectCreateStrategy = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useLocationMandatoryRedirect()
  useCheckPrelaunchSteps()

  const { project, loading } = useProjectAtom()

  const setReadyForLaunch = useSetAtom(isReadyForLaunchAtom)

  const [strategy, setStrategy] = useState<ProjectLaunchStrategy>(ProjectLaunchStrategy.STARTER_LAUNCH)

  const handleBack = () => {
    setReadyForLaunch(false)
    navigate(-1)
  }

  const handleNext = () => {
    navigate(getPath('fundingLaunchPayment', PROJECT_LAUNCH_PAYMENT_PROJECT_NAME), {
      state: {
        launchProjectId: project?.id,
        launchStrategy: strategy,
      },
    })
  }

  const isStarterLaunch = strategy === ProjectLaunchStrategy.STARTER_LAUNCH
  const isGrowthLaunch = strategy === ProjectLaunchStrategy.GROWTH_LAUNCH
  const isProLaunch = strategy === ProjectLaunchStrategy.PRO_LAUNCH

  if (loading) {
    return null
  }

  if (project.paidLaunch) {
    return <ProjectCreateCompletionPage />
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
      <VStack w="full" alignItems="stretch" spacing={{ base: 4, lg: 6 }}>
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isStarterLaunch}
          onClick={() => setStrategy(ProjectLaunchStrategy.STARTER_LAUNCH)}
          title={t('Starter Launch')}
          subtitle={t('do it yourself, get the basic exposure at a lower cost.')}
          body={`${t('Access to all Geyser tooling and get discovered through the Geyser platform')} `}
          price={t('$25')}
        />
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isGrowthLaunch}
          onClick={() => setStrategy(ProjectLaunchStrategy.GROWTH_LAUNCH)}
          title={t('Growth Launch')}
          subtitle={t('visibility boost with expert feedback')}
          price={t('$50')}
          points={[
            [t('Landing Page Feature'), t('1 week front-page spotlight')],
            [
              t('Geyser Newsletter feature'),
              t('get featured at the top of our monthly newsletter going out to 5000+ subscribers'),
            ],
            [t('Social Media post'), t('1 social media post on Geyser’s X account with 15k+ followers')],
            [
              t('Project feedback'),
              t('Geyser Team Expert provides 1-time feedback on your project story and structure'),
            ],
          ]}
        />
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isProLaunch}
          onClick={() => setStrategy(ProjectLaunchStrategy.PRO_LAUNCH)}
          title={t('Pro Launch')}
          subtitle={t('hands-on support + network amplification')}
          body={t('Limited to 5 per month, subject to selection')}
          price={t('$350')}
          points={[
            [t('Everything in Growth')],
            [
              t('Spotlight Email'),
              t('Your project featured in a dedicated email sent to Geyser users most interested in your category'),
            ],
            [
              t('Personalised Launch Strategy'),
              t('a one-on-one session to design the perfect launch plan for your project'),
            ],
            [
              t('Dedicated support'),
              t('one month of hands-on guidance from our team to keep you on path for a successful raise'),
            ],
            [t('Exclusive network'), t('tap into our podcasters, media, and creator partners')],
          ]}
        />
      </VStack>
    </ProjectCreateLayout>
  )
}

type ProjectCreateStrategyCardProps = {
  title: string
  subtitle: string
  body?: string
  price?: string
  points?: string[][]
  isSelected?: boolean
} & CardLayoutProps

export const ProjectCreateStrategyCard = ({
  title,
  subtitle,
  body,
  price,
  points,
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
      spacing={2}
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
      <HStack w="full">
        <HStack
          flex={1}
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems={{ base: 'start', lg: 'center' }}
          justifyContent={'start'}
          spacing={{ base: 0, lg: 2 }}
        >
          <Body size="xl" bold>
            {title}
          </Body>
          <Body size={{ base: 'lg', lg: 'xl' }} light medium>
            - {subtitle}
          </Body>
        </HStack>
        <Body size="xl" muted medium>
          {price}
        </Body>
      </HStack>

      <Collapse in={isMobile ? isOpen : true} animateOpacity>
        <VStack w="full" alignItems="flex-start" spacing={4}>
          {body && (
            <Body size="sm" light>
              {body}
            </Body>
          )}
          {points && (
            <UnorderedList alignItems="flex-start" spacing={1}>
              {points.map((point, index) => (
                <ListItem key={point[0]} as={HStack} flexWrap="wrap" spacing={0.5}>
                  <Body size="sm" bold>
                    {point[0]}
                    {point[0] && point[1] && ':'}
                  </Body>
                  {point[1] && (
                    <Body size="sm" light>
                      {point[1]}
                    </Body>
                  )}
                </ListItem>
              ))}
            </UnorderedList>
          )}
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
