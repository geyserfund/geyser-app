import { HStack, IconButton, StackProps } from '@chakra-ui/react'
import { MouseEventHandler } from 'react'
import { PiCaretLeftBold } from 'react-icons/pi'

import { SectionTitle } from './SectionTitle'

export interface SectionTitleBlockProps extends StackProps {
  onBackClick: MouseEventHandler<HTMLButtonElement>
  title: string
}

export const SectionTitleBlock = ({ title, onBackClick, ...rest }: SectionTitleBlockProps) => {
  return (
    <HStack w="full" {...rest}>
      <IconButton aria-label="back-icon" size="sm" icon={<PiCaretLeftBold />} onClick={onBackClick} variant="neutral" />
      <SectionTitle>{title}</SectionTitle>
    </HStack>
  )
}
