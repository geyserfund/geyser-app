import { HStack, StackProps, Tooltip } from '@chakra-ui/react'

interface SummaryInfoLineProps extends StackProps {
  label: string
  icon: React.ReactNode
}

export const SummaryInfoLine = ({
  label,
  icon,
  children,
  ...rest
}: SummaryInfoLineProps) => {
  return (
    <HStack spacing="8px" alignItems="center" {...rest}>
      <Tooltip label={label} placement="top">
        {icon}
      </Tooltip>
      {children}
    </HStack>
  )
}
