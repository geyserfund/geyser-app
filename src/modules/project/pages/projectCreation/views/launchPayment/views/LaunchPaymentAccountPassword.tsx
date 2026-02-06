import { useMutation } from '@apollo/client'
import { ButtonProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  decryptMnemonic,
  decryptSeedPayload,
  generateProjectKeysFromSeedHex,
  getSeedWords,
} from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { accountPasswordAtom } from '@/modules/project/forms/accountPassword/state/passwordStorageAtom.ts'
import { useAccountPasswordForm } from '@/modules/project/forms/accountPassword/useAccountPasswordForm.tsx'
import { MUTATION_PROJECT_RSK_EOA_SET } from '@/modules/project/graphql/mutation/projectMutation.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep, ProjectFundingStrategy, UserAccountKeysFragment } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { useUpdateProjectWithLastCreationStep } from '../../../hooks/useIsStepAhead.tsx'

type ProjectRskEoaSetMutation = {
  projectRskEoaSet: {
    id: string
    rskEoa?: string | null
  }
}

type ProjectRskEoaSetMutationVariables = {
  input: {
    projectId: string | number
    rskEoa: string
  }
}

export const LaunchPaymentAccountPassword = () => {
  const { project, partialUpdateProject } = useProjectAtom()
  const toast = useNotification()
  const navigate = useNavigate()
  const [isSettingProjectWallet, setIsSettingProjectWallet] = useState(false)

  useUserAccountKeys()

  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const accountPassword = useAtomValue(accountPasswordAtom)

  const [projectRskEoaSet] = useMutation<ProjectRskEoaSetMutation, ProjectRskEoaSetMutationVariables>(
    MUTATION_PROJECT_RSK_EOA_SET,
  )
  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.IdentityVerification,
    getPath('launchFinalize', project.id),
  )

  const shouldConfigureProjectWallet = project.fundingStrategy === ProjectFundingStrategy.TakeItAll && !project.rskEoa

  const passwordCopy = shouldConfigureProjectWallet
    ? {
        titles: {
          confirm: t('Confirm your password'),
          create: t('Configure your password'),
        },
        introText: {
          confirm: t(
            'Enter the password you previously configured. This will be used to generate a new wallet for your project.',
          ),
          create: t(
            'Enter an account password. This will be used to generate keys for your account and a new wallet for your project.',
          ),
        },
      }
    : undefined

  const handleAccountPasswordComplete = async (data?: UserAccountKeysFragment, passwordOverride?: string) => {
    if (!project?.id) {
      toast.error({ title: t('Missing project id') })
      return
    }

    const encryptedSeed = data?.encryptedSeed || userAccountKeys?.encryptedSeed
    const encryptedMnemonic = data?.encryptedMnemonic || userAccountKeys?.encryptedMnemonic
    if (!encryptedSeed) {
      toast.error({ title: t('Unable to find your account keys') })
      return
    }

    const password = passwordOverride || accountPassword || ''
    if (!password) {
      toast.error({ title: t('Missing account password') })
      return
    }

    setIsSettingProjectWallet(true)

    try {
      const decryptedSeedPayload = await decryptSeedPayload(encryptedSeed, password)
      let seedWords: string[] = []

      if (encryptedMnemonic) {
        const mnemonic = await decryptMnemonic(encryptedMnemonic, password)
        seedWords = getSeedWords('', mnemonic)
      }

      if (seedWords.length === 0) {
        seedWords = getSeedWords(decryptedSeedPayload.seed, decryptedSeedPayload.mnemonic)
      }

      if (shouldConfigureProjectWallet) {
        const projectKeys = generateProjectKeysFromSeedHex(decryptedSeedPayload.seed, project.id)

        const result = await projectRskEoaSet({
          variables: {
            input: {
              projectId: project.id,
              rskEoa: projectKeys.address,
            },
          },
        })

        const rskEoa = result.data?.projectRskEoaSet?.rskEoa || projectKeys.address
        partialUpdateProject({ rskEoa })
      }

      if (seedWords.length === 0) {
        updateProjectWithLastCreationStep()
        return
      }

      navigate(getPath('launchPaymentSeedWords', project.id), {
        state: { seedWords },
      })
    } catch (error) {
      toast.error({
        title: t('Failed to complete wallet setup'),
      })
    } finally {
      setIsSettingProjectWallet(false)
    }
  }

  const { renderForm, currentForm, titles } = useAccountPasswordForm({
    onComplete(data) {
      const password = currentForm.getValues?.('password') || ''
      handleAccountPasswordComplete(data, password)
    },
    isCreator: true,
    copy: passwordCopy,
  })

  const continueProps: ButtonProps = {
    type: 'submit',
    isLoading: Boolean(currentForm.isSubmitting || currentForm.formState?.isSubmitting || isSettingProjectWallet),
  }

  const backProps: ButtonProps = {
    onClick() {
      navigate(getPath('launchPaymentTaxId', project.id))
    },
  }

  return (
    <ProjectCreationPageWrapper
      title={titles}
      continueButtonProps={continueProps}
      backButtonProps={backProps}
      as="form"
      onSubmit={currentForm.onSubmit}
    >
      <VStack w="full" alignItems="start" gap={6}>
        {renderForm()}
      </VStack>
    </ProjectCreationPageWrapper>
  )
}
