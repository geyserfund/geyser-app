import { Button, HStack, Input, SkeletonCircle, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { SkeletonLayout } from '../../../../../components/layouts'
import { H3 } from '../../../../../components/typography'
import { TextArea } from '../../../../../components/ui'
import { useNotification } from '../../../../../utils'
import { useUserProfileAtomValue } from '../../../state'
import { EditableAvatar } from '../../profilePage/components'
import { useEditProfile } from '../hooks/useEditProfile'
import { DeleteUserProfile } from './DeleteUserProfile'
import { UpdateVerifyEmail } from './UpdateVerifyEmail'

export const ProfileForm = ({ isLoading }: { isLoading?: boolean }) => {
  const { t } = useTranslation()
  const { unexpected, toast } = useNotification()

  const user = useUserProfileAtomValue()
  const {
    name,
    setName,
    bio,
    setBio,
    imageUrl,
    onUploadImage,
    onSubmit,
    isLoading: editLoading,
  } = useEditProfile({
    user,
    mutationProps: {
      onError: unexpected,
      onCompleted(data, clientOptions) {
        toast({
          status: 'success',
          title: 'Profile updated',
          description: 'Your profile has been updated.',
        })
      },
    },
  })

  if (!user) {
    return null
  }

  if (isLoading) {
    return <ProfileFormSkeleton />
  }

  return (
    <form onSubmit={onSubmit}>
      <VStack spacing="30px" w="full">
        <VStack w="full" align="start" gap={3}>
          <H3>{t('Profile information')}</H3>
          <HStack w="full" alignItems={'start'} spacing="20px">
            <EditableAvatar onUploadImage={onUploadImage} userId={user.id} imageUrl={imageUrl} />

            <VStack align="start" w="100%">
              <Text>{t('Name')}</Text>
              <Input name="name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
            </VStack>
          </HStack>

          <VStack align="start" gap={1} w="100%">
            <Text>{t('Bio')}</Text>
            <TextArea value={bio} onChange={(e) => setBio(e.currentTarget.value)} />
          </VStack>
        </VStack>

        <UpdateVerifyEmail />
        <DeleteUserProfile />

        <Button
          isLoading={isLoading || editLoading}
          isDisabled={isLoading}
          variant="primary"
          width="100%"
          type="submit"
        >
          {t('Save')}
        </Button>
      </VStack>
    </form>
  )
}

export const ProfileFormSkeleton = () => {
  const { t } = useTranslation()
  return (
    <VStack spacing="30px" w="full">
      <VStack w="full" align="start" gap={3}>
        <H3>{t('Profile information')}</H3>
        <HStack w="full" alignItems={'start'} spacing="20px">
          <SkeletonCircle size="100px" />

          <VStack align="start" w="100%">
            <Text>{t('Name')}</Text>
            <SkeletonLayout height="40px" />
          </VStack>
        </HStack>

        <VStack align="start" gap={1} w="100%">
          <Text>{t('Bio')}</Text>
          <SkeletonLayout height="80px" />
        </VStack>
      </VStack>

      <UpdateVerifyEmail />
      <DeleteUserProfile />

      <SkeletonLayout height="40px" />
    </VStack>
  )
}
