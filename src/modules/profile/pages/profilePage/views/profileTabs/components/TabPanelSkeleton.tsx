import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { ProfileProjectCardSkeleton } from './ProfileProjectCard'

export const TabPanelSkeleton = () => {
  return (
    <CardLayout noborder dense w="full" padding="0px" overflow="visible" spacing="0px">
      {[1, 2, 3].map((val, index) => (
        <ProfileProjectCardSkeleton
          key={val}
          borderX="none"
          borderBottom="none"
          {...(index === 0
            ? { borderTop: 'none' }
            : {
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
              })}
        />
      ))}
    </CardLayout>
  )
}
