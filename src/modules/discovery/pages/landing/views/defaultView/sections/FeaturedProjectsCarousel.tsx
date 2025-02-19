import { Box, HStack, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { FeaturedProjectCard } from '../components/FeaturedProjectCard'
import { FeatureAirtableData } from './Featured'

type FeaturedProjectsCarouselProps = {
  projects: FeatureAirtableData[]
}

export const FeaturedProjectsCarousel = ({ projects }: FeaturedProjectsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * projects.length))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }, 10000) // 10 seconds interval

    return () => clearInterval(interval)
  }, [projects.length])

  return (
    <VStack w="full">
      <Box position="relative" width="100%">
        {projects.map((project, index) => (
          <>
            <Box
              key={project.Name}
              position="absolute"
              top={0}
              left={0}
              width="100%"
              opacity={index === currentIndex ? 1 : 0}
              transition="opacity 0.5s ease-in-out"
              pointerEvents={index === currentIndex ? 'auto' : 'none'}
              zIndex={index === currentIndex ? 1 : 0}
            >
              <FeaturedProjectCard projectName={project.Name} data={project} />
            </Box>
          </>
        ))}

        {projects[currentIndex] && (
          <FeaturedProjectCard
            projectName={projects[currentIndex].Name}
            data={projects[currentIndex]}
            opacity={0}
            pointerEvents="none"
          />
        )}
      </Box>
      <HStack w="full">
        {projects.map((project, index) => {
          if (!project) {
            return null
          }

          return (
            <FeaturedProjectCard
              key={project.Name}
              showMini
              projectName={project.Name}
              data={project}
              startAnimating={index === currentIndex % projects.length}
            />
          )
        })}
      </HStack>
    </VStack>
  )
}
