import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import {
  useAffiliateLinkCreateMutation,
  useAffiliateLinkDisableMutation,
  useAffiliateLinkLabelUpdateMutation,
  useAffiliateLinksGetLazyQuery,
} from '../../../types'
import { useProjectAtom } from '../hooks/useProjectAtom'
import { addUpdateAffiliateLinkAtom, affiliateLinksAtom, disableAffiliateLinkAtom } from '../state/affiliateAtom'
import { useCustomMutation } from './custom/useCustomMutation'

/** Fetch project affiliate links for project context */
export const useProjectAffiliateAPI = (load?: boolean) => {
  const setAffiliateLinks = useSetAtom(affiliateLinksAtom)
  const addUpdateAffiliatelink = useSetAtom(addUpdateAffiliateLinkAtom)
  const removeAffiliateLink = useSetAtom(disableAffiliateLinkAtom)

  const { project, loading } = useProjectAtom()

  const [queryAffiliateLinks, queryAffiliateLinksOptions] = useAffiliateLinksGetLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      input: {
        where: {
          projectId: project?.id,
        },
      },
    },
    onCompleted(data) {
      if (data.affiliateLinksGet) {
        setAffiliateLinks(data.affiliateLinksGet)
      }
    },
  })

  const [createAffilateLink, createAffiliateLinkOptions] = useCustomMutation(useAffiliateLinkCreateMutation, {
    onCompleted(data) {
      if (!data || !data.affiliateLinkCreate) return
      addUpdateAffiliatelink(data.affiliateLinkCreate)
    },
  })

  const [updateAffiliateLink, updateAffiliateLinkOptions] = useCustomMutation(useAffiliateLinkLabelUpdateMutation, {
    onCompleted(data) {
      if (!data || !data.affiliateLinkLabelUpdate) return
      addUpdateAffiliatelink(data.affiliateLinkLabelUpdate)
    },
  })

  const [disableAffiliateLink, disableAffiliateLinkOptions] = useCustomMutation(useAffiliateLinkDisableMutation, {
    onCompleted(data) {
      if (data.affiliateLinkDisable.id) {
        removeAffiliateLink(data.affiliateLinkDisable.id)
      }
    },
  })

  useEffect(() => {
    if (project.id && !loading && load) {
      queryAffiliateLinks()
    }
  }, [project.id, loading, load, queryAffiliateLinks])

  return {
    queryAffiliateLinks: {
      execute: queryAffiliateLinks,
      ...queryAffiliateLinksOptions,
    },
    createAffilateLink: {
      execute: createAffilateLink,
      ...createAffiliateLinkOptions,
    },
    updateAffiliateLink: {
      execute: updateAffiliateLink,
      ...updateAffiliateLinkOptions,
    },
    disableAffiliateLink: {
      execute: disableAffiliateLink,
      ...disableAffiliateLinkOptions,
    },
  }
}
