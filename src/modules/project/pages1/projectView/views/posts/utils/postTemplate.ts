import { EntryStatus, PostType } from '@/types'

export const defaultPost = {
  id: 0,
  title: '',
  description: '',
  image: '',
  content: '',
  status: EntryStatus.Unpublished,
  postType: PostType.Announcement,
  createdAt: '',
  updatedAt: '',
  fundersCount: 0,
  amountFunded: 0,
  creator: { id: 0, username: '' },
  project: { id: 0, name: '', title: '' },
  publishedAt: '',
}
