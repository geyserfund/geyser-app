import { PropsWithChildren, ReactNode } from 'react'

import { fonts } from '../../../styles'
import { ListText } from './ListText'

export const WidgetItem = ({
  subtitle,
  children,
}: PropsWithChildren<{
  subtitle: ReactNode
}>) => {
  return (
    <ListText
      isSatLogo
      subtitle={subtitle}
      titleProps={{
        color: 'primary.500',
        fontSize: '26px',
        fontWeight: 700,
        fontFamily: fonts.livvic,
      }}
      subtitleProps={{
        fontStyle: 'normal',
        fontSize: '10px',
        fontWeight: 400,
        color: 'neutral.900',
      }}
      satLogoProps={{ color: 'primary.500', height: '17px' }}
    >
      {children}
    </ListText>
  )
}
