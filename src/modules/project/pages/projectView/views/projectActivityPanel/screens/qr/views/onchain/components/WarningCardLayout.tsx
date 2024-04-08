import { Divider, HStack } from '@chakra-ui/react'
import { BsExclamationSquareFill } from 'react-icons/bs'

import { CardLayout, CardLayoutProps } from '../../../../../../../../../../../components/layouts'
import { H3 } from '../../../../../../../../../../../components/typography'
import { useCustomTheme } from '../../../../../../../../../../../utils'

interface WarningCardLayoutProps extends CardLayoutProps {
  title: string
}

export const WarningCardLayout = ({ title, children }: WarningCardLayoutProps) => {
  const { colors } = useCustomTheme()
  return (
    <CardLayout padding="20px" borderColor="secondary.orange" spacing="10px">
      <HStack spacing="10px">
        <BsExclamationSquareFill size="24px" fill={colors.secondary.orange} />
        <H3>{title}</H3>
      </HStack>
      <Divider borderColor="neutral.200" />
      {children}
    </CardLayout>
  )
}
