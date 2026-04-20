import { Button, Collapse, HStack, Link, ListItem, UnorderedList, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'

import { GeyserPromotionSection } from '@/modules/project/pages/projectDashboard/views/promote/sections/GeyserPromotionSection.tsx'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useMobileMode } from '@/utils/index.ts'

import { getLaunchPlansData, type LaunchPlanData } from '../constants/launchPlansData.ts'
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
  const [strategy, setStrategy] = useState<ProjectLaunchStrategy>(ProjectLaunchStrategy.PRO_LAUNCH)

  const [basicPlan, visibilityBoostPlan, growthPlan, partnershipPlan] = getLaunchPlansData(t) as [
    LaunchPlanData,
    LaunchPlanData,
    LaunchPlanData,
    LaunchPlanData,
  ]
  const getCardPoints = (points: LaunchPlanData['points']): string[][] =>
    points.map((point) => (point.description ? [point.title, point.description] : [point.title]))

  const isStarterLaunch = strategy === ProjectLaunchStrategy.STARTER_LAUNCH
  const isGrowthLaunch = strategy === ProjectLaunchStrategy.GROWTH_LAUNCH
  const isProLaunch = strategy === ProjectLaunchStrategy.PRO_LAUNCH

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
          title={basicPlan.title}
          subtitle={basicPlan.subtitle}
          price={basicPlan.price}
          points={getCardPoints(basicPlan.points)}
        />
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isGrowthLaunch}
          onClick={() => setStrategy(ProjectLaunchStrategy.GROWTH_LAUNCH)}
          title={visibilityBoostPlan.title}
          subtitle={visibilityBoostPlan.subtitle}
          price={visibilityBoostPlan.price}
          points={getCardPoints(visibilityBoostPlan.points)}
        />
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isProLaunch}
          onClick={() => setStrategy(ProjectLaunchStrategy.PRO_LAUNCH)}
          title={growthPlan.title}
          subtitle={growthPlan.subtitle}
          body={growthPlan.body}
          price={growthPlan.price}
          highlightedText={growthPlan.highlightedText}
          points={getCardPoints(growthPlan.points)}
        />
        <ProjectCreateStrategyCard
          flex={1}
          as={Link}
          href={
            'https://cal.com/metamick/geyser-partnership-hands-on-support-network-amplification?overlayCalendar=true'
          }
          isExternal
          title={partnershipPlan.title}
          subtitle={partnershipPlan.subtitle}
          body={partnershipPlan.body}
          price={partnershipPlan.price}
          points={getCardPoints(partnershipPlan.points)}
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
      paddingBottom={highlightedText ? 8 : 4}
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
