import { t } from 'i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useProjectWalletAPI } from '@/modules/project/API/useProjectWalletAPI.ts'
import { useProjectAtom, useWalletAtom } from '@/modules/project/hooks/useProjectAtom'

import { WalletConnectDetails } from '../../../../../shared/constants'
import { useDebounce } from '../../../../../shared/hooks'
import {
  CreateWalletInput,
  LightningAddressContributionLimits,
  Maybe,
  useLightningAddressVerifyLazyQuery,
  WalletOffChainContributionLimits,
  WalletOnChainContributionLimits,
  WalletResourceType,
} from '../../../../../types'
import { toInt, useNotification, validateEmail } from '../../../../../utils'

interface useWalletFormProps {
  onSubmit: (createWalletInput: CreateWalletInput | null) => void
  isEdit?: boolean
}

export enum ConnectionOption {
  LIGHTNING_ADDRESS = 'LIGHTNING_ADDRESS',
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
  nwc: NWCWalletForm
  isFormDirty: () => boolean
  connectionOption: ConnectionOption
  setConnectionOption: (connectionOption: ConnectionOption) => void
  createWalletInput: CreateWalletInput | null
  isLightningAddressInValid: boolean
  limits: Limits
}

const DEFAULT_LIGHTNING_FEE_PERCENTAGE = 0.05

const connectionDetailsTypenameToConnectionOptionMap: Partial<Record<WalletConnectDetails, ConnectionOption>> = {
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
    const connectionDetailsType = walletConnectionDetails?.connectionDetails?.__typename
    if (!connectionDetailsType) return
    const option = connectionDetailsTypenameToConnectionOptionMap[connectionDetailsType as WalletConnectDetails]
    if (option) {
      setConnectionOption(option)
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

  const validateLightningAddressFormat = useCallback((lightningAddress: string) => {
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
  }, [])

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
  }, [debouncedLightningAddress, validateLightningAddress, validateLightningAddressFormat])

  useEffect(() => {
    if (projectWallet && projectWallet.connectionDetails) {
      if (projectWallet.connectionDetails.__typename === WalletConnectDetails.LightningAddressConnectionDetails) {
        setLightningAddressFormValue(projectWallet.connectionDetails.lightningAddress)
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
  }, [project, connectionOption, lightningAddressFormValue, nostrWalletConnectURI])

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
  ])

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

    const isNWCDirty = () => {
      if (details.__typename === WalletConnectDetails.NWCConnectionDetailsPrivate) {
        return Boolean(details.nwcUrl) && details.nwcUrl !== nostrWalletConnectURI
      }

      return Boolean(nostrWalletConnectURI)
    }

    switch (connectionOption) {
      case ConnectionOption.LIGHTNING_ADDRESS:
        return isLightningAddressDirty()
      case ConnectionOption.NWC:
        return isNWCDirty()
      default:
        return false
    }
  }, [connectionOption, projectWallet, lightningAddressFormValue, nostrWalletConnectURI])

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
    nwc: {
      value: nostrWalletConnectURI,
      setValue: setNostrWalletConnectURI,
    },
    limits,
    isFormDirty,
    connectionOption,
    setConnectionOption,
    createWalletInput,
    isLightningAddressInValid,
  }
}
