import { HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiCheckCircleFill } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'
import { useCustomTheme } from '@/utils'

import { LightningAddressConnectionDetails, LndConnectionDetailsPrivate, Wallet } from '../../../types'
import { ProjectFundingSettingsLightningAddressView } from '../pages1/projectDashboard/components/ProjectFundingSettingsLightningAddressView'

export const WalletConnectionDetails = ({ projectWallet }: { projectWallet: Partial<Wallet> }) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()
  const { connectionDetails } = projectWallet || {}

  if (!connectionDetails) {
    return null
  }

  if (connectionDetails.__typename === 'LightningAddressConnectionDetails') {
    const lightningConnectionDetails = connectionDetails as LightningAddressConnectionDetails

    return (
      // <GridItem colSpan={8} display="flex" justifyContent="center">
      <ProjectFundingSettingsLightningAddressView lightningAddress={lightningConnectionDetails.lightningAddress} />
      // </GridItem>
    )
  }

  const lndConnectionDetails = connectionDetails as LndConnectionDetailsPrivate

  return (
    <>
      <VStack
        width="100%"
        border="1px solid"
        borderColor="neutral.400"
        borderRadius="4px"
        alignItems="flex-start"
        padding="10px"
        spacing="10px"
      >
        <HStack width="100%" justifyContent="space-between">
          <Body size="sm" medium>
            {projectWallet?.name}
          </Body>
        </HStack>
        <HStack width="100%">
          <PiCheckCircleFill color={colors.primary1[11]} fontSize="12px" />
          <Body size="xs" color="primary.800">
            {t('RUNNING')}
          </Body>
        </HStack>

        <VStack width="100%" spacing={0} alignItems="flex-start">
          <Body size="xs" light>
            {t('Hostname or IP address')}
          </Body>
          <Body size="sm" wordBreak="break-all">
            {lndConnectionDetails.hostname}
          </Body>
        </VStack>

        <VStack width="100%" spacing={0} alignItems="flex-start">
          <Body size="xs" light>
            {t('Public key')}
          </Body>
          <Body size="sm" wordBreak="break-all">
            {lndConnectionDetails.pubkey}
          </Body>
        </VStack>
        <VStack width="100%" spacing={0} alignItems="flex-start" flexWrap="wrap">
          <Body size="xs" light>
            {t('Invoice Macaroon')}
          </Body>

          <Body size="sm" wordBreak="break-all">
            {lndConnectionDetails.macaroon}
          </Body>
        </VStack>
        {lndConnectionDetails.tlsCertificate && (
          <VStack width="100%" spacing={0} alignItems="flex-start">
            <Body size="xs" light>
              {t('TLS certificate')}
            </Body>

            <Body size="sm" wordBreak="break-all">
              {lndConnectionDetails.tlsCertificate}
            </Body>
          </VStack>
        )}
        <VStack width="100%" spacing={0} alignItems="flex-start">
          <Body size="xs" light>
            {t('gRPC port')}
          </Body>

          <Body size="sm" wordBreak="break-all">
            {lndConnectionDetails.grpcPort}
          </Body>
        </VStack>
      </VStack>
    </>
  )
}
