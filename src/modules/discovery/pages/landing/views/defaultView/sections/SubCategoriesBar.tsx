import { Badge, HStack, IconButton } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi'

import { useFilterContext } from '@/context/filter'
import { ProjectCategoryLabel, ProjectCategoryList } from '@/shared/constants/platform/projectCategory.ts'
import { ProjectCategory } from '@/types/index.ts'

export const SubCategoriesBar = () => {
  const { updateFilter } = useFilterContext()

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(false)

  const handleCategoryClick = (category: ProjectCategory) => {
    updateFilter({ category })
  }

  const checkScroll = () => {
    if (scrollContainerRef.current === null) return null

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftButton(scrollLeft > 0)
    setShowRightButton(scrollLeft < scrollWidth - clientWidth)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current === null) return null

    const scrollAmount = 200 // Adjust this value to change scroll distance
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  return (
    <HStack w="full" position="relative" paddingLeft={showLeftButton ? 10 : 0} paddingRight={showRightButton ? 10 : 0}>
      {showLeftButton && (
        <IconButton
          aria-label="scroll-left"
          variant="soft"
          colorScheme="neutral1"
          onClick={() => scroll('left')}
          icon={<PiCaretLeft />}
          position="absolute"
          left={0}
        />
      )}
      <HStack
        ref={scrollContainerRef}
        width="full"
        onScroll={checkScroll}
        overflowY={'auto'}
        sx={{
          '::-webkit-scrollbar': {
            height: 0,
          },
        }}
      >
        {ProjectCategoryList.map((category) => {
          return (
            <Badge
              key={category}
              size="lg"
              flex={1}
              variant="soft"
              colorScheme="neutral1"
              _hover={{ cursor: 'pointer' }}
              onClick={() => handleCategoryClick(category)}
              height="32px"
              textTransform="capitalize"
              fontWeight="500"
              fontSize="16px"
            >
              {ProjectCategoryLabel[category]}
            </Badge>
          )
        })}
      </HStack>
      {showRightButton && (
        <IconButton
          aria-label="scroll-right"
          variant="soft"
          colorScheme="neutral1"
          onClick={() => scroll('right')}
          icon={<PiCaretRight />}
          position="absolute"
          right={0}
        />
      )}
    </HStack>
  )
}
