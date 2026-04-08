import { ApolloError } from '@apollo/client'
import { Button, HStack, Tooltip, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { Body, H3 } from '@/shared/components/typography'

import { useAuthContext } from '../../../../../context'
import { getPath } from '../../../../../shared/constants'
import { useModal } from '../../../../../shared/hooks/useModal'
import { useUserDeleteMutation } from '../../../../../types'
import { useNotification } from '../../../../../utils'
import { DeleteTextConfirm } from '../../profilePage/components'

export const DeleteUserProfile = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const navigate = useNavigate()
  const { isUserAProjectCreator } = useAuthContext()

  const [userDeleted, setUserDeleted] = useState(false)
  const deleteProfile = useModal()

  const [deleteUserProfile] = useUserDeleteMutation({
    onError(error: ApolloError) {
      toast({
        status: 'error',
        title: t('Failed to delete profile'),
        description: `${error?.message}`,
      })
    },
    onCompleted() {
      setUserDeleted(true)
    },
  })

  const handleDeleteProject = () => {
    deleteUserProfile()
  }

  const handleDeleteClose = () => {
    navigate(getPath('landingPage'))
  }

  const deleteTextProps = userDeleted
    ? {
        title: t('Profile has been deleted'),
        description: t('Your profile has been deleted.'),
        textToConfirm: '',
        close: handleDeleteClose,
        buttonText: t('Close'),
      }
    : {
        title: t('Delete profile'),
        description: t('To delete your profile permanently from Geyser.'),
        textToConfirm: 'delete this profile',
        confirm: handleDeleteProject,
      }

  return (
    <>
      <VStack w="full" spacing="10px" alignItems="start">
        <H3 size="lg">{t('Danger Zone')}</H3>

        <VStack w="full" spacing="6px" alignItems="start">
          <Body medium color="secondary.red">
            {t('Delete profile')}
          </Body>

          <HStack
            w="full"
            justifyContent="space-between"
            alignItems={{ base: 'flex-start', md: 'center' }}
            spacing={4}
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Body size="sm" color="secondary.red">
              {t('Delete your profile permanently from Geyser.')}
            </Body>

            <Tooltip label={isUserAProjectCreator ? t('As a project creator, you cannot delete your profile') : ''}>
              <Button
                variant="outline"
                colorScheme="error"
                onClick={deleteProfile.onOpen}
                isDisabled={isUserAProjectCreator}
                flexShrink={0}
              >
                {t('Delete')}
              </Button>
            </Tooltip>
          </HStack>
        </VStack>
      </VStack>

      <DeleteTextConfirm isOpen={deleteProfile.isOpen} onClose={deleteProfile.onClose} {...deleteTextProps} />
    </>
  )
}
