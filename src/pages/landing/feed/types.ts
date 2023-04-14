export enum ActivityResource {
  entry = 'Entry',
  project = 'Project',
  fundingTx = 'FundingTx',
  projectReward = 'ProjectReward',
}

// Re-mapping aliased keys to stick to Generated Types
export const MapAliasedActivityProperties = (rawActivities: any[]) => {
  const newActivities = rawActivities.map((activity) => {
    const newResource = { ...activity.resource }
    if (newResource.__typename === ActivityResource.entry) {
      newResource.fundersCount = newResource.entryFundersCount
      newResource.description = newResource.entrydescription
    }

    if (newResource.__typename === ActivityResource.projectReward) {
      newResource.name = newResource.rewardName
      newResource.project = newResource.rewardProject
    }

    return { ...activity, resource: newResource }
  })
  return newActivities
}
