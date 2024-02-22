import { MutationHookOptions } from '@apollo/client'
import { useSetAtom } from 'jotai'
import { FormEventHandler, useEffect, useState } from 'react'

import {
  Exact,
  UpdateUserInput,
  UpdateUserMutation,
  UserForProfilePageFragment,
  useUpdateUserMutation,
} from '../../../../../types'
import { userProfileAtom } from '../../../state'

interface useEditProfileProps {
  user: UserForProfilePageFragment
  mutationProps: MutationHookOptions<
    UpdateUserMutation,
    Exact<{
      input: UpdateUserInput
    }>
  >
}

export const useEditProfile = ({ user, mutationProps }: useEditProfileProps) => {
  const [name, setName] = useState(() => user?.username || '')
  const [bio, setBio] = useState(() => user?.bio || '')
  const [imageUrl, setImageUrl] = useState(() => user?.imageUrl || '')

  const setUserProfile = useSetAtom(userProfileAtom)

  const [updateUser, { loading }] = useUpdateUserMutation({
    ...mutationProps,
    onCompleted(data) {
      setUserProfile((current) => ({ ...current, ...data.updateUser }))
      if (mutationProps.onCompleted) mutationProps.onCompleted(data)
    },
  })

  useEffect(() => {
    if (user) {
      setName(user.username)
      setBio(user.bio || '')
      setImageUrl(user.imageUrl || '')
    }
  }, [user])

  const onUploadImage = (url: string) => {
    setImageUrl(url)
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    updateUser({
      variables: { input: { id: user.id, username: name, bio, imageUrl } },
    })
  }

  return {
    name,
    setName,
    bio,
    setBio,
    imageUrl,
    onUploadImage,
    onSubmit,
    isLoading: loading,
  }
}
