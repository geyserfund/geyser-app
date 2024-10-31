import { LazyQueryHookOptions } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useProjectPostsAPI } from '@/modules/project/API/useProjectPostsAPI'

import { useUnsavedAlert } from '../../../../../../../shared/hooks/useUnsavedAlert'
import {
  PostCreateInput,
  PostUpdateInput,
  ProjectPostQuery,
  ProjectPostQueryVariables,
  ProjectPostViewFragment,
  useProjectPostQuery,
} from '../../../../../../../types'
import { toInt, useNotification } from '../../../../../../../utils'

export type PostFormType = Pick<
  ProjectPostViewFragment,
  'id' | 'title' | 'description' | 'image' | 'markdown' | 'status' | 'postType'
> &
  Pick<PostCreateInput, 'projectGoalIds' | 'projectRewardUUIDs'>

const schema = yup.object({
  title: yup.string().required('This is a required field'),
})

interface UsePostFormProps {
  projectId: number
  postId?: number | string
  options?: LazyQueryHookOptions<ProjectPostQuery, ProjectPostQueryVariables>
  postTemplate?: ProjectPostViewFragment
  linkedGoalId?: string
  linkedRewardId?: string
}

export const usePostForm = ({
  projectId,
  postId,
  options,
  postTemplate = {} as ProjectPostViewFragment,
  linkedGoalId,
  linkedRewardId,
}: UsePostFormProps) => {
  const toast = useNotification()

  const [loading, setLoading] = useState(Boolean(postId))

  const { postCreate, postUpdate, postPublish } = useProjectPostsAPI()

  const { formState, setValue, watch, getValues, reset, control } = useForm<PostFormType>({
    defaultValues: {
      markdown: postTemplate.markdown || '',
      description: postTemplate.description || '',
      image: postTemplate.image || '',
      title: postTemplate.title || '',
      postType: postTemplate.postType || null,
      projectGoalIds: linkedGoalId ? [linkedGoalId] : [],
      projectRewardUUIDs: linkedRewardId ? [linkedRewardId] : [],
    },
    resolver: yupResolver(schema),
  })
  const { isDirty } = formState

  const resetForm = (post: ProjectPostViewFragment) => {
    reset({
      id: post.id,
      status: post.status,
      markdown: post.markdown,
      description: post.description,
      image: post.image,
      title: post.title,
      postType: post.postType || null,
      projectGoalIds: [
        ...(post.projectGoals?.inProgress?.map((goal) => goal.id) || []),
        ...(post.projectGoals?.completed?.map((goal) => goal.id) || []),
      ],
      projectRewardUUIDs: post.projectRewards.map((reward) => reward.uuid) || [],
    })
  }

  useProjectPostQuery({
    variables: {
      postId: toInt(postId),
    },
    skip: !postId,
    fetchPolicy: 'network-only',
    ...options,
    onError(error) {
      if (options?.onError) {
        options?.onError(error)
      }

      setLoading(false)
    },
    onCompleted(data) {
      if (data.post) {
        resetForm(data.post)
      }

      setLoading(false)
    },
  })

  useUnsavedAlert(isDirty)

  const savePost = useCallback(
    async (props?: { onCompleted?: Function }) => {
      if (!isDirty) {
        return
      }

      const post = getValues()

      if (postId || Boolean(post?.id)) {
        const input: PostUpdateInput = {
          markdown: post.markdown,
          description: post.description,
          postId: postId || toInt(post?.id),
          image: post.image,
          title: post.title,
          postType: post.postType,
          projectGoalIds: post.projectGoalIds,
          projectRewardUUIDs: post.projectRewardUUIDs,
        }
        await postUpdate.execute({
          variables: { input },
          onError() {
            toast.error({
              title: 'Post update failed',
              description: 'Please try again later',
            })
          },
          onCompleted(data) {
            resetForm(data.postUpdate)
            if (props?.onCompleted) {
              props.onCompleted()
            }
          },
        })
      } else {
        const input: PostCreateInput = {
          projectId: toInt(projectId),
          markdown: post.markdown,
          description: post.description || '',
          image: post.image,
          title: post.title || '',
          postType: post.postType,
          projectGoalIds: post.projectGoalIds,
          projectRewardUUIDs: post.projectRewardUUIDs,
        }
        await postCreate.execute({
          variables: { input },
          onError() {
            toast.error({
              title: 'Post creation failed',
              description: 'Please try again later',
            })
          },
          onCompleted(data) {
            resetForm(data.postCreate)
          },
        })
      }
      /** Don't add apollo query or mutation to useEffect dependency */
    },
    [postId, projectId, toast, resetForm, getValues, isDirty],
  )

  const postPublishAfterValidation = useCallback(
    async ({ onCompleted }: { onCompleted?: Function }) => {
      const post = getValues()
      if (!post.id) {
        toast.info({
          title: 'Cannot publish',
          description: 'Please edit your content before publish',
        })
        return
      }

      try {
        if (isDirty) {
          await savePost()
        }

        const postId = toInt(post.id)
        if (postId) {
          postPublish.execute({
            variables: {
              input: {
                postId,
              },
            },
            onCompleted(data) {
              resetForm(data.postPublish)
              if (onCompleted) {
                onCompleted()
              }

              toast.success({
                title: 'Post published',
                description: 'Your post is now live',
              })
            },
            onError() {
              toast.error({
                title: 'Post publish failed',
                description: 'Please try again later',
              })
            },
          })
        }
      } catch (error) {
        toast.error({
          title: 'Post publish failed',
          description: 'Please try again later',
        })
      }
    },
    /** Don't add apollo query or mutation to useEffect dependency */
    [isDirty, savePost, getValues, resetForm, toast],
  )

  return {
    loading,
    saving: postUpdate.loading || postCreate.loading,
    savePost,
    postPublish: postPublishAfterValidation,
    publishing: postPublish.loading,
    setValue,
    isDirty,
    watch,
    control,
  }
}
