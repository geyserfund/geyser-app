import { useDisclosure } from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useProjectWalletAPI } from '@/modules/project/API/useProjectWalletAPI.ts'
import { useProjectAtom, useWalletAtom } from '@/modules/project/hooks/useProjectAtom'
import { validateTLSCertificate } from '@/utils/validations/checkTLSCertificate.ts'

import { ProjectNodeValidations, WalletConnectDetails } from '../../../../../shared/constants'
import { useDebounce } from '../../../../../shared/hooks'
import {
  CreateWalletInput,
  LightningAddressContributionLimits,
  LndNodeType,
  Maybe,
  useLightningAddressVerifyLazyQuery,
  WalletOffChainContributionLimits,
  WalletOnChainContributionLimits,
  WalletResourceType,
} from '../../../../../types'
import {
  checkMacaroonPermissions,
  isSecp256k1Compressed,
  isTorV3Address,
  toInt,
  useNotification,
  validateEmail,
} from '../../../../../utils'

interface useWalletFormProps {
  onSubmit: (createWalletInput: CreateWalletInput | null) => void
  isEdit?: boolean
}

export type TNodeInput = {
  name: string
  isVoltage?: boolean
  hostname: string
  publicKey: string
  invoiceMacaroon: string
  tlsCert: string
  grpc: string
}

export enum ConnectionOption {
  LIGHTNING_ADDRESS = 'LIGHTNING_ADDRESS',
  PERSONAL_NODE = 'PERSONAL_NODE',
  NWC = 'NWC',
}

export enum LNAddressEvaluationState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  FAILED = 'FAILED',
  SUCCEEDED = 'SUCCEEDED',
}

export type LightingWalletForm = {
  error: string | null
  state: LNAddressEvaluationState
  value: string
  setValue: (lightningAddress: string) => void
  evaluating: boolean
  validate: () => void
}

export type NodeWalletForm = {
  value: TNodeInput
  setValue: (node: TNodeInput) => void
  error: Record<keyof TNodeInput, string>
  clearError: () => void
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export type NWCWalletForm = {
  value: string
  setValue: (nostrWalletConnectURI: string) => void
}

export type Limits = {
  max?: Maybe<number>
  min?: Maybe<number>
}

export type WalletForm = {
  handleConfirm: () => void
  lightningAddress: LightingWalletForm
  node: NodeWalletForm
  nwc: NWCWalletForm
  isFormDirty: () => boolean
  connectionOption: ConnectionOption
  setConnectionOption: (connectionOption: ConnectionOption) => void
  fee: {
    value: number
    setValue: (feePercentage: number) => void
  }
  createWalletInput: CreateWalletInput | null
  isLightningAddressInValid: boolean
  limits: Limits
}

export const defaultNode = {
  name: '',
  isVoltage: false,
  hostname: '',
  publicKey: '',
  invoiceMacaroon: '',
  tlsCert: '',
  grpc: '',
}

const defaultNodeFormError: Record<keyof TNodeInput, string> = {
  name: '',
  isVoltage: '',
  hostname: '',
  publicKey: '',
  invoiceMacaroon: '',
  tlsCert: '',
  grpc: '',
}

const DEFAULT_FEE_PERCENTAGE = 0.05
const DEFAULT_LIGHTNING_FEE_PERCENTAGE = 0.05

const connectionDetailsTypenameToConnectionOptionMap: Record<WalletConnectDetails, ConnectionOption> = {
  [WalletConnectDetails.LndConnectionDetailsPrivate]: ConnectionOption.PERSONAL_NODE,
  [WalletConnectDetails.LndConnectionDetailsPublic]: ConnectionOption.PERSONAL_NODE,
  [WalletConnectDetails.NWCConnectionDetailsPrivate]: ConnectionOption.NWC,
  [WalletConnectDetails.LightningAddressConnectionDetails]: ConnectionOption.LIGHTNING_ADDRESS,
}

export const useWalletForm = ({ onSubmit, isEdit }: useWalletFormProps): WalletForm => {
  const { toast } = useNotification()

  const { project } = useProjectAtom()
  const { queryProjectWalletConnectionDetails } = useProjectWalletAPI(true)
  const { execute: queryProjectWalletConnectionDetailsExecute } = queryProjectWalletConnectionDetails
  const { wallet, walletConnectionDetails } = useWalletAtom()

  const projectWallet = useMemo(() => ({ ...wallet, ...walletConnectionDetails }), [wallet, walletConnectionDetails])

  const { isOpen, onClose, onOpen } = useDisclosure()

  const [nodeInput, setNode] = useState<TNodeInput>(defaultNode)
  const [nodeFormError, setNodeFormError] = useState<Record<keyof TNodeInput, string>>(defaultNodeFormError)

  const [lightningAddressFormValue, setLightningAddressFormValue] = useState('')
  const [nostrWalletConnectURI, setNostrWalletConnectURI] = useState('')

  const [lightningAddressFormError, setLightningAddressFormError] = useState<string | null>(null)
  const [lnAddressEvaluationState, setLnAddressEvaluationState] = useState<LNAddressEvaluationState>(
    LNAddressEvaluationState.IDLE,
  )

  const [connectionOption, setConnectionOption] = useState<ConnectionOption>(ConnectionOption.LIGHTNING_ADDRESS)

  useEffect(() => {
    queryProjectWalletConnectionDetailsExecute()
  }, [queryProjectWalletConnectionDetailsExecute])

  useEffect(() => {
    if (walletConnectionDetails?.connectionDetails.__typename) {
      setConnectionOption(
        connectionDetailsTypenameToConnectionOptionMap[walletConnectionDetails.connectionDetails.__typename],
      )
    }
  }, [walletConnectionDetails])

  const [limits, setLimits] = useState<
    LightningAddressContributionLimits | WalletOffChainContributionLimits | WalletOnChainContributionLimits
  >(
    projectWallet
      ? projectWallet?.connectionDetails?.__typename === WalletConnectDetails.LightningAddressConnectionDetails
        ? projectWallet?.limits?.contribution?.offChain || {}
        : projectWallet?.limits?.contribution?.onChain || {}
      : {},
  )

  const [feePercentage, setFeePercentage] = useState<number>(projectWallet?.feePercentage ?? DEFAULT_FEE_PERCENTAGE)

  const debouncedLightningAddress = useDebounce(lightningAddressFormValue, 200)

  const [evaluateLightningAddress, { loading: isEvaluatingLightningAddress }] = useLightningAddressVerifyLazyQuery({
    onCompleted({ lightningAddressVerify: { valid, reason, limits } }) {
      if (Boolean(valid) === false) {
        setLnAddressEvaluationState(LNAddressEvaluationState.FAILED)
        setLightningAddressFormError(`We could not validate this as a working Lightning Address: ${reason}`)
      } else {
        setLightningAddressFormError('')
        setLnAddressEvaluationState(LNAddressEvaluationState.SUCCEEDED)
        if (limits) {
          setLimits(limits)
        }
      }
    },
  })

  const validateLightningAddress = useCallback(async () => {
    if (!lightningAddressFormValue) {
      setLightningAddressFormError(null)
      setLnAddressEvaluationState(LNAddressEvaluationState.IDLE)
      return
    }

    await evaluateLightningAddress({
      variables: { lightningAddress: lightningAddressFormValue },
    })
  }, [evaluateLightningAddress, lightningAddressFormValue])

  useEffect(() => {
    if (debouncedLightningAddress) {
      const valid = validateLightningAddressFormat(debouncedLightningAddress)
      if (valid) {
        validateLightningAddress()
      }
    }
  }, [debouncedLightningAddress, validateLightningAddress])

  useEffect(() => {
    if (projectWallet && projectWallet.connectionDetails) {
      if (projectWallet.connectionDetails.__typename === WalletConnectDetails.LightningAddressConnectionDetails) {
        setLightningAddressFormValue(projectWallet.connectionDetails.lightningAddress)
      } else if (projectWallet.connectionDetails.__typename === WalletConnectDetails.LndConnectionDetailsPrivate) {
        const details = {
          name: projectWallet.name || '',
          hostname: projectWallet.connectionDetails.hostname,
          publicKey: projectWallet.connectionDetails.pubkey || '',
          invoiceMacaroon: projectWallet.connectionDetails.macaroon,
          tlsCert: projectWallet.connectionDetails.tlsCertificate || '',
          grpc: `${projectWallet.connectionDetails.grpcPort}`,
          isVoltage: projectWallet.connectionDetails.lndNodeType === LndNodeType.Voltage,
        }
        setNode((current) => ({
          ...current,
          ...details,
        }))
        setFeePercentage(projectWallet.feePercentage || 0.0)
      } else if (projectWallet.connectionDetails.__typename === WalletConnectDetails.NWCConnectionDetailsPrivate) {
        setNostrWalletConnectURI(projectWallet.connectionDetails.nwcUrl || '')
      }
    }
  }, [projectWallet])

  const createWalletInput: CreateWalletInput | null = useMemo(() => {
    const resourceInput: {
      resourceId: number
      resourceType: WalletResourceType
    } = {
      resourceId: toInt(project?.id),
      resourceType: WalletResourceType.Project,
    }

    if (connectionOption === ConnectionOption.PERSONAL_NODE) {
      if (!nodeInput.name) {
        return null
      }

      return {
        lndConnectionDetailsInput: {
          macaroon: nodeInput.invoiceMacaroon,
          tlsCertificate: nodeInput.tlsCert,
          hostname: nodeInput.hostname,
          grpcPort: nodeInput.isVoltage ? 10009 : nodeInput.grpc ? parseInt(nodeInput.grpc, 10) : 0,
          lndNodeType: nodeInput.isVoltage ? LndNodeType.Voltage : LndNodeType.Custom,
          pubkey: nodeInput.publicKey,
        },
        name: nodeInput.name,
        resourceInput,
        feePercentage,
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
        feePercentage: DEFAULT_LIGHTNING_FEE_PERCENTAGE,
      }
    }

    if (connectionOption === ConnectionOption.NWC) {
      if (!nostrWalletConnectURI) {
        return null
      }

      return {
        nwcConnectionDetailsInput: {
          nwcUrl: nostrWalletConnectURI,
        },
        resourceInput,
        feePercentage: DEFAULT_LIGHTNING_FEE_PERCENTAGE,
      }
    }

    return null
  }, [project, nodeInput, connectionOption, lightningAddressFormValue, nostrWalletConnectURI, feePercentage])

  const handleConfirm = useCallback(async () => {
    if (
      connectionOption === ConnectionOption.LIGHTNING_ADDRESS &&
      lightningAddressFormValue &&
      lnAddressEvaluationState !== LNAddressEvaluationState.SUCCEEDED
    ) {
      const response = await evaluateLightningAddress({
        variables: { lightningAddress: lightningAddressFormValue },
      })
      if (!response?.data?.lightningAddressVerify?.valid) {
        return
      }
    }

    const walletInputToSubmit = createWalletInput

    if (connectionOption === ConnectionOption.PERSONAL_NODE) {
      const { isValid, errors, formattedTlsCert } = validateNodeForm(nodeInput)
      if (!isValid) {
        setNodeFormError(errors)
        return
      }

      if (walletInputToSubmit?.lndConnectionDetailsInput && formattedTlsCert) {
        walletInputToSubmit.lndConnectionDetailsInput.tlsCertificate = formattedTlsCert
      }
    }

    if (isEdit && !walletInputToSubmit) {
      toast({
        title: t('failed to create project wallet'),
        description: t('please provide valid wallet details'),
        status: 'error',
      })
      return
    }

    onSubmit(walletInputToSubmit)
  }, [
    createWalletInput,
    onSubmit,
    toast,
    lightningAddressFormValue,
    lnAddressEvaluationState,
    connectionOption,
    evaluateLightningAddress,
    isEdit,
    nodeInput,
  ])

  const validateLightningAddressFormat = (lightningAddress: string) => {
    if (!lightningAddress) {
      setLightningAddressFormError(null)
      setLnAddressEvaluationState(LNAddressEvaluationState.IDLE)
      return false
    }

    if (lightningAddress.endsWith('@geyser.fund')) {
      setLightningAddressFormError(`Custom Lightning Addresses can't end with "@geyser.fund".`)
      return false
    }

    if (validateEmail(lightningAddress) === false) {
      setLightningAddressFormError(`Please use a valid email-formatted address for your Lightning Address.`)
      return false
    }

    setLightningAddressFormError(null)
    return true
  }

  const isFormDirty = useCallback(() => {
    if (!projectWallet?.connectionDetails) {
      return true
    }

    const details = projectWallet.connectionDetails

    const isLightningAddressDirty = () => {
      if (details.__typename === WalletConnectDetails.LightningAddressConnectionDetails) {
        return Boolean(details.lightningAddress) && details.lightningAddress !== lightningAddressFormValue
      }

      return Boolean(lightningAddressFormValue)
    }

    const isPersonalNodeDirty = () => {
      if (details.__typename === WalletConnectDetails.LndConnectionDetailsPrivate) {
        return (
          `${projectWallet.name}` !== `${nodeInput?.name}` ||
          `${details.grpcPort}` !== `${nodeInput?.grpc}` ||
          details.hostname !== nodeInput?.hostname ||
          (details.lndNodeType === LndNodeType.Voltage) !== nodeInput?.isVoltage ||
          details.macaroon !== nodeInput?.invoiceMacaroon ||
          (details.pubkey || '') !== (nodeInput?.publicKey || '') ||
          `${details.tlsCertificate || ''}` !== `${nodeInput?.tlsCert}` ||
          `${projectWallet.feePercentage}` !== `${feePercentage}`
        )
      }

      return Boolean(nodeInput)
    }

    const isNWCDirty = () => {
      if (details.__typename === WalletConnectDetails.NWCConnectionDetailsPrivate) {
        return Boolean(details.nwcUrl) && details.nwcUrl !== nostrWalletConnectURI
      }

      return Boolean(nostrWalletConnectURI)
    }

    switch (connectionOption) {
      case ConnectionOption.LIGHTNING_ADDRESS:
        return isLightningAddressDirty()
      case ConnectionOption.PERSONAL_NODE:
        return isPersonalNodeDirty()
      case ConnectionOption.NWC:
        return isNWCDirty()
      default:
        return false
    }
  }, [connectionOption, projectWallet, lightningAddressFormValue, nodeInput, nostrWalletConnectURI, feePercentage])

  const isLightningAddressInValid = useMemo(() => {
    if (
      connectionOption === ConnectionOption.LIGHTNING_ADDRESS &&
      ((lnAddressEvaluationState !== LNAddressEvaluationState.SUCCEEDED &&
        lnAddressEvaluationState !== LNAddressEvaluationState.IDLE) ||
        Boolean(lightningAddressFormError))
    ) {
      return true
    }

    return false
  }, [connectionOption, lnAddressEvaluationState, lightningAddressFormError])

  return {
    handleConfirm,
    lightningAddress: {
      error: lightningAddressFormError,
      state: lnAddressEvaluationState,
      value: lightningAddressFormValue,
      setValue: setLightningAddressFormValue,
      evaluating: isEvaluatingLightningAddress,
      validate: validateLightningAddress,
    },
    node: {
      value: nodeInput,
      setValue: setNode,
      error: nodeFormError,
      clearError: () => setNodeFormError(defaultNodeFormError),
      isOpen,
      onClose,
      onOpen,
    },
    nwc: {
      value: nostrWalletConnectURI,
      setValue: setNostrWalletConnectURI,
    },
    fee: {
      value: feePercentage,
      setValue: setFeePercentage,
    },
    limits,
    isFormDirty,
    connectionOption,
    setConnectionOption,
    createWalletInput,
    isLightningAddressInValid,
  }
}

const validateNodeForm = (form: TNodeInput) => {
  const errors: any = {}
  let isValid = true
  let formattedTlsCert = ''

  const additionalText = ' is a required field'

  if (!form.name) {
    errors.name = 'Node name' + additionalText
    isValid = false
  } else if (form.name.length > ProjectNodeValidations.nodeName.maxLength) {
    errors.name = `${t('Node name cannot be longer than')} ${ProjectNodeValidations.nodeName.maxLength} ${t(
      'characters',
    )}.`
    isValid = false
  }

  if (!form.hostname) {
    errors.hostname = 'Host name' + additionalText
    isValid = false
  } else if (form.hostname.match(/:\d+$/)) {
    errors.hostname = `${t('Host name cannot contain port number')}.`
    isValid = false
  } else {
    const val = isTorV3Address(form.hostname)
    if (val) {
      errors.hostname = 'Tor addresses are currently not supported'
      isValid = false
    }
  }

  if (!form.publicKey) {
    errors.publicKey = 'Public Key' + additionalText
    isValid = false
  } else if (form.publicKey.length !== ProjectNodeValidations.publicKey.length) {
    errors.publicKey = `${t('Public Key must be')} ${ProjectNodeValidations.publicKey.length} ${t('characters long')}.`
    isValid = false
  } else {
    const val = isSecp256k1Compressed(form.publicKey)
    if (!val) {
      errors.publicKey = 'The Public Key is wrongly formatted.'
      isValid = false
    }
  }

  if (!form.invoiceMacaroon) {
    errors.invoiceMacaroon = 'Invoice Macaroon' + additionalText
    isValid = false
  } else if (form.invoiceMacaroon.length > ProjectNodeValidations.invoiceMacaroon.maxLength) {
    errors.invoiceMacaroon = `${t('Invoice Macaroon cannot be longer than')} ${
      ProjectNodeValidations.invoiceMacaroon.maxLength
    } ${t('characters')}.`
    isValid = false
  } else {
    const val = checkMacaroonPermissions(form.invoiceMacaroon)
    if (val) {
      errors.invoiceMacaroon = val
      isValid = false
    }
  }

  if (!form.isVoltage) {
    if (!form.tlsCert) {
      errors.tlsCert = 'TLS certificate' + additionalText
      isValid = false
    } else {
      const tlsValidation = validateTLSCertificate(form.tlsCert)
      if (!tlsValidation.isValid) {
        errors.tlsCert = tlsValidation.error
        isValid = false
      } else {
        formattedTlsCert = tlsValidation.formattedCert
      }
    }
  }

  if (!form.isVoltage && !form.grpc) {
    errors.grpc = 'gRPC port' + additionalText
    isValid = false
  }

  return { isValid, errors, formattedTlsCert }
}
