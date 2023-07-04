import { CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  HStack,
  HTMLChakraProps,
  Image,
  Text,
  Tooltip,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react'
import { IGif } from '@giphy/js-types'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { GifIcon } from '../../../../components/icons'
import { TextArea } from '../../../../components/ui'
import { useAuthContext } from '../../../../context'
import { useModal } from '../../../../hooks/useModal'
import { LogoutConfirmationModal } from '../../../auth/components/LogoutConfirmationModal'
import { AvatarElement } from './AvatarElement'
import { GifModal } from './GifModal'

type Props = HTMLChakraProps<'div'> & {
  comment: string
  setTarget: (_: any) => void
  setFormState: any
}

export const ProjectFundingFormCommentField = ({
  comment,
  setTarget,
  setFormState,
  ...rest
}: Props) => {
  const { t } = useTranslation()
  const { isAnonymous, loginOnOpen, user } = useAuthContext()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const logoutConfirmationModal = useModal()

  const {
    isOpen: isGIFModalOpen,
    onOpen: onGIFModalOpened,
    onClose: onGIFModalClosed,
  } = useDisclosure()

  const onGIFModalOpenClick = () => {
    textAreaRef.current?.blur()
    onGIFModalOpened()
  }

  const [selectedGIF, setSelectedGIF] = useState<IGif | null>(null)

  const [isHoveringOverGIFButton, setIsHoveringOverGIFButton] =
    useBoolean(false)

  const handleSelectGif = (gif: IGif) => {
    setSelectedGIF(gif)
    setFormState('media', gif.images.original.webp)
    onGIFModalClosed()
  }

  return (
    <Box {...rest}>
      <HStack width="100%" position="relative">
        <Box width="100%">
          <TextArea
            ref={textAreaRef}
            pr={16}
            placeholder={t('Leave a public message here.')}
            fontSize="14px"
            resize="none"
            value={comment}
            maxLength={280}
            name="comment"
            pl={10}
            backgroundColor={'neutral.0'}
            onChange={setTarget}
          />
          <Text pt={1} px={1} fontSize="10px" color="neutral.600">
            {t('Funding as')}{' '}
            <i>{isAnonymous ? t('anonymous') : user.username}</i>
          </Text>
        </Box>
        {isHoveringOverGIFButton && selectedGIF && (
          <CloseIcon position="absolute" top="31px" right="29px" />
        )}

        <Box zIndex="10" position="absolute" left={2} top={2}>
          {isAnonymous || !user ? (
            <Tooltip
              shouldWrapChildren
              label={t('Funding anonymously. Click to login')}
            >
              <AvatarElement
                borderRadius="50%"
                noLink
                onClick={loginOnOpen}
                avatarOnly
              />
            </Tooltip>
          ) : (
            <Tooltip
              shouldWrapChildren
              label={`${t('Funding as')} ${user.username}. ${t(
                'Click to logout',
              )}`}
            >
              <AvatarElement
                onClick={logoutConfirmationModal.onOpen}
                borderRadius="50%"
                user={user}
                avatarOnly
              />
            </Tooltip>
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

      <GifModal
        isOpen={isGIFModalOpen}
        onClose={onGIFModalClosed}
        onSelect={handleSelectGif}
      />

      <LogoutConfirmationModal {...logoutConfirmationModal} />
    </Box>
  )
}
