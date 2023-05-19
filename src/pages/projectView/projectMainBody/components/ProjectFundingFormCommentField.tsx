import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  HStack,
  HTMLChakraProps,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Tooltip,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { IGif } from '@giphy/js-types'
import { Grid } from '@giphy/react-components'
import { useCallback, useRef, useState } from 'react'

import { GifIcon } from '../../../../components/icons'
import { TextArea } from '../../../../components/ui'
import { VITE_APP_GIPHY_API_KEY } from '../../../../constants'
import { useAuthContext } from '../../../../context'
import { useMobileMode } from '../../../../utils'
import { AvatarElement } from './AvatarElement'

type Props = HTMLChakraProps<'div'> & {
  comment: string
  setTarget: (_: any) => void
  setFormState: any
}

const giphy = new GiphyFetch(VITE_APP_GIPHY_API_KEY)

export const ProjectFundingFormCommentField = ({
  comment,
  setTarget,
  setFormState,
  ...rest
}: Props) => {
  const isMobile = useMobileMode()
  const { isAnonymous, loginOnOpen, user } = useAuthContext()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const {
    isOpen: isGIFModalOpen,
    onOpen: onGIFModalOpened,
    onClose: onGIFModalClosed,
  } = useDisclosure()

  const onGIFModalOpenClick = () => {
    textAreaRef.current?.blur()
    onGIFModalOpened()
  }

  const [gifSearch, setGifSearch] = useState('bitcoin')
  const [selectedGIF, setSelectedGIF] = useState<IGif | null>(null)

  const [isHoveringOverGIFButton, setIsHoveringOverGIFButton] =
    useBoolean(false)
  const [focus, setFocus] = useState(true)

  const fetchGifs = useCallback(
    (offset: number) =>
      giphy.search(gifSearch, { offset, sort: 'relevant', limit: 9 }),
    [gifSearch],
  )

  return (
    <Box {...rest}>
      <HStack width="100%" position="relative">
        <Box width="100%">
          <TextArea
            ref={textAreaRef}
            pr={16}
            placeholder="Leave a public message here."
            fontSize="14px"
            resize="none"
            value={comment}
            maxLength={280}
            name="comment"
            pl={10}
            borderWidth="2px"
            _active={{
              borderColor: 'primary.500',
            }}
            backgroundColor={'brand.bgWhite'}
            onChange={setTarget}
          />
          <Text pt={1} px={1} fontSize="10px" color="neutral.600">
            Funding as <i>{isAnonymous ? 'anonymous' : user.username}</i>
          </Text>
        </Box>
        {isHoveringOverGIFButton && selectedGIF && (
          <CloseIcon position="absolute" top="31px" right="29px" />
        )}

        <Box zIndex="10" position="absolute" left={0.8} top={2}>
          {isAnonymous ? (
            <Tooltip
              shouldWrapChildren
              label="Funding annonymously. Click to login"
            >
              <AvatarElement
                borderRadius="50%"
                cursor="pointer"
                noLink
                onClick={loginOnOpen}
                avatarOnly
              />
            </Tooltip>
          ) : (
            <AvatarElement borderRadius="50%" user={user} avatarOnly />
          )}
        </Box>

        <Box zIndex="10" position="absolute" right={2}>
          {selectedGIF ? (
            <Image
              src={selectedGIF.images.preview_webp.url}
              alt="gif"
              width="50px"
              height="50px"
              cursor="pointer"
              opacity={isHoveringOverGIFButton ? '0.25' : '1'}
              onMouseEnter={setIsHoveringOverGIFButton.on}
              onMouseLeave={setIsHoveringOverGIFButton.off}
              onClick={() => {
                setSelectedGIF(null)
                setIsHoveringOverGIFButton.off()
              }}
            />
          ) : (
            <Button bg="none" p={0} onClick={onGIFModalOpenClick}>
              <GifIcon />
            </Button>
          )}
        </Box>
      </HStack>

      {isGIFModalOpen && (
        <Modal
          onClose={() => {
            setGifSearch('bitcoin')
            onGIFModalClosed()
          }}
          isOpen={isGIFModalOpen}
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
                  focusBorderColor="brand.primary"
                  bg="#DDFFF8"
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
                    width={isMobile ? 350 : 400}
                    columns={3}
                    fetchGifs={fetchGifs}
                    noLink={true}
                    hideAttribution={true}
                    onGifClick={(gif: any) => {
                      setSelectedGIF(gif)
                      setFormState('media', gif.images.original.webp)
                      onGIFModalClosed()
                    }}
                  />
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  )
}
