import { useState } from 'react'

import { getPath } from '@/shared/constants'
import { ProjectEntryFragment, ProjectReward } from '@/types'

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
  projectShareModal = 'project-share-Modal',
  projectShareQrBanner = 'project-share-qr-banner',
  rewardShareButton = 'reward-share-button',
  postShareButton = 'post-share-button',
  goalShareButton = 'goal-share-button',
}

type getCampainParametersProps = {
  /** If the user is the creator of the project */
  creator?: boolean
  /** If the user is logged in */
  isLoggedIn: boolean
  /** The key */
  keyword: string
  /** The page the user clicked from */
  clickedFrom: CampaignContent
}

/** This function is for use outside of ProjectProvider Context */
export const getProjectShareUrlSuffix = ({ creator, isLoggedIn, keyword, clickedFrom }: getCampainParametersProps) => {
  const source = creator ? CampaignSource.creator : isLoggedIn ? CampaignSource.user : CampaignSource.visitor

  const campaignParameters = [
    { key: 'mtm_campaign', value: 'project-share' },
    { key: 'mtm_keyword', value: keyword },
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
      keyword: project?.name || '',
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

/** This hook must be used inside ProjectProvider Context to share project rewardLinks links */
export const useRewardShare = ({ id, name }: Pick<ProjectReward, 'id' | 'name'>) => {
  const { project, isProjectOwner } = useProjectAtom()
  const { isLoggedIn } = useAuthContext()
  const [copied, setCopied] = useState(false)

  const getShareRewardUrl = ({ clickedFrom }: { clickedFrom: CampaignContent }) => {
    const campaignUrlSuffix = getProjectShareUrlSuffix({
      creator: isProjectOwner,
      isLoggedIn,
      keyword: `${project?.name}-reward-${name}`,
      clickedFrom,
    })
    return `${window.location.origin}${getPath('projectRewardView', project.name, `${id}`)}${campaignUrlSuffix}`
  }

  const copyRewardLinkToClipboard = ({ clickedFrom }: { clickedFrom: CampaignContent }) => {
    const projectLink = getShareRewardUrl({ clickedFrom })

    copyTextToClipboard(projectLink)

    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return { getShareRewardUrl, copyRewardLinkToClipboard, copied }
}

/** This hook must be used inside ProjectProvider Context to share project rpostLinks links */
export const usePostShare = ({ id }: Pick<ProjectEntryFragment, 'id'>) => {
  const { project, isProjectOwner } = useProjectAtom()
  const { isLoggedIn } = useAuthContext()
  const [copied, setCopied] = useState(false)

  const getSharePostUrl = ({ clickedFrom }: { clickedFrom: CampaignContent }) => {
    const campaignUrlSuffix = getProjectShareUrlSuffix({
      creator: isProjectOwner,
      isLoggedIn,
      keyword: `${project?.name}-post-${id}`,
      clickedFrom,
    })
    return `${window.location.origin}${getPath('projectPostView', project.name, `${id}`)}${campaignUrlSuffix}`
  }

  const copyPostLinkToClipboard = ({ clickedFrom }: { clickedFrom: CampaignContent }) => {
    const projectLink = getSharePostUrl({ clickedFrom })

    copyTextToClipboard(projectLink)

    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return { getSharePostUrl, copyPostLinkToClipboard, copied }
}

/** This hook must be used inside ProjectProvider Context to share project goal links */
export const useGoalShare = ({ id, name }: { id: string; name: string }) => {
  const { project, isProjectOwner } = useProjectAtom()
  const { isLoggedIn } = useAuthContext()
  const [copied, setCopied] = useState(false)

  const getShareGoalUrl = ({ clickedFrom }: { clickedFrom: CampaignContent }) => {
    const campaignUrlSuffix = getProjectShareUrlSuffix({
      creator: isProjectOwner,
      isLoggedIn,
      keyword: `${project?.name}-goal-${name}`,
      clickedFrom,
    })
    return `${window.location.origin}${getPath('projectGoalView', project.name, `${id}`)}${campaignUrlSuffix}`
  }

  const copyGoalLinkToClipboard = ({ clickedFrom }: { clickedFrom: CampaignContent }) => {
    const projectLink = getShareGoalUrl({ clickedFrom })

    copyTextToClipboard(projectLink)

    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return { getShareGoalUrl, copyGoalLinkToClipboard, copied }
}
