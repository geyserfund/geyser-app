import {
  Accordion,
  AccordionButton,
  AccordionButtonProps,
  AccordionItem,
  AccordionPanel,
  Box,
  InputGroup,
  InputRightElement,
  Link,
  VStack,
} from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'

import { BoltIcon } from '@/components/icons'
import { TextInputBox } from '@/components/ui'
import Loader from '@/components/ui/Loader'
import { RenderSponsorFromTable } from '@/modules/project/forms/components/RenderSponsorFromTable.tsx'
import {
  WalletConnectionOptionInfoBox,
  WalletConnectionOptionInfoBoxProps,
} from '@/modules/project/pages/projectCreation/components/WalletConnectionOptionInfoBox'
import { WalletLimitComponent } from '@/modules/project/pages/projectDashboard/components/WalletLimitComponent'
import { Body } from '@/shared/components/typography'
import { GeyserLightningWalletGuideLink, LIGHTNING_FEE_PERCENTAGE } from '@/shared/constants'
import { lightModeColors } from '@/shared/styles'
import { LightingWalletForm, Limits, LNAddressEvaluationState } from '@/shared/types/wallet'

type Props = {
  readOnly?: boolean
  lightningAddress: LightingWalletForm
  limits: Limits
  showPromoText?: boolean
  removeSponsors?: boolean
}

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
    if (lightningAddress.evaluating || lightningAddress.state === LNAddressEvaluationState.LOADING) {
      return <Loader size="md" />
    }

    switch (lightningAddress.state) {
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
          <InputGroup w="full" size="md">
            <TextInputBox
              w="full"
              name="lightning-address"
              type="email"
              placeholder="runwithbitcoin@getalby.com"
              value={lightningAddress.value}
              onChange={(event) => lightningAddress.setValue(event.target.value)}
              onBlur={lightningAddress.validate}
              isInvalid={Boolean(lightningAddress.error)}
              focusBorderColor="neutral.200"
              _valid={{ focusBorderColor: 'primary.500' }}
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
        <Trans i18nKey="<0>Lightning Addresses</0> are like an email address, but for your Bitcoin. You will receive all on-chain and lightning transactions directly to your lightning wallet. Get your own by looking at our featured and other <2>recommended wallets.</2>">
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
        <VStack w="full" alignItems="start" spacing={1}>
          <Body size="sm" medium>
            {t('Featured Wallets')}
          </Body>
          <RenderSponsorFromTable />
        </VStack>
      )}
    </WalletConnectionOptionInfoBox>
  )
}

export const WalletConnectionForm = ({
  readOnly,
  lightningAddress,
  limits,
  showPromoText = true,
  removeSponsors,
}: Props) => {
  const { t } = useTranslation()

  return (
    <VStack width="100%" alignItems="flex-start" spacing="40px">
      <Accordion w="full" index={0}>
        <AccordionItem mb="30px" border="none">
          <h2>
            <AccordionButton {...accordionButtonStyles}>
              <Box as="span" flex="1" textAlign="left">
                {t('Lightning Address')}
              </Box>
              <BoltIcon boxSize="30px" color="primary1.9" />
            </AccordionButton>
          </h2>
          <AccordionPanel p={0}>
            <LightningAddressInputField
              lightningAddress={lightningAddress}
              readOnly={readOnly}
              showPromoText={showPromoText}
              removeSponsors={removeSponsors}
              limits={limits}
            />
          </AccordionPanel>
        </AccordionItem>
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
