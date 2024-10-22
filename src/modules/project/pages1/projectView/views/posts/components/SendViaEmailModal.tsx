import { Box, Button, Card, Checkbox, Divider, HStack, Select, Switch, VStack } from '@chakra-ui/react'
import { ActionMeta, SingleValue } from 'chakra-react-select'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiEnvelopeOpenFill, PiEnvelopeSimple } from 'react-icons/pi'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { CardLayout, Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'

type Props = {
  isOpen: boolean
  onClose: () => void
}

// TODO: Replace with EmailSubscriberSegment
enum SendToOption {
  FOLLOWERS = 'FOLLOWERS',
  CONTRIBUTORS = 'CONTRIBUTORS',
  REWARD_BUYERS = 'REWARD_BUYERS',
}

export const SendViaEmailModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation()

  // TODO: Update with own hook
  const isSendPostByEmailChecked = true

  const sendToOptions = [
    { label: t('Followers'), value: SendToOption.FOLLOWERS },
    { label: t('Contributors'), value: SendToOption.CONTRIBUTORS },
    { label: t('Reward buyers'), value: SendToOption.REWARD_BUYERS },
  ]

  const [sendTo, setSendTo] = useState<SendToOption | null>(null)
  const [emailCount, setEmailCount] = useState<number>(0)

  const handleInput = (e: any) => {
    setSendTo(e.value)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <VStack w="full" alignItems="flex-start" spacing={4} px={4}>
        <VStack w="full" alignItems="flex-start" spacing={3}>
          <Body size="md" bold>
            {t('Send via email')}
          </Body>
          <Body size="sm">
            {t(
              'You can publish a post on the platform visible to everyone, and optionally send it via email to select members of your community.',
            )}
          </Body>
        </VStack>

        <CardLayout>
          <VStack w={'full'} alignItems={'flex-start'}>
            <Body size={'sm'} medium>
              {' '}
              {t('Send post by email')}
            </Body>
            <HStack>
              <Body size={'sm'} light>
                {t(
                  'The Post title, subtitle, and image will be the only things visible in the email users receive. Make sure they’re attention-grabbing to encourage them to visit your Post.',
                )}
              </Body>
              <Switch isChecked={isSendPostByEmailChecked} />
            </HStack>
          </VStack>
        </CardLayout>

        {isSendPostByEmailChecked && (
          <VStack w="full" alignItems="flex-start">
            <Body size={'sm'} medium>
              {' '}
              {t('Send to')}
            </Body>
            <CustomSelect
              placeholder={t('Select recipients')}
              options={sendToOptions}
              onChange={handleInput}
              width={'full'}
              size={'sm'}
            />
          </VStack>
        )}

        {/* TODO: Add replace opion with rewards */}
        {isSendPostByEmailChecked && sendTo === SendToOption.REWARD_BUYERS && (
          <CustomSelect size="sm" options={sendToOptions} placeholder={t('Select rewards')} isMulti />
        )}

        {isSendPostByEmailChecked && sendTo !== null && <NumberOfMembers count={emailCount} />}

        <HStack w="full" justifyContent="center" spacing={4}>
          <Button w="full" size="md" variant="soft" colorScheme="neutral1" onClick={onClose}>
            {t('Cancel')}
          </Button>
          <Button
            w="full"
            size="md"
            variant="solid"
            colorScheme="primary1"
            //   onClick={handleSendViaEmail}
            //   isDisabled={emailAlreadySent}
          >
            {t('Send via email')}
          </Button>
        </HStack>
      </VStack>
    </Modal>
  )
}

const NumberOfMembers = ({ count }: { count: number }) => {
  const { t } = useTranslation()

  return (
    <CardLayout
      flexDir={'row'}
      w="full"
      bg={'blueAlpha.2'}
      borderColor={'blueAlpha.6'}
      borderRadius={'12px'}
      alignItems={'center'}
    >
      {/* TODO: Replace with design system color for this blue */}
      <PiEnvelopeSimple size={20} color={'rgba(0, 116, 158, 1)'} />
      <Body size={'sm'} color={'blueAlpha.11'}>
        {' '}
        {t('Email will be sent to')} <strong> {count}</strong> {t('members')}
      </Body>
    </CardLayout>
  )
}
