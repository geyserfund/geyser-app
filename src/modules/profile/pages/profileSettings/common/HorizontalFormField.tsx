import { FormControl, FormLabel, HStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { Body } from '@/shared/components/typography'

interface HorizontalFormFieldProps {
  label: string
  htmlFor: string
  icon?: ReactNode
  children: ReactNode
}

export const HorizontalFormField = ({ label, htmlFor, icon, children }: HorizontalFormFieldProps) => {
  return (
    <FormControl display="flex" alignItems="center" justifyContent="space-between">
      <FormLabel htmlFor={htmlFor} mb="0">
        <HStack spacing={1}>
          {icon}
          <Body size="sm" color="neutralAlpha.12" medium>
            {label}
          </Body>
        </HStack>
      </FormLabel>
      <HStack spacing={4}>{children}</HStack>
    </FormControl>
  )
}
