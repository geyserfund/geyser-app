import { CloseIcon } from '@chakra-ui/icons'
import { Box, IconButton, Image, Tooltip, useBoolean, useDisclosure } from '@chakra-ui/react'
import { IGif } from '@giphy/js-types'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { GifModal } from '@/modules/project/pages1/projectView/views/body/components'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H1 } from '@/shared/components/typography'

import { GifIcon } from '../../../../../../../components/icons'
import { TextArea } from '../../../../../../../components/ui'
import { useAuthContext } from '../../../../../../../context'
import { LogoutConfirmationModal } from '../../../../../../../pages/auth/components/LogoutConfirmationModal'
import { useAuthModal } from '../../../../../../../pages/auth/hooks'
import { useModal } from '../../../../../../../shared/hooks/useModal'
import { AvatarElement } from '../../../../../../../shared/molecules/AvatarElement'

export const FundingDetailsUserComment = () => {
  const { t } = useTranslation()
  const { isAnonymous, user } = useAuthContext()
  const { loginOnOpen } = useAuthModal()

  const {
    formState: { comment },
    setState,
    setTarget,
  } = useFundingFormAtom()

  const logoutConfirmationModal = useModal()
  const { isOpen: isGIFModalOpen, onOpen: onGIFModalOpened, onClose: onGIFModalClosed } = useDisclosure()

  const onGIFModalOpenClick = () => {
    onGIFModalOpened()
  }

  const [selectedGIF, setSelectedGIF] = useState<IGif | null>(null)

  const [isHoveringOverGIFButton, setIsHoveringOverGIFButton] = useBoolean(false)

  const handleSelectGif = (gif: IGif) => {
    setSelectedGIF(gif)
    setState('media', gif.images.original.webp)
    onGIFModalClosed()
  }

  return (
    <>
      <CardLayout mobileDense width="100%" position="relative">
        <H1 size="2xl" bold>
          {t('Public comment')}
        </H1>
        <Box width="100%" position="relative">
          <TextArea
            pr={16}
            data-testid="funding-comment-input"
            placeholder={t('Leave a public comment here.')}
            fontSize="16px"
            resize="none"
            value={comment}
            maxLength={280}
            minHeight="128px"
            name="comment"
            pl={10}
            backgroundColor={'utils.pbg'}
            onChange={setTarget}
          />

          <Body size="xs" pt={1} px={1}>
            {isAnonymous ? (
              <Trans i18nKey="Funding anonymously. <1>Click here</1> to connect your profile to the contribution">
                {'Funding anonymously. '}
                <Box
                  as="span"
                  onClick={() => loginOnOpen()}
                  color="primary.600"
                  fontWeight="bold"
                  _hover={{ cursor: 'pointer' }}
                >
                  Click here
                </Box>
                {' to connect your profile to contribution'}
              </Trans>
            ) : (
              <>
                {t('Funding as')} <i>{user.username}</i>
              </>
            )}
          </Body>
          {isHoveringOverGIFButton && selectedGIF && <CloseIcon position="absolute" top="31px" right="29px" />}

          <Box zIndex="2" position="absolute" left={2} top={2}>
            {isAnonymous || !user ? (
              <Tooltip shouldWrapChildren label={t('Funding anonymously. Click to login')}>
                <AvatarElement borderRadius="50%" noLink onClick={() => loginOnOpen()} avatarOnly />
              </Tooltip>
            ) : (
              <Tooltip shouldWrapChildren label={`${t('Funding as')} ${user.username}. ${t('Click to logout')}`}>
                <AvatarElement onClick={logoutConfirmationModal.onOpen} borderRadius="50%" user={user} avatarOnly />
              </Tooltip>
            )}
          </Box>
          <Box zIndex="2" position="absolute" right={2} top={2}>
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
              <IconButton
                aria-label="gif-icon-button"
                variant="ghost"
                p={0}
                onClick={onGIFModalOpenClick}
                icon={<GifIcon />}
              />
            )}
          </Box>
        </Box>
      </CardLayout>

      <GifModal isOpen={isGIFModalOpen} onClose={onGIFModalClosed} onSelect={handleSelectGif} />

      <LogoutConfirmationModal {...logoutConfirmationModal} />
    </>
  )
}
