import {
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
  getPath,
  VoltageExplainerPageForGeyserURL,
  VoltageUrl,
  WalletOfSatoshiLightningAddressURL,
  WalletOfSatoshiUrl,
} from '../../constants'
import {
  CreateWalletInput,
  LndNodeType,
  ProjectFragment,
  useCreateWalletMutation,
  useLightningAddressVerifyLazyQuery,
  WalletResourceType,
} from '../../types/generated/graphql'
import { toInt, useNotification, validateEmail } from '../../utils'
import { FormContinueButton } from './components/FormContinueButton'
import { NodeAdditionModal } from './components/NodeAdditionModal'
import { ProjectCreateCompleted } from './components/ProjectCreateCompleted'
import { WalletConnectionOptionInfoBox } from './components/WalletConnectionOptionInfoBox'
import { TNodeInput } from './types'

type Props =
  | {
      project: ProjectFragment
      triggerWallet?: boolean
      isReadyForLaunch: boolean
      setNodeInput?: React.Dispatch<
        React.SetStateAction<TNodeInput | undefined>
      >
      setReadyForLaunch: React.Dispatch<React.SetStateAction<boolean>>
      onNextClick?: undefined
    }
  | {
      project: ProjectFragment
      triggerWallet?: boolean
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
}: Props) => {
  const navigate = useNavigate()
  const { toast } = useNotification()

  const [nodeInput, setNode] = useState<TNodeInput | undefined>(undefined)

  const [lightningAddressFormValue, setLightningAddressFormValue] = useState('')

  const [lightningAddressFormError, setLightningAddressFormError] = useState<
    string | null
  >(null)

  const [lnAddressEvaluationState, setLnAddressEvaluationState] =
    useState<LNAddressEvaluationState>(LNAddressEvaluationState.IDLE)

  const [connectionOption, setConnectionOption] = useState<string>('')

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
    if (lightningAddressFormError === null) {
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

    await createWallet({ variables: { input: createWalletInput } })
  }

  const validateLightningAddressFormat = async (lightningAddress: string) => {
    if (lightningAddress.length === 0) {
      setLightningAddressFormError(`Lightning Address can't be empty.`)
    } else if (lightningAddress.endsWith('@geyser.fund')) {
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
              isLoading={isCreateWalletLoading}
              disabled={
                isSubmitEnabled === false ||
                isEvaluatingLightningAddress ||
                Boolean(lightningAddressFormError)
              }
            >
              Launch Project
            </Button>
          )}
          <Button
            variant="secondary"
            w="full"
            onClick={onSaveDraftClick}
            disabled={isCreateWalletLoading || isEvaluatingLightningAddress}
          >
            Save As Draft
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
        return <BsFillXCircleFill fill={'secondary.red'} size="24px" />
      case LNAddressEvaluationState.SUCCEEDED:
        return <BsFillCheckCircleFill fill={'primary.500'} size="24px" />
      default:
        return null
    }
  }

  return (
    <VStack width="100%" alignItems="flex-start" spacing="40px">
      <RadioGroup onChange={setConnectionOption} value={connectionOption}>
        <VStack spacing={10}>
          <VStack width="100%" alignItems="flex-start" spacing={3}>
            <Radio size="lg" value={ConnectionOption.LIGHTNING_ADDRESS}>
              Lightning Address
            </Radio>

            {connectionOption === ConnectionOption.LIGHTNING_ADDRESS ? (
              <InputGroup size={'md'}>
                <TextInputBox
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
                />
                <InputRightElement>
                  {renderRightElementContent()}
                </InputRightElement>
              </InputGroup>
            ) : null}

            <WalletConnectionOptionInfoBox
              primaryText="Connect your lightning address"
              promoText="2% Geyser fee per transaction"
              secondaryText={
                <>
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
                </>
              }
            >
              <HStack width={'full'} justifyContent={'flex-start'} spacing={4}>
                <UndecoratedLink isExternal href={AlbyLightningAddressURL}>
                  <HStack>
                    <Image src={AlbyUrl} height="24px" />
                    <Text fontSize={'12px'} fontWeight={'bold'}>
                      Alby
                    </Text>
                  </HStack>
                </UndecoratedLink>

                <Link isExternal href={WalletOfSatoshiLightningAddressURL}>
                  <Image src={WalletOfSatoshiUrl} height="24px" />
                </Link>

                <Link isExternal href={BitNobURL}>
                  <Image src={BitnobUrl} height="24px" />
                </Link>
              </HStack>
            </WalletConnectionOptionInfoBox>
          </VStack>

          <VStack width="100%" alignItems="flex-start" spacing={3}>
            <Radio size="lg" value={ConnectionOption.PERSONAL_NODE}>
              Connect Your Node
            </Radio>

            {connectionOption === ConnectionOption.PERSONAL_NODE ? (
              <Button
                leftIcon={<AiOutlineSetting fontSize="20px" />}
                w="full"
                variant="secondary"
                onClick={openWallet}
              >
                Connect Your Node
              </Button>
            ) : null}

            <WalletConnectionOptionInfoBox
              primaryText="Connect your node"
              promoText="No fee per transaction"
              secondaryText="Connect your lightning node to receive incoming transactions directly. Don't have a node? You can create a cloud node with the recommended app."
            >
              <HStack>
                <Link isExternal href={VoltageExplainerPageForGeyserURL}>
                  <Image src={VoltageUrl} />
                </Link>
              </HStack>
            </WalletConnectionOptionInfoBox>
          </VStack>
        </VStack>
      </RadioGroup>

      <FormContinueButton width="100%" onClick={handleNext} />

      <NodeAdditionModal
        isOpen={isWalletOpen}
        onClose={onWalletClose}
        nodeInput={nodeInput}
        onSubmit={onSubmit}
      />
    </VStack>
  )
}
