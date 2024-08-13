import { Button, ButtonProps, Link, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactLink } from 'react-router-dom'

import { useProjectWalletAPI } from '@/modules/project/API/useProjectWalletAPI'
import { useProjectAtom, useWalletAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography'

import { useAuthContext } from '../../../../../context'
import { VerifyYourEmail } from '../../../../../pages/otp'
import { getPath, GeyserEmailVerificationDocUrl, PathName, WalletConnectDetails } from '../../../../../shared/constants'
import { MfaAction, OtpResponseFragment, ProjectStatus, UpdateWalletInput } from '../../../../../types'
import { useCustomTheme, useNotification } from '../../../../../utils'
import { ProjectCreationWalletConnectionForm } from '../../../pages1/projectCreation'
import { ConnectionOption, useWalletForm } from '../../projectCreation/hooks/useWalletForm'
import { DashboardLayout } from '../common'

export const ProjectDashboardWallet = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const { user } = useAuthContext()

  const { colors } = useCustomTheme()

  const { isOpen: emailVerifyOpen, onClose: emailVerifyOnClose, onOpen: emailVerifyOnOpen } = useDisclosure()

  const { project } = useProjectAtom()
  const { wallet, walletConnectiondetails } = useWalletAtom()

  const isEdit = Boolean(walletConnectiondetails?.id)

  const walletLimits = wallet?.limits

  const { createWallet, updateWallet, queryProjectWallet, queryProjectWalletConnectionDetails } = useProjectWalletAPI()

  useEffect(() => {
    queryProjectWalletConnectionDetails.execute()
  }, [])

  const handleNext = () => {
    if (!project) return

    if (!isEdit && project.status === ProjectStatus.Draft && createWalletInput) {
      createWallet.execute({
        variables: { input: createWalletInput },
        onError() {
          toast({
            title: 'Error creating wallet',
            status: 'error',
          })
        },
        onCompleted() {
          queryProjectWallet.execute()
          toast({
            status: 'success',
            title: 'Wallet created successfully!',
          })
        },
      })
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
    walletLimits,
    isEdit,
    onSubmit: handleNext,
  })

  const handleWalletUpdate = async (otp: number, otpData: OtpResponseFragment) => {
    let input: UpdateWalletInput = {
      id: walletConnectiondetails?.id,
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

    updateWallet.execute({
      variables: {
        input,
      },
      onCompleted() {
        queryProjectWallet.execute()
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
  }

  const isReadOnly = !user.isEmailVerified && (!isEdit ? project?.status !== ProjectStatus.Draft : true)

  const currentWallet = isEdit
    ? walletConnectiondetails?.connectionDetails.__typename === WalletConnectDetails.LightningAddressConnectionDetails
      ? ConnectionOption.LIGHTNING_ADDRESS
      : ConnectionOption.PERSONAL_NODE
    : undefined

  const SaveButton = (props: ButtonProps) => {
    return (
      <Button
        variant="solid"
        colorScheme="primary1"
        isLoading={updateWallet.loading || createWallet.loading}
        onClick={handleConfirm}
        isDisabled={!isFormDirty() || isLightningAddressInValid || isReadOnly}
        {...props}
      >
        {t('Save')}
      </Button>
    )
  }

  return (
    <DashboardLayout
      desktopTitle={t('Connect wallet')}
      mobileTopNavRightComponent={<SaveButton />}
      deskTopBottomComponent={<SaveButton w="full" />}
    >
      <VStack flexGrow={1} spacing="20px" paddingX={{ base: 0, lg: 6 }}>
        <Body size="xs" light>
          <Trans
            i18nKey={
              'To edit your wallet, you must verify your email address for security reasons. You can do this in your <0> profile settings </0> <1>  Learn more in the Guide. </1> '
            }
          >
            {'To edit your wallet, you must verify your email address for security reasons. You can do this in your '}
            <ReactLink
              to={getPath('userProfileSettings', PathName.userId)}
              style={{ textDecoration: 'underline', color: colors.primary1[8] }}
            >
              profile settings
            </ReactLink>
            {'. '}
            <Link
              href={GeyserEmailVerificationDocUrl}
              isExternal
              style={{ textDecoration: 'underline', color: colors.primary1[8] }}
            >
              Learn more in the Guide.
            </Link>
          </Trans>
        </Body>
        {project && (
          <ProjectCreationWalletConnectionForm
            readOnly={isReadOnly}
            isEdit={isEdit}
            currentWallet={currentWallet}
            lightningAddress={lightningAddress}
            node={node}
            connectionOption={connectionOption}
            setConnectionOption={setConnectionOption}
            fee={fee}
            limits={limits}
          />
        )}
      </VStack>

      <VerifyYourEmail
        isOpen={emailVerifyOpen}
        onClose={emailVerifyOnClose}
        action={MfaAction.ProjectWalletUpdate}
        handleVerify={handleWalletUpdate}
      />
    </DashboardLayout>
  )
}