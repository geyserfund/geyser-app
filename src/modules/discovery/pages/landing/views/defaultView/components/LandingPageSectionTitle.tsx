import { H3 } from '@/shared/components/typography/Heading.tsx'
import { HeaderProps } from '@/shared/components/typography/Heading.tsx'

export const LandingPageSectionTitle = ({ children, ...props }: HeaderProps) => {
  return (
    <H3 size="lg" bold color="primary1.11" textTransform="uppercase" {...props}>
      {children}
    </H3>
  )
}
