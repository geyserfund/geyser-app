import { Box, Button, HStack, Link, Text, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiTranslate } from 'react-icons/pi'

import { Modal } from '../../../../shared/components/layouts'
import { languageFalgs, LanguageRequestUrl, languages } from '../../../../shared/constants'
import { allTranslations } from '../../../../translations'
import { ColorModeSwitcher } from '../../../../utils'

export const ModeChange = () => {
  const { i18n, t } = useTranslation()

  const { isOpen, onClose, onOpen } = useDisclosure()

  const renderLanguages = Object.keys(allTranslations).map((key) => {
    const translation = allTranslations[key as keyof typeof allTranslations]

    const language = {
      key,
      translation,
      disabled: false,
    }

    return language
  })

  return (
    <>
      <HStack w="full">
        <ColorModeSwitcher />
        <Button variant="outline" colorScheme="neutral1" w="full" onClick={onOpen} flex={1} leftIcon={<PiTranslate />}>
          <Text isTruncated>{t('Change language')}</Text>
        </Button>
      </HStack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xs"
        contentProps={{ maxWidth: '250px' }}
        title={t('Select language')}
      >
        <VStack pb={5}>
          {renderLanguages.map((lng) => (
            <Tooltip key={lng.key} label={lng.disabled ? t('Coming soon') : ''}>
              <Button
                variant="solid"
                colorScheme="neutral1"
                style={{
                  fontWeight: i18n.resolvedLanguage === lng.key ? 'bold' : 'normal',
                }}
                type="submit"
                onClick={() => {
                  i18n.changeLanguage(lng.key)
                  onClose()
                }}
                w={200}
                textAlign={'start'}
                isDisabled={lng.disabled}
              >
                <Box w="100%">
                  <Box as={'span'} w="100%" paddingRight={2}>
                    {languageFalgs[lng.key]}
                  </Box>
                  {languages[lng.key]}
                </Box>
              </Button>
            </Tooltip>
          ))}
        </VStack>
        <Link href={LanguageRequestUrl} isExternal>
          {t('Request a language')}
        </Link>
      </Modal>
    </>
  )
}
