import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';
import { Grid } from '@giphy/react-components';

import {
  Box,
  Button,
  HTMLChakraProps,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GifIcon } from '../../../components/icons';
import { TextArea } from '../../../components/ui';
import { isMobileMode } from '../../../utils';
import { REACT_APP_GIPHY_API_KEY } from '../../../constants';

type Props = HTMLChakraProps<'div'> & {
  comment: string;
  setTarget: (_: any) => void;
  setFormState: any;
};

export const ProjectPaymentFormFundingComment = ({
  comment,
  setTarget,
  setFormState,
  ...rest
}: Props) => {
  const isMobile = isMobileMode();

  const {
    isOpen: isGIFModalOpen,
    onOpen: onGIFModalOpened,
    onClose: onGIFModalClosed,
  } = useDisclosure();

  const [giphyFetch, setGiphyFetch] = useState<GiphyFetch | any>();
  const [gifSearch, setGifSearch] = useState('bitcoin');
  const [selectedGIF, setSelectedGIF] = useState<IGif | null>(null);

  const [isHoveringOverGIFButton, setIsHoveringOverGIFButton] =
    useBoolean(false);
  const [focus, setFocus] = useState(true);

  // TODO: remove the static value
  useEffect(() => {
    if (REACT_APP_GIPHY_API_KEY) {
      const giphy = new GiphyFetch(
        REACT_APP_GIPHY_API_KEY || 'Vcrx5mgdcrDgWVS1UsPiINK4NFyStV0Q',
      );
      setGiphyFetch(giphy);
    }
  }, []);

  const fetchGifs = (offset: number) =>
    giphyFetch.search(gifSearch, { offset, sort: 'relevant', limit: 9 });

  return (
    <Box {...rest}>
      <Box width="100%" position="relative">
        <TextArea
          pr={16}
          placeholder="Leave a public message here."
          fontSize="14px"
          resize="none"
          value={comment}
          maxLength={280}
          name="comment"
          borderWidth={'2px'}
          borderColor={'brand.primary500'}
          backgroundColor={'brand.bgWhite'}
          onChange={setTarget}
        />

        {isHoveringOverGIFButton && selectedGIF && (
          <CloseIcon position="absolute" top="31px" right="29px" />
        )}

        <Box zIndex="10" position="absolute" right={2} top={0}>
          {selectedGIF ? (
            <Image
              src={`${selectedGIF.images.preview_webp.url}`}
              alt="gif"
              width="50px"
              height="50px"
              cursor="pointer"
              opacity={isHoveringOverGIFButton ? '0.25' : '1'}
              onMouseEnter={setIsHoveringOverGIFButton.on}
              onMouseLeave={setIsHoveringOverGIFButton.off}
              onClick={() => {
                setSelectedGIF(null);
                setIsHoveringOverGIFButton.off();
              }}
            />
          ) : (
            <Button bg="none" p={0} onClick={onGIFModalOpened}>
              <GifIcon />
            </Button>
          )}
        </Box>
      </Box>

      <Modal
        onClose={() => {
          setGifSearch('bitcoin');
          onGIFModalClosed();
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
              <ModalCloseButton mt="5px" ml="7px" />
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
                  key={gifSearch}
                  onGifClick={(gif: any) => {
                    setSelectedGIF(gif);
                    setFormState('media', gif.images.original.webp);
                    onGIFModalClosed();
                  }}
                />
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
