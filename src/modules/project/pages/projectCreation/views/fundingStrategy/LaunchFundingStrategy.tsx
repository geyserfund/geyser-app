import { HStack, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { ProjectCreationStep, ProjectFundingStrategy } from '@/types/index.ts'

import { ProjectCreationPageWrapper } from '../../components/ProjectCreationPageWrapper.tsx'
import { useUpdateProjectWithLastCreationStep } from '../../hooks/useIsStepAhead.tsx'
import { LAUNCH_FEE_USD_CENTS } from '../launch/views/LaunchFees.tsx'
import { ProjectLaunchStrategy } from '../launch/views/LaunchStrategySelection.tsx'

const options = {
  [ProjectFundingStrategy.AllOrNothing]: {
    title: t('All-or-nothing (Beta)'),
    body: t('Receive funds only if you reach your goal by the deadline. Builds momentum and trust.'),
    howDoesItWork: t(
      'Set a funding goal and choose a deadline from 1 to 60 days. If you hit your goal, the funds unlock and you have 30 days to withdraw them. If not, contributors can claim refunds and the campaign closes.',
    ),
    recommendedFor: t('Prototypes or projects needing a minimum amount to move forward.'),
    benefit: t('Encourages trust and often leads to more contributions.'),
    disadvantage: t(
      'Reaching the goal can be a challenge, and not reaching it means you will not receive the funds. You can set the funding period between 1 and 60 days.',
    ),
  },
  [ProjectFundingStrategy.TakeItAll]: {
    title: t('Open Funding'),
    body: t('Receive funds directly to your wallet as they come in. A flexible, trust-based model.'),
    howDoesItWork: t('Every contribution goes straight to your wallet instantly.'),
    recommendedFor: t(
      'Charities, urgent humanitarian needs, causes where every sat counts, or products/services ready for delivery.',
    ),
    benefit: t('Immediate access to funds — no waiting, no minimum goal.'),
    disadvantage: t('Relies more on trust and reputation, which can affect contributor confidence.'),
  },
}

export const LaunchFundingStrategy = () => {
  const navigate = useNavigate()
  const { formatAmount } = useCurrencyFormatter()

  const { project } = useProjectAtom()
  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.FundingType,
    getPath('launchFundingGoal', project.id),
  )

  const [selectedOption, setSelectedOption] = useState<ProjectFundingStrategy>(
    project.fundingStrategy || ProjectFundingStrategy.TakeItAll,
  )

  useEffect(() => {
    setSelectedOption(project.fundingStrategy || ProjectFundingStrategy.TakeItAll)
  }, [project.fundingStrategy])

  const continueProps = {
    onClick() {
      if (project.fundingStrategy === selectedOption) {
        updateProjectWithLastCreationStep()
      } else {
        updateProjectWithLastCreationStep({
          fundingStrategy: selectedOption,
        })
      }
    },
    isDisabled: false,
  }

  const backButtonProps = {
    onClick() {
      navigate(getPath('launchProjectDetails', project.id))
    },
  }

  return (
    <ProjectCreationPageWrapper
      title={t('Funding Strategy')}
      continueButtonProps={continueProps}
      backButtonProps={backButtonProps}
    >
      <VStack w="full" h="full" align="flex-start" spacing={4}>
        <Body>{t('Pick how you would like to raise funds, Unsure which to pick? We can help you choose.')}</Body>
        <HStack w="full" alignItems="stretch">
          <OptionButton
            fundingStrategy={ProjectFundingStrategy.TakeItAll}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <OptionButton
            fundingStrategy={ProjectFundingStrategy.AllOrNothing}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </HStack>

        <InfoCard fundingStrategy={selectedOption} />
        <CardLayout noborder backgroundColor="info.3" gap={0}>
          <Body medium>
            {t(`A {{launchFee}} launch fee is required to publish your project. `, {
              launchFee: formatAmount(LAUNCH_FEE_USD_CENTS[ProjectLaunchStrategy.STARTER_LAUNCH], 'USDCENT'),
            })}
          </Body>
          <Body medium>
            {t('Humanitarian causes may qualify for a refund, contact us at support@geyser.fund to request it.')}
          </Body>
        </CardLayout>
      </VStack>
    </ProjectCreationPageWrapper>
  )
}

const InfoCard = ({ fundingStrategy }: { fundingStrategy: ProjectFundingStrategy }) => {
  const { howDoesItWork, recommendedFor, benefit, disadvantage } = options[fundingStrategy]

  return (
    <CardLayout noborder backgroundColor="neutral1.3">
      <VStack w="full" alignItems="flex-start" spacing={0}>
        <Body bold>{t('How does it work?')}</Body>
        <Body>{howDoesItWork}</Body>
      </VStack>
      <VStack w="full" alignItems="flex-start" spacing={0}>
        <Body bold>{t('Recommended For')}</Body>
        <Body>{recommendedFor}</Body>
      </VStack>
      <VStack w="full" alignItems="flex-start" spacing={0}>
        <Body bold>{t('Benefit')}</Body>
        <Body>{benefit}</Body>
      </VStack>
      <VStack w="full" alignItems="flex-start" spacing={0}>
        <Body bold>{t('Disadvantage')}</Body>
        <Body>{disadvantage}</Body>
      </VStack>
    </CardLayout>
  )
}

/** Reusable button component with title, subtitle, and body content */
const OptionButton = ({
  fundingStrategy,
  selectedOption,
  setSelectedOption,
  ...rest
}: {
  fundingStrategy: ProjectFundingStrategy
  selectedOption: ProjectFundingStrategy
  setSelectedOption: (fundingStrategy: ProjectFundingStrategy) => void
} & StackProps) => {
  const { title, body } = options[fundingStrategy]
  const isSelected = selectedOption === fundingStrategy

  return (
    <VStack
      w="full"
      border="1px solid"
      borderColor={isSelected ? 'primary1.9' : 'neutral1.6'}
      _hover={{ borderColor: 'primary1.9' }}
      outline={isSelected ? '1px solid' : 'none'}
      outlineColor={isSelected ? 'primary1.9' : 'transparent'}
      borderRadius="12px"
      p={4}
      cursor="pointer"
      alignItems="flex-start"
      onClick={() => setSelectedOption(fundingStrategy)}
      {...rest}
    >
      <H2 size="xl" bold>
        {title}
      </H2>

      <Body size="sm">{body}</Body>
    </VStack>
  )
}
