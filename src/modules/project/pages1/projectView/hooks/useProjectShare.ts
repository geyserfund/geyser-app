import { useState } from 'react'

import { useAuthContext } from '../../../../../context'
import { copyTextToClipboard } from '../../../../../utils'
import { useProjectAtom } from '../../../hooks/useProjectAtom'

enum CampaignSource {
  /** For content shared by creator */
  creator = 'creator',
  /** For content shared by contributor */
  contributor = 'contributor',
  /** For content shared by user */
  user = 'user',
  /** For content shared by visitor */
  visitor = 'visitor',
}

export enum CampaignContent {
  creatorCta = 'creator-share-project-cta',
  projectTitle = 'project-title',
  successScreen = 'success-screen',
  contributionSummary = 'contribution-summary',
}

type getCampainParametersProps = {
  /** If the user is the creator of the project */
  creator?: boolean
  /** If the user is logged in */
  isLoggedIn: boolean
  /** The name of the project */
  projectName: string
  /** The page the user clicked from */
  clickedFrom: CampaignContent
}

/** This function is for use outside of ProjectProvider Context */
export const getProjectShareUrlSuffix = ({
  creator,
  isLoggedIn,
  projectName,
  clickedFrom,
}: getCampainParametersProps) => {
  const source = creator ? CampaignSource.creator : isLoggedIn ? CampaignSource.user : CampaignSource.visitor

  const campaignParameters = [
    { key: 'mtm_campaign', value: 'project-share' },
    { key: 'mtm_keyword', value: projectName },
    { key: 'mtm_source', value: source },
    { key: 'mtm_medium', value: 'geyser' },
    { key: 'mtm_content', value: clickedFrom },
  ]
  return '?' + campaignParameters.map(({ key, value }) => `${key}=${value}`).join('&')
}

/** This hook must be used inside ProjectProvider Context to share project links */
export const useProjectShare = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const { isLoggedIn } = useAuthContext()
  const [copied, setCopied] = useState(false)

  const getShareProjectUrl = ({ clickedFrom }: { clickedFrom: CampaignContent }) => {
    const campaignUrlSuffix = getProjectShareUrlSuffix({
      creator: isProjectOwner,
      isLoggedIn,
      projectName: project?.name || '',
      clickedFrom,
    })
    return `${window.location.origin}/project/${project?.name}${campaignUrlSuffix}`
  }

  const copyProjectLinkToClipboard = ({ clickedFrom }: { clickedFrom: CampaignContent }) => {
    const projectLink = getShareProjectUrl({ clickedFrom })

    copyTextToClipboard(projectLink)

    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return { getShareProjectUrl, copyProjectLinkToClipboard, copied }
}
