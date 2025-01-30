export enum ProjectCategory {
  education = 'EDUCATION',
  community = 'COMMUNITY',
  culture = 'CULTURE',
  advocacy = 'ADVOCACY',
  tool = 'TOOL',
  cause = 'CAUSE',
  other = 'OTHER',
}

export enum ProjectSubCategory {
  course = 'COURSE',
  contentCreator = 'CONTENT_CREATOR',
  journalism = 'JOURNALISM',
  podcast = 'PODCAST',
  book = 'BOOK',
  event = 'EVENT',
  meetup = 'MEETUP',
  hackerSpace = 'HACKER_SPACE',
  circularEconomy = 'CIRCULAR_ECONOMY',
  films = 'FILMS',
  collectible = 'COLLECTIBLE',
  game = 'GAME',
  art = 'ART',
  music = 'MUSIC',
  lobby = 'LOBBY',
  legal = 'LEGAL',
  promotions = 'PROMOTIONS',
  osSoftware = 'OS_SOFTWARE',
  hardware = 'HARDWARE',
  app = 'APP',
  humanitarian = 'HUMANITARIAN',
  fundraisers = 'FUNDRAISERS',
  travel = 'TRAVEL',
  medical = 'MEDICAL',
  other = 'OTHER',
}

export const ProjectCategoryList = Object.values(ProjectCategory)
export const ProjectSubCategoryList = Object.values(ProjectSubCategory)

export const ProjectSubCategoryMap = {
  [ProjectCategory.education]: [
    ProjectSubCategory.course,
    ProjectSubCategory.contentCreator,
    ProjectSubCategory.journalism,
    ProjectSubCategory.podcast,
    ProjectSubCategory.book,
  ],
  [ProjectCategory.community]: [
    ProjectSubCategory.event,
    ProjectSubCategory.meetup,
    ProjectSubCategory.hackerSpace,
    ProjectSubCategory.circularEconomy,
  ],
  [ProjectCategory.culture]: [
    ProjectSubCategory.films,
    ProjectSubCategory.collectible,
    ProjectSubCategory.game,
    ProjectSubCategory.art,
    ProjectSubCategory.music,
  ],
  [ProjectCategory.advocacy]: [ProjectSubCategory.lobby, ProjectSubCategory.legal, ProjectSubCategory.promotions],
  [ProjectCategory.tool]: [ProjectSubCategory.osSoftware, ProjectSubCategory.hardware, ProjectSubCategory.app],
  [ProjectCategory.cause]: [
    ProjectSubCategory.humanitarian,
    ProjectSubCategory.fundraisers,
    ProjectSubCategory.travel,
    ProjectSubCategory.medical,
  ],
  [ProjectCategory.other]: [ProjectSubCategory.other],
}

export const ProjectCategoryLabel = {
  [ProjectCategory.education]: 'Education',
  [ProjectCategory.community]: 'Community',
  [ProjectCategory.culture]: 'Culture',
  [ProjectCategory.advocacy]: 'Advocacy',
  [ProjectCategory.tool]: 'Tool',
  [ProjectCategory.cause]: 'Cause',
  [ProjectCategory.other]: 'Other',
} as {
  [key: string]: string
}

export const ProjectSubCategoryLabel = {
  [ProjectSubCategory.course]: 'Course',
  [ProjectSubCategory.contentCreator]: 'Content Creator',
  [ProjectSubCategory.journalism]: 'Journalism',
  [ProjectSubCategory.podcast]: 'Podcast',
  [ProjectSubCategory.book]: 'Book',
  [ProjectSubCategory.event]: 'Event',
  [ProjectSubCategory.meetup]: 'Meetup',
  [ProjectSubCategory.hackerSpace]: 'Hacker Space',
  [ProjectSubCategory.circularEconomy]: 'Circular Economy',
  [ProjectSubCategory.films]: 'Films',
  [ProjectSubCategory.collectible]: 'Collectible',
  [ProjectSubCategory.game]: 'Game',
  [ProjectSubCategory.art]: 'Art',
  [ProjectSubCategory.music]: 'Music',
  [ProjectSubCategory.lobby]: 'Lobby',
  [ProjectSubCategory.legal]: 'Legal',
  [ProjectSubCategory.promotions]: 'Promotions',
  [ProjectSubCategory.osSoftware]: 'OS Software',
  [ProjectSubCategory.hardware]: 'Hardware',
  [ProjectSubCategory.app]: 'App',
  [ProjectSubCategory.humanitarian]: 'Humanitarian',
  [ProjectSubCategory.fundraisers]: 'Fundraisers',
  [ProjectSubCategory.travel]: 'Travel',
  [ProjectSubCategory.medical]: 'Medical',
  [ProjectSubCategory.other]: 'Other',
} as {
  [key: string]: string
}
