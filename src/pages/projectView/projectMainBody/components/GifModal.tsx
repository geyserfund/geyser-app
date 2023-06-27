import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { IGif } from '@giphy/js-types'
import { Grid } from '@giphy/react-components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { VITE_APP_GIPHY_API_KEY } from '../../../../constants'
import { useDebounce } from '../../../../hooks'
import { useMobileMode } from '../../../../utils'

const giphy = new GiphyFetch(VITE_APP_GIPHY_API_KEY)

interface GifModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (gif: IGif) => void
}

export const GifModal = ({ isOpen, onClose, onSelect }: GifModalProps) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const [gifSearch, setGifSearch] = useState('bitcoin')

  const debouncedGifSearch = useDebounce(gifSearch, 500)

  const fetchGifs = (offset: number) =>
    giphy.search(debouncedGifSearch, { offset, sort: 'relevant', limit: 12 })

  return (
    <Modal
      onClose={() => {
        setGifSearch('bitcoin')
        onClose()
      }}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />

      <ModalContent mt={100}>
        <ModalBody p={2}>
          <InputGroup mb={2}>
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
            <Input
              placeholder={t('Search')}
              variant="filled"
              focusBorderColor="primary.400"
              bg="neutral.400"
              onChange={(e) => setGifSearch(e.target.value)}
            />
            <InputRightElement mb={2}>
              <ModalCloseButton>
                <CloseIcon mb={2} />
              </ModalCloseButton>
            </InputRightElement>
          </InputGroup>

          <Box height="450px" overflow="auto" cursor="pointer">
            <Grid
              key={debouncedGifSearch}
              width={isMobile ? 350 : 400}
              columns={3}
              fetchGifs={fetchGifs}
              noLink={true}
              hideAttribution={true}
              onGifClick={onSelect}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
