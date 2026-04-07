import { ProjectPageBodyFragment, ProjectPostViewFragment, ProjectRewardFragment } from '@/types/generated/graphql.ts'
import { toInt } from '@/utils/index.ts'

export const getProjectUrl = (projectName: string): string => {
  return `https://geyser.fund/project/${projectName}`
}

export const getProjectPostViewUrl = (projectName: string, postId: string | number): string => {
  return `https://geyser.fund/project/${projectName}/posts/view/${postId}`
}

export const buildProjectJsonLd = (project: ProjectPageBodyFragment, rewards: ProjectRewardFragment[]): string => {
  const projectUrl = getProjectUrl(project.name)
  const normalizedCategory = String(project.category || '').toUpperCase()
  const normalizedSubCategory = String(project.subCategory || '').toUpperCase()
  const isHumanitarianProject =
    normalizedCategory === 'CAUSE' ||
    normalizedSubCategory === 'HUMANITARIAN' ||
    normalizedSubCategory === 'FUNDRAISER' ||
    normalizedSubCategory === 'MEDICAL'
  const keywords = [
    'bitcoin crowdfunding',
    'bitcoin fundraising',
    'bitcoin project ideas',
    'upcoming bitcoin projects',
    ...(isHumanitarianProject ? ['bitcoin humanitarian causes', 'humanitarian fundraiser'] : []),
  ]
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'CrowdfundingCampaign',
    name: project.title || project.name,
    url: projectUrl,
    description: project.shortDescription || project.description?.slice(0, 200),
    startDate: project.launchedAt || project.createdAt,
    image: project.thumbnailImage || undefined,
    inLanguage: 'en',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': projectUrl,
    },
    about: isHumanitarianProject
      ? ['Bitcoin adoption', 'Crowdfunding', 'Humanitarian support']
      : ['Bitcoin adoption', 'Crowdfunding', 'Early-stage project launches'],
    keywords: keywords.join(', '),
    creator: {
      '@type': 'Person',
      name: project.owners[0]?.user?.username || 'Project Creator',
    },
  }

  if (rewards && rewards.length > 0) {
    const offers = rewards
      .filter((r) => !r.deleted && !r.isHidden)
      .map((reward) => ({
        '@type': 'Offer',
        name: reward.name,
        description: reward.shortDescription || reward.description?.slice(0, 200),
        priceCurrency: reward.rewardCurrency || 'BTC',
        price: (reward.cost / 100_000_000).toFixed(8), // convert sats to BTC
        availability:
          reward.maxClaimable && reward.maxClaimable <= reward.sold
            ? 'https://schema.org/OutOfStock'
            : 'https://schema.org/InStock',
        url: `https://geyser.fund/project/${project.name}/products/${reward.uuid}`,
        itemOffered: {
          '@type': 'Product',
          name: reward.name,
          description: reward.shortDescription || reward.description?.slice(0, 200),
          image: reward.images[0] || undefined,
        },
      }))

    if (offers.length > 0) {
      schema.offers = offers
    }
  }

  return JSON.stringify(schema, null, 2)
}

export const generatePostJsonLd = (post: ProjectPostViewFragment, project: ProjectPageBodyFragment): string => {
  const projectOwner = project.owners?.[0]?.user
  const postUrl = getProjectPostViewUrl(project.name, post.id)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image || project.thumbnailImage || '',
    inLanguage: 'en',
    datePublished: post.createdAt ? new Date(toInt(post.createdAt)).toISOString() : undefined,
    about: ['Bitcoin project update', 'Crowdfunding progress'],
    keywords: 'bitcoin project updates, bitcoin crowdfunding, creator updates',
    author: projectOwner
      ? {
          '@type': 'Person',
          name: projectOwner.username,
          url: `https://geyser.fund/profile/${projectOwner.username}`,
          ...(projectOwner.imageUrl && { image: projectOwner.imageUrl }),
        }
      : {
          '@type': 'Organization',
          name: project.title,
          url: `https://geyser.fund/project/${project.name}`,
        },
    publisher: {
      '@type': 'Organization',
      name: 'Geyser',
      url: 'https://geyser.fund',
      logo: {
        '@type': 'ImageObject',
        url: 'https://geyser.fund/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    url: postUrl,
  }

  return JSON.stringify(schema)
}
