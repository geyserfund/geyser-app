import { SkeletonLayout } from '../../../../../components/layouts'
import { ProfileTabLayout } from '../../../components'
import { ProfileProjectCardSkeleton } from './ProfileProjectCard'

export const TabPanelSkeleton = () => {
  return (
    <ProfileTabLayout heading={<SkeletonLayout height="32px" width="200px" />}>
      {[1, 2, 3].map((val) => (
        <ProfileProjectCardSkeleton key={val} />
      ))}
    </ProfileTabLayout>
  )
}
