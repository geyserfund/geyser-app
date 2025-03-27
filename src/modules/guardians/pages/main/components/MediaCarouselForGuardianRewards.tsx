import { HStack, VStack } from '@chakra-ui/react'

import { Modal } from '@/shared/components/layouts'
import { UseModalReturn } from '@/shared/hooks'
import { MarkdownField } from '@/shared/markdown/MarkdownField.tsx'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal.tsx'
import { MediaCarousel } from '@/shared/molecules/MediaCarousel'
import { fonts } from '@/shared/styles'

type MediaCarouselForGuardianRewardsProps = {
  imageLinkList: string[]
  data: { name: string; description: string }
  bottomContent?: React.ReactNode
} & Omit<UseModalReturn, 'children'>

export const MediaCarouselForGuardianRewards = ({
  imageLinkList,
  data,
  bottomContent,
  ...modalProps
}: MediaCarouselForGuardianRewardsProps) => {
  return (
    <Modal
      {...modalProps}
      size="lg"
      isCentered={false}
      title={data.name}
      headerProps={{ fontWeight: 700, fontSize: '24px', textTransform: 'uppercase', paddingRight: '20px' }}
      contentProps={{ fontFamily: fonts.cormorant }}
      bodyProps={{ maxHeight: '70vh', overflowY: 'auto' }}
      wrapperProps={{ paddingBottom: 20 }}
    >
      <MediaCarousel
        links={imageLinkList}
        wrapperProps={{
          backgroundColor: 'transparent',
        }}
        borderRadius="8px"
        width="full"
        aspectRatio={ImageCropAspectRatio.Reward}
      />
      <VStack w="full" fontFamily={fonts.cormorant} alignItems="flex-start">
        {data.description && <MarkdownField content={data.description || ''} preview fontFamily={fonts.cormorant} />}
      </VStack>
      <HStack paddingTop={4} w="full" justifyContent="center" position="absolute" bottom={6} left={0}>
        {bottomContent}
      </HStack>
    </Modal>
  )
}
