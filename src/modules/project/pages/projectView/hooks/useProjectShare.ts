import { useState } from 'react'

import { useAuthContext } from '../../../../../context'
import { copyTextToClipboard } from '../../../../../utils'
import { useProjectContext } from '../../../context'

enum CampaignSource {
  creator = 'creator',
  member = 'member',
  user = ' user',
}

export enum CampaignContent {
  creatorCta = 'creator-share-project-cta',
  projectTitle = 'project-title',
  successScreen = 'success-screen',
}

type getCampainParametersProps = {
  creator?: boolean
  isLoggedIn: boolean
  projectName: string
  clickedFrom: string
}

export const getCampaignUrlSuffix = ({ creator, isLoggedIn, projectName, clickedFrom }: getCampainParametersProps) => {
  const source = creator ? CampaignSource.creator : isLoggedIn ? CampaignSource.member : CampaignSource.user

  const campaignParameters = [
    { key: 'mtm_campaign', value: 'project-share' },
    { key: 'mtm_keyword', value: projectName },
    { key: 'mtm_source', value: source },
    { key: 'mtm_medium', value: 'geyser' },
    { key: 'mtm_content', value: clickedFrom },
  ]
  return '&' + campaignParameters.map(({ key, value }) => `${key}=${value}`).join('&')
}

export const useProjectShare = () => {
  const { project, isProjectOwner } = useProjectContext()
  const { isLoggedIn } = useAuthContext()
  const [copied, setCopied] = useState(false)

  const getShareProjectUrl = ({ clickedFrom }: { clickedFrom: string }) => {
    const campaignUrlSuffix = getCampaignUrlSuffix({
      creator: isProjectOwner,
      isLoggedIn,
      projectName: project?.name || '',
      clickedFrom,
    })
    return `${window.location.origin}/project/${project?.name}${campaignUrlSuffix}`
  }

  const copyProjectLinkToClipboard = ({ clickedFrom }: { clickedFrom: string }) => {
    const projectLink = getShareProjectUrl({ clickedFrom })

    copyTextToClipboard(projectLink)

    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return { getShareProjectUrl, copyProjectLinkToClipboard, copied }
}
