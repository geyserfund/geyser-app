import { Button, Link, useDisclosure, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Body2 } from '../../../components/typography'
import { getPath, GeyserEmailVerificationDocUrl, WalletConnectDetails } from '../../../constants'
import { useAuthContext, useProjectContext } from '../../../context'
import { MfaAction, OtpResponseFragment, useUpdateWalletMutation, Wallet } from '../../../types'
import { useNotification } from '../../../utils'
import { VerifyYourEmail } from '../../otp'
import { ProjectCreationWalletConnectionForm } from '../../projectCreate'
import { ConnectionOption, useWalletForm } from '../../projectCreate/hooks/useWalletForm'

export const ProjectWallet = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const navigate = useNavigate()

  const { user } = useAuthContext()

  const { isOpen: emailVerifyOpen, onClose: emailVerifyOnClose, onOpen: emailVerifyOnOpen } = useDisclosure()

  const { project, refetch } = useProjectContext()

  const projectWallet: Wallet | undefined = useMemo(() => {
    return project?.wallets && project.wallets[0]
  }, [project])
  const isEdit = Boolean(projectWallet)

  const handleNext = () => {
    if (!project && !isEdit) {
      return
    }

    emailVerifyOnOpen()
  }

  const {
    handleConfirm,
    isFormDirty,
    connectionOption,
    lightningAddress,
    node,
    setConnectionOption,
    createWalletInput,
    isLightningAddressInValid,
  } = useWalletForm({
    defaultConnectionOption: projectWallet
      ? projectWallet.connectionDetails.__typename === WalletConnectDetails.LightningAddressConnectionDetails
        ? ConnectionOption.LIGHTNING_ADDRESS
        : ConnectionOption.PERSONAL_NODE
      : undefined,
    project,
    isEdit,
    onSubmit: handleNext,
  })

  const [updateWallet, { loading: updateWalletLoading }] = useUpdateWalletMutation({
    onCompleted() {
      handleWalletUpdateCompletion()
      emailVerifyOnClose()
      toast({
        status: 'success',
        title: 'Wallet updated successfully!',
      })
    },
    onError() {
      toast({
        status: 'error',
        title: 'Failed to update wallet.',
        description: 'Please try again',
      })
    },
  })

  const handleWalletUpdate = async (otp: number, otpData: OtpResponseFragment) => {
    updateWallet({
      variables: {
        input: {
          name: createWalletInput?.name,
          lndConnectionDetailsInput: createWalletInput?.lndConnectionDetailsInput,
          lightningAddressConnectionDetailsInput: createWalletInput?.lightningAddressConnectionDetailsInput,
          id: projectWallet?.id,
          twoFAInput: {
            OTP: {
              otp,
              otpVerificationToken: otpData.otpVerificationToken,
            },
          },
        },
      },
    })
  }

  const handleWalletUpdateCompletion = async () => {
    if (!project || isEdit) {
      refetch()
      return
    }

    navigate(getPath('project', project.name))
    toast({
      status: 'success',
      title: 'Wallet updated!',
      description: 'Project is now active',
    })
  }

  return (
    <>
      <VStack flexGrow={1} spacing="20px">
        <Body2 color="neutral.600">
          <Trans
            i18nKey={
              "The project wallet can only be changed by the project creator with a verified email, for security reasons. You can verify your email in your Profile's Settings. <0>Go to Profile Settings</0>"
            }
          >
            {
              "The project wallet can only be changed by the project creator with a verified email, for security reasons. You can verify your email in your Profile's Settings. "
            }
            <Link href={GeyserEmailVerificationDocUrl} isExternal>
              Go to Profile Settings
            </Link>
          </Trans>
        </Body2>
        {project && (
          <ProjectCreationWalletConnectionForm
            readOnly={!user.isEmailVerified}
            isEdit={isEdit}
            lightningAddress={lightningAddress}
            node={node}
            connectionOption={connectionOption}
            setConnectionOption={setConnectionOption}
          />
        )}
      </VStack>
      <Button
        justifySelf={'flex-end'}
        isLoading={updateWalletLoading}
        variant="primary"
        w="full"
        onClick={handleConfirm}
        isDisabled={!isFormDirty() || isLightningAddressInValid}
      >
        {t('Save')}
      </Button>
      <VerifyYourEmail
        isOpen={emailVerifyOpen}
        onClose={emailVerifyOnClose}
        action={MfaAction.ProjectWalletUpdate}
        handleVerify={handleWalletUpdate}
      />
    </>
  )
}
