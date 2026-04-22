import {
  Accordion,
  AccordionButton,
  AccordionButtonProps,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  InputGroup,
  InputRightElement,
  Link,
  VStack,
} from '@chakra-ui/react'
import { forwardRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'

import { BoltIcon } from '@/components/icons'
import { NWCIcon } from '@/components/icons/svg/NWCIcon'
import { TextInputBox } from '@/components/ui'
import Loader from '@/components/ui/Loader'
import { RenderSponsorFromTable } from '@/modules/project/forms/components/RenderSponsorFromTable.tsx'
import { RenderSponsorImage } from '@/modules/project/forms/components/RenderSponsorImage.tsx'
import {
  WalletConnectionOptionInfoBox,
  WalletConnectionOptionInfoBoxProps,
} from '@/modules/project/pages/projectCreation/components/WalletConnectionOptionInfoBox'
import {
  ConnectionOption,
  LightingWalletForm,
  Limits,
  LNAddressEvaluationState,
  NWCWalletForm,
} from '@/modules/project/pages/projectCreation/hooks/useWalletForm'
import { WalletLimitComponent } from '@/modules/project/pages/projectDashboard/components/WalletLimitComponent'
import { Body } from '@/shared/components/typography'
import { GeyserLightningWalletGuideLink, LIGHTNING_FEE_PERCENTAGE } from '@/shared/constants'
import { lightModeColors } from '@/shared/styles'
import { useCustomTheme } from '@/utils'

type AvailableOptions = {
  lightningAddress: boolean
  nwc: boolean
}

type Props = {
  readOnly?: boolean
  connectionOption: ConnectionOption
  lightningAddress: LightingWalletForm
  nwc: NWCWalletForm
  setConnectionOption: (connectionOption: ConnectionOption) => void
  limits: Limits
  availableOptions?: AvailableOptions
  showPromoText?: boolean
  removeSponsors?: boolean
}

const FeaturedNWCWalletList = [
  {
    name: 'Alby Hub',
    imageUrl: 'https://storage.googleapis.com/geyser-projects-media/platform/alby-hub-light.png',
    imageUrlDark: 'https://storage.googleapis.com/geyser-projects-media/platform/alby-hub-dark.png',
    url: 'https://albyhub.com/',
  },
]

export const LightningAddressInputField = ({
  lightningAddress,
  readOnly,
  showPromoText,
  removeSponsors,
  limits,
  ...rest
}: {
  lightningAddress: LightingWalletForm
  readOnly?: boolean
  showPromoText?: boolean
  removeSponsors?: boolean
  limits: Limits
} & Omit<WalletConnectionOptionInfoBoxProps, 'primaryNode'>) => {
  const { t } = useTranslation()

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
      pt={0}
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
      {...rest}
    >
      {removeSponsors ? null : (
        <VStack w="full" alignItems={'start'} spacing={1}>
          <Body size="sm" medium>
            {t('Featured Wallets')}
          </Body>
          <RenderSponsorFromTable />
        </VStack>
      )}
    </WalletConnectionOptionInfoBox>
  )
}

const LightningAddressAccordionItem = forwardRef<
  HTMLDivElement,
  {
    readOnly?: boolean
    lightningAddress: LightingWalletForm
    connectionOption: ConnectionOption
    limits: Limits
    showPromoText?: boolean
    removeSponsors?: boolean
  }
>(({ readOnly, lightningAddress, connectionOption, limits, showPromoText = true, removeSponsors }, ref) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()

  return (
    <AccordionItem mb="30px" border="none" tabIndex={0} ref={ref}>
      <h2>
        <AccordionButton {...accordionButtonStyles}>
          <Box as="span" flex="1" textAlign="left">
            {t('Lightning Address')}
          </Box>
          <BoltIcon
            boxSize="30px"
            color={connectionOption === ConnectionOption.LIGHTNING_ADDRESS ? colors.primary1[9] : colors.utils.text}
          />
        </AccordionButton>
      </h2>
      <AccordionPanel p={0}>
        <LightningAddressInputField
          lightningAddress={lightningAddress}
          readOnly={readOnly || false}
          showPromoText={showPromoText}
          removeSponsors={removeSponsors || false}
          limits={limits}
        />
      </AccordionPanel>
    </AccordionItem>
  )
})

const NostrWalletConnectAccordionItem = forwardRef<
  HTMLDivElement,
  {
    readOnly?: boolean
    nwc: NWCWalletForm
    connectionOption: ConnectionOption
    hasLightningAddress: boolean
    showPromoText?: boolean
    removeSponsors?: boolean
  }
>(({ readOnly, nwc, connectionOption, hasLightningAddress, showPromoText = true, removeSponsors }, ref) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()

  return (
    <AccordionItem border="none" tabIndex={hasLightningAddress ? 1 : 0} ref={ref}>
      <h2>
        <AccordionButton {...accordionButtonStyles}>
          <Box as="span" flex="1" textAlign="left">
            {t('Nostr Wallet Connect')}
          </Box>
          <NWCIcon
            boxSize="20px"
            mr={1}
            color={connectionOption === ConnectionOption.NWC ? colors.primary1[9] : colors.utils.text}
          />
        </AccordionButton>
      </h2>
      <AccordionPanel p={0}>
        <WalletConnectionOptionInfoBox
          pt={0}
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
          {removeSponsors ? null : (
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
          )}
        </WalletConnectionOptionInfoBox>
      </AccordionPanel>
    </AccordionItem>
  )
})

export const WalletConnectionForm = ({
  readOnly,
  connectionOption,
  lightningAddress,
  nwc,
  setConnectionOption,
  limits,
  availableOptions = { lightningAddress: true, nwc: true },
  showPromoText = true,
  removeSponsors,
}: Props) => {
  const handleSelection = (expandedIndex: number) => {
    let optionIndex = 0

    if (availableOptions.lightningAddress && expandedIndex === optionIndex) {
      setConnectionOption(ConnectionOption.LIGHTNING_ADDRESS)
      return
    }

    optionIndex += availableOptions.lightningAddress ? 1 : 0

    if (availableOptions.nwc && expandedIndex === optionIndex) {
      setConnectionOption(ConnectionOption.NWC)
    }
  }

  if (!connectionOption) {
    return null
  }

  const getAccordionIndex = () => {
    if (connectionOption === ConnectionOption.LIGHTNING_ADDRESS && availableOptions.lightningAddress) {
      return 0
    }

    if (connectionOption === ConnectionOption.NWC && availableOptions.nwc) {
      let index = 0
      if (availableOptions.lightningAddress) index++
      return index
    }

    return 0
  }

  return (
    <VStack width="100%" alignItems="flex-start" spacing="40px">
      <Accordion w="full" onChange={handleSelection} index={getAccordionIndex()}>
        {availableOptions.lightningAddress && (
          <LightningAddressAccordionItem
            readOnly={readOnly}
            lightningAddress={lightningAddress}
            connectionOption={connectionOption}
            limits={limits}
            showPromoText={showPromoText}
            removeSponsors={removeSponsors}
          />
        )}

        {availableOptions.nwc && (
          <NostrWalletConnectAccordionItem
            readOnly={readOnly}
            nwc={nwc}
            connectionOption={connectionOption}
            hasLightningAddress={availableOptions.lightningAddress}
            showPromoText={showPromoText}
            removeSponsors={removeSponsors}
          />
        )}
      </Accordion>
    </VStack>
  )
}

const accordionButtonStyles: AccordionButtonProps = {
  py: '10px',
  backgroundColor: 'utils.pbg',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'neutral1.6',
  _hover: {
    borderColor: 'neutral1.8',
    backgroundColor: 'utils.pbg',
  },
  _expanded: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomWidth: '0px',
    _hover: {
      borderColor: 'neutral1.6',
    },
  },
}
