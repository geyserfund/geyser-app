import { HStack, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep, ProjectFundingStrategy } from '@/types/index.ts'

import { useUpdateProjectWithLastCreationStep } from '../../hooks/useIsStepAhead.tsx'
import { ProjectCreationLayout } from '../../Layouts/ProjectCreationLayout.tsx'

const options = {
  [ProjectFundingStrategy.AllOrNothing]: {
    title: t('All-or-nothing'),
    body: t('Receive funding only if you reach the goal by set time. Creates momentum and trust.'),
    howDoesItWork: t(
      'You set your funding goal and the duration of the project, from 1 to 60 days. If the goal is reached, the funds will be deposited into your connected wallet. If the goal is not reached, the funds will be returned to the contributor and the project will be closed.',
    ),
    recommendedFor: t('Early product prototypes, projects that require a minimum amount of funds to be implemented.'),
    benefit: t(
      'This model results in more contributions and funding. Contributors will feel more comfortable contributing to your project knowing that the funds will be returned if the project cannot be completed.',
    ),
    disadvantage: t(
      'Reaching the goal can be a challenge, and not reaching it means you will not receive the funds. There will also be a time limit to reach that goal (ranging from 1 to 3 months).',
    ),
  },
  [ProjectFundingStrategy.TakeItAll]: {
    title: t('Open Funding'),
    body: t('Receive funding directly as people send it. More trust-based model.'),
    howDoesItWork: t('There is no specific funding goal. The funds are sent directly to your wallet.'),
    recommendedFor: t(
      'Fundraisers for charity, humanitarian causes or emergency where each sat can make a difference.',
    ),
    benefit: t(
      'You receive the funds immediately, there is no delay or minimum. All contributions are instantly paid out to your own wallet.',
    ),
    disadvantage: t(
      'There is more trust involved in this model, without a good reputation and prior proof of work, you may not receive as many contributions.',
    ),
  },
}

export const LaunchFundingStrategy = () => {
  const navigate = useNavigate()

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
      console.log('selectedOption', selectedOption)
      console.log('project.fundingStrategy', project.fundingStrategy)
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
    <ProjectCreationLayout
      title={t('Funding Strategy')}
      continueButtonProps={continueProps}
      backButtonProps={backButtonProps}
    >
      <VStack w="full" h="full" align="flex-start" spacing={4}>
        <Body>{t('Pick how you would like to raise funds, Unsure which to pick? We can help you choose.')}</Body>
        <HStack w="full" alignItems="stretch">
          <OptionButton
            fundingStrategy={ProjectFundingStrategy.AllOrNothing}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <OptionButton
            fundingStrategy={ProjectFundingStrategy.TakeItAll}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </HStack>

        <InfoCard fundingStrategy={selectedOption} />
        <CardLayout noborder backgroundColor="info.3" gap={0}>
          <Body medium>{t('A $10 launch fee is required to publish your project. ')}</Body>
          <Body medium>
            {t(
              'Certified charities and humanitarian causes may qualify for a refund. Contact us to apply for a refund.',
            )}
          </Body>
        </CardLayout>
      </VStack>
    </ProjectCreationLayout>
  )
}

const InfoCard = ({ fundingStrategy }: { fundingStrategy: ProjectFundingStrategy }) => {
  const { howDoesItWork, recommendedFor, benefit, disadvantage } = options[fundingStrategy]

  return (
    <CardLayout noborder backgroundColor="neutral1.3">
      <VStack w="full" alignItems="flex-start">
        <Body bold>{t('How does it work?')}</Body>
        <Body>{howDoesItWork}</Body>
      </VStack>
      <VStack w="full" alignItems="flex-start">
        <Body bold>{t('Recommended For')}</Body>
        <Body>{recommendedFor}</Body>
      </VStack>
      <VStack w="full" alignItems="flex-start">
        <Body bold>{t('Benefit')}</Body>
        <Body>{benefit}</Body>
      </VStack>
      <VStack w="full" alignItems="flex-start">
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
      borderColor={isSelected ? 'primary1.6' : 'neutral1.6'}
      _hover={{ borderColor: 'primary1.6' }}
      outline={isSelected ? '1px solid' : 'none'}
      outlineColor={isSelected ? 'primary1.6' : 'transparent'}
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
