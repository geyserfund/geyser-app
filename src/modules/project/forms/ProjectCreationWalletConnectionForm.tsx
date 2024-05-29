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
  Text,
  VStack,
} from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { AiOutlineSetting } from 'react-icons/ai'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'

import { BoltIcon, NodeIcon } from '../../../components/icons'
import { TextInputBox } from '../../../components/ui'
import Loader from '../../../components/ui/Loader'
import {
  AlbyLightningAddressURL,
  AlbyUrl,
  BitNobURL,
  BitnobUrl,
  BlinkLogoUrl,
  BlinkUrl,
  GeyserLightningWalletGuideLink,
  LIGHTNING_FEE_PERCENTAGE,
  StrikeLogoUrl,
  StrikeUrl,
  VoltageExplainerPageForGeyserURL,
  VoltageUrl,
  WalletOfSatoshiLightningAddressURL,
  WalletOfSatoshiUrl,
} from '../../../constants'
import { lightModeColors } from '../../../styles'
import { LndNodeType } from '../../../types'
import { ProjectFeeSelection } from '../components/ProjectFeeSelection'
import { WalletConnectionOptionInfoBox } from '../pages/projectCreate/components/WalletConnectionOptionInfoBox'
import {
  ConnectionOption,
  LightingWalletForm,
  Limits,
  LNAddressEvaluationState,
  NodeWalletForm,
  WalletForm,
} from '../pages/projectCreate/hooks/useWalletForm'
import { WalletConnectionDetails } from '../pages/projectDashboard/components'
import { WalletLimitComponent } from '../pages/projectDashboard/components/WalletLimitComponent'
import { NodeAdditionModal } from './components/NodeAdditionModal'

type Props = {
  readOnly?: boolean
  isEdit?: boolean
  connectionOption: ConnectionOption
  lightningAddress: LightingWalletForm
  node: NodeWalletForm
  setConnectionOption: (connectionOption: ConnectionOption) => void
  fee: WalletForm['fee']
  limits: Limits
}

export const ProjectCreationWalletConnectionForm = ({
  readOnly,
  isEdit,
  connectionOption,
  lightningAddress,
  node,
  setConnectionOption,
  fee,
  limits,
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
        return <BsFillXCircleFill fill={lightModeColors.secondary.red} size="24px" />
      case LNAddressEvaluationState.SUCCEEDED:
        return <BsFillCheckCircleFill fill={lightModeColors.primary[500]} size="24px" />
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
              }
              promoText={t(`${LIGHTNING_FEE_PERCENTAGE}% Geyser fee per transaction`)}
              secondaryText={
                <Trans
                  i18nKey={
                    '<0>Lightning Addresses</0> are like an email address, but for your Bitcoin. You’ll receive all on-chain and lightning transactions directly to your lightning wallet. Get your own lightning access using these recommended apps.'
                  }
                >
                  <Link textDecoration="underline" href={GeyserLightningWalletGuideLink} isExternal>
                    Lightning Addresses
                  </Link>
                  {
                    ' are like an email address, but for your Bitcoin. You’ll receive all on-chain and lightning transactions directly to your lightning wallet. Get your own lightning access using these recommended apps.'
                  }
                </Trans>
              }
            >
              {lightningAddress.value && lightningAddress.state === LNAddressEvaluationState.SUCCEEDED ? (
                <WalletLimitComponent limit={limits} />
              ) : (
                <HStack width={'full'} justifyContent={'flex-start'} spacing={'10px'} flexWrap="wrap">
                  <RenderSponsorImage url={WalletOfSatoshiLightningAddressURL} imageUrl={WalletOfSatoshiUrl} />
                  <RenderSponsorImage url={BitNobURL} imageUrl={BitnobUrl} />
                  <RenderSponsorImage url={BlinkUrl} imageUrl={BlinkLogoUrl} />
                  <RenderSponsorImage url={StrikeUrl} imageUrl={StrikeLogoUrl} />
                  <RenderSponsorImage url={AlbyLightningAddressURL} imageUrl={AlbyUrl} />
                  <Link textDecoration="none" href={GeyserLightningWalletGuideLink} isExternal>
                    <Text fontWeight="bold" color="neutral.900" fontSize="16px">
                      {t('See more')}
                    </Text>
                  </Link>
                </HStack>
              )}
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
              promoText={t('No set fee per transaction')}
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
                    <Link href={VoltageExplainerPageForGeyserURL}>create a cloud node</Link> with the recommended app.
                  </Trans>
                </span>
              }
            >
              <>
                <RenderSponsorImage url={VoltageExplainerPageForGeyserURL} imageUrl={VoltageUrl} />
                <ProjectFeeSelection readOnly={readOnly} value={fee.value} onChange={fee.setValue} />
              </>
            </WalletConnectionOptionInfoBox>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <NodeAdditionModal isOpen={node.isOpen} onClose={node.onClose} nodeInput={nodeInput} onSubmit={node.setValue} />
    </VStack>
  )
}

const RenderSponsorImage = ({ url, imageUrl, height = '24px' }: { url: string; imageUrl: string; height?: string }) => {
  return (
    <Box backgroundColor={lightModeColors.neutral[100]} borderRadius={'8px'} px={2} py={1}>
      <Link isExternal href={url}>
        <Image src={imageUrl} height={height} />
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
