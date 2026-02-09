import { Button, ButtonProps, HStack, Icon, Link, useDisclosure, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { PiPlus } from 'react-icons/pi'
import { PiPencil } from 'react-icons/pi'
import { Link as ReactLink } from 'react-router'

import { VerifyYourEmail } from '@/modules/auth/otp/VerifyYourEmail.tsx'
import { useProjectWalletAPI } from '@/modules/project/API/useProjectWalletAPI'
import { useProjectAtom, useWalletAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks/useModal.tsx'

import { useAuthContext } from '../../../../../../context/index.ts'
import {
  getPath,
  GeyserEmailVerificationDocUrl,
  PathName,
  WalletConnectDetails,
} from '../../../../../../shared/constants/index.ts'
import {
  LightningAddressConnectionDetails,
  LndConnectionDetailsPrivate,
  LndNodeType,
  ProjectFundingStrategy,
  MfaAction,
  NwcConnectionDetailsPrivate,
  OtpResponseFragment,
  UpdateWalletInput,
} from '../../../../../../types/index.ts'
import { isDraft, isPrelaunch, useCustomTheme, useNotification } from '../../../../../../utils/index.ts'
import { ConnectionOption, useWalletForm } from '../../../projectCreation/hooks/useWalletForm.tsx'
import { ConnectionDetails } from '../../../projectCreation/views/launchPayment/components/ConnectionDetails.tsx'
import { ConnectWalletModal } from '../../../projectCreation/views/launchPayment/components/ConnectWalletModal.tsx'
import { DashboardLayout } from '../../common/index.ts'
import { VerificationModal } from '../../components/VerificationModal.tsx'
import { EnableFiatContributions } from './components/EnableFiatContributions.tsx'
import { WalletLimitsAndVerification } from './components/WalletLimitsAndVerification.tsx'
export const ProjectDashboardWallet = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const { user } = useAuthContext()

  const { colors } = useCustomTheme()

  const { isOpen: emailVerifyOpen, onClose: emailVerifyOnClose, onOpen: emailVerifyOnOpen } = useDisclosure()

  const { project } = useProjectAtom()
  const { wallet, walletConnectionDetails } = useWalletAtom()

  const isEdit = Boolean(walletConnectionDetails?.id)

  const { createWallet, updateWallet, queryProjectWallet } = useProjectWalletAPI()

  const verifyIntroModal = useModal()
  const connectWalletModal = useModal()

  const isIdentityVerified = user.complianceDetails.verifiedDetails.identity?.verified

  const handleNext = () => {
    if (!project) return

    if (!isEdit && (isDraft(project.status) || isPrelaunch(project.status)) && createWalletInput) {
      createWallet.execute({
        variables: { input: createWalletInput },
        onError() {
          toast({
            title: t('Error creating wallet'),
            status: 'error',
          })
        },
        onCompleted() {
          queryProjectWallet.execute()
          toast({
            status: 'success',
            title: t('Wallet created successfully!'),
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
    nwc,
    setConnectionOption,
    createWalletInput,
    isLightningAddressInValid,
    fee,
    limits,
  } = useWalletForm({
    isEdit,
    onSubmit: handleNext,
  })

  const handleWalletUpdate = async (otp: number, otpData: OtpResponseFragment) => {
    let input: UpdateWalletInput = {
      id: walletConnectionDetails?.id,
      name: createWalletInput?.name,
      lndConnectionDetailsInput: createWalletInput?.lndConnectionDetailsInput,
      lightningAddressConnectionDetailsInput: createWalletInput?.lightningAddressConnectionDetailsInput,
      nwcConnectionDetailsInput: createWalletInput?.nwcConnectionDetailsInput,
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
          title: t('Wallet updated successfully!'),
        })
      },
      onError() {
        toast({
          status: 'error',
          title: t('Failed to update wallet.'),
          description: t('Please try again'),
        })
      },
    })
  }

  const isReadOnly =
    !user.isEmailVerified && (!isEdit ? isDraft(project?.status) || isPrelaunch(project?.status) : true)

  const SaveButton = (props: ButtonProps) => {
    return (
      <Button
        size="lg"
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

  const formConnectionDetails = useMemo(() => {
    switch (connectionOption) {
      case ConnectionOption.PERSONAL_NODE:
        return {
          __typename: WalletConnectDetails.LndConnectionDetailsPrivate,
          grpcPort: Number(node.value.grpc),
          hostname: node.value.hostname,
          lndNodeType: node.value.isVoltage ? LndNodeType.Voltage : LndNodeType.Custom,
          macaroon: node.value.invoiceMacaroon,
          pubkey: node.value.publicKey,
          tlsCertificate: node.value.tlsCert,
        } as LndConnectionDetailsPrivate
      case ConnectionOption.NWC:
        return {
          __typename: WalletConnectDetails.NWCConnectionDetailsPrivate,
          nwcConnectionDetails: nwc.value,
        } as NwcConnectionDetailsPrivate
      case ConnectionOption.LIGHTNING_ADDRESS:
      default:
        return {
          __typename: WalletConnectDetails.LightningAddressConnectionDetails,
          lightningAddress: lightningAddress.value,
        } as LightningAddressConnectionDetails
    }
  }, [connectionOption, node.value, lightningAddress.value, nwc.value])

  const formWalletConnectionDetails = {
    connectionDetails: formConnectionDetails,
    id: wallet?.id,
  }
  const formWallet = {
    name: node.value.name,
    id: wallet?.id,
  }

  return (
    <DashboardLayout
      desktopTitle={t('Wallet')}
      mobileTopNavRightComponent={<SaveButton />}
      deskTopBottomComponent={<SaveButton w="full" />}
    >
      <VStack spacing="20px" paddingX={{ base: 0, lg: 6 }}>
        <WalletLimitsAndVerification />
        <EnableFiatContributions
          isIdentityVerified={Boolean(isIdentityVerified)}
          isTiaProject={project.fundingStrategy === ProjectFundingStrategy.TakeItAll}
          projectId={project.id}
          onRequireVerification={verifyIntroModal.onOpen}
        />
      </VStack>
      <HStack w="full" paddingX={{ base: 0, lg: 6 }} paddingTop={4}>
        <Body size="xl" medium>
          {t('Configure Wallet')}
        </Body>
      </HStack>

      <VStack spacing="20px" paddingX={{ base: 0, lg: 6 }} alignItems={'start'}>
        <Body size="sm" light>
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

        <ConnectionDetails marginTop={4} wallet={formWallet} walletConnectionDetails={formWalletConnectionDetails} />
        <Button
          size="lg"
          leftIcon={wallet?.id ? <Icon as={PiPencil} /> : <Icon as={PiPlus} />}
          variant="outline"
          width="full"
          marginTop={4}
          onClick={connectWalletModal.onOpen}
        >
          {t('Update wallet info')}
        </Button>
      </VStack>

      <VerifyYourEmail
        isOpen={emailVerifyOpen}
        onClose={emailVerifyOnClose}
        action={MfaAction.ProjectWalletUpdate}
        handleVerify={handleWalletUpdate}
      />
      <VerificationModal {...verifyIntroModal} />
      {connectWalletModal.isOpen && (
        <ConnectWalletModal
          walletFormProps={{
            connectionOption,
            setConnectionOption,
            lightningAddress,
            node,
            fee,
            limits,
            nwc,
          }}
          continueButtonProps={{
            onClick: connectWalletModal.onClose,
          }}
          modalProps={connectWalletModal}
        />
      )}
    </DashboardLayout>
  )
}
