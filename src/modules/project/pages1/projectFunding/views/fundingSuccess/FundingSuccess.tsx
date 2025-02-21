import { Button, Divider, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect } from 'react'
import Confetti from 'react-confetti'
import { Link, useNavigate } from 'react-router-dom'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useFundingTxAtom } from '@/modules/project/funding/state'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { lightModeColors } from '@/shared/styles'
import { FundingStatus } from '@/types'

import { ProjectFundingSummary } from '../../components/ProjectFundingSummary'
import { FundingLayout } from '../../layouts/FundingLayout'
import { SuccessImageComponent } from './components'
import { ConfirmationMessages } from './components/ConfirmationMessage'
import { DownloadInvoice } from './components/DownloadInvoice'
import { SafeToDeleteRefund } from './components/SafeToDeleteRefund'
import { SendEmailToCreator } from './components/SendEmailToCreator'

export const FundingSuccess = () => {
  const { project, formState } = useFundingFormAtom()
  const { fundingTx } = useFundingTxAtom()

  const navigate = useNavigate()

  useEffect(() => {
    if (fundingTx.status !== FundingStatus.Paid) {
      navigate(getPath('projectFunding', project.name))
    }
  }, [fundingTx, navigate, project.name])

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
        <VStack w="full" maxWidth="800px" alignItems="start" spacing={6}>
          <VStack w="full" alignItems="start">
            <SuccessImageComponent />
          </VStack>
          {formState.rewardsCost > 0 && (
            <VStack w="full" alignItems="start" spacing={6}>
              <H2 size={{ base: 'xl', lg: '2xl' }} bold>
                {t('Next Actions')}
              </H2>
              <HStack>
                <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Reference code')}: `}</Body>
                <Body size={{ base: 'sm', lg: 'md' }}>{`${fundingTx.uuid} `}</Body>
              </HStack>
              <ConfirmationMessages />
              <SendEmailToCreator />
            </VStack>
          )}
          {formState.subscription.cost > 0 && (
            <VStack w="full" alignItems="start" spacing={6}>
              <H2 size={{ base: 'xl', lg: '2xl' }} bold>
                {t('Manage Subscription')}
              </H2>
              <Body size="sm" light>
                {fundingTx.isAnonymous
                  ? t('To manage your subscription in the future, please login to stripe with your provided email.')
                  : t('Please check your profile to manage your subscription.')}
              </Body>
            </VStack>
          )}
          <SafeToDeleteRefund />
          <Divider />
          <ProjectFundingSummary disableCollapse />
          <DownloadInvoice project={project} fundingTxId={fundingTx.id} />
        </VStack>
      </CardLayout>
    </FundingLayout>
  )
}
