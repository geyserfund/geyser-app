import { HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCheckCircleFill } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'
import { useCustomTheme } from '@/utils'

import { LndConnectionDetailsPrivate, Wallet } from '../../../types'

export const NodeConnectionDetails = ({ projectWallet }: { projectWallet: Partial<Wallet> }) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()
  const { connectionDetails } = projectWallet || {}
  const [isTlsCertificateExpanded, setIsTlsCertificateExpanded] = useState(false)
  const [isMacaroonExpanded, setIsMacaroonExpanded] = useState(false)

  if (!connectionDetails) {
    return null
  }

  const lndConnectionDetails = connectionDetails as LndConnectionDetailsPrivate

  return (
    <>
      <VStack width="100%" alignItems="flex-start" spacing="10px">
        <HStack width="100%">
          <PiCheckCircleFill color={colors.primary1[11]} fontSize="12px" />
          <Body size="xs" color="primary.800">
            {t('RUNNING')}
          </Body>
        </HStack>
        <HStack width="100%" justifyContent="space-between">
          <Body size="sm" medium>
            {projectWallet?.name}
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

          <VStack width="100%" spacing={1} alignItems="flex-start">
            <Body size="sm" wordBreak="break-all">
              {isMacaroonExpanded
                ? lndConnectionDetails.macaroon
                : `${lndConnectionDetails.macaroon.substring(0, 50)}...`}
            </Body>
            <Body
              size="xs"
              cursor="pointer"
              onClick={() => setIsMacaroonExpanded(!isMacaroonExpanded)}
              _hover={{ textDecoration: 'underline' }}
            >
              {isMacaroonExpanded ? t('Show less') : t('Show full macaroon')}
            </Body>
          </VStack>
        </VStack>
        {lndConnectionDetails.tlsCertificate && (
          <VStack width="100%" spacing={0} alignItems="flex-start">
            <Body size="xs" light>
              {t('TLS certificate')}
            </Body>

            <VStack width="100%" spacing={1} alignItems="flex-start">
              <Body size="sm" wordBreak="break-all">
                {isTlsCertificateExpanded
                  ? lndConnectionDetails.tlsCertificate
                  : `${lndConnectionDetails.tlsCertificate.substring(0, 50)}...`}
              </Body>
              <Body
                size="xs"
                cursor="pointer"
                onClick={() => setIsTlsCertificateExpanded(!isTlsCertificateExpanded)}
                _hover={{ textDecoration: 'underline' }}
              >
                {isTlsCertificateExpanded ? t('Show less') : t('Show full certificate')}
              </Body>
            </VStack>
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
