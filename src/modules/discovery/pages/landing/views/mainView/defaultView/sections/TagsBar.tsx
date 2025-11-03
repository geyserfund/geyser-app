import { Badge, HStack, IconButton } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi'

import { useFilterContext } from '@/context/filter'
import { TagsMostFundedGetResult, useTagsMostFundedGetQuery } from '@/types'

export const TagsBar = () => {
  const { updateFilter } = useFilterContext()

  const { data } = useTagsMostFundedGetQuery()

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(false)

  const tags = data?.tagsMostFundedGet || []

  const handleTagClick = (tag: TagsMostFundedGetResult) => {
    updateFilter({ tagIds: [tag.id] })
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
        {tags.map((tag) => {
          return (
            <Badge
              key={tag.id}
              size="lg"
              variant="soft"
              colorScheme="neutral1"
              _hover={{ cursor: 'pointer' }}
              onClick={() => handleTagClick(tag)}
              height="32px"
            >
              {tag.label}
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
