import { getAiSeoPageContent } from './aiSeo.ts'
import { GeyserMainSeoImageUrl } from './url.ts'

const defaultSeoContent = getAiSeoPageContent('default')
const microLendingSeoContent = getAiSeoPageContent('microLending')

export const DefaultMetaTitle = defaultSeoContent.title
export const DefaultMetaImage = GeyserMainSeoImageUrl
export const DefaultMetaDescription = defaultSeoContent.description
export const DefaultMetaKeywords = defaultSeoContent.keywords

export const MicroLendingMetaTitle = microLendingSeoContent.title
export const MicroLendingMetaDescription = microLendingSeoContent.description
export const MicroLendingMetaKeywords = microLendingSeoContent.keywords
export const DefaultMetaType = 'website'
export const DefaultMetaTwitterCard = 'summary_large_image'
export const DefaultMetaTwitterSite = 'geyserfund'
export const DefaultMetaRobots = 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'
