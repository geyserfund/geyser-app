import { PropsWithChildren } from 'react'

import { H2, HeaderProps } from '@/shared/components/typography/Heading.tsx'

export const GrantItemTitle = ({ children, ...props }: PropsWithChildren<HeaderProps>) => {
  return (
    <H2 {...props} bold>
      {children}
    </H2>
  )
}
