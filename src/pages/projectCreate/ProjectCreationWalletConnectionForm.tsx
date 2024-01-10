import {
  Accordion,
  AccordionButton,
  AccordionButtonProps,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Image,
  InputGroup,
  InputRightElement,
  Link,
  VStack,
} from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { AiOutlineSetting } from 'react-icons/ai'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'

import { BoltIcon, NodeIcon } from '../../components/icons'
import { TextInputBox } from '../../components/ui'
import Loader from '../../components/ui/Loader'
import {
  AlbyLightningAddressURL,
  AlbyUrl,
  BitNobURL,
  BitnobUrl,
  BlinkLogoUrl,
  BlinkUrl,
  VoltageExplainerPageForGeyserURL,
  VoltageUrl,
  WalletOfSatoshiLightningAddressURL,
  WalletOfSatoshiUrl,
} from '../../constants'
import { lightModeColors } from '../../styles'
import { LndNodeType } from '../../types'
import { WalletConnectionDetails } from '../projectDashboard/components'
import { NodeAdditionModal, WalletConnectionOptionInfoBox } from './components'
import {
  ConnectionOption,
  LightingWalletForm,
  LNAddressEvaluationState,
  NodeWalletForm,
} from './hooks/useWalletForm'

type Props = {
  readOnly?: boolean
  isEdit?: boolean
  connectionOption: ConnectionOption
  lightningAddress: LightingWalletForm
  node: NodeWalletForm
  setConnectionOption: (connectionOption: ConnectionOption) => void
}

export const ProjectCreationWalletConnectionForm = ({
  readOnly,
  isEdit,
  connectionOption,
  lightningAddress,
  node,
  setConnectionOption,
}: Props) => {
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
        return (
          <BsFillXCircleFill
            fill={lightModeColors.secondary.yellow}
            size="24px"
          />
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

  const nodeInput = node.value

  const handleSelection = (expandedIndex: number) => {
    if (expandedIndex === 0) {
      setConnectionOption(ConnectionOption.LIGHTNING_ADDRESS)
    } else if (expandedIndex === 1) {
      setConnectionOption(ConnectionOption.PERSONAL_NODE)
    }
  }

  return (
    <VStack width="100%" alignItems="flex-start" spacing="40px">
      <Accordion
        w="full"
        onChange={handleSelection}
        index={connectionOption === ConnectionOption.LIGHTNING_ADDRESS ? 0 : 1}
      >
        <AccordionItem mb="30px" border="none">
          <h2>
            <AccordionButton {...accordionButtonStyles}>
              <Box as="span" flex="1" textAlign="left">
                {t('Lightning Address')}
              </Box>
              <BoltIcon boxSize="20px" />
            </AccordionButton>
          </h2>
          <AccordionPanel p={0}>
            <WalletConnectionOptionInfoBox
              pt={0}
              primaryNode={
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
                    isInvalid={
                      Boolean(lightningAddress.error) ||
                      Boolean(lightningAddress.warn)
                    }
                    focusBorderColor={'neutral.200'}
                    _valid={{
                      focusBorderColor: 'primary.500',
                    }}
                    error={lightningAddress.error}
                    warn={lightningAddress.warn}
                    isDisabled={readOnly}
                  />
                  <InputRightElement>
                    {renderRightElementContent()}
                  </InputRightElement>
                </InputGroup>
              }
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
                flexWrap="wrap"
              >
                <RenderSponsorImage
                  url={AlbyLightningAddressURL}
                  imageUrl={AlbyUrl}
                />
                <RenderSponsorImage
                  url={WalletOfSatoshiLightningAddressURL}
                  imageUrl={WalletOfSatoshiUrl}
                />
                <RenderSponsorImage url={BitNobURL} imageUrl={BitnobUrl} />
                <RenderSponsorImage url={BlinkUrl} imageUrl={BlinkLogoUrl} />
              </HStack>
            </WalletConnectionOptionInfoBox>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none">
          <h2>
            <AccordionButton {...accordionButtonStyles}>
              <Box as="span" flex="1" textAlign="left">
                {t('Lightning Node')}
              </Box>
              <NodeIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p={0}>
            <WalletConnectionOptionInfoBox
              pt={0}
              primaryNode={
                <>
                  <Button
                    leftIcon={<AiOutlineSetting fontSize="20px" />}
                    w="full"
                    variant="secondary"
                    onClick={node.onOpen}
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
              }
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <NodeAdditionModal
        isOpen={node.isOpen}
        onClose={node.onClose}
        nodeInput={nodeInput}
        onSubmit={node.setValue}
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

const accordionButtonStyles: AccordionButtonProps = {
  py: '10px',
  backgroundColor: 'neutral.100',
  borderRadius: '8px',
  _hover: {
    backgroundColor: 'neutral.200',
  },
  _expanded: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    _hover: {
      backgroundColor: 'neutral.100',
    },
  },
}
