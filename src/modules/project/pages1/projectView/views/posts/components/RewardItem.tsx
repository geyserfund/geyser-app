import { HStack, StackProps } from '@chakra-ui/react'
import React from 'react'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { Body } from '@/shared/components/typography'

type RewardItemProps = {
  imageUrl?: string
  name: string | React.ReactNode
} & StackProps

export const RewardItem = ({ imageUrl, name, ...rest }: RewardItemProps) => {
  return (
    <HStack w="full" alignItems={'start'} {...rest}>
      <ImageWithReload borderRadius={'8px'} width="24px" minWidth={'24px'} height="24px" src={imageUrl} />
      <Body size="sm" isTruncated>
        {name}
      </Body>
    </HStack>
  )
}
