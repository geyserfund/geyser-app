import { ProjectPageBodyFragment, ProjectRewardFragment } from '@/types/generated/graphql.ts'

export const buildProjectJsonLd = (project: ProjectPageBodyFragment, rewards: ProjectRewardFragment[]): string => {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'CrowdfundingCampaign',
    name: project.title || project.name,
    url: `https://geyser.fund/project/${project.name}`,
    description: project.shortDescription || project.description?.slice(0, 200),
    startDate: project.launchedAt || project.createdAt,
    image: project.thumbnailImage || undefined,
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
