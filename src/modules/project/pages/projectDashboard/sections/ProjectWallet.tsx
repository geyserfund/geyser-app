import { Button, Link, useDisclosure, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactLink, useNavigate } from 'react-router-dom'

import { Body2 } from '../../../../../components/typography'
import { getPath, GeyserEmailVerificationDocUrl, PathName, WalletConnectDetails } from '../../../../../shared/constants'
import { useAuthContext } from '../../../../../context'
import { VerifyYourEmail } from '../../../../../pages/otp'
import {
  MfaAction,
  OtpResponseFragment,
  ProjectStatus,
  UpdateWalletInput,
  useCreateWalletMutation,
  useUpdateWalletMutation,
  Wallet,
} from '../../../../../types'
import { useNotification } from '../../../../../utils'
import { useProjectContext } from '../../../context'
import { ProjectCreationWalletConnectionForm } from '../../projectCreate'
import { ConnectionOption, useWalletForm } from '../../projectCreate/hooks/useWalletForm'

export const ProjectWallet = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const navigate = useNavigate()

  const { user } = useAuthContext()

  const { isOpen: emailVerifyOpen, onClose: emailVerifyOnClose, onOpen: emailVerifyOnOpen } = useDisclosure()

  const { project, walletLimits, refetch, updateProject } = useProjectContext()

  const projectWallet: Wallet | undefined = useMemo(() => {
    return project?.wallets && project.wallets[0]
  }, [project])
  const isEdit = Boolean(projectWallet)

  const handleNext = () => {
    if (!project) return

    if (!isEdit && project.status === ProjectStatus.Draft && createWalletInput) {
      createWallet({ variables: { input: createWalletInput } })
      return
    }

    if (!isEdit) {
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
    fee,
    limits,
  } = useWalletForm({
    defaultConnectionOption: projectWallet
      ? projectWallet.connectionDetails.__typename === WalletConnectDetails.LightningAddressConnectionDetails
        ? ConnectionOption.LIGHTNING_ADDRESS
        : ConnectionOption.PERSONAL_NODE
      : undefined,
    project,
    walletLimits,
    isEdit,
    onSubmit: handleNext,
  })

  const [createWallet, { loading: isCreateWalletLoading }] = useCreateWalletMutation({
    onError() {
      toast({
        title: 'Error creating wallet',
        status: 'error',
      })
    },
    onCompleted(data) {
      if (data.walletCreate) {
        updateProject({ wallets: [data.walletCreate] })
        toast({
          status: 'success',
          title: 'Wallet created successfully!',
        })
      }
    },
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
    let input: UpdateWalletInput = {
      id: projectWallet?.id,
      name: createWalletInput?.name,
      lndConnectionDetailsInput: createWalletInput?.lndConnectionDetailsInput,
      lightningAddressConnectionDetailsInput: createWalletInput?.lightningAddressConnectionDetailsInput,
      twoFAInput: {
        OTP: {
          otp,
          otpVerificationToken: otpData.otpVerificationToken,
        },
      },
    }

    if (connectionOption === ConnectionOption.PERSONAL_NODE) {
      input = { ...input, feePercentage: createWalletInput?.feePercentage }
    }

    updateWallet({
      variables: {
        input,
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

  const isReadOnly = !user.isEmailVerified && (!isEdit ? project?.status !== ProjectStatus.Draft : true)

  return (
    <>
      <VStack flexGrow={1} spacing="20px">
        <Body2 color="neutral.600">
          <Trans
            i18nKey={
              'To edit your wallet, you must verify your email address for security reasons. You can do this in your <0> profile settings </0> <1>  Learn more in the Guide. </1> '
            }
          >
            {'To edit your wallet, you must verify your email address for security reasons. You can do this in your '}
            <ReactLink to={getPath('userProfileSettings', PathName.userId)} style={{ textDecoration: 'underline' }}>
              profile settings
            </ReactLink>
            {'. '}
            <Link href={GeyserEmailVerificationDocUrl} isExternal>
              Learn more in the Guide.
            </Link>
          </Trans>
        </Body2>
        {project && (
          <ProjectCreationWalletConnectionForm
            readOnly={isReadOnly}
            isEdit={isEdit}
            lightningAddress={lightningAddress}
            node={node}
            connectionOption={connectionOption}
            setConnectionOption={setConnectionOption}
            fee={fee}
            limits={limits}
          />
        )}
      </VStack>
      <Button
        justifySelf={'flex-end'}
        isLoading={updateWalletLoading || isCreateWalletLoading}
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
