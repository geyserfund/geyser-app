import { HStack, InputGroup, InputRightElement, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'

import { TextInputBox } from '@/components/ui'
import Loader from '@/components/ui/Loader'
import { ProjectFeeSelection } from '@/modules/project/components/ProjectFeeSelection'
import { NodeAdditionForm } from '@/modules/project/forms/components/NodeAdditionForm.tsx'
import { RenderSponsorFromTable } from '@/modules/project/forms/components/RenderSponsorFromTable.tsx'
import { RenderSponsorImage } from '@/modules/project/forms/components/RenderSponsorImage.tsx'
import { WalletConnectionOptionInfoBox } from '@/modules/project/pages1/projectCreation/components/WalletConnectionOptionInfoBox'
import {
  ConnectionOption,
  LightingWalletForm,
  Limits,
  LNAddressEvaluationState,
  NodeWalletForm,
  NWCWalletForm,
  WalletForm,
} from '@/modules/project/pages1/projectCreation/hooks/useWalletForm'
import { WalletLimitComponent } from '@/modules/project/pages1/projectDashboard/components/WalletLimitComponent'
import { Body } from '@/shared/components/typography'
import { GeyserLightningWalletGuideLink, LIGHTNING_FEE_PERCENTAGE } from '@/shared/constants'
import { lightModeColors } from '@/shared/styles'

const FeaturedNWCWalletList = [
  {
    name: 'Alby Hub',
    imageUrl: 'https://storage.googleapis.com/geyser-projects-media/platform/alby-hub-light.png',
    imageUrlDark: 'https://storage.googleapis.com/geyser-projects-media/platform/alby-hub-dark.png',
    url: 'https://albyhub.com/',
  },
]

export const LightningAddressWalletForm = ({
  readOnly,
  lightningAddress,
  connectionOption,
  limits,
  showPromoText = true,
}: {
  readOnly?: boolean
  lightningAddress: LightingWalletForm
  connectionOption: ConnectionOption
  limits: Limits
  showPromoText?: boolean
}) => {
  const renderRightElementContent = () => {
    if (lightningAddress.evaluating) {
      return <Loader size="md"></Loader>
    }

    switch (lightningAddress.state) {
      case LNAddressEvaluationState.IDLE:
        return null
      case LNAddressEvaluationState.LOADING:
        return <Loader size="md"></Loader>
      case LNAddressEvaluationState.FAILED:
        return <BsFillXCircleFill fill={lightModeColors.secondary.red} size="24px" />
      case LNAddressEvaluationState.SUCCEEDED:
        return <BsFillCheckCircleFill fill={lightModeColors.primary[500]} size="24px" />
      default:
        return null
    }
  }

  return (
    <WalletConnectionOptionInfoBox
      primaryNode={
        <>
          <InputGroup w="full" size={'md'}>
            <TextInputBox
              w="full"
              name="lightning-address"
              type={'email'}
              placeholder={'runwithbitcoin@getalby.com'}
              value={lightningAddress.value}
              onChange={(event) => {
                lightningAddress.setValue(event.target.value)
              }}
              onBlur={lightningAddress.validate}
              isInvalid={Boolean(lightningAddress.error)}
              focusBorderColor={'neutral.200'}
              _valid={{
                focusBorderColor: 'primary.500',
              }}
              error={lightningAddress.error}
              isDisabled={readOnly}
            />
            <InputRightElement>{renderRightElementContent()}</InputRightElement>
          </InputGroup>
          {lightningAddress.value && lightningAddress.state === LNAddressEvaluationState.SUCCEEDED ? (
            <WalletLimitComponent limit={limits} />
          ) : null}
        </>
      }
      promoText={showPromoText ? t(`${LIGHTNING_FEE_PERCENTAGE}% Geyser fee per transaction`) : undefined}
      secondaryText={
        <Trans
          i18nKey={
            '<0>Lightning Addresses</0> are like an email address, but for your Bitcoin. You will receive all on-chain and lightning transactions directly to your lightning wallet. Get your own by looking at our featured and other <2>recommended wallets.</2>'
          }
        >
          <Link textDecoration="underline" href={GeyserLightningWalletGuideLink} isExternal>
            Lightning Addresses
          </Link>
          {
            ' are like an email address, but for your Bitcoin. You will receive all on-chain and lightning transactions directly to your lightning wallet. Get your own by looking at our featured and other '
          }
          <Link textDecoration="underline" href={GeyserLightningWalletGuideLink} isExternal color="primary1.11">
            recommended wallets.
          </Link>
        </Trans>
      }
    >
      <VStack w="full" alignItems={'start'} spacing={1}>
        <Body size="sm" medium>
          {t('Featured Wallets')}
        </Body>
        <RenderSponsorFromTable />
      </VStack>
    </WalletConnectionOptionInfoBox>
  )
}

export const LightningNodeWalletForm = ({
  readOnly,
  node,
  fee,
}: {
  readOnly?: boolean
  node: NodeWalletForm
  fee: WalletForm['fee']
}) => {
  return (
    <WalletConnectionOptionInfoBox>
      <NodeAdditionForm
        form={node.value}
        setForm={node.setValue}
        formError={node.error}
        clearFormError={node.clearError}
      />
      <ProjectFeeSelection readOnly={readOnly} value={fee.value} onChange={fee.setValue} />
    </WalletConnectionOptionInfoBox>
  )
}

export const NostrWalletConnectWalletForm = ({
  readOnly,
  nwc,
  showPromoText = true,
}: {
  readOnly?: boolean
  nwc: NWCWalletForm
  showPromoText?: boolean
}) => {
  return (
    <WalletConnectionOptionInfoBox
      primaryNode={
        <InputGroup w="full" size={'md'}>
          <TextInputBox
            w="full"
            name="nostr-wallet-connect"
            type={'text'}
            placeholder={'nostr+walletconnect://...'}
            value={nwc.value}
            onChange={(event) => {
              nwc.setValue(event.target.value)
            }}
            focusBorderColor={'neutral.200'}
            _valid={{
              focusBorderColor: 'primary.500',
            }}
            isDisabled={readOnly}
          />
        </InputGroup>
      }
      promoText={
        showPromoText ? t(`{{fee}}% Geyser fee per transaction`, { fee: LIGHTNING_FEE_PERCENTAGE }) : undefined
      }
      secondaryText={
        <Trans
          i18nKey={
            '<0>Nostr Wallet Connect</0> is a protocol that makes use of Nostr to connect web apps with lightning wallets. Read more on <2>nwc.dev.</2>'
          }
        >
          {
            'Nostr Wallet Connect is a protocol that makes use of Nostr to connect web apps with lightning wallets. Read more on '
          }
          <Link textDecoration="underline" href="https://nwc.dev/" isExternal color="primary1.11">
            nwc.dev
          </Link>
          {'.'}
        </Trans>
      }
    >
      <VStack w="full" alignItems={'start'} spacing={1}>
        <Body size="sm" medium>
          {t('Featured Wallets')}
        </Body>
        <HStack width={'full'} justifyContent={'flex-start'} spacing={'10px'} flexWrap="wrap">
          {FeaturedNWCWalletList.map((wallet) => {
            return (
              <RenderSponsorImage
                key={wallet.name}
                url={wallet.url}
                imageUrl={wallet.imageUrl}
                imageUrlDark={wallet.imageUrlDark}
                alt={`${wallet.name} sponsor image`}
              />
            )
          })}
        </HStack>
      </VStack>
    </WalletConnectionOptionInfoBox>
  )
}

export type WalletConnectionFormProps = {
  readOnly?: boolean
  connectionOption: ConnectionOption
  setConnectionOption: (connectionOption: ConnectionOption) => void
  lightningAddress: LightingWalletForm
  node?: NodeWalletForm
  nwc: NWCWalletForm
  fee?: WalletForm['fee']
  limits: Limits
  showPromoText?: boolean
}

export const WalletConnectionForm = ({
  readOnly,
  connectionOption,
  lightningAddress,
  node,
  nwc,
  fee,
  limits,
  showPromoText = true,
}: WalletConnectionFormProps) => {
  if (connectionOption === ConnectionOption.LIGHTNING_ADDRESS) {
    return (
      <LightningAddressWalletForm
        readOnly={readOnly}
        lightningAddress={lightningAddress}
        connectionOption={connectionOption}
        limits={limits}
        showPromoText={showPromoText}
      />
    )
  }

  if (connectionOption === ConnectionOption.PERSONAL_NODE) {
    return <>{node && fee && <LightningNodeWalletForm readOnly={readOnly} node={node} fee={fee} />}</>
  }

  if (connectionOption === ConnectionOption.NWC) {
    return <NostrWalletConnectWalletForm readOnly={readOnly} nwc={nwc} showPromoText={showPromoText} />
  }

  return null
}
