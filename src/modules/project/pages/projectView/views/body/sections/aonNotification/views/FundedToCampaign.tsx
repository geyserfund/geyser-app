import { Button, HStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { RefundRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/RefundRsk.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { UserProjectContributionFragment } from '@/types/index.ts'

export const FundedToCampaign = ({ contribution }: { contribution: UserProjectContributionFragment }) => {
  const { project } = useProjectAtom()

  const refundModal = useModal()

  if (!contribution) {
    return null
  }

  return (
    <>
      <Feedback variant={FeedBackVariant.SUCCESS} iconProps={{ fontSize: '20px', marginTop: '2px' }}>
        <HStack w="full" flexWrap="wrap" spacing={0}>
          <Body bold>{t('You contributed to this project.')}</Body>
          <Button paddingY={0} colorScheme="neutral1" variant="ghost" size="sm" onClick={refundModal.onOpen}>
            <Body size="md" bold>
              {t('Claim refund')}
            </Body>
          </Button>
        </HStack>
      </Feedback>
      <RefundRsk {...refundModal} contributionUUID={contribution.uuid || ''} projectId={project.id} />
    </>
  )
}
