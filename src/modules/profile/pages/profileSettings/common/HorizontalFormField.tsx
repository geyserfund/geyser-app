import { FormControl, FormLabel, HStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { Body } from '@/shared/components/typography'

interface HorizontalFormFieldProps {
  label: string
  htmlFor: string
  children: ReactNode
}

export const HorizontalFormField = ({ label, htmlFor, children }: HorizontalFormFieldProps) => {
  return (
    <FormControl display="flex" alignItems="center" justifyContent="space-between">
      <FormLabel htmlFor={htmlFor} mb="0">
        <Body size="lg">{label}</Body>
      </FormLabel>
      <HStack spacing={4}>{children}</HStack>
    </FormControl>
  )
}
