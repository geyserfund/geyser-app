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
          title={t('Starter Launch')}
          subtitle={t('do it yourself, get the basic exposure')}
          body={t('Access to all Geyser tooling and get discovered through the Geyser platform')}
          price={t('$25')}
        />
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isGrowthLaunch}
          onClick={() => setStrategy(ProjectLaunchStrategy.GROWTH_LAUNCH)}
          title={t('Growth Launch')}
          subtitle={t('visibility + distribution boost')}
          price={t('$60')}
          points={[
            [t('Everything in Starter')],
            [t('Landing Page Feature'), t('1 week front-page spotlight')],
            [t('Project Feedback'), t('1-time expert feedback on your project story and structure')],
            [t('Geyser Newsletter Feature'), t('featured in our monthly newsletter')],
            [t('Social Media Post'), t('1 post on Geyser’s X account')],
            [t('Social Amplification'), t('additional reposts and visibility boosts')],
          ]}
        />
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isCatalystLaunch}
          onClick={() => setStrategy(ProjectLaunchStrategy.PRO_LAUNCH)}
          title={t('Catalyst Launch')}
          subtitle={t('guided strategy + targeted amplification')}
          body={t(
            'A strategic launch package with content, network access, and dedicated support - with expected reach of ~100k impressions depending on project potential',
          )}
          price={t('$300')}
          highlightedText={t('Most Popular')}
          points={[
            [t('Strategy Call'), t('1 session to define goals, audience, and launch plan')],
            [t('Content Strategy Plan'), t('1 session with clear deliverable of what to post and when')],
            [
              t('Rapidfire Q&A for Content'),
              t('1 session to create 10 pieces of content to help clarify your project'),
            ],
            [t('Social Amplification'), t('additional reposts and visibility boosts')],
            [t('Deep Social Promotion'), t('high-quality dedicated post + ongoing retweets')],
            [t('Newsletter Spotlight'), t('featured placement in newsletter')],
            [t('Email Campaign'), t('promotion sent to relevant Geyser users/projects')],
            [t('Network Access'), t('introductions to relevant partners when aligned')],
            [t('1-Month Support'), t('async support in shared Telegram group')],
            [t('Mid-Campaign Check-in'), t('progress review + optimization suggestions')],
          ]}
        />
        <ProjectCreateStrategyCard
          flex={1}
          as={Link}
          href={
            'https://cal.com/metamick/geyser-partnership-hands-on-support-network-amplification?overlayCalendar=true'
          }
          isExternal
          title={t('Geyser Partnership')}
          subtitle={t('hands-on support + network amplification')}
          body={t(
            'Geyser becomes your partner providing personalized launch strategy, project feedback, and marketing support',
          )}
          price={t('starting at $1,000')}
          points={[
            [t('Dedicated Strategy & Planning'), t('ongoing alignment on goals and execution')],
            [t('Content Planning & Creation Support'), t('hands-on help crafting your campaign')],
            [t('Full Network Access'), t('direct amplification through Geyser ecosystem')],
            [t('Newsletter Features Across Campaign'), t('multiple placements during your campaign')],
            [t('Weekly Discussions & Check-ins'), t('continuous guidance from Geyser team')],
            [t('Campaign Iteration & Improvements'), t('ongoing optimization based on performance')],
            [t('Dedicated Telegram Group'), t('ongoing support and coordination')],
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
      <HStack w="full">
        <HStack
          flex={1}
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems={{ base: 'start', lg: 'center' }}
          justifyContent={'start'}
          spacing={{ base: 0, lg: 2 }}
        >
          <Body size="lg" bold>
            {title}
          </Body>
          <Body size={{ base: 'md', lg: 'lg' }} light medium>
            - {subtitle}
          </Body>
        </HStack>
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
