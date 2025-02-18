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
      const duration = 20000 // 20 seconds

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
      height="64px"
      alignItems="center"
      spacing="12px"
      padding="8px"
      position="relative"
      overflow="hidden"
      {...rest}
    >
      <Box width="48px" height="48px" borderRadius="8px" overflow="hidden">
        <ImageWithReload height="full" width="full" src={project.thumbnailImage} objectFit="cover" />
      </Box>
      <Body bold isTruncated>
        {project.title}
      </Body>
      {startAnimating && (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          height="100%"
          width={`${progress}%`}
          backgroundColor="neutralAlpha.3"
          transition="width 0.1s linear"
        />
      )}
    </CardLayout>
  )
}
