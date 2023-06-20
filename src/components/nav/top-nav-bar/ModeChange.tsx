import {
  Button,
  HStack,
  IconButton,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { languages } from '../../../constants'
import { ColorModeSwitcher } from '../../../utils'
import { SatSymbolIcon } from '../../icons'
import { Modal } from '../../layouts'

export const ModeChange = () => {
  const { i18n } = useTranslation()

  const { isOpen, onClose, onOpen } = useDisclosure()

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
            English
          </Button>
        </Tooltip>
      </HStack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        title={'Choose your language'}
      >
        <VStack>
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
            >
              {languages[lng]}
            </Button>
          ))}
        </VStack>
      </Modal>
    </>
  )
}
