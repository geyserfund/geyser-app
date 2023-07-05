import {
  Box,
  Button,
  HStack,
  IconButton,
  Link,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import {
  languageFalgs,
  LanguageRequestUrl,
  languages,
} from '../../../constants'
import { ColorModeSwitcher } from '../../../utils'
import { SatSymbolIcon } from '../../icons'
import { Modal } from '../../layouts'

export const ModeChange = () => {
  const { i18n, t } = useTranslation()

  const { isOpen, onClose, onOpen } = useDisclosure()
  const currentLanguageKey = Object.keys(languages).find(
    (lang) => lang === i18n.resolvedLanguage,
  ) as keyof typeof languages

  return (
    <>
      <HStack bgColor="neutral.200" borderRadius={8} mx={3} p={2} spacing={3}>
        <ColorModeSwitcher />
        <Tooltip label="currency">
          <IconButton
            bgColor="neutral.50"
            variant="primaryNeutral"
            aria-label="currency-convert"
            icon={<SatSymbolIcon color="neutral.600" />}
            isDisabled
          />
        </Tooltip>
        <Tooltip label="language">
          <Button
            bgColor="neutral.50"
            color="neutral.600"
            variant="primaryNeutral"
            // isDisabled
            // onClick={() => i18n.changeLanguage(lng)}
            onClick={onOpen}
          >
            {languages[currentLanguageKey]}
          </Button>
        </Tooltip>
      </HStack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xs"
        contentProps={{ maxWidth: '250px' }}
        title={t('Select language')}
      >
        <VStack pb={5}>
          {Object.keys(languages).map((lng) => (
            <Button
              key={lng}
              style={{
                fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
              }}
              type="submit"
              onClick={() => {
                i18n.changeLanguage(lng)
                onClose()
              }}
              w={200}
              textAlign={'start'}
            >
              <Box w="100%">
                <Box as={'span'} w="100%" paddingRight={2}>
                  {languageFalgs[lng]}
                </Box>
                {languages[lng]}
              </Box>
            </Button>
          ))}
        </VStack>
        <Link href={LanguageRequestUrl} isExternal>
          {t('Request a language')}
        </Link>
      </Modal>
    </>
  )
}
