import { Link } from '@chakra-ui/react'

import { CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'

import { FeatureAirtableData } from '../sections/Featured.tsx'
import { FeaturedCardLayout } from './FeaturedCardLayout.tsx'
import { MiniProjectCard } from './MiniProjectCard.tsx'

type FeaturedDisplayCardProps = {
  data: FeatureAirtableData
  showMini?: boolean
  startAnimating?: boolean
  children?: React.ReactNode
} & CardLayoutProps

export const FeaturedDisplayCard = ({
  data,
  showMini,
  startAnimating,
  children,
  ...rest
}: FeaturedDisplayCardProps) => {
  if (showMini) {
    return (
      <MiniProjectCard
        imageUrl={data.imageUrl}
        title={data.Name}
        startAnimating={startAnimating}
        as={Link}
        href={data.link}
      />
    )
  }

  return (
    <>
      <FeaturedCardLayout
        thumbnailImage={data.imageUrl || ''}
        title={data.Name}
        startAnimating={startAnimating}
        comment={data.Featured_Comment}
        author={data.Featured_Author}
        as={Link}
        href={data.link}
      >
        {children}
      </FeaturedCardLayout>
    </>
  )
}
