import { Button, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiArrowLeft } from 'react-icons/pi'
import { Link, useNavigate, useParams } from 'react-router'

import { BottomNavBarContainer } from '@/modules/navigation/components/bottomNav'
import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectNavigation } from '@/modules/project/navigation/ProjectNavigation.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'
import { useFollowProject } from '@/shared/hooks/graphqlState'
import { useProjectGoalQuery } from '@/types'

import { GoalModal } from '../../components/GoalModal.tsx'
import { PostsUpdates } from '../../components/PostsUpdates'
import { useGoalsModal } from '../../hooks'
import { FollowButton } from '../body/components'
import { GoalContributeButton, GoalInProgress } from './components'
import { GoalShare } from './components/GoalShare'

export const GoalView = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { project, isProjectOwner } = useProjectAtom()

  const { isFollowed } = useFollowProject(project)

  const { goalId } = useParams<{ goalId: string }>()

  const { loading, data } = useProjectGoalQuery({
    skip: !goalId,
    fetchPolicy: 'network-only',
    variables: {
      input: goalId,
    },
  })

  const { onGoalModalOpen, isGoalinEditMode } = useGoalsModal()

  const goal = data?.projectGoal

  if (loading) {
    return <GoalViewSkeleton />
  }

  if (!goal) {
    return null
  }

  return (
    <VStack w="full" paddingBottom={28}>
      <TopNavContainerBar>
        <Button
          as={Link}
          to={getPath('projectGoals', project?.name)}
          size="lg"
          variant="ghost"
          colorScheme="neutral1"
          leftIcon={<PiArrowLeft />}
        >
          {t('All goals')}
        </Button>
        <HStack spacing={4}>
          {!isProjectOwner && !isFollowed && <FollowButton project={project} withLabel />}
          {isFollowed && <GoalShare goal={goal} />}
          <GoalContributeButton projectGoalId={goal.id} isNavButton />
        </HStack>
      </TopNavContainerBar>
      <CardLayout w="full" direction="row" justifyContent="center" paddingY={{ base: 6, lg: 12 }} mobileDense>
        <VStack maxWidth={dimensions.project.goals.view.maxWidth} w="full" spacing={6}>
          <GoalInProgress
            key={goal.id}
            goal={goal}
            isEditing={isGoalinEditMode}
            onOpenGoalModal={onGoalModalOpen}
            goalView
          />

          {isProjectOwner && (
            <CardLayout w={'full'} padding={3}>
              <VStack w={'full'} p={0}>
                <Body size="md" medium>
                  {t(
                    'Engage your community, followers, contributors, and product purchasers by sending them an update about your product via email.',
                  )}
                </Body>
                <Button
                  w="full"
                  variant="solid"
                  size="lg"
                  colorScheme="primary1"
                  onClick={() => {
                    navigate(`${getPath('projectPostCreate', project?.name)}?goalId=${goal.id}`)
                  }}
                >
                  {t('Write an update')}
                </Button>
              </VStack>
            </CardLayout>
          )}
          {goal.posts.length > 0 && (
            <VStack w="full" alignItems="flex-start" spacing={2}>
              <Body size="xl" bold>
                {t('Goal updates')}
              </Body>
              <PostsUpdates posts={goal.posts} />
            </VStack>
          )}
        </VStack>
      </CardLayout>
      <BottomNavBarContainer direction="column" paddingBottom={2}>
        <GoalContributeButton projectGoalId={goal.id} isNavButton displayOnMobile />
        <ProjectNavigation inBottomBar />
      </BottomNavBarContainer>
      <GoalModal />
    </VStack>
  )
}

export const GoalViewSkeleton = () => {
  return (
    <VStack w="full" paddingBottom={28}>
      <TopNavContainerBar>
        <SkeletonLayout height="40px" width="120px" /> {/* Back button */}
      </TopNavContainerBar>

      <CardLayout w="full" direction="row" justifyContent="center" paddingY={{ base: 6, lg: 12 }}>
        <VStack maxWidth={dimensions.project.goals.view.maxWidth} w="full" spacing={6}>
          <VStack w="full" spacing={4}>
            <HStack w="full" justifyContent="space-between">
              <SkeletonLayout height="24px" width="200px" /> {/* Title */}
              <SkeletonLayout height="40px" width="120px" display={{ base: 'none', lg: 'block' }} /> {/* Edit button */}
            </HStack>
            <SkeletonLayout height="100px" width="100%" /> {/* Description */}
            <HStack w="full" justifyContent="space-between">
              <SkeletonLayout height="24px" width="150px" /> {/* Progress info */}
              <SkeletonLayout height="24px" width="100px" /> {/* Date */}
            </HStack>
          </VStack>

          <CardLayout w="full" padding={3}>
            <VStack w="full" spacing={4}>
              <SkeletonLayout height="20px" width="90%" /> {/* Text */}
              <SkeletonLayout height="48px" width="100%" /> {/* Button */}
            </VStack>
          </CardLayout>

          <VStack w="full" alignItems="flex-start" spacing={4}>
            <SkeletonLayout height="24px" width="150px" /> {/* Updates title */}
            <VStack w="full" spacing={3}>
              {[1, 2, 3].map((i) => (
                <SkeletonLayout key={i} height="80px" width="100%" /> /* Post items */
              ))}
            </VStack>
          </VStack>
        </VStack>
      </CardLayout>
    </VStack>
  )
}
