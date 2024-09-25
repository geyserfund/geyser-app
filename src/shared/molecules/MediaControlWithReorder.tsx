import { HStack, VStack } from '@chakra-ui/react'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'

import { RenderImageOrVideo, RenderImageOrVideoProps } from './RenderImageOrVideo'

type MediaControlWithReorderProps = {
  links: string[]
  updateLinks: (links: string[]) => void
  aspectRatio: number
}

export const MediaControlWithReorder = ({ links, updateLinks, aspectRatio }: MediaControlWithReorderProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [activeId, setActiveId] = useState<string>()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  if (links.length === 0) {
    return null
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event

    setActiveId(active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = links.indexOf(active?.id as string)
      const newIndex = links.indexOf(over?.id as string)
      const items = [...links]
      const newLinks = arrayMove(items, oldIndex, newIndex)
      setSelectedIndex(newIndex)
      updateLinks(newLinks)
    }

    setActiveId(undefined)
  }

  const onDelete = (link: string) => {
    const newLinks = links.filter((l) => l !== link)
    updateLinks(newLinks)
  }

  const selectedMedia = links[selectedIndex]

  return (
    <VStack w="full" overflowX="hidden">
      {selectedMedia && <RenderImageOrVideo aspectRatio={aspectRatio} link={selectedMedia} onDelete={onDelete} />}
      <HStack w="full" overflowX="auto" py={2}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={links} strategy={horizontalListSortingStrategy}>
            {links.map((link, index) => {
              const isActiveIndex = index === selectedIndex
              const isDragging = activeId === link
              const showStar = index === 0
              return (
                <SortableRenderImageOrVideo
                  key={link}
                  link={link}
                  height="82px"
                  width="auto"
                  minWidth="145px"
                  border={isActiveIndex ? '3px solid' : '1px solid'}
                  borderColor={isActiveIndex ? 'primary1.9' : 'neutral1.6'}
                  _hover={{ cursor: 'pointer' }}
                  opacity={isDragging ? 0 : 1}
                  onClick={() => setSelectedIndex(index)}
                  aspectRatio={aspectRatio}
                  showStar={showStar}
                  enableDrag
                />
              )
            })}
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <RenderImageOrVideo
                enableDrag
                link={activeId}
                height="82px"
                width="auto"
                minWidth="145px"
                _hover={{ cursor: 'pointer' }}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </HStack>
    </VStack>
  )
}

const SortableRenderImageOrVideo = ({ link, ...rest }: RenderImageOrVideoProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return <RenderImageOrVideo ref={setNodeRef} style={style} {...attributes} {...listeners} link={link} {...rest} />
}
