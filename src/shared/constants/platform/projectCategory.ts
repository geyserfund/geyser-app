import { ProjectCategory, ProjectSubCategory } from '@/types/index.ts'

export const ProjectCategoryList = [
  ProjectCategory.Education,
  ProjectCategory.Community,
  ProjectCategory.Culture,
  ProjectCategory.Advocacy,
  ProjectCategory.Tool,
  ProjectCategory.Cause,
  ProjectCategory.Other,
]
export const ProjectSubCategoryList = Object.values(ProjectSubCategory)

export const ProjectSubCategoryMap = {
  [ProjectCategory.Education]: [
    ProjectSubCategory.Course,
    ProjectSubCategory.ContentCreator,
    ProjectSubCategory.Journalism,
    ProjectSubCategory.Podcast,
    ProjectSubCategory.Book,
  ],
  [ProjectCategory.Community]: [
    ProjectSubCategory.Event,
    ProjectSubCategory.Meetup,
    ProjectSubCategory.HackerSpace,
    ProjectSubCategory.CircularEconomy,
  ],
  [ProjectCategory.Culture]: [
    ProjectSubCategory.Film,
    ProjectSubCategory.Collectible,
    ProjectSubCategory.Game,
    ProjectSubCategory.Art,
    ProjectSubCategory.Music,
  ],
  [ProjectCategory.Advocacy]: [ProjectSubCategory.Lobby, ProjectSubCategory.LegalFund, ProjectSubCategory.Promotion],
  [ProjectCategory.Tool]: [ProjectSubCategory.OsSoftware, ProjectSubCategory.Hardware, ProjectSubCategory.App],
  [ProjectCategory.Cause]: [
    ProjectSubCategory.Humanitarian,
    ProjectSubCategory.Fundraiser,
    ProjectSubCategory.Travel,
    ProjectSubCategory.Medical,
  ],
  [ProjectCategory.Other]: [ProjectSubCategory.Other],
}

export const ProjectCategoryLabel = {
  [ProjectCategory.Education]: 'Education',
  [ProjectCategory.Community]: 'Community',
  [ProjectCategory.Culture]: 'Culture',
  [ProjectCategory.Advocacy]: 'Advocacy',
  [ProjectCategory.Tool]: 'Tool',
  [ProjectCategory.Cause]: 'Cause',
  [ProjectCategory.Other]: 'Other',
} as {
  [key: string]: string
}

export const ProjectSubCategoryLabel = {
  [ProjectSubCategory.Course]: 'Course',
  [ProjectSubCategory.ContentCreator]: 'Content Creator',
  [ProjectSubCategory.Journalism]: 'Journalism',
  [ProjectSubCategory.Podcast]: 'Podcast',
  [ProjectSubCategory.Book]: 'Book',
  [ProjectSubCategory.Event]: 'Event',
  [ProjectSubCategory.Meetup]: 'Meetup',
  [ProjectSubCategory.HackerSpace]: 'Hacker Space',
  [ProjectSubCategory.CircularEconomy]: 'Circular Economy',
  [ProjectSubCategory.Film]: 'Films',
  [ProjectSubCategory.Collectible]: 'Collectible',
  [ProjectSubCategory.Game]: 'Game',
  [ProjectSubCategory.Art]: 'Art',
  [ProjectSubCategory.Music]: 'Music',
  [ProjectSubCategory.Lobby]: 'Lobby',
  [ProjectSubCategory.LegalFund]: 'Legal',
  [ProjectSubCategory.Promotion]: 'Promotions',
  [ProjectSubCategory.OsSoftware]: 'OS Software',
  [ProjectSubCategory.Hardware]: 'Hardware',
  [ProjectSubCategory.App]: 'App',
  [ProjectSubCategory.Humanitarian]: 'Humanitarian',
  [ProjectSubCategory.Fundraiser]: 'Fundraisers',
  [ProjectSubCategory.Travel]: 'Travel',
  [ProjectSubCategory.Medical]: 'Medical',
  [ProjectSubCategory.Other]: 'Other',
} as {
  [key: string]: string
}
