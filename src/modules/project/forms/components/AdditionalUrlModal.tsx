import { Button, ButtonProps, HStack, Icon, Input, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { PiYoutubeLogo } from 'react-icons/pi'

import { FieldContainer } from '@/shared/components/form'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks'
import { isValidMediaUrl } from '@/utils/validations/checkValidMediaUrl'

type AdditionalUrlModalProps = {
  onAdd: (url: string) => void
} & ButtonProps

export const AdditionalUrlModal = ({ onAdd, ...rest }: AdditionalUrlModalProps) => {
  const additionalUrlModal = useModal()

  const [input, setInput] = useState('')

  const [error, setError] = useState<string>('')

  const handleAddClick = () => {
    const isValid = isValidMediaUrl(input)

    if (!isValid) {
      setError(t('Invalid URL'))
      return
    }

    onAdd(input)
    setInput('')
    additionalUrlModal.onClose()
  }

  return (
    <HStack flex={1} w={{ base: 'full', md: 'unset' }}>
      <Button
        variant="soft"
        colorScheme="neutral1"
        h={{ base: '40px', lg: '64px' }}
        borderRadius="12px"
        backgroundColor="neutral1.3"
        justifyContent="center"
        onClick={additionalUrlModal.onOpen}
        rightIcon={<Icon as={PiYoutubeLogo} fontSize="20px" />}
        {...rest}
      >
        <Body size="lg" light>
          {t('Add external video')}
        </Body>
      </Button>

      <Modal
        {...additionalUrlModal}
        title={t('Add external video')}
        bodyProps={{
          as: VStack,
          gap: 4,
        }}
      >
        <FieldContainer
          title={t('Media url')}
          subtitle={t('Youtube and Vimeo video links are supported for project headers.')}
          error={error}
        >
          <Input
            value={input}
            onBlur={() => setError('')}
            onChange={(e) => setInput(e.target.value)}
            width="full"
            isInvalid={Boolean(error)}
          />
        </FieldContainer>

        <HStack width="full">
          <Button flex={1} variant="soft" colorScheme="neutral1" onClick={additionalUrlModal.onClose}>
            {t('Cancel')}
          </Button>
          <Button flex={1} variant="solid" colorScheme="primary1" isDisabled={!input} onClick={handleAddClick}>
            {t('Add')}
          </Button>
        </HStack>
      </Modal>
    </HStack>
  )
}
