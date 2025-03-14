import { useState } from 'react'

import { useModal } from '@/shared/hooks/useModal.tsx'
import {
  UserVerificationLevelInput,
  UserVerificationTokenGenerateResponse,
  useUserVerificationTokenGenerateMutation,
} from '@/types/index.ts'

export const useUserVerificationModal = () => {
  const [userVerificationToken, setUserVerificationToken] = useState<UserVerificationTokenGenerateResponse>()

  const [generateVerificationToken, { loading: generateVerificationTokenLoading }] =
    useUserVerificationTokenGenerateMutation()

  const userVerificationModal = useModal()

  const startVerification = async (verificationLevel: UserVerificationLevelInput) => {
    await generateVerificationToken({
      variables: {
        input: { verificationLevel: verificationLevel || UserVerificationLevelInput.Level_3 },
      },
      onCompleted(data) {
        setUserVerificationToken(data.userVerificationTokenGenerate)
        userVerificationModal.onOpen()
      },
    })
  }

  return {
    userVerificationModal,
    startVerification,
    userVerificationToken,
    generateVerificationTokenLoading,
  }
}
