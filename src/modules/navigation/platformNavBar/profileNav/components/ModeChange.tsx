import { Button, HStack, Link, Text, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiTranslate } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { languageFalgs, LanguageRequestUrl, languages, lng } from '@/shared/constants'
import { ColorModeSwitcher } from '@/utils'

const allTranslations = [
  lng.ar,
  lng.cz,
  lng.de,
  lng.el,
  lng.en,
  lng.es,
  lng.fr,
  lng.it,
  lng.ja,
  lng.pl,
  lng.pt,
  lng.sw,
  lng.tr,
  lng.zh,
]

export const ModeChange = () => {
  const { i18n, t } = useTranslation()
  const navigate = useNavigate()

  const { isOpen, onClose, onOpen } = useDisclosure()

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
          {allTranslations.map((lng) => (
            <Tooltip key={lng} label={''}>
              <Button
                variant="surface"
                colorScheme="neutral1"
                style={{
                  fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
                }}
                type="submit"
                onClick={() => {
                  i18n.changeLanguage(lng)
                  navigate(0)
                  onClose()
                }}
                w={200}
                textAlign={'start'}
              >
                <HStack w="100%" alignItems="center">
                  <Body pt={0.5}>{languageFalgs[lng]}</Body>

                  <Body>{languages[lng]}</Body>
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
