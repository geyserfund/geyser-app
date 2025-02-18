import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { ProjectForLandingPageFragment } from '@/types/index.ts'

type MiniProjectCardProps = {
  project: ProjectForLandingPageFragment
  startAnimating?: boolean
} & CardLayoutProps

export const MiniProjectCard = ({ project, startAnimating, ...rest }: MiniProjectCardProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (startAnimating) {
      const startTime = Date.now()
      const duration = 15000 // 15 seconds

      const updateProgress = () => {
        const elapsed = Date.now() - startTime
        const newProgress = Math.min((elapsed / duration) * 100, 100)
        setProgress(newProgress)

        if (newProgress < 100) {
          requestAnimationFrame(updateProgress)
        }
      }

      requestAnimationFrame(updateProgress)
    } else {
      setProgress(0)
    }
  }, [startAnimating])

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
        <ImageWithReload height="full" width="full" src={project.thumbnailImage} objectFit="cover" />
      </Box>
      <Body medium isTruncated>
        {project.title}
      </Body>
      {startAnimating && (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          height="100%"
          width={`${progress}%`}
          backgroundColor="neutralAlpha.6"
          transition="width 0.1s linear"
        />
      )}
    </CardLayout>
  )
}
