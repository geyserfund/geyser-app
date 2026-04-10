import { Button, Collapse, HStack, Link, ListItem, UnorderedList, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'

import { GeyserPromotionSection } from '@/modules/project/pages/projectDashboard/views/promote/sections/GeyserPromotionSection.tsx'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useMobileMode } from '@/utils/index.ts'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'

export enum ProjectLaunchStrategy {
  STARTER_LAUNCH = 'STARTER_LAUNCH',
  GROWTH_LAUNCH = 'GROWTH_LAUNCH',
  PRO_LAUNCH = 'PRO_LAUNCH',
}

export const LaunchStrategySelection = ({
  handleNext,
  handleBack,
}: {
  handleNext: (strategy: ProjectLaunchStrategy) => void
  handleBack: () => void
}) => {
  const [strategy, setStrategy] = useState<ProjectLaunchStrategy>(ProjectLaunchStrategy.STARTER_LAUNCH)

  const isStarterLaunch = strategy === ProjectLaunchStrategy.STARTER_LAUNCH
  const isGrowthLaunch = strategy === ProjectLaunchStrategy.GROWTH_LAUNCH
  const isCatalystLaunch = strategy === ProjectLaunchStrategy.PRO_LAUNCH

  const continueButtonProps = {
    onClick: () => handleNext(strategy),
  }

  const backButtonProps = {
    onClick: handleBack,
  }

  return (
    <ProjectCreationPageWrapper
      title={t('Choose your Launch Plan')}
      continueButtonProps={continueButtonProps}
      backButtonProps={backButtonProps}
    >
      <VStack w="full" alignItems="stretch" spacing={{ base: 4, lg: 6 }}>
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isStarterLaunch}
          onClick={() => setStrategy(ProjectLaunchStrategy.STARTER_LAUNCH)}
          title={t('Basic')}
          subtitle={t('Do it yourself. Get listed and start collecting support.')}
          price={t('$25')}
          points={[[t('Access to all Geyser tools')], [t('Discoverability on the platform')]]}
        />
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isGrowthLaunch}
          onClick={() => setStrategy(ProjectLaunchStrategy.GROWTH_LAUNCH)}
          title={t('Visibility Boost')}
          subtitle={t(
            'Get eyes on your project. Best for projects that already have an audience and are confident about your project.',
          )}
          price={t('$60')}
          points={[[t('1 week front-page feature')], [t('Newsletter placement')], [t('1 social post by Geyser socials')]]}
        />
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isCatalystLaunch}
          onClick={() => setStrategy(ProjectLaunchStrategy.PRO_LAUNCH)}
          title={t('Growth')}
          subtitle={t('Turn your project into a real launch with traction.')}
          body={t(
            'Designed to generate your first wave of supporters and momentum (~50k–100k targeted impressions)',
          )}
          price={t('$300')}
          highlightedText={t('Picked by 40% of the Top 100 projects on Geyser')}
          points={[
            [
              t('Strategy & Positioning'),
              t(
                'We help you define your goals, audience, and launch plan starting with a strategy and content call.',
              ),
            ],
            [t('Content Engine'), t('10 high-signal posts + clear posting plan')],
            [
              t('Distribution'),
              t('Social amplification, newsletter spotlight, and targeted email campaign'),
            ],
            [t('Ongoing Optimization'), t('1 month support, mid-campaign check-in, and performance improvements')],
          ]}
        />
        <ProjectCreateStrategyCard
          flex={1}
          as={Link}
          href={
            'https://cal.com/metamick/geyser-partnership-hands-on-support-network-amplification?overlayCalendar=true'
          }
          isExternal
          title={t('Partnership')}
          subtitle={t('Hands-on execution and full ecosystem amplification. For teams scaling serious initiatives.')}
          price={t('starting at $2,500')}
          points={[
            [t('Dedicated strategy and execution')],
            [t('Content creation and campaign management')],
            [t('Full network access and amplification')],
            [t('Continuous optimization and support')],
            [t('Direct collaboration with the Geyser team')],
          ]}
        />
      </VStack>
      <VStack w="full" alignItems="flex-start">
        <GeyserPromotionSection />
      </VStack>
    </ProjectCreationPageWrapper>
  )
}

type ProjectCreateStrategyCardProps = {
  title: string
  subtitle: string
  body?: string
  price?: string
  points?: string[][]
  isSelected?: boolean
  highlightedText?: string
} & CardLayoutProps

export const ProjectCreateStrategyCard = ({
  title,
  subtitle,
  body,
  price,
  points,
  isSelected,
  highlightedText,
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
      overflow={'visible'}
      padding={4}
      position="relative"
    >
      <HStack w="full" alignItems="flex-start">
        <VStack flex={1} alignItems="flex-start" spacing={0}>
          <Body size="lg" bold>
            {title}
          </Body>
          <Body size="sm" light medium>
            {subtitle}
          </Body>
        </VStack>
        <Body size="lg" muted medium>
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
              {points.map((point) => (
                <ListItem key={point[0]}>
                  <Body size="sm" bold display="inline">
                    {point[0]}
                    {point[0] && point[1] && ':'}{' '}
                  </Body>
                  {point[1] && (
                    <Body size="sm" light display="inline">
                      {point[1]}
                    </Body>
                  )}
                </ListItem>
              ))}
            </UnorderedList>
          )}
        </VStack>
      </Collapse>
      {highlightedText && (
        <HStack w="full" justifyContent="flex-end" position="absolute" bottom={-3} right={3}>
          <Body size="sm" color="primary1.11" backgroundColor="primary1.3" paddingX={2} paddingY={1} borderRadius={8}>
            {highlightedText}
          </Body>
        </HStack>
      )}
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
