import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'

export const CreationLayoutCard = ({ children, ...props }: CardLayoutProps) => {
  return (
    <CardLayout
      noborder
      dense
      paddingY={{ base: 4, lg: 8 }}
      paddingX={standardPadding}
      spacing={8}
      width="100%"
      alignItems="center"
      {...props}
    >
      {children}
    </CardLayout>
  )
}
