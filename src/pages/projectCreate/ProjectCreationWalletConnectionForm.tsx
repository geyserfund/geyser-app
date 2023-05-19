import {
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

import {
  ButtonComponent,
  TextInputBox,
  UndecoratedLink,
} from '../../components/ui'
import Loader from '../../components/ui/Loader'
import {
  AlbyLightningAddressURL,
  AlbyUrl,
  BitNobURL,
  BitnobUrl,
  GeyserTermsAndConditionsURL,
  VoltageExplainerPageForGeyserURL,
  VoltageUrl,
  WalletOfSatoshiLightningAddressURL,
  WalletOfSatoshiUrl,
} from '../../constants'
import { colors } from '../../styles'
import {
  CreateWalletInput,
  LndNodeType,
  ProjectFragment,
  useCreateWalletMutation,
  useLightningAddressVerifyLazyQuery,
  WalletResourceType,
} from '../../types/generated/graphql'
import { toInt, useNotification, validateEmail } from '../../utils'
import { NodeAdditionModal } from './components/NodeAdditionModal'
import { WalletConnectionOptionInfoBox } from './components/WalletConnectionOptionInfoBox'
import { TNodeInput } from './types'

type Props = {
  project: ProjectFragment | null
  onProjectLaunchSelected: (_: CreateWalletInput) => void
  onSaveAsDraftSelected?: (_: CreateWalletInput) => void
  triggerWallet?: boolean
  setNodeInput?: React.Dispatch<React.SetStateAction<TNodeInput | undefined>>
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

export const ProjectCreationWalletConnectionForm = ({
  project,
  onProjectLaunchSelected,
  onSaveAsDraftSelected,
  triggerWallet,
  setNodeInput: setNode,
}: Props) => {
  const { toast } = useNotification()

  const [nodeInput, setNodeInput] = useState<TNodeInput | undefined>(undefined)

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

  useEffect(() => {
    if (triggerWallet) {
      openWallet()
    }
  }, [triggerWallet])

  useEffect(() => {
    if (setNode) {
      setNode(nodeInput)
    }
  }, [nodeInput])

  const onSubmit = (value: TNodeInput) => {
    setNodeInput(value)
    if (setNode) {
      setNode(value)
    }
  }

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

  const handleProjectLaunchSelected = async () => {
    await validateLightningAddress()

    if (!createWalletInput) {
      toast({
        title: 'failed to create project wallet',
        description: 'please provide valid wallet details',
        status: 'error',
      })
      return
    }

    try {
      await createWallet({ variables: { input: createWalletInput } })
      onProjectLaunchSelected(createWalletInput)
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `${error}`,
        status: 'error',
      })
    }
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
        return <BsFillXCircleFill fill={colors.error} size="24px" />
      case LNAddressEvaluationState.SUCCEEDED:
        return <BsFillCheckCircleFill fill={colors.primary500} size="24px" />
      default:
        return null
    }
  }

  return (
    <>
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
                    focusBorderColor={colors.neutral200}
                    _valid={{
                      focusBorderColor: colors.primary500,
                    }}
                    error={lightningAddressFormError}
                  />
                  <InputRightElement>
                    {renderRightElementContent()}
                  </InputRightElement>
                </InputGroup>
              ) : null}

              <WalletConnectionOptionInfoBox
                primaryText="Easy setup process for beginners and Geyser charges a 2% operational fee per transaction."
                secondaryText={
                  <>
                    <Link
                      textDecoration="underline"
                      href="https://lightningaddress.com/"
                      isExternal
                    >
                      Lightning Addresses
                    </Link>{' '}
                    are like an email address, but for your Bitcoin. You can
                    receive your funds from both lightning and onchain
                    transactions. Get your own lightning access using these
                    recommended apps.
                  </>
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
                <ButtonComponent w="full" onClick={openWallet}>
                  {' '}
                  <AiOutlineSetting
                    style={{ marginRight: '5px' }}
                    fontSize="20px"
                  />{' '}
                  Connect Your Node
                </ButtonComponent>
              ) : null}

              <WalletConnectionOptionInfoBox
                primaryText="Connect your node, manage your own liquidity, and Geyser won't charge any fees."
                secondaryText="Connect your Lightning node to receive incoming transactions directly. Beware that your node's liquidity remains your own responsibility. Don't have a node? You can get one on the cloud using Voltage."
              >
                <HStack width={'full'} justifyContent={'flex-start'}>
                  <Link isExternal href={VoltageExplainerPageForGeyserURL}>
                    <Image src={VoltageUrl} />
                  </Link>
                </HStack>
              </WalletConnectionOptionInfoBox>
            </VStack>
          </VStack>
        </RadioGroup>

        <VStack width="100%" alignItems="flex-start">
          <ButtonComponent
            primary
            w="full"
            onClick={handleProjectLaunchSelected}
            isLoading={isCreateWalletLoading}
            disabled={
              isSubmitEnabled === false ||
              isEvaluatingLightningAddress ||
              Boolean(lightningAddressFormError)
            }
          >
            <>
              <BiRocket style={{ marginRight: '10px' }} />
              Launch Project
            </>
          </ButtonComponent>

          {onSaveAsDraftSelected && createWalletInput && (
            <ButtonComponent
              w="full"
              onClick={() => onSaveAsDraftSelected(createWalletInput)}
              disabled={isCreateWalletLoading || isEvaluatingLightningAddress}
            >
              Save As Draft
            </ButtonComponent>
          )}

          <HStack color={'neutral.600'} spacing={2} mt={2}>
            <Text>By continuing, I agree with Geyser&apos;s</Text>
            <Link
              href={GeyserTermsAndConditionsURL}
              isExternal
              textDecoration="underline"
            >
              Terms & Conditions
            </Link>
          </HStack>
        </VStack>
      </VStack>

      <NodeAdditionModal
        isOpen={isWalletOpen}
        onClose={onWalletClose}
        nodeInput={nodeInput}
        onSubmit={onSubmit}
      />
    </>
  )
}
