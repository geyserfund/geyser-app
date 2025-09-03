import { Box, Button, HStack, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'

import { isViewingOwnProfileAtom } from '@/modules/profile/state/profileAtom.ts'
import { DownloadInvoice } from '@/modules/project/pages1/projectFunding/views/fundingSuccess/components/DownloadInvoice.tsx'
import { RefundRsk } from '@/modules/project/pages1/projectFunding/views/refundPayoutRsk/RefundRsk'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H3 } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { useProjectForProfileContributionsQuery, UserProjectContributionFragment } from '@/types'

import { TransactionTime } from '../../../../../../../components/molecules'
import { getPath } from '../../../../../../../shared/constants'
import { commaFormatted, convertSatsToUsdFormatted, toSmallImageUrl } from '../../../../../../../utils'

interface ContributionSummaryProps {
  contribution: UserProjectContributionFragment
}

export const ContributionSummary = ({ contribution }: ContributionSummaryProps) => {
  const { data, loading } = useProjectForProfileContributionsQuery({
    fetchPolicy: 'cache-first',
    skip: !contribution || !contribution.projectId,
    variables: {
      where: {
        id: contribution?.projectId,
      },
    },
  })

  const project = data?.projectGet

  const isViewingOwnProfile = useAtomValue(isViewingOwnProfileAtom)

  const refundRskModal = useModal()

  const handleRefundClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()
    refundRskModal.onOpen()
  }

  if (loading || !project) {
    return null
  }

  return (
    <>
      <CardLayout
        noborder
        hover
        to={getPath('project', project.name)}
        _hover={{ backgroundColor: 'neutral1.3' }}
        padding="0px"
        w="full"
        overflow={'visible'}
        spacing="0"
      >
        <HStack padding="10px" justifyContent="space-between">
          <HStack alignItems="start">
            <ImageWithReload
              width="20px"
              height="20px"
              objectFit="cover"
              src={toSmallImageUrl(project.thumbnailImage || '')}
              alt={`${project.title}-header-image`}
              borderRadius="8px"
            />
            <H3 size="md">{project.title}</H3>
          </HStack>
          <Body size="sm" dark medium>
            {commaFormatted(contribution.amount) ?? 0}{' '}
            <Body as="span" light>
              {`sats (${convertSatsToUsdFormatted({
                sats: contribution.amount,
                bitcoinQuote: contribution.bitcoinQuote,
              })})`}
            </Body>
          </Body>
        </HStack>

        <CardLayout
          key={contribution.id}
          padding="10px"
          paddingTop="0px"
          noborder
          backgroundColor="transparent"
          direction="row"
          alignItems="stretch"
          w="full"
        >
          <VStack flex={1} alignItems={'start'} justifyContent="end">
            <TransactionTime dateTime={contribution.confirmedAt} />

            {contribution.comment && <Body size="sm">{contribution.comment}</Body>}

            {contribution.media ? (
              <Box h={'178px'} bg={'neutral1.6'} pos={'relative'} borderRadius="8px">
                <Image
                  src={contribution.media}
                  alt={`tx-comment-${contribution.id}`}
                  objectFit={'cover'}
                  width="full"
                  height="full"
                  borderRadius="4px"
                />
              </Box>
            ) : null}
          </VStack>

          <HStack height="100%" alignItems={'start'} justifyContent="end" paddingTop="2px">
            <Button size="sm" variant="outline" onClick={handleRefundClick}>
              {t('Refund')}
            </Button>
            {isViewingOwnProfile && (
              <DownloadInvoice
                asIcon
                project={project}
                contributionId={contribution.id}
                buttonProps={{ size: 'sm', variant: 'outline' }}
              />
            )}
          </HStack>
        </CardLayout>
      </CardLayout>
      <RefundRsk {...refundRskModal} contribution={contribution} project={project} />
    </>
  )
}
