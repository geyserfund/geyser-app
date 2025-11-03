import { Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { UseFormWatch } from 'react-hook-form'
import { UseFormSetValue } from 'react-hook-form'

import { UploadBox } from '@/components/ui/UploadBox.tsx'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { FileUpload } from '@/shared/molecules/FileUpload.tsx'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal.tsx'
import { MediaControlWithReorder } from '@/shared/molecules/MediaControlWithReorder.tsx'

import { RewardFormValues } from '../../../pages/projectView/views/rewards/hooks/useProjectRewardForm.ts'

const MAX_REWARD_IMAGES = 5

type HeaderComponentProps = {
  watch: UseFormWatch<RewardFormValues>
  setValue: UseFormSetValue<RewardFormValues>
  handleImageUpload: (url: string) => void
  handleDeleteImage: () => void
}

export const HeaderComponent = ({ watch, setValue, handleImageUpload, handleDeleteImage }: HeaderComponentProps) => {
  return (
    <FieldContainer title={t('Header images')} subtitle={t('Add one or multiple images to showcase your product')}>
      <VStack pt={4} w="full">
        <MediaControlWithReorder
          links={watch('images')}
          altText={'Reward image'}
          updateLinks={(links) => setValue('images', links, { shouldDirty: true })}
          aspectRatio={ImageCropAspectRatio.Reward}
          mediaProps={{
            maxHeight: { base: '200px', sm: '300px', md: '400px' },
            minHeight: { base: '200px', sm: '300px', md: '400px' },
            width: 'auto',
          }}
        />
        <Stack alignItems="start" direction={{ base: 'column', md: 'row' }} w={'full'}>
          <FileUpload
            containerProps={{ flex: 1, w: { base: 'full', md: 'unset' } }}
            caption={t('For best fit, select horizontal 4:3 image. Image size limit: 10MB.')}
            onUploadComplete={handleImageUpload}
            onDeleteClick={handleDeleteImage}
            childrenOnLoading={<UploadBox loading h={{ base: '40px', lg: '64px' }} borderRadius="12px" />}
            imageCrop={ImageCropAspectRatio.Reward}
            isDisabled={watch('images').length >= MAX_REWARD_IMAGES}
          >
            <UploadBox
              h={{ base: '40px', lg: '64px' }}
              borderRadius="12px"
              flex={1}
              title={
                watch('images').length >= MAX_REWARD_IMAGES
                  ? t('Max items reached')
                  : watch('images').length > 0
                  ? t('Upload additional image')
                  : t('Upload image')
              }
              opacity={watch('images').length >= MAX_REWARD_IMAGES ? 0.5 : 1}
              titleProps={{ fontSize: { base: 'md', lg: 'lg' }, light: true }}
            />
          </FileUpload>
        </Stack>
      </VStack>
    </FieldContainer>
  )
}
