import { yupResolver } from '@hookform/resolvers/yup'
import { useAtomValue, useSetAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useAuthContext } from '../../../context'
import { useUserEmailUpdateMutation } from '../../../types'
import { dontAskAgainAtom, shouldPromptAtom } from '../state/emailPromptAtom'

type UseEmailPromptProps = {
  afterEmailUpdate?: () => void
  emailRequired?: boolean
}

export type EmailPromptFormValues = {
  dontAskAgain?: boolean
  email?: string
  receiveGeyserUpdates?: boolean
}

const getEmailSchema = (emailRequired: boolean) =>
  yup.object().shape({
    dontAskAgain: yup.boolean(),
    email: emailRequired
      ? yup.string().email('Invalid email').required('Email is required')
      : yup
          .string()
          .email('Invalid email')
          .when('dontAskAgain', {
            is: false,
            then: (schema) => schema.required('Email is required'),
            otherwise: (schema) => schema.notRequired(),
          }),
  })

export const useEmailPrompt = ({ afterEmailUpdate, emailRequired = false }: UseEmailPromptProps = {}) => {
  const { user, setUser } = useAuthContext()
  const setDontAskAgain = useSetAtom(dontAskAgainAtom)
  const shouldPrompt = useAtomValue(shouldPromptAtom)
  const [updateUserEmail] = useUserEmailUpdateMutation()

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<EmailPromptFormValues>({
    resolver: yupResolver(getEmailSchema(emailRequired)),
    defaultValues: {
      email: user.email || '',
      dontAskAgain: false,
      receiveGeyserUpdates: true,
    },
  })

  const enableSave = isValid && isDirty

  const onSubmit = async (data: EmailPromptFormValues): Promise<boolean> => {
    const email = data.email?.trim()

    if (email) {
      try {
        const result = await updateUserEmail({
          variables: { input: { email } },
        })
        const updatedEmail = result.data?.userEmailUpdate.email

        if (!updatedEmail) {
          return false
        }

        setUser((previousUser) => ({ ...previousUser, email: updatedEmail }))
        setDontAskAgain(true)
        afterEmailUpdate?.()

        return true
      } catch {
        return false
      }
    }

    if (!emailRequired && data.dontAskAgain) {
      setDontAskAgain(true)
      return true
    }

    return false
  }

  return { shouldPrompt, handleSubmit, control, errors, onSubmit, enableSave, reset }
}
