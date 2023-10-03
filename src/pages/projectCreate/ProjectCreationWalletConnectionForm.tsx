import {
  Box,
  Button,
  HStack,
  Image,
  InputGroup,
  InputRightElement,
  Link,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiRocket } from 'react-icons/bi'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import { TextInputBox, UndecoratedLink } from '../../components/ui'
import Loader from '../../components/ui/Loader'
import {
  AlbyLightningAddressURL,
  AlbyUrl,
  BitNobURL,
  BitnobUrl,
  BlinkLogoUrl,
  BlinkUrl,
  getPath,
  VoltageExplainerPageForGeyserURL,
  VoltageUrl,
  WalletConnectDetails,
  WalletOfSatoshiLightningAddressURL,
  WalletOfSatoshiUrl,
} from '../../constants'
import { lightModeColors } from '../../styles'
import {
  CreateWalletInput,
  LndNodeType,
  MfaAction,
  OtpResponseFragment,
  ProjectFragment,
  useCreateWalletMutation,
  useLightningAddressVerifyLazyQuery,
  useProjectPublishMutation,
  useUpdateWalletMutation,
  WalletResourceType,
} from '../../types'
import { toInt, useNotification, validateEmail } from '../../utils'
import { VerifyYourEmail } from '../otp'
import { WalletConnectionDetails } from '../projectDashboard/components'
import { NodeAdditionModal, WalletConnectionOptionInfoBox } from './components'
import { FormContinueButton } from './components/FormContinueButton'
import { ProjectCreateCompleted } from './components/ProjectCreateCompleted'
import { TNodeInput } from './types'

type Props =
  | {
      project: ProjectFragment
      triggerWallet?: boolean
      isReadyForLaunch: boolean
      defaultConnectionOption?: string
      readOnly?: boolean
      isEdit?: boolean
      setNodeInput?: React.Dispatch<
        React.SetStateAction<TNodeInput | undefined>
      >
      setReadyForLaunch: React.Dispatch<React.SetStateAction<boolean>>
      onNextClick?: undefined
    }
  | {
      project: ProjectFragment
      triggerWallet?: boolean
      defaultConnectionOption?: string
      readOnly?: boolean
      isEdit?: boolean
      onNextClick(): void
      isReadyForLaunch?: undefined
      setReadyForLaunch?: undefined
      setNodeInput?: React.Dispatch<
        React.SetStateAction<TNodeInput | undefined>
      >
    }

export enum ConnectionOption {
  LIGHTNING_ADDRESS = 'LIGHTNING_ADDRESS',
  PERSONAL_NODE = 'PERSONAL_NODE',
}

export enum LNAddressEvaluationState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  FAILED = 'FAILED',
  SUCCEEDED = 'SUCCEEDED',
}

const noop = () => {}

export const ProjectCreationWalletConnectionForm = ({
  project,
  isReadyForLaunch,
  triggerWallet,
  setReadyForLaunch,
  onNextClick,
  setNodeInput: setParentNode = noop,
  defaultConnectionOption = '',
  readOnly,
  isEdit,
}: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { toast } = useNotification()

  const {
    isOpen: emailVerifyOpen,
    onClose: emailVerifyOnClose,
    onOpen: emailVerifyOnOpen,
  } = useDisclosure()

  const [nodeInput, setNode] = useState<TNodeInput | undefined>(undefined)

  const [lightningAddressFormValue, setLightningAddressFormValue] = useState('')

  const [lightningAddressFormError, setLightningAddressFormError] = useState<
    string | null
  >(null)

  const [lnAddressEvaluationState, setLnAddressEvaluationState] =
    useState<LNAddressEvaluationState>(LNAddressEvaluationState.IDLE)

  const [connectionOption, setConnectionOption] = useState<string>(
    defaultConnectionOption,
  )

  const {
    isOpen: isWalletOpen,
    onClose: onWalletClose,
    onOpen: openWallet,
  } = useDisclosure()

  const onSubmit = (value: TNodeInput) => {
    setNode(value)
    setParentNode(value)
  }

  const onSaveDraftClick = async () => {
    if (!project) {
      return
    }

    navigate(getPath('projectLaunch', project.name, 'draft'))
  }

  const projectWallet = project.wallets[0]

  useEffect(() => {
    if (projectWallet) {
      if (
        projectWallet.connectionDetails.__typename ===
        WalletConnectDetails.LightningAddressConnectionDetails
      ) {
        setLightningAddressFormValue(
          projectWallet.connectionDetails.lightningAddress,
        )
      } else if (
        projectWallet.connectionDetails.__typename ===
        WalletConnectDetails.LndConnectionDetailsPrivate
      ) {
        const details = {
          name: projectWallet.name,
          hostname: projectWallet.connectionDetails.hostname,
          publicKey: projectWallet.connectionDetails.pubkey,
          invoiceMacaroon: projectWallet.connectionDetails.macaroon,
          tlsCert: projectWallet.connectionDetails.tlsCertificate || '',
          grpc: `${projectWallet.connectionDetails.grpcPort}`,
          isVoltage:
            projectWallet.connectionDetails.lndNodeType === LndNodeType.Voltage,
        }
        setNode((current) => ({
          ...current,
          ...details,
        }))
      }
    }
  }, [projectWallet])

  useEffect(() => {
    if (triggerWallet) {
      openWallet()
    }
  }, [openWallet, triggerWallet])

  const [evaluateLightningAddress, { loading: isEvaluatingLightningAddress }] =
    useLightningAddressVerifyLazyQuery({
      variables: {
        lightningAddress: lightningAddressFormValue,
      },
      onCompleted({ lightningAddressVerify: { valid } }) {
        if (Boolean(valid) === false) {
          setLnAddressEvaluationState(LNAddressEvaluationState.FAILED)
          setLightningAddressFormError(
            'We could not validate this as a working Lightning Address.',
          )
        } else {
          setLnAddressEvaluationState(LNAddressEvaluationState.SUCCEEDED)
        }
      },
    })

  const [createWallet, { loading: isCreateWalletLoading }] =
    useCreateWalletMutation()

  const [updateWallet, { loading: updateWalletLoading }] =
    useUpdateWalletMutation({
      onCompleted() {
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

  const createWalletInput: CreateWalletInput | null = useMemo(() => {
    const resourceInput: {
      resourceId: number
      resourceType: WalletResourceType
    } = {
      resourceId: toInt(project?.id),
      resourceType: WalletResourceType.Project,
    }

    if (connectionOption === ConnectionOption.PERSONAL_NODE) {
      if (!nodeInput) {
        return null
      }

      return {
        lndConnectionDetailsInput: {
          macaroon: nodeInput.invoiceMacaroon,
          tlsCertificate: nodeInput.tlsCert,
          hostname: nodeInput.hostname,
          grpcPort: nodeInput.isVoltage
            ? 10009
            : nodeInput.grpc
            ? parseInt(nodeInput.grpc, 10)
            : 0,
          lndNodeType: nodeInput.isVoltage
            ? LndNodeType.Voltage
            : LndNodeType.Custom,
          pubkey: nodeInput.publicKey,
        },
        name: nodeInput.name,
        resourceInput,
      }
    }

    if (connectionOption === ConnectionOption.LIGHTNING_ADDRESS) {
      if (!lightningAddressFormValue) {
        return null
      }

      return {
        lightningAddressConnectionDetailsInput: {
          lightningAddress: lightningAddressFormValue,
        },
        resourceInput,
      }
    }

    return null
  }, [project, nodeInput, connectionOption, lightningAddressFormValue])

  const isSubmitEnabled = useMemo(() => {
    if (createWalletInput === null) {
      return false
    }

    return (
      connectionOption === ConnectionOption.PERSONAL_NODE ||
      (connectionOption === ConnectionOption.LIGHTNING_ADDRESS &&
        Boolean(lightningAddressFormValue) === true)
    )
  }, [connectionOption, lightningAddressFormValue, createWalletInput])

  const validateLightningAddress = async () => {
    if (lightningAddressFormError === null && lightningAddressFormValue) {
      await evaluateLightningAddress()
    }
  }

  const handleNext = async () => {
    if (onNextClick) {
      try {
        await handleLaunch()
        return onNextClick()
      } catch (error) {
        toast({
          title: 'Something went wrong',
          description: `${error}`,
          status: 'error',
        })
      }

      return
    }

    setReadyForLaunch(true)
  }

  const onLaunchClick = async () => {
    try {
      await handleLaunch()
      navigate(getPath('projectLaunch', project?.name))
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `${error}`,
        status: 'error',
      })
    }
  }

  const [publishProject, { loading: isUpdateStatusLoading }] =
    useProjectPublishMutation()

  const handleLaunch = async () => {
    await validateLightningAddress()

    if (!createWalletInput) {
      toast({
        title: 'failed to create project wallet',
        description: 'please provide valid wallet details',
        status: 'error',
      })
      return
    }

    if (isEdit) {
      emailVerifyOnOpen()
    } else {
      await createWallet({ variables: { input: createWalletInput } })
      await publishProject({
        variables: {
          input: { projectId: project.id },
        },
      })
    }
  }

  const handleWalletUpdate = async (
    otp: number,
    otpData: OtpResponseFragment,
  ) => {
    updateWallet({
      variables: {
        input: {
          name: createWalletInput?.name,
          lndConnectionDetailsInput:
            createWalletInput?.lndConnectionDetailsInput,
          lightningAddressConnectionDetailsInput:
            createWalletInput?.lightningAddressConnectionDetailsInput,
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

  const isFormDirty = () => {
    if (isEdit && projectWallet) {
      if (connectionOption === ConnectionOption.LIGHTNING_ADDRESS) {
        if (
          projectWallet.connectionDetails.__typename ===
          WalletConnectDetails.LightningAddressConnectionDetails
        ) {
          return (
            projectWallet?.connectionDetails?.lightningAddress ===
            lightningAddressFormValue
          )
        }

        return true
      }

      if (
        projectWallet.connectionDetails.__typename ===
        WalletConnectDetails.LndConnectionDetailsPrivate
      ) {
        if (
          `${projectWallet.connectionDetails.grpcPort}` !== nodeInput?.grpc ||
          projectWallet.connectionDetails.hostname !== nodeInput?.hostname ||
          (projectWallet.connectionDetails.lndNodeType !==
            LndNodeType.Voltage) !==
            nodeInput?.isVoltage ||
          projectWallet.connectionDetails.macaroon !==
            nodeInput?.invoiceMacaroon ||
          projectWallet.connectionDetails.pubkey !== nodeInput?.publicKey ||
          projectWallet.connectionDetails.tlsCertificate !== nodeInput?.tlsCert
        ) {
          return false
        }

        return true
      }

      return false
    }
  }

  const validateLightningAddressFormat = async (lightningAddress: string) => {
    if (!lightningAddress) {
      return setLightningAddressFormError(null)
    }

    if (lightningAddress.endsWith('@geyser.fund')) {
      setLightningAddressFormError(
        `Custom Lightning Addresses can't end with "@geyser.fund".`,
      )
    } else if (validateEmail(lightningAddress) === false) {
      setLightningAddressFormError(
        `Please use a valid email-formatted address for your Lightning Address.`,
      )
    } else {
      setLightningAddressFormError(null)
    }
  }

  const isLoading =
    isCreateWalletLoading ||
    isUpdateStatusLoading ||
    isEvaluatingLightningAddress

  if (isReadyForLaunch) {
    return (
      <ProjectCreateCompleted>
        <VStack w="100%">
          {createWalletInput && (
            <Button
              variant="primary"
              w="full"
              leftIcon={<BiRocket />}
              onClick={onLaunchClick}
              isLoading={isLoading}
              disabled={
                !isSubmitEnabled ||
                isLoading ||
                Boolean(lightningAddressFormError)
              }
            >
              {t('Launch Project')}
            </Button>
          )}
          <Button
            variant="secondary"
            w="full"
            onClick={onSaveDraftClick}
            disabled={isLoading}
          >
            {t('Save As Draft')}
          </Button>
        </VStack>
      </ProjectCreateCompleted>
    )
  }

  const renderRightElementContent = () => {
    if (isEvaluatingLightningAddress) {
      return <Loader size="md"></Loader>
    }

    switch (lnAddressEvaluationState) {
      case LNAddressEvaluationState.IDLE:
        return null
      case LNAddressEvaluationState.LOADING:
        return <Loader size="md"></Loader>
      case LNAddressEvaluationState.FAILED:
        return (
          <BsFillXCircleFill fill={lightModeColors.secondary.red} size="24px" />
        )
      case LNAddressEvaluationState.SUCCEEDED:
        return (
          <BsFillCheckCircleFill
            fill={lightModeColors.primary[500]}
            size="24px"
          />
        )
      default:
        return null
    }
  }

  return (
    <VStack width="100%" alignItems="flex-start" spacing="40px">
      <RadioGroup
        w="full"
        onChange={setConnectionOption}
        value={connectionOption}
        isDisabled={readOnly}
        pt={5}
      >
        <VStack spacing={10}>
          <VStack width="100%" alignItems="flex-start" spacing={3}>
            <Radio size="lg" value={ConnectionOption.LIGHTNING_ADDRESS}>
              {t('Lightning Address')}
            </Radio>

            {connectionOption === ConnectionOption.LIGHTNING_ADDRESS ? (
              <InputGroup w="full" size={'md'}>
                <TextInputBox
                  w="full"
                  name="lightning-address"
                  type={'email'}
                  placeholder={'satoshi@getalby.com'}
                  value={lightningAddressFormValue}
                  onChange={(event) => {
                    setLightningAddressFormValue(event.target.value)
                    validateLightningAddressFormat(event.target.value)
                  }}
                  onBlur={validateLightningAddress}
                  isInvalid={Boolean(lightningAddressFormError)}
                  focusBorderColor={'neutral.200'}
                  _valid={{
                    focusBorderColor: 'primary.500',
                  }}
                  error={lightningAddressFormError}
                  isDisabled={readOnly}
                />
                <InputRightElement>
                  {renderRightElementContent()}
                </InputRightElement>
              </InputGroup>
            ) : null}
            {!isEdit && (
              <WalletConnectionOptionInfoBox
                primaryText={t('Connect your lightning address')}
                promoText={t('2% Geyser fee per transaction')}
                secondaryText={
                  <Trans
                    i18nKey={
                      '<1>Lightning Addresses</1> are like an email address, but for your Bitcoin. You’ll receive all on-chain and lightning transactions directly to your lightning wallet. Get your own lightning access using these recommended apps.'
                    }
                  >
                    <Link
                      textDecoration="underline"
                      href="https://lightningaddress.com/"
                      isExternal
                    >
                      Lightning Addresses
                    </Link>{' '}
                    are like an email address, but for your Bitcoin. You’ll
                    receive all on-chain and lightning transactions directly to
                    your lightning wallet. Get your own lightning access using
                    these recommended apps.
                  </Trans>
                }
              >
                <HStack
                  width={'full'}
                  justifyContent={'flex-start'}
                  spacing={4}
                >
                  <UndecoratedLink isExternal href={AlbyLightningAddressURL}>
                    <HStack>
                      <Image src={AlbyUrl} height="24px" />
                      <Text fontSize={'12px'} fontWeight={'bold'}>
                        Alby
                      </Text>
                    </HStack>
                  </UndecoratedLink>
                  <RenderSponsorImage
                    url={WalletOfSatoshiLightningAddressURL}
                    imageUrl={WalletOfSatoshiUrl}
                  />
                  <RenderSponsorImage url={BitNobURL} imageUrl={BitnobUrl} />
                  <RenderSponsorImage url={BlinkUrl} imageUrl={BlinkLogoUrl} />
                </HStack>
              </WalletConnectionOptionInfoBox>
            )}
          </VStack>

          <VStack width="100%" alignItems="flex-start" spacing={3}>
            <Radio size="lg" value={ConnectionOption.PERSONAL_NODE}>
              {t('Connect Your Node')}
            </Radio>

            {connectionOption === ConnectionOption.PERSONAL_NODE ? (
              <>
                <Button
                  leftIcon={<AiOutlineSetting fontSize="20px" />}
                  w="full"
                  variant="secondary"
                  onClick={openWallet}
                  isDisabled={readOnly}
                >
                  {t('Connect Your Node')}
                </Button>
                {nodeInput && (
                  <WalletConnectionDetails
                    projectWallet={{
                      connectionDetails: {
                        grpcPort: Number(nodeInput.grpc),
                        hostname: nodeInput.hostname,
                        lndNodeType: nodeInput.isVoltage
                          ? LndNodeType.Voltage
                          : LndNodeType.Geyser,
                        macaroon: nodeInput.invoiceMacaroon,
                        pubkey: nodeInput.publicKey,
                        tlsCertificate: nodeInput.tlsCert,
                      },
                      name: nodeInput.name,
                    }}
                  />
                )}
              </>
            ) : null}

            {!isEdit && (
              <WalletConnectionOptionInfoBox
                primaryText={t('Connect your node')}
                promoText={t('No fee per transaction')}
                secondaryText={
                  <span>
                    <Trans
                      i18nKey={
                        "Connect your lightning node to receive incoming transactions directly. Don't have a node? You can <1>create a cloud node</1> with the recommended app."
                      }
                    >
                      {
                        'Connect your lightning node to receive incoming transactions directly. Dont have a node? You can '
                      }
                      <Link href={VoltageExplainerPageForGeyserURL}>
                        create a cloud node
                      </Link>{' '}
                      with the recommended app.
                    </Trans>
                  </span>
                }
              >
                <RenderSponsorImage
                  url={VoltageExplainerPageForGeyserURL}
                  imageUrl={VoltageUrl}
                />
              </WalletConnectionOptionInfoBox>
            )}
          </VStack>
        </VStack>
      </RadioGroup>

      <FormContinueButton
        width="100%"
        onClick={handleNext}
        isEdit={isEdit}
        isLoading={updateWalletLoading}
        isDisabled={isFormDirty()}
      />

      <NodeAdditionModal
        isOpen={isWalletOpen}
        onClose={onWalletClose}
        nodeInput={nodeInput}
        onSubmit={onSubmit}
      />
      <VerifyYourEmail
        isOpen={emailVerifyOpen}
        onClose={emailVerifyOnClose}
        action={MfaAction.ProjectWalletUpdate}
        handleVerify={handleWalletUpdate}
      />
    </VStack>
  )
}

const RenderSponsorImage = ({
  url,
  imageUrl,
}: {
  url: string
  imageUrl: string
}) => {
  return (
    <Box
      backgroundColor={lightModeColors.neutral[100]}
      borderRadius={'10px'}
      px={3}
      py={1}
    >
      <Link isExternal href={url}>
        <Image src={imageUrl} height="24px" />
      </Link>
    </Box>
  )
}
