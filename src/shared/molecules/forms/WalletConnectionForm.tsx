import {
  Accordion,
  AccordionButton,
  AccordionButtonProps,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  InputGroup,
  InputRightElement,
  Link,
  VStack,
} from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'
import { PiGear } from 'react-icons/pi'

import { BoltIcon } from '@/components/icons'
import { NodeIcon } from '@/components/icons'
import { NWCIcon } from '@/components/icons/svg/NWCIcon'
import { TextInputBox } from '@/components/ui'
import Loader from '@/components/ui/Loader'
import { NodeConnectionDetails } from '@/modules/project/components/NodeConnectionDetails'
import { ProjectFeeSelection } from '@/modules/project/components/ProjectFeeSelection'
import { NodeAdditionModal } from '@/modules/project/forms/components/NodeAdditionModal'
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
import { LndNodeType, WalletResourceType } from '@/types'
import { useCustomTheme } from '@/utils'

type AvailableOptions = {
  lightningAddress: boolean
  node: boolean
  nwc: boolean
}

type Props = {
  readOnly?: boolean
  isEdit?: boolean
  connectionOption: ConnectionOption
  lightningAddress: LightingWalletForm
  node?: NodeWalletForm
  nwc: NWCWalletForm
  setConnectionOption: (connectionOption: ConnectionOption) => void
  fee?: WalletForm['fee']
  limits: Limits
  resourceType: WalletResourceType
  availableOptions?: AvailableOptions
}

const FeaturedNWCWalletList = [
  {
    name: 'Alby Hub',
    imageUrl: 'https://storage.googleapis.com/geyser-projects-media/platform/alby-hub-light.png',
    imageUrlDark: 'https://storage.googleapis.com/geyser-projects-media/platform/alby-hub-dark.png',
    url: 'https://albyhub.com/',
  },
]

export const WalletConnectionForm = ({
  readOnly,
  isEdit,
  connectionOption,
  lightningAddress,
  node,
  nwc,
  setConnectionOption,
  fee,
  limits,
  resourceType,
  availableOptions = { lightningAddress: true, node: true, nwc: true },
}: Props) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()

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

  const handleSelection = (expandedIndex: number) => {
    let optionIndex = 0

    if (availableOptions.lightningAddress && expandedIndex === optionIndex) {
      setConnectionOption(ConnectionOption.LIGHTNING_ADDRESS)
      return
    }

    optionIndex += availableOptions.lightningAddress ? 1 : 0

    if (availableOptions.node && expandedIndex === optionIndex) {
      setConnectionOption(ConnectionOption.PERSONAL_NODE)
      return
    }

    optionIndex += availableOptions.node ? 1 : 0

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

    if (connectionOption === ConnectionOption.PERSONAL_NODE && availableOptions.node) {
      return availableOptions.lightningAddress ? 1 : 0
    }

    if (connectionOption === ConnectionOption.NWC && availableOptions.nwc) {
      let index = 0
      if (availableOptions.lightningAddress) index++
      if (availableOptions.node) index++
      return index
    }

    return 0
  }

  const nodeInput = node?.value

  return (
    <VStack width="100%" alignItems="flex-start" spacing="40px">
      <Accordion w="full" onChange={handleSelection} index={getAccordionIndex()}>
        {availableOptions.lightningAddress && (
          <AccordionItem mb="30px" border="none" tabIndex={0}>
            <h2>
              <AccordionButton {...accordionButtonStyles}>
                <Box as="span" flex="1" textAlign="left">
                  {t('Lightning Address')}
                </Box>
                <BoltIcon
                  boxSize="30px"
                  color={
                    connectionOption === ConnectionOption.LIGHTNING_ADDRESS ? colors.primary1[9] : colors.utils.text
                  }
                />
              </AccordionButton>
            </h2>
            <AccordionPanel p={0}>
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
                promoText={t(`${LIGHTNING_FEE_PERCENTAGE}% Geyser fee per transaction`)}
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
                    <Link
                      textDecoration="underline"
                      href={GeyserLightningWalletGuideLink}
                      isExternal
                      color="primary1.11"
                    >
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
            </AccordionPanel>
          </AccordionItem>
        )}

        {availableOptions.node && node && fee && (
          <AccordionItem mb="30px" border="none" tabIndex={availableOptions.lightningAddress ? 1 : 0}>
            <h2>
              <AccordionButton {...accordionButtonStyles}>
                <Box as="span" flex="1" textAlign="left">
                  {t('Lightning Node')}
                </Box>
                <NodeIcon
                  color={connectionOption === ConnectionOption.PERSONAL_NODE ? colors.primary1[9] : colors.utils.text}
                />
              </AccordionButton>
            </h2>
            <AccordionPanel p={0}>
              <WalletConnectionOptionInfoBox
                pt={0}
                primaryNode={
                  <>
                    <Button
                      leftIcon={<PiGear fontSize="20px" />}
                      w="full"
                      variant="outline"
                      colorScheme="neutral1"
                      onClick={node.onOpen}
                      isDisabled={readOnly}
                    >
                      {t('Connect Your Node')}
                    </Button>
                    {nodeInput && (
                      <NodeConnectionDetails
                        projectWallet={{
                          connectionDetails: {
                            grpcPort: nodeInput.isVoltage ? 10009 : Number(nodeInput.grpc),
                            hostname: nodeInput.hostname,
                            lndNodeType: nodeInput.isVoltage ? LndNodeType.Voltage : LndNodeType.Geyser,
                            macaroon: nodeInput.invoiceMacaroon,
                            pubkey: nodeInput.publicKey,
                            tlsCertificate: nodeInput.tlsCert,
                          },
                          name: nodeInput.name,
                        }}
                      />
                    )}
                  </>
                }
                secondaryText={'Connect your lightning node to receive incoming transactions directly.'}
              >
                <>
                  <ProjectFeeSelection readOnly={readOnly} value={fee.value} onChange={fee.setValue} />
                </>
              </WalletConnectionOptionInfoBox>
            </AccordionPanel>
          </AccordionItem>
        )}

        {availableOptions.nwc && (
          <AccordionItem
            border="none"
            tabIndex={(availableOptions.lightningAddress ? 1 : 0) + (availableOptions.node ? 1 : 0)}
          >
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
                  <>
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
                  </>
                }
                promoText={t(`${LIGHTNING_FEE_PERCENTAGE}% Geyser fee per transaction`)}
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
                        />
                      )
                    })}
                  </HStack>
                </VStack>
              </WalletConnectionOptionInfoBox>
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>

      {node && nodeInput && (
        <NodeAdditionModal isOpen={node.isOpen} onClose={node.onClose} nodeInput={nodeInput} onSubmit={node.setValue} />
      )}
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
