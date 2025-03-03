import { Box } from '@chakra-ui/react'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'

type MiniProjectCardProps = {
  imageUrl?: string | null
  title: string
  startAnimating?: boolean
} & CardLayoutProps

export const MiniProjectCard = ({ imageUrl, title, startAnimating, ...rest }: MiniProjectCardProps) => {
  return (
    <CardLayout
      direction="row"
      flex={1}
      height="40px"
      alignItems="center"
      spacing="12px"
      padding="8px"
      position="relative"
      overflow="hidden"
      noborder={!startAnimating}
      backgroundColor={'neutralAlpha.3'}
      _hover={{ cursor: 'pointer' }}
      {...rest}
    >
      <Box width="24px" height="24px" borderRadius="8px" overflow="hidden">
        <ImageWithReload height="full" width="full" src={imageUrl} objectFit="cover" />
      </Box>
      <Body medium isTruncated>
        {title}
      </Body>
      {startAnimating && (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          height="100%"
          width="100%"
          backgroundColor="neutralAlpha.6"
          sx={{
            animation: startAnimating ? 'progress 10s linear forwards' : 'none',
            '@keyframes progress': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(0%)' },
            },
          }}
        />
      )}
    </CardLayout>
  )
}
