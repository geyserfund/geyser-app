import { Badge, HStack, Icon, ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import type { IconType } from 'react-icons'
import { PiCheckCircle, PiHourglassMedium, PiPaperPlaneTilt, PiPencilSimpleLine, PiXCircle } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { isLabifOpenFundingProject } from '@/modules/project/domain/labifOpenFunding.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { AlertDialogue } from '@/shared/molecules/AlertDialogue.tsx'
import { ProjectReviewStatus, useProjectReviewRequestMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/tools/Notification.tsx'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import {
  addProjectReviewAtom,
  latestProjectReviewAtom,
  latestProjectReviewStatusAtom,
  NOT_SUBMITTED_REVIEW_STATUS,
  ProjectReviewStatusWithFallback,
} from '../../../states/projectReviewAtom.ts'

interface ReviewStatusInfo {
  label: string
  colorScheme: string
  variant: 'solid' | 'soft' | 'outline'
  icon: IconType
  iconColor: string
}

export const LaunchReview = ({ handleNext }: { handleNext: () => void }) => {
  const { project } = useProjectAtom()
  const isLabifOpenFunding = isLabifOpenFundingProject(project)
  const navigate = useNavigate()
  const toast = useNotification()
  const submitReviewConfirmModal = useModal()

  const latestProjectReview = useAtomValue(latestProjectReviewAtom)
  const latestProjectReviewStatus = useAtomValue(latestProjectReviewStatusAtom)
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

  const currentStatus: ProjectReviewStatusWithFallback = latestProjectReviewStatus

  /** Review status configurations */
  const reviewStatusConfig: Record<ProjectReviewStatusWithFallback, ReviewStatusInfo> = {
    [ProjectReviewStatus.Pending]: {
      label: t('Pending review'),
      colorScheme: 'info',
      variant: 'soft',
      icon: PiHourglassMedium,
      iconColor: 'info.11',
    },
    [ProjectReviewStatus.Accepted]: {
      label: t('Approved'),
      colorScheme: 'success',
      variant: 'soft',
      icon: PiCheckCircle,
      iconColor: 'success.11',
    },
    [ProjectReviewStatus.RevisionsRequested]: {
      label: t('Updates Requested'),
      colorScheme: 'error',
      variant: 'soft',
      icon: PiPencilSimpleLine,
      iconColor: 'error.11',
    },
    [ProjectReviewStatus.Rejected]: {
      label: t('Rejected'),
      colorScheme: 'error',
      variant: 'solid',
      icon: PiXCircle,
      iconColor: 'error.11',
    },
    [NOT_SUBMITTED_REVIEW_STATUS]: {
      label: t('Not submitted yet'),
      colorScheme: 'warning',
      variant: 'soft',
      icon: PiPaperPlaneTilt,
      iconColor: 'primary1.11',
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

  const handleSubmitForReviewWithConfirmation = async () => {
    submitReviewConfirmModal.onClose()
    await handleSubmitForReview()
  }

  /** Handle continue to next step after approval */
  const handleContinue = () => {
    handleNext()
  }

  /** Determine button configuration based on review status */
  const getButtonConfig = () => {
    switch (currentStatus) {
      case NOT_SUBMITTED_REVIEW_STATUS:
      case ProjectReviewStatus.RevisionsRequested:
        return {
          label: t('Submit for review'),
          onClick: submitReviewConfirmModal.onOpen,
          isDisabled: submittingReview,
          isLoading: submittingReview,
        }

      case ProjectReviewStatus.Pending:
        return {
          label: t('Submitted'),
          isDisabled: true,
        }

      case ProjectReviewStatus.Rejected:
        return {
          label: t('Cannot proceed'),
          isDisabled: true,
        }

      case ProjectReviewStatus.Accepted:
        return {
          label: t('Continue'),
          onClick: handleContinue,
          isDisabled: false,
        }

      default:
        return {
          label: t('Submit for review'),
          onClick: submitReviewConfirmModal.onOpen,
          isDisabled: true,
        }
    }
  }

  /** Render review status content based on current status */
  const renderReviewStatusContent = () => {
    const rejectionReasons = latestProjectReview?.rejectionReasons || []

    switch (currentStatus) {
      case NOT_SUBMITTED_REVIEW_STATUS:
        return (
          <VStack spacing={4} alignItems="start" w="full">
            <Body>
              {t(
                'Each project is reviewed by our team before it can launch. During the review process we may provide feedback on your project to help you improve it. This ensures a higher quality of projects on the platform.',
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
        return (
          <Body>
            {t(
              'Your project has been successfully reviewed and is ready for launch! Click "Continue" to move forward.',
            )}
          </Body>
        )

      case ProjectReviewStatus.RevisionsRequested:
        return (
          <VStack spacing={4} alignItems="start" w="full">
            <Body>{t('The team reviewed your project and requested some revisions.')}</Body>
            {rejectionReasons && rejectionReasons.length > 0 && (
              <CardLayout w="full" spacing={3} padding={4} borderRadius="innerCard" boxShadow="none">
                <Body bold>{t('Rejection Reasons')}</Body>
                <UnorderedList spacing={2} pl={4}>
                  {rejectionReasons.map((reason, index) => (
                    <ListItem key={index}>
                      <Body>{reason}</Body>
                    </ListItem>
                  ))}
                </UnorderedList>
                {latestProjectReview?.reviewNotes && (
                  <>
                    <Body bold>{t('Notes:')}</Body>
                    <Body>{latestProjectReview?.reviewNotes}</Body>
                  </>
                )}
              </CardLayout>
            )}
          </VStack>
        )

      case ProjectReviewStatus.Rejected:
        return (
          <VStack spacing={4} alignItems="start" w="full">
            <Body>{t('Unfortunately your project failed the review process')}</Body>
            {rejectionReasons && rejectionReasons.length > 0 && (
              <CardLayout w="full" spacing={3} padding={4} borderRadius="innerCard" boxShadow="none">
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
    onClick: () => navigate(getPath(isLabifOpenFunding ? 'launchPayment' : 'launchAboutYou', project.id)),
  }

  return (
    <ProjectCreationPageWrapper
      title={t('Project review & launch')}
      backButtonProps={backButtonProps}
      continueButtonProps={continueButtonProps}
    >
      <VStack spacing={8} w="full" alignItems="start">
        {/* Review Status Section */}
        <CardLayout spacing={4} w="full" alignItems="start">
          <HStack w="full" justifyContent="space-between" alignItems="center">
            <HStack spacing={3}>
              <Icon
                as={reviewStatusConfig[currentStatus].icon}
                boxSize="28px"
                color={reviewStatusConfig[currentStatus].iconColor}
                flexShrink={0}
                aria-hidden
              />
              <H3 bold>{t('Review Status')}</H3>
            </HStack>
            <Badge
              size="lg"
              colorScheme={reviewStatusConfig[currentStatus].colorScheme}
              variant={reviewStatusConfig[currentStatus].variant}
            >
              {reviewStatusConfig[currentStatus].label}
            </Badge>
          </HStack>

          {renderReviewStatusContent()}
        </CardLayout>
      </VStack>
      <AlertDialogue
        title={t('Submit for review')}
        description={t(
          'You cannot update your project details before the project is reviewed, so make sure all of the project details are accurate before submitting.',
        )}
        hasCancel
        positiveButtonProps={{
          children: t('Submit for review'),
          isLoading: submittingReview,
          onClick: handleSubmitForReviewWithConfirmation,
        }}
        {...submitReviewConfirmModal}
      />
    </ProjectCreationPageWrapper>
  )
}
