import { PropsWithChildren, ReactNode } from 'react'

import { ListText } from './ListText'

export const WidgetItem = ({
  subtitle,
  children,
  isSatLogo = true,
}: PropsWithChildren<{
  subtitle: ReactNode
  isSatLogo?: boolean
}>) => {
  return (
    <ListText
      isSatLogo={isSatLogo}
      subtitle={subtitle}
      titleProps={{
        color: 'primary1.11',
        fontSize: '26px',
        fontWeight: 700,
      }}
      subtitleProps={{
        fontStyle: 'normal',
        fontSize: '14px',
        fontWeight: 400,
        color: 'utils.text',
      }}
      satLogoProps={{ color: 'primary1.11', height: '17px' }}
    >
      {children}
    </ListText>
  )
}
