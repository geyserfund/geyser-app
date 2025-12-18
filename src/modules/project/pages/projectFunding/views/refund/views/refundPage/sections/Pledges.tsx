import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { NoDataError } from '@/components/errors/NoDataError.tsx'
import Loader from '@/components/ui/Loader.tsx'
import { useAuthContext } from '@/context/auth.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import type { ProjectContributionRefundFragment } from '@/types/index.ts'
import {
  ContributionStatus,
  ContributionsWhereContributionStatus,
  useRefundPageContributionsGetQuery,
} from '@/types/index.ts'

import { RefundRsk } from '../../../../refundPayoutRsk/RefundRsk.tsx'
import { StatusBadge } from '../components/RefundStatusBadge.tsx'

/** Contributions refund table component */
export const PledgesTable = () => {
  const { user } = useAuthContext()

  const {
    data: contributionsData,
    loading,
    error,
  } = useRefundPageContributionsGetQuery({
    skip: !user.id,
    variables: {
      input: {
        where: {
          userId: user.id,
          status: ContributionsWhereContributionStatus.Pledged,
        },
      },
    },
  })

  const contributions = contributionsData?.contributionsGet?.contributions || []

  const { props: refundRskModalProps, ...refundRskModal } = useModal<{
    contribution: ProjectContributionRefundFragment
  }>()

  const handleClaimContribution = (contribution: ProjectContributionRefundFragment) => {
    refundRskModal.onOpen({ contribution })
  }

  const renderTableRows = () => {
    if (loading) return <Loader />
    if (error) return <NoDataError message={t('Failed to fetch contributions')} />
    if (contributions.length === 0) return <NoDataError message={t('No contributions found')} />

    return contributions.map((contribution) => {
      const project = contribution.sourceResource?.__typename === 'Project' ? contribution.sourceResource : null

      return (
        <HStack
          key={contribution.id}
          w="full"
          p={4}
          borderBottom="1px solid"
          borderColor="neutral1.6"
          _last={{ borderBottom: 'none' }}
        >
          <Body size="sm" flex="2">
            {project?.name || '-'}
          </Body>
          <Body size="sm" flex="1">
            {contribution.amount.toLocaleString()} sats
          </Body>
          <HStack flex="1">
            <StatusBadge status={contribution.status} />
          </HStack>
          <Box flex="1">
            {contribution.status === ContributionStatus.Pledged && (
              <Button
                size="sm"
                colorScheme="primary1"
                variant="solid"
                onClick={() => handleClaimContribution(contribution)}
              >
                {t('Claim Refund')}
              </Button>
            )}
          </Box>
        </HStack>
      )
    })
  }

  const renderTable = () => {
    return (
      <CardLayout w="full" padding={0}>
        {/* Table Header */}
        <HStack w="full" p={4} borderBottom="1px solid" borderColor="neutral1.6" bg="neutral1.3">
          <Body size="sm" bold flex="2">
            {t('Project')}
          </Body>
          <Body size="sm" bold flex="1">
            {t('Amount')}
          </Body>
          <Body size="sm" bold flex="1">
            {t('Status')}
          </Body>
          <Box flex="1" />
        </HStack>

        {renderTableRows()}
      </CardLayout>
    )
  }

  return (
    <VStack w="full" spacing={4} align="stretch">
      <VStack w="full" spacing={0} align="start">
        <H2 size="xl" medium>
          {t('Contributions')}
        </H2>
        <Body size="sm" color="neutral.11">
          {t('Contributions you made to campaigns that can be refunded.')}
        </Body>
      </VStack>
      {renderTable()}
      {refundRskModal.isOpen && refundRskModalProps.contribution && (
        <RefundRsk
          {...refundRskModal}
          contributionUUID={refundRskModalProps.contribution.uuid || ''}
          projectId={
            refundRskModalProps.contribution.sourceResource?.__typename === 'Project'
              ? refundRskModalProps.contribution.sourceResource.id
              : undefined
          }
        />
      )}
    </VStack>
  )
}
