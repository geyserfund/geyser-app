import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { RefundRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/RefundRsk.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { ProjectContributorFragment } from '@/types/index.ts'

export const FundedToCampaign = ({ contributorData }: { contributorData: ProjectContributorFragment }) => {
  const { project } = useProjectAtom()

  const refundModal = useModal()

  const contribution = contributorData.contributions[0]

  if (!contribution) {
    return null
  }

  return (
    <>
      <Feedback variant={FeedBackVariant.INFO}>
        <VStack spacing={1} align="stretch">
          <Body size="xl" bold>
            {t('Funded to campaign!')}
          </Body>
          <Body dark>
            {t(
              'You have contributed {{amount}} sats to this project. Your contribution is helping this project reach its goal!',
              { amount: contributorData.amountFunded },
            )}
          </Body>
          <HStack w="full" justifyContent="flex-end">
            <Button colorScheme="neutral1" variant="solid" size="lg">
              {t('Contribute more')}
            </Button>
            <Button colorScheme="neutral1" variant="solid" size="lg" onClick={refundModal.onOpen}>
              {t('Claim your funds')}
            </Button>
          </HStack>
        </VStack>
      </Feedback>
      <RefundRsk isOpen={true} onClose={() => {}} contributionUUID={contribution.uuid || ''} projectId={project.id} />
    </>
  )
}
