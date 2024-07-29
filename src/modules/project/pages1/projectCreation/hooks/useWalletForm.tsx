import { useDisclosure } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useProjectAtom, useWalletAtom } from '@/modules/project/hooks/useProjectAtom'

import { WalletConnectDetails } from '../../../../../shared/constants'
import { useDebounce } from '../../../../../shared/hooks'
import {
  CreateWalletInput,
  LightningAddressContributionLimits,
  LndNodeType,
  Maybe,
  useLightningAddressVerifyLazyQuery,
  WalletLimitsFragment,
  WalletOffChainContributionLimits,
  WalletOnChainContributionLimits,
  WalletResourceType,
} from '../../../../../types'
import { toInt, useNotification, validateEmail } from '../../../../../utils'
import { TNodeInput } from '../types'

interface useWalletFormProps {
  walletLimits?: WalletLimitsFragment | null
  onSubmit: (createWalletInput: CreateWalletInput | null) => void
  isEdit?: boolean
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

export type LightingWalletForm = {
  error: string | null
  state: LNAddressEvaluationState
  value: string
  setValue: (lightningAddress: string) => void
  evaluating: boolean
  validate: () => void
}

export type NodeWalletForm = {
  value: TNodeInput | undefined
  setValue: (node: TNodeInput | undefined) => void
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export type Limits = {
  max?: Maybe<number>
  min?: Maybe<number>
}

export type WalletForm = {
  handleConfirm: () => void
  lightningAddress: LightingWalletForm
  node: NodeWalletForm
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

const DEFAULT_FEE_PERCENTAGE = 0.04
const DEFAULT_LIGHTNING_FEE_PERCENTAGE = 0.04

export const useWalletForm = ({ onSubmit, isEdit }: useWalletFormProps): WalletForm => {
  const { toast } = useNotification()

  const { project } = useProjectAtom()
  const { wallet, walletConnectiondetails } = useWalletAtom()

  const projectWallet = useMemo(() => ({ ...wallet, ...walletConnectiondetails }), [wallet, walletConnectiondetails])

  const { isOpen, onClose, onOpen } = useDisclosure()

  const [nodeInput, setNode] = useState<TNodeInput | undefined>(undefined)

  const [lightningAddressFormValue, setLightningAddressFormValue] = useState('')

  const [lightningAddressFormError, setLightningAddressFormError] = useState<string | null>(null)
  const [lnAddressEvaluationState, setLnAddressEvaluationState] = useState<LNAddressEvaluationState>(
    LNAddressEvaluationState.IDLE,
  )

  const [connectionOption, setConnectionOption] = useState<ConnectionOption>(ConnectionOption.LIGHTNING_ADDRESS)

  useEffect(() => {
    if (walletConnectiondetails) {
      if (
        walletConnectiondetails.connectionDetails.__typename === WalletConnectDetails.LndConnectionDetailsPrivate ||
        walletConnectiondetails.connectionDetails.__typename === WalletConnectDetails.LndConnectionDetailsPublic
      ) {
        setConnectionOption(ConnectionOption.PERSONAL_NODE)
      } else {
        setConnectionOption(ConnectionOption.LIGHTNING_ADDRESS)
      }
    }
  }, [walletConnectiondetails])

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
      if (!nodeInput) {
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

    return null
  }, [project, nodeInput, connectionOption, lightningAddressFormValue, feePercentage])

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

    if (isEdit && !createWalletInput) {
      toast({
        title: 'failed to create project wallet',
        description: 'please provide valid wallet details',
        status: 'error',
      })
      return
    }

    onSubmit(createWalletInput)
  }, [
    createWalletInput,
    onSubmit,
    toast,
    lightningAddressFormValue,
    lnAddressEvaluationState,
    connectionOption,
    evaluateLightningAddress,
    isEdit,
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
    if (projectWallet && projectWallet.connectionDetails) {
      if (connectionOption === ConnectionOption.LIGHTNING_ADDRESS) {
        if (projectWallet.connectionDetails.__typename === WalletConnectDetails.LightningAddressConnectionDetails) {
          return (
            Boolean(projectWallet?.connectionDetails?.lightningAddress) &&
            projectWallet?.connectionDetails?.lightningAddress !== lightningAddressFormValue
          )
        }

        return Boolean(lightningAddressFormValue)
      }

      if (connectionOption === ConnectionOption.PERSONAL_NODE) {
        if (projectWallet.connectionDetails.__typename === WalletConnectDetails.LndConnectionDetailsPrivate) {
          const value =
            `${projectWallet.name}` !== `${nodeInput?.name}` ||
            `${projectWallet.connectionDetails.grpcPort}` !== `${nodeInput?.grpc}` ||
            projectWallet.connectionDetails.hostname !== nodeInput?.hostname ||
            (projectWallet.connectionDetails.lndNodeType === LndNodeType.Voltage) !== nodeInput?.isVoltage ||
            projectWallet.connectionDetails.macaroon !== nodeInput?.invoiceMacaroon ||
            projectWallet.connectionDetails.pubkey !== nodeInput?.publicKey ||
            `${projectWallet.connectionDetails.tlsCertificate || ''}` !== `${nodeInput?.tlsCert}` ||
            `${projectWallet.feePercentage}` !== `${feePercentage}`

          return value
        }

        return Boolean(nodeInput)
      }

      return false
    }

    return true
  }, [connectionOption, lightningAddressFormValue, nodeInput, projectWallet, feePercentage])

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
      isOpen,
      onClose,
      onOpen,
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
