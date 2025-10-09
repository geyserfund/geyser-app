import { Badge, Box, HStack, Image, ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectReviewStatus, useProjectReviewRequestMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/tools/Notification.tsx'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { addProjectReviewAtom, latestProjectReviewAtom } from '../../../states/projectReviewAtom.ts'

// Review status types including the not-submitted state
type ReviewStatusType = ProjectReviewStatus | 'NOT_SUBMITTED'

interface ReviewStatusInfo {
  label: string
  colorScheme: string
  variant: 'solid' | 'soft' | 'outline'
  imageUrl: string
}

export const LaunchReview = ({ handleNext }: { handleNext: () => void }) => {
  const { project } = useProjectAtom()
  const navigate = useNavigate()
  const toast = useNotification()

  const latestProjectReview = useAtomValue(latestProjectReviewAtom)
  const addProjectReview = useSetAtom(addProjectReviewAtom)

  const [projectReviewRequest, { loading: submittingReview }] = useProjectReviewRequestMutation({
    onCompleted(data) {
      toast.success({
        title: t('Review submitted'),
        description: t('Your project has been submitted for review. You will be notified by email of any updates.'),
      })

      // Refetch the review data to get the latest status
      addProjectReview(data.projectReviewRequest)
    },
    onError(error) {
      toast.error({
        title: t('Submission failed'),
        description: t('Failed to submit project for review. Please try again.'),
      })
    },
  })

  // Determine actual review status from data or default to NOT_SUBMITTED
  // If there is no latestReview or if latest review is undefined, then it is not submitted yet
  const currentStatus: ReviewStatusType = latestProjectReview?.status || 'NOT_SUBMITTED'

  console.log('currentStatus', currentStatus)

  /** Review status configurations */
  const reviewStatusConfig: Record<ReviewStatusType, ReviewStatusInfo> = {
    [ProjectReviewStatus.Pending]: {
      label: t('Pending review'),
      colorScheme: 'info',
      variant: 'soft',
      imageUrl: 'https://picsum.photos/400/200?random=1',
    },
    [ProjectReviewStatus.Accepted]: {
      label: t('Approved'),
      colorScheme: 'success',
      variant: 'soft',
      imageUrl: 'https://picsum.photos/400/200?random=2',
    },
    [ProjectReviewStatus.RevisionsRequested]: {
      label: t('Updates Requested'),
      colorScheme: 'error',
      variant: 'soft',
      imageUrl: 'https://picsum.photos/400/200?random=3',
    },
    [ProjectReviewStatus.Rejected]: {
      label: t('Rejected'),
      colorScheme: 'error',
      variant: 'solid',
      imageUrl: 'https://picsum.photos/400/200?random=4',
    },
    NOT_SUBMITTED: {
      label: t('Not submitted yet'),
      colorScheme: 'warning',
      variant: 'soft',
      imageUrl: 'https://picsum.photos/400/200?random=5',
    },
  }

  /** Handle review submission */
  const handleSubmitForReview = async () => {
    await projectReviewRequest({
      variables: {
        input: {
          projectId: project.id,
        },
      },
    })
  }

  /** Handle continue to next step after approval */
  const handleContinue = () => {
    handleNext()
  }

  /** Determine button configuration based on review status */
  const getButtonConfig = () => {
    switch (currentStatus) {
      case 'NOT_SUBMITTED':
      case ProjectReviewStatus.RevisionsRequested:
        return {
          label: t('Submit for review'),
          onClick: handleSubmitForReview,
          isDisabled: submittingReview,
          isLoading: submittingReview,
          colorScheme: 'primary1',
        }

      case ProjectReviewStatus.Pending:
        return {
          label: t('Submitted'),
          isDisabled: true,
          colorScheme: 'neutral1',
        }

      case ProjectReviewStatus.Rejected:
        return {
          label: t('Cannot proceed'),
          isDisabled: true,
          colorScheme: 'error',
        }

      case ProjectReviewStatus.Accepted:
        return {
          label: t('Continue'),
          onClick: handleContinue,
          isDisabled: false,
          colorScheme: 'primary1',
        }

      default:
        return {
          label: t('Submit for review'),
          onClick: handleSubmitForReview,
          isDisabled: true,
          colorScheme: 'neutral1',
        }
    }
  }

  /** Render review status content based on current status */
  const renderReviewStatusContent = () => {
    const rejectionReasons = latestProjectReview?.rejectionReasons || []

    switch (currentStatus) {
      case 'NOT_SUBMITTED':
        return (
          <VStack spacing={4} alignItems="start" w="full">
            <Body>
              {t(
                'Each all-or-nothing project is reviewed by our team before it can launch. During the review process we may provide feedback on our project to help you improve it. This ensures a higher quality of projects on the platform.',
              )}
            </Body>
            <Body>
              {t(
                "The review process usually completes within 3 business days. You will be notified by email for every update of your project's review status, or you can find the current status on this page.",
              )}
            </Body>
          </VStack>
        )

      case ProjectReviewStatus.Pending:
        return (
          <Body>
            {t(
              "You have successfully submitted the project for review. The review process usually completes within 1 to 2 business days. You will be notified by email for every update of your project's review status, or you can find the current status on this page.",
            )}
          </Body>
        )

      case ProjectReviewStatus.Accepted:
        return null // Just the status badge for approved

      case ProjectReviewStatus.RevisionsRequested:
        return (
          <VStack spacing={4} alignItems="start" w="full">
            <Body>{t('The team reviewed your project and requested some revisions.')}</Body>
            {rejectionReasons && rejectionReasons.length > 0 && (
              <CardLayout noborder backgroundColor="neutral1.3" w="full" spacing={3}>
                <Body bold>{t('Additional Details')}</Body>
                <UnorderedList spacing={2} pl={4}>
                  {rejectionReasons.map((reason, index) => (
                    <ListItem key={index}>
                      <Body>{reason}</Body>
                    </ListItem>
                  ))}
                </UnorderedList>
              </CardLayout>
            )}
          </VStack>
        )

      case ProjectReviewStatus.Rejected:
        return (
          <VStack spacing={4} alignItems="start" w="full">
            <Body>{t('Unfortunately your project failed the review process')}</Body>
            {rejectionReasons && rejectionReasons.length > 0 && (
              <CardLayout noborder backgroundColor="neutral1.3" w="full" spacing={3}>
                <Body bold>{t('Additional Details')}</Body>
                <UnorderedList spacing={2} pl={4}>
                  {rejectionReasons.map((reason, index) => (
                    <ListItem key={index}>
                      <Body>{reason}</Body>
                    </ListItem>
                  ))}
                </UnorderedList>
              </CardLayout>
            )}
          </VStack>
        )

      default:
        return null
    }
  }

  const continueButtonProps = getButtonConfig()

  const backButtonProps = {
    onClick: () => navigate(getPath('launchPayment', project.id)),
  }

  return (
    <ProjectCreationPageWrapper
      title={t('Project review & launch')}
      backButtonProps={backButtonProps}
      continueButtonProps={continueButtonProps}
    >
      <VStack spacing={8} w="full" alignItems="start">
        {/* Status Illustration */}
        <Box w="full" display="flex" justifyContent="center">
          <Image
            src={reviewStatusConfig[currentStatus].imageUrl}
            alt={`${reviewStatusConfig[currentStatus].label} illustration`}
            maxWidth="400px"
            width="100%"
            height="200px"
            objectFit="cover"
            borderRadius="lg"
          />
        </Box>

        {/* Review Status Section */}
        <VStack spacing={4} w="full" alignItems="start">
          <HStack w="full" justifyContent="space-between" alignItems="center">
            <H3 bold>{t('Review Status')}</H3>
            <Badge
              size="lg"
              colorScheme={reviewStatusConfig[currentStatus].colorScheme}
              variant={reviewStatusConfig[currentStatus].variant}
            >
              {reviewStatusConfig[currentStatus].label}
            </Badge>
          </HStack>

          {renderReviewStatusContent()}
        </VStack>
      </VStack>
    </ProjectCreationPageWrapper>
  )
}
