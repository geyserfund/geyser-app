import { QueryHookOptions } from '@apollo/client'
import { useMemo, useState } from 'react'

import {
  ProjectByNameOrIdQuery,
  ProjectByNameOrIdQueryVariables,
  ProjectFragment,
  UpdateProjectInput,
  useProjectByNameOrIdQuery,
  useUpdateProjectMutation,
} from '../../types'
import { getDiff, toInt, useNotification } from '../../utils'

export const useProjectState = (
  projectId?: string | number,
  options?: QueryHookOptions<
    ProjectByNameOrIdQuery,
    ProjectByNameOrIdQueryVariables
  >,
  type: 'name' | 'id' = 'name',
) => {
  const { toast } = useNotification()

  const [project, setProject] = useState<ProjectFragment | null>(null)
  const [baseProject, setBaseProject] = useState<ProjectFragment>(
    {} as ProjectFragment,
  )

  const idType =
    type === 'name' && typeof projectId === 'string' ? 'name' : 'id'

  const invalidId = idType === 'name' && String(projectId).length < 3

  const { loading, error, refetch } = useProjectByNameOrIdQuery({
    variables: {
      where: {
        [idType]: type === 'name' ? projectId : toInt(projectId),
      },
    },
    skip: !projectId || invalidId,
    ...options,
    onCompleted(data) {
      const { projectGet } = data
      if (projectGet) {
        syncProject(projectGet)
      }

      if (options?.onCompleted) {
        options?.onCompleted(data)
      }
    },
  })

  const [updateProjectMutation, { loading: saving }] = useUpdateProjectMutation(
    {
      onError() {
        toast({
          status: 'error',
          title: 'failed to update project',
        })
      },
      onCompleted(data) {
        if (data.updateProject) {
          syncProject({ ...baseProject, ...data.updateProject })
        }
      },
    },
  )

  const syncProject = (project: ProjectFragment) => {

    // @TODO: Make sure this matches the API structure once completed
    // Only modify project Bitcoin Products for Reward Mode activated
    const fundersPool = [{"__typename": "Funder","amountFunded": 4083799,"confirmed": true,"id": "18016","confirmedAt": 1676655599317,"timesFunded": 1,"user": {"__typename": "User","id": "330","username": "Brad Mills 🔑","externalAccounts": [{"__typename": "ExternalAccount","externalId": "246911146","externalUsername": "bradmillscan","id": "224","accountType": "twitter"}],"imageUrl": "https://pbs.twimg.com/profile_images/1541955880752750592/XJqwIn2E_200x200.jpg"}},{"__typename": "Funder","amountFunded": 176455,"confirmed": true,"id": "17597","confirmedAt": 1676473234153,"timesFunded": 1,"user": {"__typename": "User","id": "2921","username": "Peak Shift Ltd.","externalAccounts": [{"__typename": "ExternalAccount","externalId": "91736249","externalUsername": "peakshift","id": "2236","accountType": "twitter"}],"imageUrl": "https://pbs.twimg.com/profile_images/524043007327100928/nWsK2tFU_normal.png"}},{"__typename": "Funder","amountFunded": 44072,"confirmed": true,"id": "17600","confirmedAt": 1676473984339,"timesFunded": 1,"user": {"__typename": "User","id": "2852","username": "Nostr Design","externalAccounts": [{"__typename": "ExternalAccount","externalId": "1621591794327736326","externalUsername": "nostrdesign","id": "2167","accountType": "twitter"}],"imageUrl": "https://pbs.twimg.com/profile_images/1623646673254621184/jKYSu2ov_normal.png"}},{"__typename": "Funder","amountFunded": 17533,"confirmed": true,"id": "17606","confirmedAt": 1676476866579,"timesFunded": 1,"user": {"__typename": "User","id": "641","username": "geyserfund","externalAccounts": [{"__typename": "ExternalAccount","externalId": "c4776021f4613652a73b6bbbf988992ed028271569d6e9e94320118fb826a569","externalUsername": "geyser","id": "2456","accountType": "nostr"},{"__typename": "ExternalAccount","externalId": "1427742950973493259","externalUsername": "geyserfund","id": "2709","accountType": "twitter"}],"imageUrl": "https://pbs.twimg.com/profile_images/1688898754336731136/arq7ibGn_normal.jpg"}},{"__typename": "Funder","amountFunded": 17533,"confirmed": true,"id": "17606","confirmedAt": 1676476866579,"timesFunded": 1,"user": {"__typename": "User","id": "641","username": "geyserfund","externalAccounts": [{"__typename": "ExternalAccount","externalId": "c4776021f4613652a73b6bbbf988992ed028271569d6e9e94320118fb826a569","externalUsername": "geyser","id": "2456","accountType": "nostr"},{"__typename": "ExternalAccount","externalId": "1427742950973493259","externalUsername": "geyserfund","id": "2709","accountType": "twitter"}],"imageUrl": "https://pbs.twimg.com/profile_images/1688898754336731136/arq7ibGn_normal.jpg"}}];
    const productsPool = [{ "__typename": "ProjectProduct", "id": "561", "name": "Bitcoin Coffee Cup", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco", "cost": 1900, "image": "https://storage.googleapis.com/geyser-images-distribution/016f6e31-7132-405c-ada8-b51d2f2a4af2_bitcoin-coffee-cup/image_large.webp", "deleted": false, "stock": null, "sold": 0, "hasShipping": false, "funders": [] }, { "__typename": "ProjectProduct", "id": "559", "name": "Bitcoin Hat", "description": "Merch IX Bitcoin Hat", "cost": 2900, "image": "https://storage.googleapis.com/geyser-images-distribution/b2835e84-9d1e-4249-a077-eef3a79e54ed_bitcoin-hat/image_large.webp", "deleted": false, "stock": null, "sold": 0, "hasShipping": true, "funders": [] }, { "__typename": "ProjectProduct", "id": "560", "name": "Bitcoin T-Shirt", "description": "This is an awesome Bitcoin Shirt", "cost": 4900, "image": "https://storage.googleapis.com/geyser-images-distribution/c40535bf-656d-4e0a-891f-0c868cb1d6e0_bitcoin-shirt/image_large.webp", "deleted": false, "stock": null, "sold": 0, "hasShipping": false, "funders": [] }, { "__typename": "ProjectProduct", "id": "562", "name": "Bitcoin Shoes", "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", "cost": 9900, "image": "https://storage.googleapis.com/geyser-images-distribution/247f58a7-5e30-4af9-8a31-28b7dc909330_bitcoin-shoes/image_large.webp", "deleted": false, "stock": null, "sold": 0, "hasShipping": false, "funders": [] }].map((product, index) => {
      return {...product, ...{
          inStock: Math.random() > 0.50,
          availableAsAdditionalItem: Math.random() > 0.50
      }}
    })

    if(project.id === "719") {
     project = {
       ...project,
       ...{
         rewardsEnabled: true,
         products: productsPool,
         rewards: project.rewards.map(reward => {

           const randomFunders = fundersPool.slice(0, Math.max(1, Math.floor(Math.random() * (fundersPool.length))));
           const randomProducts = productsPool.slice(0, Math.max(1, Math.floor(Math.random() * (productsPool.length))));

           return {...reward, ...{
             funders: randomFunders,
             products: randomProducts.length > 0 ? randomProducts : productsPool[0],
             maxClaimable: 10,
             published: 0.5 > Math.random(),
             sold: randomFunders.length,
             estimatedDeliveryDate: Math.floor(Math.random() * (1710633805 - 1704128205 + 1) + 1704128205).toString()
           }}
         })
       }
     };

     // Total up the funderCount
     const countOfFunders = project.rewards.reduce(
       (accumulator, currentReward) => {
         return accumulator + currentReward.funders.length;
       }, 0
     );
     project = {
       ...project,
       ...{
         fundersCount: countOfFunders,
         fundingTxsCount: countOfFunders
       }
     };
    } else {
     project = {
       ...project,
       ...{
         rewardsEnabled: false,
         products: project.rewards.map(product => {
           const randomFunders = fundersPool.slice(Math.floor(Math.random() * 1), Math.max(2, Math.floor(Math.random() * (fundersPool.length))));
           return {...product, ...{
             __typename: 'ProjectProduct',
               isPhysical: (Math.random() < 0.5),
               funders: randomFunders,
               sold: randomFunders.length
           }}
         })
       }
     };
   }
    // END TODO
    setProject(project)
    setBaseProject(project)
  }

  const updateProject = (value: Partial<ProjectFragment>) => {
    setProject((current) =>
      current ? { ...current, ...value } : (value as ProjectFragment),
    )
  }

  const [isDiff, diffKeys] = useMemo(
    () =>
      project
        ? getDiff(project, baseProject, [
            'location',
            'description',
            'image',
            'rewardCurrency',
            'shortDescription',
            'status',
            'thumbnailImage',
            'title',
            'links',
          ])
        : [],
    [baseProject, project],
  )

  const saveProject = async () => {
    if (!isDiff || !diffKeys || !project) {
      return
    }

    const input = {} as UpdateProjectInput

    diffKeys.map((key) => {
      if (key === 'location') {
        input.countryCode = project.location?.country?.code
        input.region = project.location?.region
        return
      }

      if (key === 'links') {
        input.links = project.links.filter((link) => link)
        return
      }

      input[key as keyof UpdateProjectInput] = project[key]
    })
    input.projectId = toInt(project.id)

    await updateProjectMutation({ variables: { input } })
  }

  return {
    loading,
    error,
    saving,
    project,
    updateProject,
    saveProject,
    refetch,
    isDirty: isDiff,
  }
}
