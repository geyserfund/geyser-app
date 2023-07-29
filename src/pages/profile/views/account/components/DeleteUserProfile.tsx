import { ApolloError } from '@apollo/client'
import { Button, Tooltip, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Body1, Body2 } from '../../../../../components/typography'
import { getPath } from '../../../../../constants'
import { useAuthContext } from '../../../../../context'
import { useModal } from '../../../../../hooks/useModal'
import { useUserDeleteMutation } from '../../../../../types'
import { useNotification } from '../../../../../utils'
import { DeleteTextConfirm } from '../../../components'

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
        title: 'Failed to delete profile',
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
      <VStack spacing="10px" alignItems="start">
        <Body1 semiBold>{t('Delete profile')}</Body1>
        <Body2>
          {t(
            'You can delete your profile permanently from Geyser. This will allow you to retain your anonymity and connect this account with another profile',
          )}
        </Body2>
        <Tooltip
          label={
            isUserAProjectCreator
              ? t('cannot delete profile for project owners')
              : ''
          }
        >
          <Button
            variant="secondary"
            color="secondary.red"
            w="full"
            onClick={deleteProfile.onOpen}
            isDisabled={isUserAProjectCreator}
          >
            {t('Delete')}
          </Button>
        </Tooltip>
      </VStack>

      <DeleteTextConfirm
        isOpen={deleteProfile.isOpen}
        onClose={deleteProfile.onClose}
        {...deleteTextProps}
      />
    </>
  )
}
