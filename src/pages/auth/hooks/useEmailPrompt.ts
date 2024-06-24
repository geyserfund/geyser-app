import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useAuthContext } from '../../../context'
import { MUTATION_UPDATE_USER_EMAIL } from '../../../graphql/mutations/email'

type FormValues = Record<string, any>

const emailSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
})

export const useEmailPrompt = () => {
  const { user, setUser } = useAuthContext()
  const [shouldPrompt, setShouldPrompt] = useState(false)
  const [updateUserEmail] = useMutation(MUTATION_UPDATE_USER_EMAIL)

  useEffect(() => {
    const dontAskAgain = localStorage.getItem('dontAskAgain')
    if (!user.email && !user.hasSocialAccount && !dontAskAgain) {
      setShouldPrompt(true)
    }
  }, [user])

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(emailSchema),
  })

  const onSubmit = async (data: FormValues) => {
    const response = await updateUserEmail({ variables: { input: { email: data.email } } })
    if (response.data.userEmailUpdate) {
      setUser({ ...user, email: data.email })
      setShouldPrompt(false)
      localStorage.setItem('dontAskAgain', 'true')
    }
  }

  return { shouldPrompt, setShouldPrompt, handleSubmit, control, errors, onSubmit }
}
