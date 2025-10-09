import { Box, HStack, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { FeaturedDisplayCard } from '../components/FeaturedDisplayCard.tsx'
import { FeaturedGrantCard } from '../components/FeaturedGrantCard.tsx'
import { FeaturedProjectCard } from '../components/FeaturedProjectCard.tsx'
import { FeatureAirtableData } from './Featured.tsx'

type FeaturedProjectsCarouselProps = {
  allAirtableData: FeatureAirtableData[]
}

export const FeaturedProjectsCarousel = ({ allAirtableData }: FeaturedProjectsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * allAirtableData.length))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allAirtableData.length)
    }, 10000) // 10 seconds interval

    return () => clearInterval(interval)
  }, [allAirtableData.length])

  const renderFeaturedProjects = ({
    data,
    ...rest
  }: {
    data: FeatureAirtableData
    showMini?: boolean
    opacity?: number
    startAnimating?: boolean
  }) => {
    if (data && data?.Type === 'display') {
      return <FeaturedDisplayCard key={data.Name} data={data} {...rest} />
    }

    if (data && data?.Type === 'project') {
      return <FeaturedProjectCard key={data.Name} projectName={data.Name} data={data} {...rest} />
    }

    if (data && data?.Type === 'grant') {
      return <FeaturedGrantCard key={data.Name} grantId={data.Name} {...rest} />
    }
  }

  return (
    <VStack w="full" flex={1} justifyContent="space-between">
      <Box position="relative" width="100%">
        {allAirtableData.map((airtableData, index) => (
          <Box
            key={airtableData.Name}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            opacity={index === currentIndex ? 1 : 0}
            transition="opacity 0.5s ease-in-out"
            pointerEvents={index === currentIndex ? 'auto' : 'none'}
            zIndex={index === currentIndex ? 1 : 0}
          >
            {renderFeaturedProjects({ data: airtableData })}
          </Box>
        ))}

        {allAirtableData[currentIndex] && renderFeaturedProjects({ data: allAirtableData[currentIndex], opacity: 0 })}
      </Box>
      <HStack w="full">
        {allAirtableData.map((airtableData, index) => {
          if (!airtableData) {
            return null
          }

          return renderFeaturedProjects({
            data: airtableData,
            showMini: true,
            startAnimating: index === currentIndex % allAirtableData.length,
          })
        })}
      </HStack>
    </VStack>
  )
}
