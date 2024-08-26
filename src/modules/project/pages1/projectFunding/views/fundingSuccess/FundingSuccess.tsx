import { Button, Divider, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router-dom'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useFundingTxAtom } from '@/modules/project/funding/state'
import { CardLayout } from '@/shared/components/layouts'
import { H1 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

import { ProjectFundingSummary } from '../../components/ProjectFundingSummary'
import { FundingLayout } from '../../layouts/FundingLayout'
import { SuccessImageComponent } from './components'
import { DownloadInvoice } from './components/DownloadInvoice'
import { SafeToDeleteRefund } from './components/SafeToDeleteRefund'
import { SendEmailToCreator } from './components/SendEmailToCreator'

export const FundingSuccess = () => {
  const { project } = useFundingFormAtom()
  const { fundingTx } = useFundingTxAtom()
  return (
    <FundingLayout
      topNavBarRightContent={
        <Button size="lg" as={Link} to={getPath('project', project.name)} variant="soft" colorScheme={'neutral1'}>
          {t('Back to project')}
        </Button>
      }
    >
      <CardLayout mobileDense w="full" padding={{ base: 0, lg: 12 }} alignItems="center">
        <VStack w="full" maxWidth="800px" alignItems="start" spacing={6}>
          <VStack w="full" alignItems="start">
            <H1 size="2xl" bold>
              {t('Success')}!
            </H1>
            <SuccessImageComponent />
          </VStack>
          <SendEmailToCreator />
          <SafeToDeleteRefund />
          <Divider />
          <ProjectFundingSummary />
          <DownloadInvoice project={project} fundingTxId={fundingTx.id} />
        </VStack>
      </CardLayout>
    </FundingLayout>
  )
}
