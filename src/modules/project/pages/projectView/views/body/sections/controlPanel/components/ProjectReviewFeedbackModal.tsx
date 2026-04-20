import { ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import type { UseModalReturn } from '@/shared/hooks/useModal.tsx'
import type { ProjectReviewFragment, ProjectReviewPublicFragment } from '@/types/index.ts'

type ProjectReviewFeedback = ProjectReviewPublicFragment | Pick<ProjectReviewFragment, 'rejectionReasons' | 'reviewNotes'>

type ProjectReviewFeedbackModalProps = {
  modal: UseModalReturn
  review?: ProjectReviewFeedback
}

/** Displays the latest project review feedback so creators can address requested changes. */
export const ProjectReviewFeedbackModal = ({ modal, review }: ProjectReviewFeedbackModalProps) => {
  const rejectionReasons = review && 'rejectionReasons' in review ? review.rejectionReasons || [] : []
  const reviewNotes = review && 'reviewNotes' in review ? review.reviewNotes : undefined
  const hasFeedback = rejectionReasons.length > 0 || Boolean(reviewNotes)

  return (
    <Modal isOpen={modal.isOpen} onClose={modal.onClose} size="md" title={<H3 size="xl">{t('Review feedback')}</H3>}>
      <VStack w="full" spacing={4} alignItems="start">
        <Body size="sm">{t('The team requested updates before your project can be re-submitted.')}</Body>

        {rejectionReasons.length > 0 && (
          <CardLayout noborder backgroundColor="neutral1.3" w="full" spacing={3}>
            <Body bold>{t('Requested changes')}</Body>
            <UnorderedList spacing={2} pl={4}>
              {rejectionReasons.map((reason, index) => (
                <ListItem key={index}>
                  <Body>{reason}</Body>
                </ListItem>
              ))}
            </UnorderedList>
          </CardLayout>
        )}

        {reviewNotes && (
          <CardLayout noborder backgroundColor="neutral1.3" w="full" spacing={2}>
            <Body bold>{t('Notes')}</Body>
            <Body>{reviewNotes}</Body>
          </CardLayout>
        )}

        {!hasFeedback && <Body size="sm">{t('No written feedback was included with this review.')}</Body>}
      </VStack>
    </Modal>
  )
}
