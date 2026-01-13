import { Button, Divider, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import Confetti from 'react-confetti'
import { Link } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { lightModeColors } from '@/shared/styles'

import { SuggestedProjects } from '../../../../projectView/views/body/sections/SuggestedProjects.tsx'
import { ProjectFundingSummary } from '../../../components/ProjectFundingSummary.tsx'
import { FundingLayout } from '../../../layouts/FundingLayout.tsx'
import { DownloadInvoice } from '../components/DownloadInvoice.tsx'
import { SuccessImageComponent } from '../components/index.ts'
import { SafeToDeleteRefund } from '../components/SafeToDeleteRefund.tsx'

export const FundingSuccessUI = ({ isPending }: { isPending: boolean }) => {
  const { project, formState } = useFundingFormAtom()

  const fundingContribution = useAtomValue(fundingContributionAtom)

  return (
    <FundingLayout
      showBack={false}
      topNavBarRightContent={
        <Button size="lg" as={Link} to={getPath('project', project.name)} variant="soft" colorScheme={'neutral1'}>
          {t('Back to project')}
        </Button>
      }
    >
      <CardLayout mobileDense w="full" padding={{ base: 0, lg: 12 }} alignItems="center">
        {!isPending && (
          <Confetti
            gravity={0.07}
            numberOfPieces={250}
            colors={[
              lightModeColors.primary1[5],
              lightModeColors.primary1[6],
              lightModeColors.primary1[8],
              lightModeColors.primary1[9],
              lightModeColors.amber[6],
              lightModeColors.amber[8],
              lightModeColors.orange[6],
              lightModeColors.orange[8],
              lightModeColors.ruby[6],
              lightModeColors.ruby[8],
            ]}
          />
        )}
        <VStack w="full" maxWidth="800px" alignItems="start" spacing={6}>
          <VStack w="full" alignItems="start">
            <SuccessImageComponent isPending={isPending} />
          </VStack>
          {formState.subscription.cost > 0 && (
            <VStack w="full" alignItems="start" spacing={6}>
              <H2 size={{ base: 'xl', lg: '2xl' }} bold>
                {t('Manage Subscription')}
              </H2>
              <Body size="sm" light>
                {fundingContribution.isAnonymous
                  ? t('To manage your subscription in the future, please login to stripe with your provided email.')
                  : t('Please check your profile to manage your subscription.')}
              </Body>
            </VStack>
          )}
          <SafeToDeleteRefund />
          <Divider />
          <ProjectFundingSummary disableCollapse referenceCode={fundingContribution.uuid} />
          <DownloadInvoice project={project} contributionId={fundingContribution.id} isPending={isPending} />
          <SuggestedProjects
            id={'suggested-projects-funding-success'}
            subCategory={project.subCategory}
            projectId={project.id}
            paddingBottom={40}
          />
        </VStack>
      </CardLayout>
    </FundingLayout>
  )
}
