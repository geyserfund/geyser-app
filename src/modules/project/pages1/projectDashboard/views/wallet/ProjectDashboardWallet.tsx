import { Button, ButtonProps, HStack, Link, useDisclosure, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactLink } from 'react-router-dom'

import { VerifyYourEmail } from '@/modules/auth/otp/VerifyYourEmail.tsx'
import { useProjectWalletAPI } from '@/modules/project/API/useProjectWalletAPI'
import { useProjectAtom, useWalletAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks/useModal.tsx'

import { useAuthContext } from '../../../../../../context/index.ts'
import { getPath, GeyserEmailVerificationDocUrl, PathName } from '../../../../../../shared/constants/index.ts'
import { MfaAction, OtpResponseFragment, UpdateWalletInput } from '../../../../../../types/index.ts'
import { isDraft, isPrelaunch, useCustomTheme, useNotification } from '../../../../../../utils/index.ts'
import { ConnectionOption, useWalletForm } from '../../../projectCreation/hooks/useWalletForm.tsx'
import { ProjectCreationWalletConnectionForm } from '../../../projectCreation/index.ts'
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

  const walletLimits = wallet?.limits

  const { createWallet, updateWallet, queryProjectWallet } = useProjectWalletAPI()

  const verifyIntroModal = useModal()

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
    walletLimits,
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
          buttonProps={{ onClick: verifyIntroModal.onOpen }}
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
        {project && (
          <ProjectCreationWalletConnectionForm
            readOnly={isReadOnly}
            lightningAddress={lightningAddress}
            node={node}
            nwc={nwc}
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
      <VerificationModal {...verifyIntroModal} />
    </DashboardLayout>
  )
}
