import { Button, Divider, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import Confetti from 'react-confetti'
import { Link } from 'react-router'

import { useAuthContext } from '@/context'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useProjectMatchingPreview } from '@/modules/project/funding/hooks/useProjectMatchingPreview.ts'
import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { recurringFundingModes } from '@/modules/project/recurring/graphql.ts'
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
  const { user } = useAuthContext()
  const { project, formState } = useFundingFormAtom()
  const matchingPreview = useProjectMatchingPreview()

  const fundingContribution = useAtomValue(fundingContributionAtom)

  const matchedAmountOverride =
    !isPending && fundingContribution.matching
      ? {
          sats: fundingContribution.matchedAmountSats,
          usdCents: fundingContribution.matchedAmountUsdCent,
        }
      : isPending &&
        project.activeMatching &&
        matchingPreview.hasActiveMatching &&
        (matchingPreview.matchedAmountSats > 0 || matchingPreview.matchedAmountUsdCents > 0)
      ? {
          sats: matchingPreview.matchedAmountSats,
          usdCents: matchingPreview.matchedAmountUsdCents,
        }
      : null

  return (
    <FundingLayout
      showBack={false}
      topNavBarRightContent={
        <Button
          size="lg"
          as={Link}
          to={getPath('project', project.name)}
          variant="soft"
          colorScheme={'neutral1'}
          sx={{
            transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1), background-color 0.2s',
            '&:active:not(:disabled)': { transform: 'scale(0.96)' },
          }}
        >
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
          {formState.fundingMode !== recurringFundingModes.oneTime && (
            <VStack w="full" alignItems="start" spacing={6}>
              <HStack w="full" justifyContent="space-between" alignItems="center" gap={4}>
                <H2 size={{ base: 'xl', lg: '2xl' }} bold sx={{ textWrap: 'balance' }}>
                  {t('Manage Recurring Payment')}
                </H2>
                {user?.id && (
                  <Button
                    as={Link}
                    to={getPath('userProfileSettingsSubscriptions', user.id)}
                    size="lg"
                    variant="outline"
                    colorScheme="neutral1"
                    sx={{
                      transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1), background-color 0.2s',
                      '&:active:not(:disabled)': { transform: 'scale(0.96)' },
                    }}
                  >
                    {t('Manage recurring payments')}
                  </Button>
                )}
              </HStack>
              <Body size="sm" light>
                {user?.id
                  ? t('You can manage this recurring payment from your recurring payments settings.')
                  : fundingContribution.isAnonymous
                  ? t('Use the email associated with this payment to manage it in the future.')
                  : t('Please check your recurring payments settings to manage this payment.')}
              </Body>
            </VStack>
          )}
          <SafeToDeleteRefund />
          <Divider />
          <ProjectFundingSummary
            disableCollapse
            referenceCode={fundingContribution.uuid}
            matchedAmountOverride={matchedAmountOverride}
          />
          <HStack w="full" justifyContent="flex-end">
            <DownloadInvoice project={project} contributionId={fundingContribution.id} isPending={isPending} />
          </HStack>
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
