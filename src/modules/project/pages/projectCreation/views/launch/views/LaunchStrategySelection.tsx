import { Button, Collapse, HStack, Link, ListItem, UnorderedList, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { type ReactNode, useState } from 'react'

import { GeyserPromotionSection } from '@/modules/project/pages/projectDashboard/views/promote/sections/GeyserPromotionSection.tsx'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { commaFormatted, useMobileMode } from '@/utils/index.ts'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'

import {
  isStarterLaunchDiscountActive,
  LAUNCH_FEE_USD_CENTS,
  ProjectLaunchStrategy,
  STARTER_LAUNCH_DISCOUNT_USD_CENTS,
} from './launchConstants.ts'

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
  const isProLaunch = strategy === ProjectLaunchStrategy.PRO_LAUNCH

  const continueButtonProps = {
    onClick: () => handleNext(strategy),
  }

  const backButtonProps = {
    onClick: handleBack,
  }

  const formatUsdFromCents = (cents: number) => `$${commaFormatted(cents / 100)}`
  const isStarterDiscountActive = isStarterLaunchDiscountActive()
  const starterBasePrice = formatUsdFromCents(LAUNCH_FEE_USD_CENTS[ProjectLaunchStrategy.STARTER_LAUNCH])
  const starterDiscountedPrice = formatUsdFromCents(STARTER_LAUNCH_DISCOUNT_USD_CENTS)

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
          body={`${t('Access to all Geyser tooling and get discovered through the Geyser platform')} `}
          price={
            isStarterDiscountActive ? (
              <HStack spacing={2}>
                <Body size="lg" muted medium textDecoration="line-through">
                  {starterBasePrice}
                </Body>
                <Body size="lg" medium>
                  {starterDiscountedPrice}
                </Body>
              </HStack>
            ) : (
              starterBasePrice
            )
          }
        />
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isGrowthLaunch}
          onClick={() => setStrategy(ProjectLaunchStrategy.GROWTH_LAUNCH)}
          title={t('Growth Launch')}
          subtitle={t('Visibility boost')}
          price={formatUsdFromCents(LAUNCH_FEE_USD_CENTS[ProjectLaunchStrategy.GROWTH_LAUNCH])}
          points={[
            [t('Landing Page Feature'), t('1 week front-page spotlight')],
            [
              t('Geyser Newsletter feature'),
              t('get featured at the top of our monthly newsletter going out to 5000+ subscribers'),
            ],
            [t('Social Media post'), t('1 social media post on Geyser’s X account with 15k+ followers')],
          ]}
        />
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isProLaunch}
          onClick={() => setStrategy(ProjectLaunchStrategy.PRO_LAUNCH)}
          title={t('Pro Launch')}
          subtitle={t('Maximum visibility + product feedback')}
          body={t('Limited to 5 per month, subject to selection')}
          price={formatUsdFromCents(LAUNCH_FEE_USD_CENTS[ProjectLaunchStrategy.PRO_LAUNCH])}
          highlightedText={t('Picked by 40% of Top 100 projects on Geyser')}
          points={[
            [t('Everything in Growth')],
            [
              t('Spotlight Email'),
              t('Your project featured in a dedicated email sent to Geyser users most interested in your category'),
            ],
            [
              t('Project feedback'),
              t('Geyser Team Expert provides 1-time feedback on your project story and structure'),
            ],
          ]}
        />
        <ProjectCreateStrategyCard
          flex={1}
          isSelected={isProLaunch}
          as={Link}
          href={
            'https://cal.com/metamick/geyser-partnership-hands-on-support-network-amplification?overlayCalendar=true'
          }
          isExternal
          title={t('Geyser Partnership')}
          subtitle={t('hands on support + network amplification')}
          body={t(
            'Geyser becomes your partner providing personalized launch strategy, project feedback, marketing support. If you click ',
          )}
          price={t('starting at $1,000')}
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
  price?: ReactNode
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
        {price &&
          (typeof price === 'string' ? (
            <Body size="lg" muted medium>
              {price}
            </Body>
          ) : (
            price
          ))}
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
