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
  const isMobile = useMobileMode()

  const [gifSearch, setGifSearch] = useState('bitcoin')

  const debouncedGifSearch = useDebounce(gifSearch, 500)

  const fetchGifs = (offset: number) =>
    giphy.search(debouncedGifSearch, { offset, sort: 'relevant', limit: 9 })

  const [focus, setFocus] = useState(true)

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

      <ModalContent mt={focus && isMobile ? 100 : 0}>
        <ModalBody p={2}>
          <InputGroup mb={2}>
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
            <Input
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder="Search"
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

          <Box height="450px" overflow="auto">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
            >
              <Grid
                key={debouncedGifSearch}
                width={isMobile ? 350 : 400}
                columns={3}
                fetchGifs={fetchGifs}
                onGifsFetchError={(error) =>
                  console.log('gif fetch error', error)
                }
                noLink={true}
                hideAttribution={true}
                onGifClick={onSelect}
              />
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
