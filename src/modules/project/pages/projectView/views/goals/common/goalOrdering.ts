import type { DragEndEvent } from '@dnd-kit/core'

export const shouldReorderGoals = (event: Pick<DragEndEvent, 'active' | 'over'>): boolean => {
  return Boolean(event.over && event.active.id !== event.over.id)
}
