import { Avatar, Checkbox, Link, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiQuestion } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

import { DescriptionLinkWithIconComponent } from '../../../../components/molecules'
import { TextArea, TextInputBox } from '../../../../components/ui'
import { VoltageNodeConnectionDemoURL, WalletCreationFindOutMoreUrl } from '../../../../shared/constants'
import { TNodeInput } from '../../pages1/projectCreation/types'

type Props = {
  form: TNodeInput
  setForm: (node: TNodeInput) => void
  formError: Record<keyof TNodeInput, string>
  clearFormError: () => void
}

export const NodeAdditionForm = ({ form, setForm, formError, clearFormError }: Props) => {
  const { t } = useTranslation()

  const [isVoltage, setIsVoltage] = useState(false)

  useEffect(() => {
    if (form && form.isVoltage) {
      setIsVoltage(true)
    }
  }, [form])

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    clearFormError()

    const { name, value } = event.target

    setForm({ ...form, [name]: value })
  }

  const handleVoltageNodeToggled = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearFormError()

    const isVoltageNode = event.target.checked

    setIsVoltage(isVoltageNode)
  }

  return (
    <VStack width="100%" spacing={4}>
      <VStack spacing={2} alignItems="flex-start">
        <Body size="sm" medium light>
          {t('We currently support LND and clearnet nodes. So Tor nodes will not work at this time.')}
        </Body>

        <Feedback
          variant={FeedBackVariant.WARNING}
          text={
            <>
              {t('Keep in mind that you are responsible for managing the liquidity of your node.')}{' '}
              <Link href={WalletCreationFindOutMoreUrl} target="_blank">
                {t('Find out more')}
              </Link>
              .
            </>
          }
        ></Feedback>
      </VStack>
      <VStack width="100%" alignItems="flex-start">
        <Body size="sm">{t('Node Name')}</Body>
        <TextInputBox name="name" onChange={handleTextChange} value={form.name} error={formError.name} />
      </VStack>

      <VStack width="100%" alignItems="flex-start">
        <Checkbox size="lg" colorScheme="green" isChecked={isVoltage} onChange={handleVoltageNodeToggled}>
          <Body size="sm">{t('This is a Voltage Node')}</Body>
        </Checkbox>

        {isVoltage ? (
          <DescriptionLinkWithIconComponent
            title={t('Find our demo here on how to load a Voltage node.')}
            link={VoltageNodeConnectionDemoURL}
            icon={<Avatar bgColor="neutral1.3" color="neutral1.9" icon={<PiQuestion fontSize="36px" />} />}
          />
        ) : null}
      </VStack>

      <VStack width="100%" alignItems="flex-start">
        <Body size="sm">{`${t('Hostname or IP address')} (${t('API endpoint')})`}</Body>

        <TextInputBox
          name="hostname"
          onChange={handleTextChange}
          placeholder={isVoltage ? 'nodename.m.voltageapp.io' : ''}
          value={form.hostname}
          error={formError.hostname}
        />
      </VStack>

      <VStack width="100%" alignItems="flex-start">
        <Body size="sm">{`${t('Public key')} (${t('Identity Pubkey')})`}</Body>
        <TextArea
          name="publicKey"
          placeholder="0330ba2ac70aa1566d3d07524248ee8a7861aaebdc6d46c8ccd016bfe20b76c995"
          maxHeight="40px"
          onChange={handleTextChange}
          value={form.publicKey}
          error={formError.publicKey}
        />
      </VStack>

      <VStack width="100%" alignItems="flex-start">
        <Body size="sm">{`${t('Invoice Macaroon')} (base64)`}</Body>
        <TextArea
          name="invoiceMacaroon"
          placeholder="AgEDbG5kAlgDChB/+6M8TzkN5U73JwYSTJTZEgEwGhYKB2FkZHJlc3MSBHJlYWQSBXdyaXRlGhcKCGludm9pY2VzEgRyZWFkEgV3cml0ZRoPCgdvbmNoYWluEgRyZWFkAAAGIHCi3WwLBhVswgO+Yiqbwn41AkMmi42RAflN3EOpDCjc"
          maxHeight="60px"
          onChange={handleTextChange}
          value={form.invoiceMacaroon}
          error={formError.invoiceMacaroon}
        />
      </VStack>

      {isVoltage === false ? (
        <>
          <VStack width="100%" alignItems="flex-start">
            <Body size="sm">{`${t('TLS certificate')} (base64)`}</Body>
            <TextArea
              name="tlsCert"
              placeholder="LS0tLS1CRUdJTiBDRVJU.....zeUZrYWFNTzdCWU51SVRxSRVJUSUZJQ0FURS0tLS0tCg=="
              maxHeight="60px"
              onChange={handleTextChange}
              value={form.tlsCert}
              error={formError.tlsCert}
            />
          </VStack>
          <VStack width="100%" alignItems="flex-start">
            <Body size="sm">{t('gRPC port')}</Body>
            <TextInputBox
              name="grpc"
              type="number"
              placeholder="10009"
              onChange={handleTextChange}
              value={form.grpc}
              error={formError.grpc}
            />
          </VStack>
        </>
      ) : null}
    </VStack>
  )
}
