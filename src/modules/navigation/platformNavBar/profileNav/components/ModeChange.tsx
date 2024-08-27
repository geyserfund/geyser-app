import { Button, HStack, Link, Text, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiTranslate } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { languageFalgs, LanguageRequestUrl, languages } from '@/shared/constants'
import { allTranslations } from '@/translations'
import { ColorModeSwitcher } from '@/utils'

export const ModeChange = () => {
  const { i18n, t } = useTranslation()
  const navigate = useNavigate()

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
      <Modal isOpen={isOpen} onClose={onClose} size="xs" title={t('Select language')}>
        <VStack pb={5}>
          {renderLanguages.map((lng) => (
            <Tooltip key={lng.key} label={lng.disabled ? t('Coming soon') : ''}>
              <Button
                variant="surface"
                colorScheme="neutral1"
                style={{
                  fontWeight: i18n.resolvedLanguage === lng.key ? 'bold' : 'normal',
                }}
                type="submit"
                onClick={() => {
                  i18n.changeLanguage(lng.key)
                  navigate(0)
                  onClose()
                }}
                w={200}
                textAlign={'start'}
                isDisabled={lng.disabled}
              >
                <HStack w="100%" alignItems="center">
                  <Body pt={0.5}>{languageFalgs[lng.key]}</Body>

                  <Body>{languages[lng.key]}</Body>
                </HStack>
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
