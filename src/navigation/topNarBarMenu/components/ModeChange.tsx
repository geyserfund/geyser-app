import {
  Box,
  Button,
  HStack,
  IconButton,
  Link,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { MdColorLens } from 'react-icons/md'

import { SatSymbolIcon } from '../../../components/icons'
import { Modal } from '../../../components/layouts'
import {
  languageFalgs,
  LanguageRequestUrl,
  languages,
} from '../../../constants'
import { useNostrColor } from '../../../context'
import { nostrColorsLight, primaryColorsLight } from '../../../styles'
import { allTranslations } from '../../../translations'
import { ColorModeSwitcher } from '../../../utils'

export const ModeChange = () => {
  const { i18n, t } = useTranslation()

  const { isOpen, onClose, onOpen } = useDisclosure()
  const [isNostrColor, setNostrColor] = useNostrColor()

  const renderLanguages = Object.keys(allTranslations).map((key) => {
    const translation = allTranslations[key as keyof typeof allTranslations]

    const language = {
      key,
      translation,
      disabled: false,
    }

    return language
  })

  const handleTogglePrimaryColor = () => {
    setNostrColor(!isNostrColor)
  }

  return (
    <>
      <VStack
        bgColor="neutral.200"
        borderRadius={{ base: '8px', lg: '0px' }}
        mx={{ base: '10px', lg: 0 }}
        mt={2}
        p={2}
      >
        <HStack spacing={3} justifyContent="space-between">
          <IconButton
            size={{ base: 'sm', lg: 'md' }}
            bg={isNostrColor ? primaryColorsLight[400] : nostrColorsLight[400]}
            color="white"
            onClick={handleTogglePrimaryColor}
            icon={<MdColorLens />}
            aria-label={`Switch primary color`}
          />
          <ColorModeSwitcher />
          <Tooltip label="currency">
            <IconButton
              size={{ base: 'sm', lg: 'md' }}
              bgColor="neutral.0"
              variant="primaryNeutral"
              aria-label="currency-convert"
              icon={<SatSymbolIcon color="neutral.600" />}
              isDisabled
            />
          </Tooltip>
        </HStack>

        <Button
          w="full"
          size={{ base: 'sm', lg: 'md' }}
          bgColor="neutral.0"
          color="neutral.600"
          variant="primaryNeutral"
          onClick={onOpen}
        >
          <Text isTruncated>
            {languages[i18n.resolvedLanguage as keyof typeof languages]}
          </Text>
        </Button>
      </VStack>
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
                style={{
                  fontWeight:
                    i18n.resolvedLanguage === lng.key ? 'bold' : 'normal',
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
