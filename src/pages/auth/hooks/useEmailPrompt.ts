import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useAuthContext } from '../../../context'
import { MUTATION_UPDATE_USER_EMAIL } from '../../../graphql/mutations/email'

type FormValues = Record<string, any>

const emailSchema = yup.object().shape({
  dontAskAgain: yup.boolean(),
  email: yup
    .string()
    .email('Invalid email')
    .when('dontAskAgain', {
      is: false,
      then: (schema) => schema.required('Email is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
})

export const useEmailPrompt = () => {
  const { user, setUser } = useAuthContext()
  const [shouldPrompt, setShouldPrompt] = useState(false)
  const [enableSave, setEnableSave] = useState(false)
  const [updateUserEmail] = useMutation(MUTATION_UPDATE_USER_EMAIL)

  useEffect(() => {
    const dontAskAgain = localStorage.getItem('dontAskAgain')
    if (!user.email && !dontAskAgain) {
      setShouldPrompt(true)
    }
  }, [user])

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(emailSchema),
    defaultValues: {
      email: user.email,
      dontAskAgain: false,
    },
  })

  useEffect(() => {
    setEnableSave(isValid && isDirty)
  }, [isValid, isDirty])

  const onSubmit = async (data: FormValues) => {
    if (data.email) {
      const response = await updateUserEmail({ variables: { input: { email: data.email } } })
      if (response.data.userEmailUpdate) {
        setUser({ ...user, email: data.email })
        setShouldPrompt(false)
      }

      return
    }

    if (data.dontAskAgain) {
      localStorage.setItem('dontAskAgain', 'true')
    }
  }

  return { shouldPrompt, setShouldPrompt, handleSubmit, control, errors, onSubmit, enableSave, reset }
}
